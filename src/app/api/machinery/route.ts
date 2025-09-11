import Mongoose from "@/lib/mongoose"
import cloudinary from "@/lib/cloudinary"
import Machinery from "@/models/Machinery"
import { NextResponse } from "next/server";

export async function GET() {
    try{
        await Mongoose();
        const machinery = await Machinery.find()
        return NextResponse.json ({success: true, data: machinery}, {status: 200})

    }catch (err: any){
        return NextResponse.json ({success: false, message: err.message}, {status: 500})
    }
}


//create
export async function POST(req: Request) {
    try{
        await Mongoose();
        const formData = await req.formData()
       const machineryName = formData.get("machineryName") as string;
       const brandName = formData.get("brandName") as string;
        
    if (!machineryName) {
      return NextResponse.json(
        { success: false, message: "Machinery name is required" },
        { status: 400 }
      );
    }

     const machineryImage: string[] = [];
    for (const file of formData.getAll("machineryImage")) {
      if (file instanceof File) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const upload = await new Promise<any>((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "machinery/main" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          stream.end(buffer);
        });
        machineryImage.push(upload.secure_url);
      }
    }

      const machinery = new Machinery({
      machineryName,
      brandName,
      machineryImage,
    });

    await machinery.save();
    return NextResponse.json({ success: true, data: machinery }, { status: 201 });

    } catch (err: any) {
    console.error("Upload error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to save machinery" },
      { status: 500 }
    );
  }
}