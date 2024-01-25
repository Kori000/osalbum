# osalbum

<div align="left">

[![npm version](https://img.shields.io/npm/v/osalbum.svg?style=flat-square)](https://www.npmjs.org/package/osalbum)

</div>

👀 [中文文档](https://github.com/Kori000/osalbum/blob/main/README_Zh.md)

## Feature

- Tinymce Plugin - Album management

### Description

- Tinymce version support: 5.0.4+
- Supported language: Simplified Chinese
- Repo Author: Kori

### Usage

- Put this repo folder(osalbum) in the plugins folder under the TinyMCE home directory

- Example path: **public/tinymce/plugins/osalbum**

- In your component page:
  - **osalbum_options** configuration of osalbum
  - `osalbum_paging_img_list(showImageListFn, finish, flag){}` necessary functions
    - **showImageListFn** receive string[] (url array), echo to list `showImageListFn(['http://1xxx.png','http://2xxx.png','http://3xxx.png'])`
    - **finish** after execution, the interface will no longer be requested `finish()`
    - **flag** debounce function, ` flag(false)`/ `flag(true)`
  - `destroy()` callback function after the plugin is closed
  - The data structure returned by the following example interface is

```json
{
  "code": 200,
  "msg": "OK",
  "data": {
    "list": [
      "https://api.iconify.design/logos:apple-app-store.svg?color=%23888888&width=130",
      "https://api.iconify.design/logos:spotify-icon.svg?color=%23888888&width=130",
      "https://api.iconify.design/noto-v1:pineapple.svg?color=%23888888&width=130",
      "https://api.iconify.design/logos:apple-app-store.svg?color=%23888888&width=130",
      "https://api.iconify.design/logos:android-vertical.svg?color=%23888888&width=130",
      "https://api.iconify.design/skill-icons:discord.svg?color=%23888888&width=130",
      "https://api.iconify.design/mdi:nintendo-switch.svg?color=%23888888&width=130",
      "https://api.iconify.design/skill-icons:discord.svg?color=%23888888&width=130",
      "https://api.iconify.design/logos:apple-app-store.svg?color=%23888888&width=130",
      "https://api.iconify.design/logos:android-vertical.svg?color=%23888888&width=130",
      "https://api.iconify.design/logos:android-vertical.svg?color=%23888888&width=130",
      "https://api.iconify.design/skill-icons:discord.svg?color=%23888888&width=130",
      "https://api.iconify.design/logos:android-vertical.svg?color=%23888888&width=130",
      "https://api.iconify.design/logos:spotify-icon.svg?color=%23888888&width=130",
      "https://api.iconify.design/logos:android-vertical.svg?color=%23888888&width=130",
      "https://api.iconify.design/mdi:nintendo-switch.svg?color=%23888888&width=130",
      "https://api.iconify.design/logos:spotify-icon.svg?color=%23888888&width=130",
      "https://api.iconify.design/logos:spotify-icon.svg?color=%23888888&width=130",
      "https://api.iconify.design/mdi:nintendo-switch.svg?color=%23888888&width=130",
      "https://api.iconify.design/logos:spotify-icon.svg?color=%23888888&width=130"
    ]
  },
  "total_page": 11,
  "total": 204
}
```

## Init

```js
 initTinymce() {

      window.tinymce.init({
        osalbum_options: {
          // 请求参数
          fromData: {
            page: 1,
            size: 20,
          },
          // 接口返回的总条数
          total: 0,
          async osalbum_paging_img_list(
            showImageListFn: (p: string[]) => void,
            finish: () => void,
            flag: (b: boolean) => void,
          ) {
            flag(false)
            const res = await fetch(
              `http://127.0.0.1:3000/image-list?page=${this.fromData.page}&size=${this.fromData.size}`,
              {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': '*',
                },
              },
            ).then(response => {
              return response.json()
            })

            this.total = res.total
            if (this.fromData.page * this.fromData.size >= this.total) {
              finish()
            }
            this.fromData.page = Number(this.fromData.page) + 1
            const apiList = res.data.list
            showImageListFn(apiList)
            flag(true)
          },
          destroy() {
            this.fromData = {
              page: 1,
              size: 20,
            }
            this.total = 0
          },
        },
      })
    },
```
