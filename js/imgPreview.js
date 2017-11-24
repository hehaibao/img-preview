/**
 * @desc 图片预览插件
 * @author haibao[http://www.hehaibao.com/]
 */
;($ => {
    $.imgPreview = options => new imgPreview(options);
    class imgPreview {
        constructor(options) {
            this.init(options);
        }
        init(options) {
            //默认配置
            this.config = $.extend(true, {}, {
                el: '[data-pic]', //需要预览的元素
                attr: 'data-pic', //需要预览的原图地址
                attrTitle: 'data-pic-title', //图片标题
                attrDesc: 'data-pic-desc', //图片描述
                mode: 'single', //预览模式，默认 - single: 单图模式; multiple: 多图模式（TODO）;
                isMaskShow: true //是否显示遮罩层
            }, options);
            
            //核心业务 点击图片预览
            this.allDom().each((i ,item) => {
                let _self = this;
                $(item).off('click').on('click', (event) => _self.preview(item));
            });
        }
        preview(item) {
            let _self = this;
            let $win = $(window);
            let $body = $('body');
            let screenW = $win.width();
            let screenH = $win.height();
            let $item = $(item);
            // 获取缓存在自定义属性中的数据, 即：大图地址，标题，描述
            let picUrl = $item.attr(_self.config.attr);
            let picTitle = $item.attr(_self.config.attrTitle);
            let picDesc = $item.attr(_self.config.attrDesc);
            
            //设置窗口初始位置
            let initY = event.clientY;
            let initX = event.clientX;

            //创建 预览遮罩
            _self.imgPreviewMask = $('<div class="img-preview-mask"></div>');
            //创建 弹出预览窗口
            _self.imgPreviewPopover = $(`<div class="img-preview-popover" style="top: ${initY}px;left: ${initX}px;"></div>`);
            //创建 弹出预览窗口 内容盒子
            _self.imgPreviewBox = $('<div class="img-preview-box"></div>');
            //创建 弹出预览窗口 底部 标题、描述 盒子
            _self.imgPreviewFoot = $('<div class="img-preview-foot"></div>');

            //创建预览图
            if(_self.config.mode === 'single') {
                //单图模式
                let img = new Image();
                let createPic = ((w, h) => {
                    w = w >= screenW ? screenW - 40 : w;
                    h = h >= screenH ? screenH - 40 : h; //防止图片超出屏幕宽高

                    _self.imgPreviewBox.append($(`<img src="${picUrl}"/>`))
                        .click(() => {
                            _self.hide();
                        });

                    //验证是否需要遮罩层
                    if(_self.config.isMaskShow) {
                        //创建一个遮罩层
                        $body.append(_self.imgPreviewMask);
                        //点击遮罩层关闭
                        _self.imgPreviewMask.click(() => {
                            _self.hide();
                        });
                    }

                    //验证是否传入标题
                    if(_self.config.attrTitle) {
                        //创建标题
                        _self.imgPreviewFoot.append($(`<div class="img-foot-title">${picTitle || ''}</div>`));
                    }

                    //验证是否传入描述
                    if(_self.config.attrDesc) {
                        //创建描述
                        _self.imgPreviewFoot.append($(`<div class="img-foot-desc">${picDesc || ''}</div>`));
                    }

                    //添加内容
                    _self.imgPreviewPopover.append(_self.imgPreviewBox).append(_self.imgPreviewFoot);
                    $body.append(_self.imgPreviewPopover);

                    //执行动画 兼容zepto不支持animate
                    if($.fn && $.fn.jquery) {
                        _self.imgPreviewPopover.css({
                            width: w,
                            height: h,
                        }).animate({
                            top: (screenH - h) / 2,
                            left: (screenW - w ) / 2
                        }, 300);
                    } else {
                        _self.imgPreviewPopover.css({
                            width: w,
                            height: h,
                            top: (screenH - h) / 2,
                            left: (screenW - w ) / 2
                        });
                    }
                    
                });
                img.onload = (() => {
                    //图片下载完毕时异步调用callback函数
                    img.onload = null;
                    createPic(img.width, img.height);
                });
                img.onerror = (() => {
                    //图片加载失败
                    alert('很抱歉，图片加载失败！');
                    return;
                });
                img.src = picUrl;
            }
        }
        hide() {
            //关闭预览图
            this.imgPreviewMask.remove();
            this.imgPreviewPopover.remove();
        }
        allDom() {
            //获取所有元素
            return $(this.config.el);
        }
    }
})(window.Zepto || window.jQuery);