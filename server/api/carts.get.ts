import cartsData from "assets/data/carts.json"
const carts: Cart[] = cartsData as Cart[]

export default defineEventHandler(() => {
  return carts
});