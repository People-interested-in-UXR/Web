export interface NotionBlock {
  id: string;
  type: string;
  created_time: string;
  last_edited_time: string;
  has_children: boolean;
  [key: string]: any; // Additional properties for specific block types
}
