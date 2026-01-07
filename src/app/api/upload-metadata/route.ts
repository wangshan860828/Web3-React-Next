// app/api/upload-metadata/route.ts

import { NextRequest, NextResponse } from "next/server";
import { pinata } from "@/utils/config";

interface MetadataRequest {
  name: string;
  description: string;
  imageUrl: string;
}

export async function POST(request: NextRequest) {
  try {
    // 1. 从请求体中获取 JSON 数据
    const data = await request.formData();
    console.log("api/upload-metadata route POST data = ", data);
    const name = data.get("name") as string;
    const description = data.get("description") as string;
    const imageUrl = data.get("imageUrl") as string;

    // 基础验证
    if (!name || !description || !imageUrl) {
      return NextResponse.json(
        { error: "Missing required fields: name, description, or imageUrl" },
        { status: 400 }
      );
    }

    // 2. 在服务器上动态构建 Metadata JSON 对象
    const nftMetadata = {
      name: name,
      description: description,
      image: imageUrl, // 使用从前端传来的图片 IPFS URL
      // 在这里可以添加更复杂的逻辑，比如动态生成 attributes
      attributes: [
        {
          trait_type: "Created With",
          value: "My NFT Marketplace",
        },
      ],
    };

    // 3. 使用 Pinata SDK 上传 JSON 对象
    // pinata.upload.json() 会自动处理 JSON -> Buffer 的转换
    const { cid } = await pinata.upload.public.json(nftMetadata).name(`${name}-metadata.json`);
    console.log("api/upload-metadata route POST cid = ", cid);
    const url = await pinata.gateways.public.convert(cid);
    console.log("api/upload-metadata route POST url = ", url);
    return NextResponse.json({
      success: true,
      code: 200,
      data: {
        cid: cid,
        url: url,
      },
    });
  } catch (error) {
    console.error("Error uploading metadata to Pinata:", error);
    return NextResponse.json({
      success: false,
      code: 500,
      error: "Failed to upload metadata."
    });
  }
}