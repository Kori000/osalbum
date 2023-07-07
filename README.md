# osalbum

👀 [中文文档](https://github.com/Kori000/osalbum/blob/main/README_Zh.md)

## Feature

- Tinymce Plugin - Album management

### Description

- Tinymce version support: 5.0.4+
- Supported language: Simplified Chinese
- Repo Author: Kori

### Usage

- Put this repo folder(osalbum) in the plugins folder under the TinyMCE home directory

- Example path: **public/js/tinymce/plugins/osalbum**

- In your component page:
  - **osalbum_options** configuration of osalbum
  - `osalbum_paging_img_list(showImageList, finish, flag){}` necessary functions
    - **showImageList** receive string[] (url array), echo to list `showImageList(['http://1xxx.png','http://2xxx.png','http://3xxx.png'])`
    - **finish** after execution, the interface will no longer be requested `finish()`
    - **flag** 防抖函数, ` flag(false)`/ `flag(true)`
  - `destroy()` callback function after the plugin is closed

## Init

```js
 initTinymce() {
      const _this = this
      window.tinymce.init({
        selector: `#tinymceId`,
        plugins: 'osalbum',
        toolbar: [
          'osalbum'
        ],
        width: '100%',
        statusbar: false,
        osalbum_options: {
          fromData: {
            page: 1,
            size: 20
          },
          total: 0,
          async osalbum_paging_img_list(showImageList, finish, flag) {
            flag(false)
            const res = await fetch(
              `http://xxxxxx/images/list?page=${this.fromData.page}&size=${this.fromData.size}`,
              {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': '*'
                }
              }
            ).then((rsp) => {
              return rsp.json()
            })

            this.total = res.data.total
            if (this.fromData.page * this.fromData.size >= this.total) {
              finish()
            }
            this.fromData.page = +res.data.page + 1
            const apiList = res.data.list.map((item) => item.url)
            showImageList(apiList)
            flag(true)
          },
          destroy() {
            this.fromData = {
              page: 1,
              size: 20
            }
            this.total = 0
          }
        },
      })
    },
```
