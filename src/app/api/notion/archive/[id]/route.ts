import { getBlocks } from "@/app/_domain/blocks";
import { NOTION } from "@/app/utils/consts";

import { Client } from "@notionhq/client";
import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";
import { revalidateTag } from "next/cache";

//? MEMO: 새로운 명세 기반으로 수정할 것
export async function GET(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  const [start, end] = [
    parseInt(
      request?.url ? new URL(request?.url).searchParams.get("start") ?? "" : ""
    ),
    parseInt(
      request?.url ? new URL(request?.url).searchParams.get("end") ?? "" : ""
    ),
  ];
  const { id } = params;

  const notion = new Client({ auth: process.env.NOTION_TOKEN });

  const init: QueryDatabaseResponse = await notion.databases.query({
    database_id: id,
    page_size: start && start - 1,
  });

  //* 필요한 부분만 가져오기
  const { results, has_more, next_cursor }: QueryDatabaseResponse =
    await notion.databases.query({
      database_id: id,
      page_size: end && start && end - start + 1,
      start_cursor: init?.next_cursor ? init?.next_cursor : undefined,
    });

  //* Block Contents 추츨
  //! 평균 5초 정도 소요
  const blocks = await getBlocks(notion, results);

  const pages = Array.from({ length: results.length }).map((_, i) => {
    return {
      ...results[i],
      contents: blocks[i],
    };
  });

  return Response.json({ pages, has_more });
}

export async function POST(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;

  const { id } = params;

  const notion = new Client({ auth: process.env.NOTION_TOKEN });

  const {
    modal: {
      user,
      content: { title, progress, date, category, text, cover },
    },
  } = await request.json();

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
        주제: {
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
        진행여부: {
          status: {
            name: progress,
          },
        },
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

    revalidateTag(NOTION.KEY.ARCHIVE);
    return Response.json({ ok: true });
  } catch (error) {
    console.error(error);
    return Response.json({ ok: false });
  }
}
