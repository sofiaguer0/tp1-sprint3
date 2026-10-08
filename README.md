La tienda de jueguitos

🔗 Demo: https://tienda-sprint3.netlify.app/

Qué es

Una tienda de videojuegos con carrito y checkout. Se recorre el catálogo de 20 juegos, se busca por nombre, se agregan productos con cantidades (sin pasar el stock), se ve el total, se completa un formulario con validaciones y se confirma el pedido. El carrito y el modo oscuro se guardan en el navegador y sobreviven al F5.

Hecha con React, Vite, Tailwind v4 y React Hook Form.

Cómo correrlo
bash
pnpm install
pnpm run dev

Para generar la versión de producción: pnpm run build.

Estructura del proyecto
src/
├── main.jsx            Providers (tema y carrito) envolviendo App
├── App.jsx             layout + qué vista se muestra
├── index.css           Tailwind + tokens en @theme
├── data/               productos.js (catálogo) y vistas.js (constantes)
├── context/            CarritoContext.jsx y ThemeContext.jsx
├── hooks/              useLocalStorage, useCarrito, useToggle
├── views/              Tienda, Checkout, Confirmacion
├── components/         ProductoList, ProductoCard, CarritoModal, CarritoItem
│   ├── layout/         Navbar
│   └── ui/             Modal (genérico, con children)
└── utils/              formato.js (formatearPrecio)
Mis contextos

CarritoContext

Qué guarda: el carrito (lista de productos, cada uno con su cantidad) y las funciones para modificarlo: agregar, cambiarCantidad, quitar y vaciar. También expone los derivados total y cantidadTotal.
Quién lo consume: Navbar (contador), ProductoCard (agregar y cantidad en el carrito), CarritoModal y CarritoItem (lista, cantidades y total) y Checkout (resumen del pedido y vaciado al confirmar).
Por qué es global: lo leen y lo modifican componentes de ramas distintas del árbol (navbar, tienda, modal y checkout). Sin contexto, habría que pasar el carrito y sus funciones por componentes intermedios que no los usan.

ThemeContext

Qué guarda: el tema actual ('claro' u 'oscuro'), persistido en localStorage, y la función alternarTema.
Quién lo consume: el Navbar, que tiene el botón para cambiar de tema. El propio Provider aplica el tema al documento con un useEffect (escribe data-theme en document.documentElement) y el CSS cambia los colores con esa marca.
Por qué es global: el tema afecta a toda la app y no le pertenece a un componente en particular.
Mis hooks
useLocalStorage(key, valorInicial): funciona como un useState pero persistido. Lee el storage una sola vez al iniciar (inicialización lazy), tolera datos corruptos con try/catch y guarda con un useEffect cada vez que cambia el valor. Devuelve [valor, setValor, limpiar]. Es el único archivo que toca localStorage y JSON.
useCarrito(): toda la lógica del carrito. Agregar un producto que ya está suma 1 en vez de duplicarlo, no deja pasar el stock, bajar la cantidad a 0 saca el producto, y total y cantidadTotal se calculan con reduce. Usa useLocalStorage por dentro y devuelve { carrito, cantidadTotal, total, agregar, cambiarCantidad, quitar, vaciar }.
useToggle(valorInicial): un on/off genérico. Devuelve [valor, alternar] y lo uso para abrir y cerrar el modal del carrito.
Decisiones de estado

Lo que no puse en un contexto, y por qué:

El buscador: es un useState en views/Tienda.jsx, porque solo lo usa esa vista.
El modal abierto o cerrado: es un useToggle en App, porque solo lo usan App y sus hijos directos.
La vista actual y el pedido confirmado: son useState en App, porque solo App decide qué vista se muestra y el pedido se le pasa una sola vez a Confirmacion.
Los campos del formulario: los maneja React Hook Form, sin useState ni value + onChange.
El catálogo: se importa desde data/productos.js, porque no cambia mientras la app corre.
Lo derivado: total, cantidadTotal, productosFiltrados y la cantidad de cada producto en el carrito se calculan en cada render y no se guardan en ningún estado.
Prop drilling: antes y después
Antes (con el carrito en App): 4 props pasaban de largo sin usarse. isInList y onToggle atravesaban Tienda, onToggle atravesaba ProductoList, y onCerrar atravesaba CarritoModal solo para llegar a Modal.
Después (con Context): 0. Cada componente toma del contexto lo que necesita, y el modal se arma por composición (Modal recibe como children el contenido del carrito).
Extras
Cerrar el modal con Escape: un useEffect en Modal.jsx registra el keydown en window y lo quita en su return (la limpieza) cuando el modal se desmonta.
Qué generé con IA

Usé Claude (Anthropic) como guía durante todo el TP, y fui probando cada parte en el navegador antes de seguir.

Qué generé con ayuda de la IA:

El plan por bloques y la estructura de carpetas, a partir del README del TP.
useCarrito, CarritoContext y ThemeContext, siguiendo las recetas del README.
El formulario del checkout con React Hook Form y las vistas Checkout y Confirmacion.
El Modal genérico con cierre por Escape, adaptado de mi ListPanel del TP2.
Los valores de la paleta del modo oscuro.

Qué hice y corregí a mano:

Copié useLocalStorage, useToggle y los componentes de mi TP2, y los adapté a la tienda (useMyList pasó a ser useCarrito, ItemCard a ProductoCard, etc.).
Cargué precio y stock en los 20 productos del catálogo.
Decidí sacar el componente SearchBar, que no figura en la estructura sugerida, y dejar el buscador como un useState dentro de Tienda.jsx.
Resolví los errores que aparecieron al integrar las piezas: imports que no coincidían con los exports (hooks con exportación con nombre y componentes con export default) y archivos vacíos que se importaban.
Conecté el repositorio con Netlify y publiqué el deploy.

