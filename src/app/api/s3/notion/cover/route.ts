import { createServer } from "@/app/utils/supabase";

import { NextResponse } from "next/server";
import sharp from "sharp";
import { v4 as uuid } from "uuid";

export async function POST(request: Request) {
  const uuidImageName = uuid();
  const formData = await request.formData();
  const file = formData.get("cover") as File;

  const buffer = await file.arrayBuffer();
  const optimizedImageBuffer = await sharp(Buffer.from(buffer))
    .resize(503, 272) //* 2배수
    .webp({ quality: 90 })
    .toBuffer();
  const optimizedImageFile = new File([optimizedImageBuffer], file.name, {
    type: "image/webp",
  });

  const supabase = await createServer();
  const { data, error } = await supabase.storage
    .from("image")
    .upload(`notion_cover/${uuidImageName}`, optimizedImageFile);
  if (error) {
    console.error("파일이 업로드 되지 않습니다.", error);
    return NextResponse.json(
      { ...error, message: "파일이 업로드 되지 않습니다." },
      { status: 401 }
    );
  }
  const {
    data: { publicUrl },
  } = supabase.storage.from("image").getPublicUrl(`${data?.path}`);

  return NextResponse.json({ publicUrl });
}
