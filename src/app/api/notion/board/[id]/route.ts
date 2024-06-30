import { getBlocks } from "@/app/_domain/blocks";

import { Client } from "@notionhq/client";
import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";

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

export async function POST() {
  return Response.json({ ok: true });
}
