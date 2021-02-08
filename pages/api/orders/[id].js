import { localStorageData } from '../../../functions'

export default function orderHandler({ query: { id } }, res) {
    getOrder(id, res);
  }

  const getOrder = (id, res) => {
    
    let allOrders = localStorageData('user-orders')
    const filtered = allOrders.orders.filter((p) => p.id == id)
    
    if (filtered.length > 0) {
      res.status(200).json(filtered[0])
    } else {
      res.status(404).json({ message: `Product with id: ${id} not found.` })
    }
  }