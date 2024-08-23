import { getBlocks } from "@/app/_domain/blocks";

import { Client } from "@notionhq/client";
import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";

//? MEMO: 새로운 명세 기반으로 수정할 것
export async function GET(
  request: Request,
  { params: { id } }: { params: { id: string } }
) {
  const notion = new Client({ auth: process.env.NOTION_TOKEN });

  const { results }: QueryDatabaseResponse = await notion.databases.query({
    database_id: id,
  });

  //* Block Contents 추츨
  const blocks = await getBlocks(notion, results);

  const pages = Array.from({ length: results.length }).map((_, i) => {
    return {
      ...results[i],
      contents: blocks[i],
    };
  });

  return Response.json({ pages });
}

export async function POST(
  request: Request,
  { params: { id } }: { params: { id: string } }
) {
  const notion = new Client({ auth: process.env.NOTION_TOKEN });
  const {
    content: { title, progress, date, category, text },
  } = await request.json();

  try {
    await notion.pages.create({
      parent: {
        type: "database_id",
        database_id: id,
      },
      properties: {
        제목: {
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
        "진행 상태": {
          select: {
            name: progress,
          },
        },
        "모임 유형": {
          select: {
            name: category,
          },
        },
      },
      children: [
        {
          object: "block",
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
        },
      ],
    });
    return Response.json({ ok: true });
  } catch (error) {
    console.error(error);
    return Response.json({ ok: false });
  }
}
