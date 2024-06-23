import { IPageProperty } from "@/app/utils/types/notion/page";
import {
  DatabaseObjectResponse,
  PageObjectResponse,
  PartialDatabaseObjectResponse,
  PartialPageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

const getProperty = (
  array: Array<
    | PageObjectResponse
    | PartialPageObjectResponse
    | PartialDatabaseObjectResponse
    | DatabaseObjectResponse
  >
) => {
  return array.map((item) => {
    if ("properties" in item && item["properties"]) {
      const { id, properties } = item;
      return {
        id,
        properties,
      };
    } else {
      return item;
    }
  });
};

export default getProperty;
