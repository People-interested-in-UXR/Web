import { Client } from "@notionhq/client";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request?.nextUrl.searchParams;
  const database_id = searchParams.get("database_id") || "";

  const notion = new Client({ auth: process.env.NOTION_TOKEN });

  const { properties } = await notion.databases.retrieve({ database_id });

  //* ex ['진행 상태', '날짜', '모임 유형', '제목']
  const props = Object.keys(properties).map((key: string) => properties[key]);

  return Response.json({ props });
}
