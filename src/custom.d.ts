export declare class Quill {
  static import<T>(pathName: string): T;
  static register(path: string | any, target?: any, overwrite?: any): void;
  root: HTMLElement;
  scrollingContainer: HTMLElement;
  getModule<T>(name: string): T;
  addContainer(container: HTMLDivElement | string, refNode?: any): HTMLDivElement;
}
