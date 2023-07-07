tinymce.PluginManager.add('osalbum', function (editor, url) {
  var pluginName = '相册管理'
  window.osalbum = {} //扔外部公共变量，也可以扔一个自定义的位置

  var baseURL = tinymce.baseURL
  var iframe1 = baseURL + '/plugins/osalbum/index.html'
  osalbum.osalbum_options = editor.getParam('osalbum_options', undefined, 'Object')

  osalbum.selected_img_url = []

  var openDialog = function () {
    return editor.windowManager.openUrl({
      title: pluginName,
      size: 'large',
      url: iframe1,
      buttons: [
        {
          type: 'cancel',
          text: 'Close'
        },
        {
          type: 'custom',
          text: 'Save',
          name: 'save',
          primary: true
        }
      ],
      onAction: function (api, details) {
        switch (details.name) {
          case 'save':
            var html = ''
            var imgs = osalbum.selected_img_url
            var len = imgs.length
            for (let i = 0; i < len; i++) {
              if (imgs[i]) {
                html += '<img src="' + imgs[i] + '" />'
              }
            }
            editor.insertContent(html)
            osalbum.selected_img_url = []
            api.close()
            break

          default:
            break
        }
      },
      onClose: function () {
        osalbum.osalbum_options.destroy()
      }
    })
  }

  editor.ui.registry.getAll().icons.osalbum ||
    editor.ui.registry.addIcon(
      'osalbum',
      '<svg t="1688698043589" class="icon" width="26" height="26" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6258" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M105.232 637.68c-3.16 9.392-1.232 19.352 6.768 25.552v-44.016c-8 10.24-6.256 16.952-6.768 18.464z" fill="#020202" p-id="6259"></path><path d="M936 875.288H88a24 24 0 0 1-24-24V172.712a24 24 0 0 1 24-24h848a24 24 0 0 1 24 24v678.576a24 24 0 0 1-24 24z m-824-48h800V196.712H112v630.576z" fill="#020202" p-id="6260"></path><path d="M333.664 424.36c85.824-7.672 162.208 203.264 182.248 277.856a23.816 23.816 0 0 0 22.88 17.776c10.544 0.312 20.232-7.12 23.16-17.52 10.488-37.368 51.728-143.536 102.216-148.168C695.264 551.456 734.584 672 750.712 784h48.48c-9.536-72-46.512-286-139.456-277.496-56.448 5.168-95.856 65.512-119.112 116.344-34.104-96.168-106-255.584-211.344-245.904-73.872 6.776-129.28 76.272-169.28 142.08v109.064c24-71.048 94.056-196.424 173.664-203.728zM710.92 448.216c-50.76 0-92.048-41.32-92.048-92.12 0-50.792 41.288-92.112 92.048-92.112 50.752 0 92.04 41.32 92.04 92.112 0 50.8-41.288 92.12-92.04 92.12z m0-136.224c-24.288 0-44.048 19.792-44.048 44.112 0 24.328 19.76 44.12 44.048 44.12 24.28 0 44.04-19.792 44.04-44.12 0-24.32-19.76-44.112-44.04-44.112z" fill="#020202" p-id="6261"></path></svg>'
    )

  editor.ui.registry.addButton('osalbum', {
    icon: 'osalbum',
    tooltip: pluginName,
    onAction: function () {
      openDialog()
    }
  })
  editor.ui.registry.addMenuItem('osalbum', {
    icon: 'osalbum',
    text: '相册管理',
    onAction: function () {
      openDialog()
    }
  })
  return {
    getMetadata: function () {
      return {
        name: pluginName,
        url: 'http://tinymce.ax-z.cn/more-plugins/osalbum.php'
      }
    }
  }
})
