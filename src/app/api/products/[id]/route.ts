import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Product from "@/models/Product";
import cloudinary from "@/lib/cloudinary";


// Get product by ID
export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const url = new URL(req.url);
    const pathname = url.pathname; 
    const parts = pathname.split('/');
    const id = parts[parts.length - 1];

    if (!id) {
      return NextResponse.json({ success: false, message: "Product ID required" }, { status: 400 });
    }

    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product, { status: 200 });
  } catch (err: any) {
    console.error("Fetch error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to fetch product" },
      { status: 500 }
    );
  }
}


//update
export async function PUT(req: NextRequest) {
  try {
    await dbConnect();

    const formData = await req.formData();
    const url = new URL(req.url);
    const parts = url.pathname.split("/");
    const id = parts[parts.length - 1];

    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    product.productName = (formData.get("productName") as string) || product.productName;
    product.productPath = (formData.get("productPath") as string) || product.productPath;
    product.productLink = (formData.get("productLink") as string) || product.productLink;
    product.calendlyUrl = (formData.get("calendlyUrl") as string) || product.calendlyUrl;
    product.description = (formData.get("description") as string) || product.description;
    product.why_choose_des = (formData.get("why_choose_des") as string) || product.why_choose_des;
    product.who_need_des = (formData.get("who_need_des") as string) || product.who_need_des;
    product.category = (formData.get("category") as string) || product.category;

    // Upload mainImage
    const newMainImages: string[] = [];
    for (const file of formData.getAll("mainImage")) {
      if (file instanceof File) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uploaded = await new Promise<any>((resolve, reject) => {
          cloudinary.uploader
            .upload_stream({ folder: "products/main" }, (error, result) => {
              if (error) reject(error);
              else resolve(result);
            })
            .end(buffer);
        });

        newMainImages.push(uploaded.secure_url);
      }
    }

    if (newMainImages.length > 0) {
      product.mainImage = newMainImages;
    }

    // Upload productImage
    const newProductImages: string[] = [];
    for (const file of formData.getAll("productImage")) {
      if (file instanceof File) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uploaded = await new Promise<any>((resolve, reject) => {
          cloudinary.uploader
            .upload_stream({ folder: "products/extra" }, (error, result) => {
              if (error) reject(error);
              else resolve(result);
            })
            .end(buffer);
        });

        newProductImages.push(uploaded.secure_url);
      }
    }

    if (newProductImages.length > 0) {
      product.productImage = newProductImages;
    }

    try {
      product.whatis = JSON.parse((formData.get("whatis") as string) || "[]");
    } catch {}
    try {
      product.benefits = JSON.parse((formData.get("benefits") as string) || "[]");
    } catch {}
    try {
      product.FAQ = JSON.parse((formData.get("FAQ") as string) || "[]");
    } catch {}
    try {
      product.Result = JSON.parse((formData.get("Result") as string) || "[]");
    } catch {}
    try {
      product.customerTestimonials = JSON.parse(
        (formData.get("customerTestimonials") as string) || "[]"
      );
    } catch {}

    await product.save();

    return NextResponse.json({ success: true, data: product }, { status: 200 });
  } catch (err: any) {
    console.error("Update error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to update product" },
      { status: 500 }
    );
  }
}


export async function DELETE(req: NextRequest) {
  try {
    await dbConnect();
    const url = new URL(req.url);
    const parts = url.pathname.split("/");
    const id = parts[parts.length - 1];

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Product ID is required" },
        { status: 400 }
      );
    }

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    const deleteCloudinaryFile = async (fileUrl: string) => {
      if (!fileUrl) return;

      try {
        const parts = fileUrl.split("/");
        const filename = parts[parts.length - 1];
        const publicId = filename.split(".")[0]; 

        await cloudinary.uploader.destroy(publicId);
      } catch (err) {
        console.error("image delete error:", err);
      }
    };

    if (Array.isArray(product.mainImage)) {
      for (const img of product.mainImage) {
        await deleteCloudinaryFile(img);
      }
    } else {
      await deleteCloudinaryFile(product.mainImage);
    }

    if (Array.isArray(product.productImage)) {
      for (const img of product.productImage) {
        await deleteCloudinaryFile(img);
      }
    } else {
      await deleteCloudinaryFile(product.productImage);
    }

    return NextResponse.json({
      success: true,
      message: "Product images deleted successfully",
    });
  } catch (error: any) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}

