import { NextRequest, NextResponse } from "next/server";
import Mongoose from "@/lib/mongoose";
import Client from "@/models/Client";
import cloudinary from "@/lib/cloudinary";


export async function GET(req: NextRequest) {
  try {
    await Mongoose();

    const url = new URL(req.url);
    const pathname = url.pathname; 
    const parts = pathname.split('/');
    const id = parts[parts.length - 1];

    if (!id) {
      return NextResponse.json({ success: false, message: "Client ID required" }, { status: 400 });
    }

    const client = await Client.findById(id);

    if (!client) {
      return NextResponse.json({ success: false, message: "Client not found" }, { status: 404 });
    }

    return NextResponse.json(client, { status: 200 });
  } catch (err: any) {
    console.error("Fetch error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to fetch client" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    await Mongoose();

    const formData = await req.formData();
    const url = new URL(req.url);
    const parts = url.pathname.split("/");
    const id = parts[parts.length - 1];

    const client = await Client.findById(id);
    if (!client) {
      return NextResponse.json(
        { success: false, message: "client not found" },
        { status: 404 }
      );
    }

    client.clientName = (formData.get("clientName") as string) || client.clientName;
    
    const newClientImages: string[] = [];
    for (const file of formData.getAll("clientImage")) {
      if (file instanceof File) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uploaded = await new Promise<any>((resolve, reject) => {
          cloudinary.uploader
            .upload_stream({ folder: "clients/extra" }, (error, result) => {
              if (error) reject(error);
              else resolve(result);
            })
            .end(buffer);
        });

        newClientImages.push(uploaded.secure_url);
      }
    }

    if (newClientImages.length > 0) {
      client.clientImage = newClientImages;
    }

    await client.save();

    return NextResponse.json({ success: true, data: client }, { status: 200 });
  } catch (err: any) {
    console.error("Update error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to update client" },
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
        { success: false, message: "Client ID is required" },
        { status: 400 }
      );
    }

    const client = await Client.findByIdAndDelete(id);

    if (!client) {
      return NextResponse.json(
        { success: false, message: "Client not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Client images deleted successfully",
    });
  } catch (error: any) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}

