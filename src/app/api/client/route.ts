import Client from "@/models/Client";
import Mongoose from "@/lib/mongoose";
import cloudinary from "@/lib/cloudinary";
import { NextResponse } from "next/server";

export async function GET() {
    try{
        await Mongoose();
        const clients = await Client.find().sort({ uploadedAt: -1 });
        return NextResponse.json({ success: true, data: clients }, {status: 200});
    } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || "Failed to fetch clients" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
    try{
        await Mongoose();
        const formData = await req.formData()
       const clientName = formData.get("clientName") as string;

       
    if (!clientName) {
      return NextResponse.json(
        { success: false, message: "Client name is required" },
        { status: 400 }
      );
    }

     const clientImage: string[] = [];
    for (const file of formData.getAll("clientImage")) {
      if (file instanceof File) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const upload = await new Promise<any>((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "clients/main" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          stream.end(buffer);
        });
        clientImage.push(upload.secure_url);
      }
    }

      const client = new Client({
      clientName,
      clientImage,
    });

    await client.save();
    return NextResponse.json({ success: true, data: client }, { status: 201 });

    } catch (err: any) {
    console.error("Upload error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to save client" },
      { status: 500 }
    );
  }
}


