## jQuery/Zepto 图片预览插件

在线演示地址：https://hehaibao.github.io/img-preview/

### 插件说明：

1. ES6语法，支持jQuery和Zepto；
2. 使用简单，只要在dom元素上加入data-pic原图地址，并引入JS即可；
3. 目前支持单图预览，后期有时间将会加入多图预览；
4. 支持自定义img标签上的字段[大图链接，大图标题，大图描述]；
5. 支持黑色浮层是否展示；
6. 压缩后imgPreview.min.js仅2kb,未压缩文件是6kb；
7. 支持移动端单张预览；
8. 支持gulp压缩js；

### 如何使用？

1. 引入jQuery或Zepto

```javascript
<script src="https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js"></script>
```

2. 引用我写好的默认CSS

```css
<style>
.img-preview-mask{width: 100%;height: 100%;position: fixed;top: 0;left: 0;z-index: 9998;background-color: rgba(0,0,0,.5);}
.img-preview-popover{position: fixed;z-index: 9999;}
.img-preview-foot{width: 96%;padding:0 2%;position: absolute;bottom: 0;background-color: rgba(0,0,0,.5);}
.img-foot-title{font-size: 16px;color: #fff;margin-top: 5px;}
.img-foot-desc{font-size: 12px;color: #fff;margin-top: 5px;line-height: 24px;}
</style>
```

3. 引入imgPreview.min.js, 目录根据你自己项目来;

```javascript
<script src="js/imgPreview.min.js"></script>
```

4. 最后一步 调用

```javascript
<script>
   $(() => $.imgPreview());
</script>
```


-- 插件依赖：

* [jQuery](http://jquery.com/) or [Zepto](http://www.zeptojs.cn/)
