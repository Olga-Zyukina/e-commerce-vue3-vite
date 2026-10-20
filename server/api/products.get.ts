import productsData from "assets/data/products.json"
const products: Omit<ProductsListData, "rate" | "count">[] = productsData

export default defineEventHandler(() => {
  return products
});
