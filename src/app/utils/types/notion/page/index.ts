interface IEmoji {
  type: "emoji";
  emoji: string;
}
interface IExternalFile {
  type: "external";
  external: {
    url: string;
    expiry_time?: Date;
  };
  // name: string;
  // caption: [];
}

interface DatabaseParent {
  type: "database_id";
  database_id: string;
}

interface PageParent {
  type: "page_id";
  page_id: string;
}

interface WorkspaceParent {
  type: "workspace";
  workspace: boolean;
}

interface BlockParent {
  type: "block_id";
  block_id: string;
}

export type Page = {
  object: "page";
  id: string;
  created_time: Date;
  last_edited_time: Date;
  created_by: IUser;
  last_edited_by: IUser;
  cover: IExternalFile | null;
  icon: IEmoji | null;
  parent: DatabaseParent | PageParent | WorkspaceParent | BlockParent;
  archived: boolean;
  in_trash: boolean;
  properties: IPageProperty;
  url: string;
  public_url: string;
};

export interface IPageProperty {
  [name: string]:
    | ITitle
    | IRichText
    | INumber
    | ISelect
    | IStatus
    | IMultiSelect
    | IDate
    | IRelation
    | IPeople
    | IFile
    | ICheckBox
    | IURL
    | IEmail
    | IPhoneNumber
    | ICreatedTime
    | ILastEditedTime
    | ICreator
    | ILastEditor;
}

type Property = {
  id: string;
};

type IText = {
  [key in ITextType]: ITextBase;
} & ITextContent;

type ITextType = "text" | "mention" | "equation";

interface ITextBase {
  content: string;
  link?: string;
}

interface ITextContent {
  type: ITextType;
  annotations: {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
    color: string;
  };
  plain_text: string;
  href?: string;
}

interface ITitle extends Property {
  type: "title";
  title: Array<IText>;
}

interface IRichText extends Property {
  type: "rich_text";
  rich_text: Array<IText>;
}

interface INumber extends Property {
  type: "number";
  number: number;
}

interface INormalProperty {
  id: string;
  name: string;
  color: string;
}

interface ISelect extends Property {
  type: "select";
  select: INormalProperty;
}

interface IStatus extends Property {
  type: "status";
  status: INormalProperty;
}

interface IMultiSelect extends Property {
  type: "multi_select";
  multi_select: Array<INormalProperty>;
}

interface IDateProperty {
  start: Date;
  end?: Date;
  time_zone?: string;
}
interface IDate extends Property {
  type: "date";
  date: IDateProperty;
}

interface IRelation extends Property {
  type: "relation";
  relation: Array<{ id: string }>;
  has_more: boolean;
}

interface IUser {
  object: "user";
  id: string;
}
interface IPeople extends Property {
  type: "people";
  people: Array<IUser>;
}

interface IFile extends Property {
  type: "files";
  files: Array<IExternalFile>;
}

interface ICheckBox extends Property {
  type: "checkbox";
  checkbox: boolean;
}

interface IURL extends Property {
  type: "url";
  url: string;
}

interface IEmail extends Property {
  type: "email";
  email: string;
}

interface IPhoneNumber extends Property {
  type: "phone_number";
  phone_number: string;
}

interface ICreatedTime extends Property {
  type: "created_time";
  created_time: Date;
}

interface ILastEditedTime extends Property {
  type: "last_edited_time";
  last_edited_time: Date;
}

interface ICreator extends Property {
  type: "created_by";
  created_by: IUser;
}

interface ILastEditor extends Property {
  type: "last_edited_by";
  last_edited_by: IUser;
}
