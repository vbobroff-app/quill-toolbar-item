import { Quill } from './custom';
import { DEFAULT_OPTIONS } from './defaults';
import { ClickEventArgs, DataItem, QuillToolbarItemOptions } from './models';
import { Module } from './module';

class ToolbarItemModule extends Module {
  public selection = '';
  public isActive = false;
  public isExpanded = false;

  constructor(quill: Quill, options: QuillToolbarItemOptions) {
    super(quill, options);
    this.quill = quill;

    const { toolbarKey } = options;
    const containers = document.getElementsByClassName(`ql-${toolbarKey}`);

    if (!(containers && options?.button)) return;

    const { button } = options;
    const buttonIcon = typeof button === 'string' ? button : button.icon;
    const buttonTitle = (button as DataItem)?.title;

    if (!buttonIcon) return;

    const items = options.items ?? {};
    const icons: { [key: string]: string } = Object.keys(items).reduce((previous, current) => {
      const item = items[current];
      const value = typeof item === 'string' ? item : item.icon;
      return { ...previous, [current]: value };
    }, {});

    const titles: { [key: string]: string } = Object.keys(items).reduce((previous, current) => {
      const item = items[current];
      const value = typeof item === 'string' ? '' : item.title;
      return { ...previous, [current]: value ?? '' };
    }, {});

    [].slice.call(containers).forEach((container: Element) => {
      const label = container.querySelector('.ql-picker-label');
      if (label) {
        container.classList.add('ql-icon-picker');
      }

      const { clickHandler } = options;
      const elementToLabel = label ? label : container;
      elementToLabel.innerHTML = buttonIcon;
      if (buttonTitle) {
        elementToLabel.setAttribute('title', buttonTitle);
      }

      const e: ClickEventArgs = { toolbarKey };

      (elementToLabel as HTMLElement).onclick = !label
        ? () => {
            if (options.isToggled) {
              this.isActive = !this.isActive;
              if (this.isActive) {
                elementToLabel.classList.add('ql-active');
              } else {
                elementToLabel.classList.remove('ql-active');
              }
            }
            if (clickHandler) {
              clickHandler({ ...e, element: 'button', isActive: this.isActive });
            }
          }
        : () => {
            this.isExpanded = container.classList.contains('ql-expanded');
            if (clickHandler) {
              clickHandler({ ...e, element: 'button', isExpanded: this.isExpanded });
            }
          };

      const { saveSelection } = options;
      const { collapseByClick } = options;
      const optionsElement = container.querySelector('.ql-picker-options');
      if (optionsElement) {
        Array.from(optionsElement.querySelectorAll('.ql-picker-item')).forEach((item) => {
          const span = item as HTMLSpanElement;
          const key = span.getAttribute('data-value') || '';
          const title = titles[key];
          if (title) {
            span.setAttribute('title', titles[key]);
          }
          span.innerHTML = icons[key];
          if (!saveSelection) {
            span.classList.remove('ql-selected');
          }
          span.onclick = () => {
            if (!collapseByClick) {
              container.classList.add('ql-expanded');
              label?.setAttribute('aria-expanded', 'true');
              optionsElement.setAttribute('aria-hidden', 'false');
            }
            if (saveSelection) {
              span.classList.add('ql-selected');
              this.selection = key;
            }

            if (clickHandler) {
              clickHandler({ ...e, element: key, isActive: saveSelection });
            }
          };
        });
      }
    });
  }
}

ToolbarItemModule.DEFAULTS = DEFAULT_OPTIONS;

export default ToolbarItemModule;
