import { formatearPrecio } from '../utils/formato'

const Confirmacion = ({ pedido, onVolver }) => {
  return (
    <main className="mx-auto max-w-xl px-4 py-12 text-center">
      <h2 className="mb-4 text-3xl font-bold">¡Gracias, {pedido.cliente.nombre}!</h2>

      <p className="mb-2">
        Recibimos tu pedido por {formatearPrecio(pedido.total)}. Te escribimos a {pedido.cliente.email}.
      </p>
      <p className="mb-8 text-(--color-muted)">
        {pedido.envio === 'domicilio'
          ? `Te lo enviamos a ${pedido.cliente.direccion}.`
          : 'Lo retirás en el local.'}
      </p>

      <button
        onClick={onVolver}
        className="rounded-xl bg-(--color-primary) px-4 py-2 font-semibold text-white hover:bg-(--color-primary-hover)"
      >
        Volver a la tienda
      </button>
    </main>
  )
}

export default Confirmacion