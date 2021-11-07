import { Quill } from './custom';
import { DEFAULT_OPTIONS } from './defaults';
import { QuillToolbarItemOptions } from './models';

export class Module {
  quill: Quill;
  options: QuillToolbarItemOptions;
  static DEFAULTS: QuillToolbarItemOptions;
  constructor(quill: Quill, options: QuillToolbarItemOptions) {
    this.quill = quill;
    this.options = Object.assign(DEFAULT_OPTIONS, options);
  }
}
