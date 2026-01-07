import { NextResponse, type NextRequest } from "next/server";
import { pinata } from "@/utils/config"

export async function POST(request: NextRequest) {
  try {
    console.log("api/upload-image route POST request = ", request);
    const data = await request.formData();
    console.log("api/upload-image route POST data = ", data);
    const file: File | null = data.get("file") as unknown as File;
    const { cid } = await pinata.upload.public.file(file)
    console.log("api/upload-image route POST cid = ", cid);
    const url = await pinata.gateways.public.convert(cid);
    console.log("api/upload-image route POST url = ", url);
    return NextResponse.json(url, { status: 200 });
  } catch (e) {
    console.log("api/upload-image route POST error e = ", e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}