// lib/api.ts
import Product from "@/models/Product";
import dbConnect from "./mongoose";

export async function getProductByPath(productPath: string) {
  await dbConnect();
  const product = await Product.findOne({ productPath }).lean(); // <- findOne returns a single object
  return product; // single object, not array
}
