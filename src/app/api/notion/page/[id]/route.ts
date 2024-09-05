import { Client } from "@notionhq/client";
import { NextApiRequest } from "next";
import { NextRequest } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const {
    type,
    modal: {
      content: { title, progress, date, category, text, cover },
    },
  } = await request.json();

  const block_id = request?.nextUrl.searchParams.get("block_id") || "";

  const notion = new Client({ auth: process.env.NOTION_TOKEN });

  //TODO: 여기서 supabase를 이용해 요청하고 public URL을 받아오면 cover로 넘겨주기

  const progressMap = type === "archive" ? { 진행여부: {} } : "제목";
  //* 여기서 notion API를 Cover 추가
  try {
    const pageResponse = await notion.pages.update({
      page_id: id,
      cover: {
        type: "external",
        external: {
          url: cover,
        },
      },

      properties: {
        [type === "archive" ? "주제" : "제목"]: {
          title: [
            {
              text: {
                content: title,
              },
            },
          ],
        },
        날짜: {
          date: {
            start: date.split("T")[0],
          },
        },

        진행여부:
          type === "archive"
            ? {
                status: {
                  name: progress,
                },
              }
            : {
                select: {
                  name: progress,
                },
              },
        모임유형: {
          select: {
            name: category,
          },
        },
      },
    });

    const blockResponse =
      block_id &&
      (await notion.blocks.update({
        block_id,
        paragraph: {
          rich_text: [
            {
              text: {
                content: text,
              },
            },
          ],
          color: "default",
        },
      }));

    return Response.json({ ok: true });
  } catch (error) {
    console.error(error);
    return Response.json({ ok: false });
  }
}
