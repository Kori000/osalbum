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

- 路径样例: **public/js/tinymce/plugins/osalbum**

- 在你的组件页面中:
  - **osalbum_options** 为 osalbum 的配置
  - `osalbum_paging_img_list(showImageList, finish, flag){}` 必要函数
    - **showImageList** 接收一个 url 字符串数组, 回显至列表 `showImageList(['http://1xxx.png','http://2xxx.png','http://3xxx.png'])`
    - **finish** 执行后将不再请求接口 `finish()`
    - **flag** 防抖函数, ` flag(false)`/ `flag(true)`
  - `destroy()` 插件关闭后的回调函数

## 初始化

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
