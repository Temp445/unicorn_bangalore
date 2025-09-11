import Mongoose from "@/lib/mongoose";
import Testimonial from "@/models/Testimonial";
import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function GET(req: NextRequest) {
  try {
    await Mongoose();

    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();

    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID is required" },
        { status: 400 }
      );
    }

    const testimonial = await Testimonial.findById(id);
    if (!testimonial) {
      return NextResponse.json(
        { success: false, message: "Testimonial not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: testimonial },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("GET Error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to fetch testimonial" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    await Mongoose();

    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();

    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID is required" },
        { status: 400 }
      );
    }

    const testimonial = await Testimonial.findById(id);
    if (!testimonial) {
      return NextResponse.json(
        { success: false, message: "Testimonial not found" },
        { status: 404 }
      );
    }

    const formData = await req.formData();
    testimonial.clientName =
      (formData.get("clientName") as string) || testimonial.clientName;
    testimonial.clientRole =
      (formData.get("clientRole") as string) || testimonial.clientRole;
    testimonial.description =
      (formData.get("description") as string) || testimonial.description;

    const uploadedLogos: string[] = [];
    for (const file of formData.getAll("clientLogo")) {
      if (file instanceof File) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const upload: any = await new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream({ folder: "clientLogo/extra" }, (error, result) => {
              if (error) reject(error);
              else resolve(result);
            })
            .end(buffer);
        });
        uploadedLogos.push(upload.secure_url);
      }
    }

    if (uploadedLogos.length > 0) {
      testimonial.clientLogo = uploadedLogos;
    }

    await testimonial.save();

    return NextResponse.json(
      { success: true, data: testimonial },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("PUT Error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to update testimonial" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await Mongoose();

    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();

    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID is required" },
        { status: 400 }
      );
    }

    const testimonial = await Testimonial.findByIdAndDelete(id);

    if (!testimonial) {
      return NextResponse.json(
        { success: false, message: "Testimonial not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Testimonial deleted successfully" },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("DELETE Error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to delete testimonial" },
      { status: 500 }
    );
  }
}
