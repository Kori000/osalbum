# osalbum

[![npm version](https://img.shields.io/npm/v/osalbum.svg?style=flat-square)](https://www.npmjs.org/package/osalbum)

🌏 [English](https://github.com/Kori000/osalbum/blob/main/README.md)

## 功能

- Tinymce 插件 - 相册管理

### 介绍

- Tinymce 版本支持: 5.0.4+
- 支持语言: 简体中文
- 仓库作者: Kori

### 使用

- 将本库文件夹 (osalbum) 放到 TinyMCE 主目录下的 plugins 文件夹内

- 路径样例: **public/tinymce/plugins/osalbum**

- 在你的组件页面中:
  - **osalbum_options** 为 osalbum 的配置
  - `osalbum_paging_img_list(showImageListFn, finish, flag){}` 必要函数
    - **showImageListFn** 接收一个 url 字符串数组, 回显至列表 `showImageListFn(['http://1xxx.png','http://2xxx.png','http://3xxx.png'])`
    - **finish** 执行后将不再请求接口 `finish()`
    - **flag** 防抖函数, `flag(false)`/ `flag(true)`
  - `destroy()` 插件关闭后的回调函数
  - 以下列例子接口返回的数据结构为

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

## 初始化

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
            showImageListFn: (p: string[]) => void, // 传数组, 插件会使用此函数回显
            finish: () => void, // 用来暂停插件请求
            flag: (b: boolean) => void, // 下滚时请求防抖
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
