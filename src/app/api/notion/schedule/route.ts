import { Client, iteratePaginatedAPI } from "@notionhq/client";

export async function GET(request: Request) {
  const notion = new Client({ auth: process.env.NOTION_TOKEN });

  const { results } = await notion.databases.query({
    database_id: "2a3a7fdc75d64c4d8251c09354cd572d",
  });

  // const { results } = await notion.blocks.children.list({
  //   block_id: "fab39f5c0f64427c9c986d1fff2c23e9",
  // });

  results.forEach((result: any) => {
    console.log({
      id: result.id,
      ["날짜"]: result.properties["날짜"].date.start,
      ["주제"]: result.properties["주제"].title[0].text.content,
    });
  });

  // results.forEach((result: any) => {
  //   if (result["paragraph"]) {
  //     result["paragraph"]["rich_text"].forEach((block: any) => {
  //       console.log(block.text.content);
  //     });
  //   }

  //   if (result["bulleted_list_item"]) {
  //     result["bulleted_list_item"]["rich_text"].forEach((block: any) => {
  //       console.log(block.text.content);
  //     });
  //   }
  // });

  return Response.json(results);
}
