import { createServer } from "@/app/utils/supabase";
import { NextResponse } from "next/server";
import { v4 as uuid } from "uuid";

export async function POST(request: Request) {
  const uuidImageName = uuid();
  const formData = await request.formData();
  const file = formData.get("file") as File;

  const supabase = await createServer();
  const { data, error } = await supabase.storage
    .from("image")
    .upload(`profile/${uuidImageName}`, file);
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
