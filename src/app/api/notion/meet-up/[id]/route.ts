import { getBlocks } from "@/app/_domain/blocks";
import { Client } from "@notionhq/client";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

//? MEMO: 새로운 명세 기반으로 수정할 것
export async function GET(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;

  const { id } = params;

  const notion = new Client({ auth: process.env.NOTION_TOKEN });

  const { results } = await notion.databases.query({
    database_id: id,
  });

  //* Block Contents 추츨
  const blocks = await getBlocks(notion, results);

  const pages = [...results]
    .filter((result, i) => {
      const property = (result as PageObjectResponse).properties?.["모임유형"];
      const meetingCategory =
        property?.type === "select" ? property.select?.name : null;

      return meetingCategory === "오프라인" || meetingCategory === "컨퍼런스";
    })
    .map((result, i) => {
      return {
        ...result,
        contents: blocks[i],
      };
    });

  return Response.json({ pages });
}
