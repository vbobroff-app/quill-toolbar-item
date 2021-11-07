# quill-toolbar-item
Module for [Quill.js](https://github.com/quilljs/quill) editor toolbar. With this module you can add a custom button or selector. You only need to send the content of the icons in stringify html format.

![Screenshot](/assets/images/toolbar.png)

## How to install

```sh
npm i quill-toolbar-item
```

```sh
yarn add quill-toolbar-item
```

## How to use
You need to do through three easy steps : 
  1) register your module in Quill 
  2) configure quill toolbar options 
  3) configure quill modules options. 
### STEP1 Register module
```sh
import Quill from 'quill';
import ToolbarItem from 'quill-toolbar-item';
..
Quill.register('modules/toolbar-custom-button', ToolbarItem);
Quill.register('modules/toolbar-custom-selector', ToolbarItem);
```
### STEP2 Configure toolbar
```javascript
  const itemIcons = {
    tableBorderAll,
    tableBorderBottom,
    tableBorderLeft,
    tableBorderNone,
    tableBorderOutside,
    tableBorderRight,
    tableBorderTop,
  }
..
const toolbarOptions = {
  container: [
    ['bold', 'italic', 'underline', 'strike'],
    ['custom-button'],
    [{ 'custom-selector': Object.keys(itemIcons) }]
  ],
  handlers: {
    'custom-button': () => {},
    'custom-selector': () => {}
    }
}
```
The key in the container may be anything, but it should be specified in the modules options.
And itemIcons - is an object with htiml stringify content for the icons in the selector. For exaple you may put
.svg files in assets/icons folder and then to import their:

```javascript
import tableIcon from '!!raw-loader?!src/assets/icons/table.svg';
import tableBorderAll from '!!raw-loader?!src/assets/icons/table-border-all.svg';
import tableBorderBottom from '!!raw-loader?!src/assets/icons/table-border-bottom.svg';
import tableBorderLeft from '!!raw-loader?!src/assets/icons/table-border-left.svg';
import tableBorderNone from '!!raw-loader?!src/assets/icons/table-border-none.svg';
import tableBorderOutside from '!!raw-loader?!src/assets/icons/table-border-outside.svg';
import tableBorderRight from '!!raw-loader?!src/assets/icons/table-border-right.svg';
import tableBorderTop from '!!raw-loader?!src/assets/icons/table-border-top.svg';
```

### STEP3 Configure modules options
```javascript
const quill = new Quill(editor, {
  ..
  modules: {
    ..
    toolbar: toolbarOptions,
    "toolbar-custom-button": customButtonOptions,
    "toolbar-custom-selector": customSelectorOptions,
  }
});
```
In this step you need to configure the modules object by set keys as same name as in registry, and set the values - 
'magic' customButtonOptions, customSelectorOptions objects.  
These options have the following interface:
```javascript
export interface QuillToolbarItemOptions {
  toolbarKey: string;
  isToggled?: boolean;
  button?: DataItem | string;
  items?: { [key: string]: DataItem | string };
  saveSelection?: boolean;
  collapseByClick?: boolean;
  clickHandler?: (key: ClickEventArgs) => void;
}

export interface DataItem {
  icon: string;
  title: string;
}

export interface ClickEventArgs {
  toolbarKey: string;
  element?: string;
  isActive?: boolean;
  isExpanded?: boolean;
}
```
It simple in the button case:
```javascript
customButtonOptions = { 
  toolbarKey: 'item',
  isToggled: true,
  button: { icon: tableIcon, title: 'Table' },
  clickHandler: (e) => { console.log(e); },
}
```
And in the selector case you should add the 'items' field:

```javascript
customButtonOptions = { 
  toolbarKey: 'item',
  isToggled: true,
  button: { icon: tableIcon, title: 'Table' },
  items: {
    tableBorderAll: {
      icon: tableBorderAll,
      title: 'BorderAll'
    },
    tableBorderBottom: {
      icon: tableBorderBottom,
      title: 'BorderBottom'
    },
    tableBorderLeft,
    tableBorderNone,
    tableBorderOutside,
    tableBorderRight,
    tableBorderTop,
  },
  clickHandler: (e) => { console.log(e); },
  collapseByClick: false,
  saveSelection: false,
}
```

I will publish life demo somelater)


