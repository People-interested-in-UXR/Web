import { getBlocks } from "@/app/_domain/blocks";
import { Client } from "@notionhq/client";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export async function GET(
  request: Request,
  { params: { id } }: { params: { id: string } }
) {
  const notion = new Client({ auth: process.env.NOTION_TOKEN });

  const { results } = await notion.databases.query({
    database_id: id,
  });

  //* Block Contents 추츨

  const pages = Array.from({ length: results.length }).map((_, i) => {
    const result = results[i] as PageObjectResponse;
    return result.properties;
  });

  return Response.json({ pages });
}
