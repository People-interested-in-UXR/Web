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

type GetAllPages = (
  url: string,
  cache: RequestCache,
  tag: NotionFetcherTag
) => Promise<Page[]>;
export const getAllPages: GetAllPages = async (
  url: string,
  cache: RequestCache = "default",
  tag
) => {
  const { pages }: { pages: Page[] } = await (
    await fetch(url, {
      cache,
      headers: { "Content-Type": "application/json" },
      next: { tags: [tag] },
    })
  ).json();

  return pages;
};

export const getNotionData = async (id: string, tag: NotionFetcherTag) => {
  const props = await getDatabaseProp(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/notion/prop/?database_id=${id}`,
    "default",
    tag
  );
  const pages = await getAllPages(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/notion/${tag}/${id}`,
    "default",
    tag
  );

  return {
    props,
    pages,
    id,
  };
};

export const getChips = async (id: string, tag: NotionFetcherTag) => {
  const props = await getDatabaseProp(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/notion/prop/?database_id=${id}`,
    "default",
    tag
  );

  const filterdProps = props.filter(
    (prop) => "select" in prop && prop.name === "모임 유형"
  )[0] as Pick<ISelect, "select">;

  const chips = [
    { category: "전체" },
    ...(filterdProps.select.options ?? []).map((option) => ({
      category: option.name,
    })),
  ];

  return chips;
};
