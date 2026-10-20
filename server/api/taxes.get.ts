import taxesData from "assets/data/taxes.json"
const taxes: TaxesData[] = taxesData as TaxesData[]

export default defineEventHandler(() => {
  return taxes
});
