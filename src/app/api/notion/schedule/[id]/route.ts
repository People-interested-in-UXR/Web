import { Client } from "@notionhq/client";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

//? MEMO: 새로운 명세 기반으로 수정할 것
export async function GET(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;

  const {
    id
  } = params;

  const notion = new Client({ auth: process.env.NOTION_TOKEN });

  const data = await notion.databases.query({
    database_id: id,
  });

  //* Block Contents 추츨

  const pages = Array.from({ length: data?.results.length }).map((_, i) => {
    const result = data?.results[i] as PageObjectResponse;
    return result.properties;
  });

  return Response.json({ pages });
}
