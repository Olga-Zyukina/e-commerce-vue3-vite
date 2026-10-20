import ordersData from "assets/data/orders.json"
const orders: OrderData[] = ordersData as OrderData[]

export default defineEventHandler(() => {
  return orders
});