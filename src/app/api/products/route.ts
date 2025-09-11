import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Product from "@/models/Product";
import cloudinary from "@/lib/cloudinary";

// GET all products
export async function GET() {
  try {
    await dbConnect();
    const products = await Product.find().sort({ uploadedAt: -1 });

    return NextResponse.json({ success: true, data: products }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || "Failed to fetch products" },
      { status: 500 }
    );
  }
}

//create
export async function POST(req: Request) {
  try {
    await dbConnect();

    const formData = await req.formData();

    const productName = formData.get("productName") as string;
    const productPath = formData.get("productPath") as string;

    if (!productName || !productPath) {
      return NextResponse.json(
        { success: false, message: "Product name and product path are required" },
        { status: 400 }
      );
    }

    // Upload main images
    const mainImage: string[] = [];
    for (const file of formData.getAll("mainImage")) {
      if (file instanceof File) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const upload = await new Promise<any>((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "products/main" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          stream.end(buffer);
        });
        mainImage.push(upload.secure_url);
      }
    }

    //Upload product images 
    const productImage: string[] = [];
    for (const file of formData.getAll("productImage")) {
      if (file instanceof File) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const upload = await new Promise<any>((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "products/gallery" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          stream.end(buffer);
        });
        productImage.push(upload.secure_url);
      }
    }

    const parseJSON = (field: string) => {
      try {
        return JSON.parse((formData.get(field) as string) || "[]");
      } catch {
        return [];
      }
    };

    const product = new Product({
      productName,
      productPath,
      productLink: (formData.get("productLink") as string) || "",
      calendlyUrl: (formData.get("calendlyUrl") as string) || "",
      description: (formData.get("description") as string) || "",
      why_choose_des: (formData.get("why_choose_des") as string) || "",
      who_need_des: (formData.get("who_need_des") as string) || "",
      category: (formData.get("category") as string) || "",
      mainImage,
      productImage,
      whatis: parseJSON("whatis"),
      benefits: parseJSON("benefits"),
      FAQ: parseJSON("FAQ"),
      Result: parseJSON("Result"),
      customerTestimonials: parseJSON("customerTestimonials"),
    });

    await product.save();

    return NextResponse.json({ success: true, data: product }, { status: 201 });
  } catch (err: any) {
    console.error("Upload error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to save product" },
      { status: 500 }
    );
  }
}

