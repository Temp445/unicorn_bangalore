import Mongoose from "@/lib/mongoose";
import cloudinary from "@/lib/cloudinary";
import Instrument from "@/models/Instrument";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await Mongoose();
    const instruments = await Instrument.find();
    return NextResponse.json({ success: true, data: instruments }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await Mongoose();
    const formData = await req.formData();
    const instrumentName = formData.get("instrumentName") as string;
    const brandName = formData.get("brandName") as string;

    if (!instrumentName) {
      return NextResponse.json(
        { success: false, message: "Instrument name is required" },
        { status: 400 }
      );
    }

    const instrumentImage: string[] = [];
    for (const file of formData.getAll("instrumentImage")) {
      if (file instanceof File) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const upload = await new Promise<any>((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "instrument/main" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          stream.end(buffer);
        });
        instrumentImage.push(upload.secure_url);
      }
    }

    const instrument = new Instrument({
      instrumentName,
      brandName,
      instrumentImage,
    });

    await instrument.save();
    return NextResponse.json({ success: true, data: instrument }, { status: 201 });

  } catch (err: any) {
    console.error("Upload error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to save instrument" },
      { status: 500 }
    );
  }
}
