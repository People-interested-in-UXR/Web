import { getProperty } from "@/app/_domain/pages";
import { Client, iteratePaginatedAPI } from "@notionhq/client";
import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";

export async function GET(request: Request) {
  console.log(request);
  const notion = new Client({ auth: process.env.NOTION_TOKEN });

  const { results }: QueryDatabaseResponse = await notion.databases.query({
    database_id: "2a3a7fdc75d64c4d8251c09354cd572d",
  });

  const properties = getProperty(results);

  // const { results } = await notion.blocks.children.list({
  //   block_id: "fab39f5c0f64427c9c986d1fff2c23e9",
  // });

  results.forEach((result: any) => {
    console.log(result);
  });

  results.forEach((result: any) => {
    if (result["paragraph"]) {
      result["paragraph"]["rich_text"].forEach((block: any) => {
        console.log(block.text.content);
      });
    }

    if (result["bulleted_list_item"]) {
      result["bulleted_list_item"]["rich_text"].forEach((block: any) => {
        console.log(block.text.content);
      });
    }
  });

  return Response.json({ ...properties });
}
