import { useForm } from 'react-hook-form'
import { useCarritoContext } from '../context/CarritoContext'
import { formatearPrecio } from '../utils/formato'

const OPCIONES_ENVIO = [
  { valor: 'domicilio', texto: 'Envío a domicilio' },
  { valor: 'retiro', texto: 'Retiro en el local' },
]

const INPUT_CLASE =
  'w-full rounded-xl border border-(--color-border) bg-(--color-surface) px-4 py-2 text-(--color-text)'
const ERROR_CLASE = 'text-sm text-(--color-danger)'
const LABEL_CLASE = 'text-sm font-semibold text-(--color-text)'

const Checkout = ({ onVolver, onConfirmar }) => {
  const { carrito, total, vaciar } = useCarritoContext()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: { metodoEnvio: 'domicilio' },
  })

  const metodoEnvio = watch('metodoEnvio')

  const onSubmit = (datos) => {
    const pedido = {
      cliente: {
        nombre: datos.nombre,
        email: datos.email,
        telefono: datos.telefono,
        direccion: datos.metodoEnvio === 'domicilio' ? datos.direccion : null,
      },
      envio: datos.metodoEnvio,
      notas: datos.notas,
      items: carrito,
      total,
    }

    console.log('Pedido:', pedido)
    vaciar()
    onConfirmar(pedido)
  }

  return (
    <main className="mx-auto grid max-w-5xl gap-8 px-4 py-6 md:grid-cols-2">
      <section aria-labelledby="titulo-resumen">
        <h2 id="titulo-resumen" className="mb-4 text-xl font-bold">Resumen de tu pedido</h2>

        <ul>
          {carrito.map((item) => (
            <li
              key={item.id}
              className="flex justify-between gap-2 border-b border-(--color-border) py-2 text-sm"
            >
              <span>{item.nombre} × {item.cantidad}</span>
              <span>{formatearPrecio(item.precio * item.cantidad)}</span>
            </li>
          ))}
        </ul>

        <p className="mt-4 flex justify-between text-lg font-bold">
          <span>Total</span>
          <span>{formatearPrecio(total)}</span>
        </p>
      </section>

      <section aria-labelledby="titulo-datos">
        <h2 id="titulo-datos" className="mb-4 text-xl font-bold">Tus datos</h2>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="nombre" className={LABEL_CLASE}>Nombre completo</label>
            <input
              id="nombre"
              type="text"
              className={INPUT_CLASE}
              aria-invalid={errors.nombre ? 'true' : 'false'}
              aria-describedby={errors.nombre ? 'nombre-error' : undefined}
              {...register('nombre', {
                required: 'Contanos tu nombre completo',
                minLength: { value: 3, message: 'El nombre tiene que tener al menos 3 caracteres' },
              })}
            />
            {errors.nombre && <p id="nombre-error" className={ERROR_CLASE}>{errors.nombre.message}</p>}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className={LABEL_CLASE}>Email</label>
            <input
              id="email"
              type="email"
              className={INPUT_CLASE}
              aria-invalid={errors.email ? 'true' : 'false'}
              aria-describedby={errors.email ? 'email-error' : undefined}
              {...register('email', {
                required: 'Necesitamos tu email para enviarte la confirmación',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Ese email no parece válido, revisalo',
                },
              })}
            />
            {errors.email && <p id="email-error" className={ERROR_CLASE}>{errors.email.message}</p>}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="telefono" className={LABEL_CLASE}>Teléfono</label>
            <input
              id="telefono"
              type="text"
              inputMode="numeric"
              className={INPUT_CLASE}
              aria-invalid={errors.telefono ? 'true' : 'false'}
              aria-describedby={errors.telefono ? 'telefono-error' : undefined}
              {...register('telefono', {
                required: 'Dejanos un teléfono de contacto',
                pattern: { value: /^[0-9]+$/, message: 'Usá solo números, sin espacios ni guiones' },
                minLength: { value: 8, message: 'El teléfono tiene que tener al menos 8 números' },
              })}
            />
            {errors.telefono && <p id="telefono-error" className={ERROR_CLASE}>{errors.telefono.message}</p>}
          </div>

          <fieldset className="flex flex-col gap-2">
            <legend className={LABEL_CLASE}>Método de envío</legend>
            {OPCIONES_ENVIO.map((opcion) => (
              <div key={opcion.valor} className="flex items-center gap-2">
                <input
                  id={`envio-${opcion.valor}`}
                  type="radio"
                  value={opcion.valor}
                  {...register('metodoEnvio')}
                />
                <label htmlFor={`envio-${opcion.valor}`} className="text-sm">{opcion.texto}</label>
              </div>
            ))}
          </fieldset>

          {metodoEnvio === 'domicilio' && (
            <div className="flex flex-col gap-1">
              <label htmlFor="direccion" className={LABEL_CLASE}>Dirección</label>
              <input
                id="direccion"
                type="text"
                className={INPUT_CLASE}
                aria-invalid={errors.direccion ? 'true' : 'false'}
                aria-describedby={errors.direccion ? 'direccion-error' : undefined}
                {...register('direccion', { required: 'Necesitamos la dirección para el envío' })}
              />
              {errors.direccion && <p id="direccion-error" className={ERROR_CLASE}>{errors.direccion.message}</p>}
            </div>
          )}

          <div className="flex flex-col gap-1">
            <label htmlFor="notas" className={LABEL_CLASE}>Notas (opcional)</label>
            <textarea
              id="notas"
              rows={3}
              className={INPUT_CLASE}
              aria-invalid={errors.notas ? 'true' : 'false'}
              aria-describedby={errors.notas ? 'notas-error' : undefined}
              {...register('notas', {
                maxLength: { value: 200, message: 'Las notas no pueden pasar de 200 caracteres' },
              })}
            />
            {errors.notas && <p id="notas-error" className={ERROR_CLASE}>{errors.notas.message}</p>}
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <input
                id="terminos"
                type="checkbox"
                aria-invalid={errors.terminos ? 'true' : 'false'}
                aria-describedby={errors.terminos ? 'terminos-error' : undefined}
                {...register('terminos', { required: 'Tenés que aceptar los términos para continuar' })}
              />
              <label htmlFor="terminos" className="text-sm">Acepto los términos y condiciones</label>
            </div>
            {errors.terminos && <p id="terminos-error" className={ERROR_CLASE}>{errors.terminos.message}</p>}
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onVolver}
              className="rounded-xl border border-(--color-border) px-4 py-2 font-semibold"
            >
              Volver a la tienda
            </button>
            <button
              type="submit"
              className="rounded-xl bg-(--color-primary) px-4 py-2 font-semibold text-white hover:bg-(--color-primary-hover)"
            >
              Confirmar pedido
            </button>
          </div>
        </form>
      </section>
    </main>
  )
}

export default Checkout