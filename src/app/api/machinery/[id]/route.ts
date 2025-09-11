import { NextRequest, NextResponse } from "next/server";
import Mongoose from "@/lib/mongoose";
import Machinery from "@/models/Machinery";
import cloudinary from "@/lib/cloudinary";


export async function GET(req: NextRequest) {
  try {
    await Mongoose();

    const url = new URL(req.url);
    const pathname = url.pathname; 
    const parts = pathname.split('/');
    const id = parts[parts.length - 1];

    if (!id) {
      return NextResponse.json({ success: false, message: "ID required" }, { status: 400 });
    }

    const machinery = await Machinery.findById(id);

    if (!Machinery) {
      return NextResponse.json({ success: false, message: "Machinery not found" }, { status: 404 });
    }

    return NextResponse.json(machinery, { status: 200 });
  } catch (err: any) {
    console.error("Fetch error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to fetch machinery" },
      { status: 500 }
    );
  }
}


//update
export async function PUT(req: NextRequest) {
  try {
    await Mongoose();

    const formData = await req.formData();
    const url = new URL(req.url);
    const parts = url.pathname.split("/");
    const id = parts[parts.length - 1];

    const machinery = await Machinery.findById(id);
    if (!machinery) {
      return NextResponse.json(
        { success: false, message: "Machinery not found" },
        { status: 404 }
      );
    }

    machinery.machineryName = (formData.get("machineryName") as string) || machinery.machineryName;
    machinery.brandName = (formData.get("brandName") as string) || machinery.brandName;
    
    const newMachineryImages: string[] = [];
    for (const file of formData.getAll("machineryImage")) {
      if (file instanceof File) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uploaded = await new Promise<any>((resolve, reject) => {
          cloudinary.uploader
            .upload_stream({ folder: "machinery/extra" }, (error, result) => {
              if (error) reject(error);
              else resolve(result);
            })
            .end(buffer);
        });

        newMachineryImages.push(uploaded.secure_url);
      }
    }

    if (newMachineryImages.length > 0) {
      machinery.machineryImage = newMachineryImages;
    }

    await machinery.save();

    return NextResponse.json({ success: true, data: machinery }, { status: 200 });
  } catch (err: any) {
    console.error("Update error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to update machinery" },
      { status: 500 }
    );
  }
}


export async function DELETE(req: NextRequest) {
  try {
    await Mongoose();
    const url = new URL(req.url);
    const parts = url.pathname.split("/");
    const id = parts[parts.length - 1];

    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID is required" },
        { status: 400 }
      );
    }

    const machinery = await Machinery.findByIdAndDelete(id);

    if (!machinery) {
      return NextResponse.json(
        { success: false, message: "Machinery not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Machinery images deleted successfully",
    });
  } catch (error: any) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}

