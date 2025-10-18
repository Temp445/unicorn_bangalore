import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Product from "@/models/Product";
import cloudinary from "@/lib/cloudinary";

//GET all products
export async function GET() {
  try {
    await dbConnect();
    const products = await Product.find();
    return NextResponse.json({ success: true, data: products }, { status: 200 });
  } catch (err: any) {
    console.error("GET Error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// Create new product
export async function POST(req: Request) {
  try {
    await dbConnect();

    const formData = await req.formData();
    const productName = formData.get("productName") as string;
    const productImages = formData.getAll("productImage") as File[];

    if (!productName) {
      return NextResponse.json(
        { success: false, message: "Product name is required" },
        { status: 400 }
      );
    }

    const galleryUrls: string[] = [];

    for (const file of productImages) {
      if (file instanceof File) {
        const buffer = Buffer.from(await file.arrayBuffer());

        const uploadResult: any = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: "products/gallery" },
            (error, result) => {
              if (error) return reject(error);
              resolve(result);
            }
          );
          uploadStream.end(buffer);
        });

        galleryUrls.push(uploadResult.secure_url);
      }
    }

    const product = new Product({
      productName,
      productImage: galleryUrls,
    });

    await product.save();

    return NextResponse.json({ success: true, data: product }, { status: 201 });
  } catch (err: any) {
    console.error("POST Error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to save product" },
      { status: 500 }
    );
  }
}
