import { Client } from "@notionhq/client";
import {
  DatabaseObjectResponse,
  PageObjectResponse,
  PartialDatabaseObjectResponse,
  PartialPageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

const getBlocks = async (
  notion: Client,
  pages: Array<
    | PageObjectResponse
    | PartialPageObjectResponse
    | PartialDatabaseObjectResponse
    | DatabaseObjectResponse
  >
) => {
  return Promise.all(
    pages.map(async (page) => {
      const response = await notion.blocks.children.list({
        block_id: page.id,
      });

      return response.results;
    })
  );
};

export default getBlocks;
