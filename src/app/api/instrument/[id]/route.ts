import { NextRequest, NextResponse } from "next/server";
import Mongoose from "@/lib/mongoose";
import Instrument from "@/models/Instrument";
import cloudinary from "@/lib/cloudinary";

export async function GET(req: NextRequest) {
  try {
    await Mongoose();

    const url = new URL(req.url);
    const parts = url.pathname.split("/");
    const id = parts[parts.length - 1];

    if (!id) {
      return NextResponse.json({ success: false, message: "ID required" }, { status: 400 });
    }

    const instrument = await Instrument.findById(id);

    if (!instrument) {
      return NextResponse.json({ success: false, message: "Instrument not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: instrument }, { status: 200 });
  } catch (err: any) {
    console.error("Fetch error:", err);
    return NextResponse.json({ success: false, message: err.message || "Failed to fetch instrument" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    await Mongoose();

    const formData = await req.formData();
    const url = new URL(req.url);
    const parts = url.pathname.split("/");
    const id = parts[parts.length - 1];

    const instrument = await Instrument.findById(id);
    if (!instrument) {
      return NextResponse.json({ success: false, message: "Instrument not found" }, { status: 404 });
    }

    instrument.instrumentName = (formData.get("instrumentName") as string) || instrument.instrumentName;
    instrument.brandName = (formData.get("brandName") as string) || instrument.brandName;

    const newInstrumentImages: string[] = [];
    for (const file of formData.getAll("instrumentImage")) {
      if (file instanceof File) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uploaded = await new Promise<any>((resolve, reject) => {
          cloudinary.uploader
            .upload_stream({ folder: "instrument/extra" }, (error, result) => {
              if (error) reject(error);
              else resolve(result);
            })
            .end(buffer);
        });

        newInstrumentImages.push(uploaded.secure_url);
      }
    }

    if (newInstrumentImages.length > 0) {
      instrument.instrumentImage = newInstrumentImages;
    }

    await instrument.save();
    return NextResponse.json({ success: true, data: instrument }, { status: 200 });

  } catch (err: any) {
    console.error("Update error:", err);
    return NextResponse.json({ success: false, message: err.message || "Failed to update instrument" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await Mongoose();
    const url = new URL(req.url);
    const parts = url.pathname.split("/");
    const id = parts[parts.length - 1];

    if (!id) {
      return NextResponse.json({ success: false, message: "ID is required" }, { status: 400 });
    }

    const instrument = await Instrument.findByIdAndDelete(id);

    if (!instrument) {
      return NextResponse.json({ success: false, message: "Instrument not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Instrument deleted successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("Delete error:", error);
    return NextResponse.json({ success: false, error: error.message || "Something went wrong" }, { status: 500 });
  }
}
