import { useEffect } from 'react'

const Modal = ({ titulo, onCerrar, children }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onCerrar()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onCerrar])

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        type="button"
        onClick={onCerrar}
        tabIndex={-1}
        aria-hidden="true"
        className="absolute inset-0 bg-black/30 cursor-default"
      />
      <aside className="relative z-10 flex h-full w-80 flex-col border-l border-(--color-border) bg-(--color-surface) shadow-xl">
        <div className="flex items-center justify-between border-b border-(--color-border) px-5 py-4">
          <h2 className="text-xl font-bold text-(--color-text)">{titulo}</h2>
          <button onClick={onCerrar} aria-label="Cerrar">✕</button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-4">{children}</div>
      </aside>
    </div>
  )
}

export default Modal