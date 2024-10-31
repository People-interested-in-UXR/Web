import { getBlocks } from "@/app/_domain/blocks";
import { Client } from "@notionhq/client";
import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";

//? MEMO: 새로운 명세 기반으로 수정할 것
export async function GET(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;

  const {
    id
  } = params;

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

export async function POST(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;

  const {
    id
  } = params;

  const {
    modal: {
      user,
      content: { title, progress, date, category, text, cover },
    },
  } = await request.json();

  const notion = new Client({ auth: process.env.NOTION_TOKEN });

  //TODO: 여기서 supabase를 이용해 요청하고 public URL을 받아오면 cover로 넘겨주기

  //* 여기서 notion API를 Cover 추가
  try {
    await notion.pages.create({
      parent: {
        type: "database_id",
        database_id: id,
      },

      cover: {
        type: "external",
        external: {
          url: cover,
        },
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
        "작성자 이메일": { email: user },
        날짜: {
          date: {
            start: date.split("T")[0],
          },
        },
        // 진행여부: {
        //   select: {
        //     name: progress,
        //   },
        // },
        모임유형: {
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
