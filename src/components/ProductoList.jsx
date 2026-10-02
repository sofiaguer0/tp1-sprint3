import ProductoCard from './ProductoCard'

const ProductoList = ({ items, isInList, onToggle }) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((item) => (
        <ProductoCard
          key={item.id}
          item={item}
          enLista={isInList(item)}
          onToggle={onToggle}
        />
      ))}
    </div>
  )
}

export default ProductoList