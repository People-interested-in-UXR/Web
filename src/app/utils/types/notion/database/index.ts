import { IPageProperty, Page } from "../page";

export interface IDatabase {
  id: string;
  props: Array<IPageProperty>;
  pages: Array<Page>;
}
