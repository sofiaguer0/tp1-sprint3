# 🎮 La tienda de jueguitos

🔗 **Demo:** [tienda-sprint3.netlify.app](https://tienda-sprint3.netlify.app/)

## Qué es

Una tienda de videojuegos con carrito y checkout.

1. Recorrés el catálogo de 20 juegos y buscás por nombre.
2. Agregás productos con cantidades, sin pasar el stock.
3. Completás un formulario con validaciones y confirmás el pedido.

El carrito y el modo oscuro se guardan en el navegador y **sobreviven al F5**.

**Tecnologías:** React, Vite, Tailwind v4 y React Hook Form.

## Cómo correrlo

```bash
pnpm install
pnpm run dev
```

Para la versión de producción: `pnpm run build`.

## Estructura

```
src/
├── main.jsx        → Providers (tema y carrito) envolviendo App
├── App.jsx         → layout + qué vista se muestra
├── data/           → productos.js, vistas.js
├── context/        → CarritoContext, ThemeContext
├── hooks/          → useLocalStorage, useCarrito, useToggle
├── views/          → Tienda, Checkout, Confirmacion
├── components/     → ProductoList, ProductoCard, CarritoModal, CarritoItem
│   ├── layout/     → Navbar
│   └── ui/         → Modal (genérico, con children)
└── utils/          → formato.js (formatearPrecio)
```

## Mis contextos

### 🛒 `CarritoContext`

- **Qué guarda:** el carrito (productos con su `cantidad`), sus funciones (`agregar`, `cambiarCantidad`, `quitar`, `vaciar`) y los derivados `total` y `cantidadTotal`.
- **Quién lo consume:** `Navbar`, `ProductoCard`, `CarritoModal`, `CarritoItem` y `Checkout`.
- **Por qué es global:** lo usan componentes de ramas distintas del árbol. Sin contexto habría que pasarlo por componentes intermedios que no lo necesitan.

### 🌗 `ThemeContext`

- **Qué guarda:** el tema (`'claro'` u `'oscuro'`), persistido en `localStorage`, y `alternarTema`.
- **Quién lo consume:** el `Navbar` (botón de tema). El Provider aplica el tema al documento con un `useEffect`.
- **Por qué es global:** el tema afecta a toda la app y no le pertenece a un componente en particular.

## Mis hooks

| Hook | Qué hace | Devuelve |
|---|---|---|
| `useLocalStorage(key, valorInicial)` | Un `useState` persistido. Lee el storage una sola vez (lazy), tolera datos corruptos y guarda cuando cambia. | `[valor, setValor, limpiar]` |
| `useCarrito()` | Toda la lógica del carrito: suma cantidad en vez de duplicar, respeta el stock, saca el producto al llegar a 0. | `{ carrito, cantidadTotal, total, agregar, cambiarCantidad, quitar, vaciar }` |
| `useToggle(valorInicial)` | Un on/off genérico, usado para abrir y cerrar el modal. | `[valor, alternar]` |

## Decisiones de estado

Lo que **no** puse en un contexto:

| Dato | Dónde vive | Por qué |
|---|---|---|
| Buscador | `useState` en `Tienda.jsx` | Solo lo usa esa vista |
| Modal abierto o cerrado | `useToggle` en `App` | Solo lo usan `App` y sus hijos directos |
| Vista actual y pedido | `useState` en `App` | Solo `App` decide qué vista mostrar |
| Campos del formulario | React Hook Form | Sin `useState` ni `value` + `onChange` |
| Catálogo | Import de `productos.js` | No cambia mientras la app corre |
| `total`, `cantidadTotal`, filtrados | Se calculan en cada render | Son derivados, no se guardan |

## Prop drilling: antes y después

| | Props que pasaban de largo |
|---|---|
| **Antes** (carrito en `App`) | **4** → `isInList` y `onToggle` por `Tienda`, `onToggle` por `ProductoList`, `onCerrar` por `CarritoModal` |
| **Después** (con Context) | **0** → cada componente toma del contexto lo que necesita |

## Extra

⌨️ **Cerrar el modal con `Escape`:** un `useEffect` en `Modal.jsx` registra el `keydown` en `window` y lo quita en su `return` cuando el modal se desmonta.

## Qué generé con IA

Usé Claude como guía y probé cada parte en el navegador antes de seguir.

**Con ayuda de la IA:**

- El plan por bloques y la estructura de carpetas.
- `useCarrito`, `CarritoContext` y `ThemeContext`.
- El formulario del checkout y las vistas `Checkout` y `Confirmacion`.
- El `Modal` genérico con `Escape`, adaptado de mi `ListPanel` del TP2.
- Los valores de la paleta del modo oscuro.

**A mano:**

- Copié y adapté `useLocalStorage`, `useToggle` y los componentes de mi TP2 a la tienda.
- Cargué precio y stock en los 20 productos.
- Decidí sacar `SearchBar` y dejar el buscador como `useState` en `Tienda.jsx`.
- Resolví los errores de imports y exports que aparecieron al integrar.
- Conecté el repo con Netlify y publiqué el deploy.

