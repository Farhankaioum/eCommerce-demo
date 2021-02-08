import { products } from '../../../helpers/data/data'

export default function productHandler({ query: { id } }, res) {
    getProduct(id, res);
  }

  const getProduct = async (id, res) => {
    const filtered = products.filter((p) => p.id == id)
    
    if (filtered.length > 0) {
      res.status(200).json(filtered[0])
    } else {
      res.status(404).json({ message: `Product with id: ${id} not found.` })
    }
  }