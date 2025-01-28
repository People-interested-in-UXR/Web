import { IChip } from "@/app/_ui/_atomics/Board/Board";
import { IPageProperty, ISelect, Page } from "@/app/utils/types/notion/page";

type NotionFetcherTag = "board" | "archive" | "meet-up" | "member";

type GetDatabaseProp = (
  url: string,
  cache: RequestCache,
  tag: NotionFetcherTag
) => Promise<IPageProperty[]>;
export const getDatabaseProp: GetDatabaseProp = async (
  url: string,
  cache: RequestCache = "default",
  tag
) => {
  const { props }: { props: IPageProperty[] } = await (
    await fetch(url, {
      cache,
      headers: { "Content-Type": "application/json" },
      next: { tags: [tag] },
    })
  ).json();

  return props;
};
type V = {
  pages: Page[];
  has_more: boolean;
};
export type GetAllPages = (
  url: string,
  cache: RequestCache,
  tag: NotionFetcherTag
) => Promise<V>;
export const getAllPages: GetAllPages = async (
  url: string,
  cache: RequestCache = "default",
  tag
) => {
  const { pages, has_more }: { pages: Page[]; has_more: boolean } = await (
    await fetch(url, {
      cache,
      headers: { "Content-Type": "application/json" },
      next: { tags: [tag] },
    })
  ).json();

  return { pages, has_more };
};

export const getNotionData = async (
  id: string,
  tag: NotionFetcherTag,
  pagenation?: { start: number; end: number }
) => {
  const props = await getDatabaseProp(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/notion/prop/?database_id=${id}`,
    "force-cache",
    tag
  );
  const { pages, has_more } = await getAllPages(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/notion/${tag}/${id}/?start=${
      pagenation?.start || 1
    }&end=${pagenation?.end || 6}`,
    "force-cache",
    tag
  );

  return {
    props,
    pages,
    has_more,
    id,
  };
};

export const getChips = async <T>(
  id: string,
  tag: NotionFetcherTag
): Promise<Array<IChip<T | "전체">>> => {
  const props = await getDatabaseProp(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/notion/prop/?database_id=${id}`,
    "force-cache",
    tag
  );

  const filterdProps = props.filter(
    (prop) => "select" in prop && prop.name === "모임유형"
  )[0] as Pick<ISelect, "select">;

  const chips: IChip<T | "전체">[] = [
    { category: "전체" },
    ...(filterdProps?.select?.options ?? []).map((option) => ({
      category: option.name as T,
    })),
  ];

  return chips;
};
