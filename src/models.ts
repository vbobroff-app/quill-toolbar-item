export interface DataItem {
  icon: string;
  title: string;
}

export interface QuillToolbarItemOptions {
  toolbarKey: string;
  isToggled?: boolean;
  button?: DataItem | string;
  items?: { [key: string]: DataItem | string };
  saveSelection?: boolean;
  collapseByClick?: boolean;
  clickHandler?: (key: ClickEventArgs) => void;
}

export interface ClickEventArgs {
  toolbarKey: string;
  element?: string;
  isActive?: boolean;
  isExpanded?: boolean;
}
