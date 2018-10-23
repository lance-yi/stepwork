/*
 * layerModel 遮罩层 V1.0.0 
 * Autor: hlf
 * Date: 2015-08-27
 **********************************************************************
 * @example $("#example").layerModel(); 使用layerModel可以轻松的弹出各种层
 * @example yyAlert(“提示语”,callback_OK,"标题")       提示消息框 标题参数 可不填 默认,callback_OK表示点击 “确认” 执行回调方法 可不填 
 * 例子：yyAlert("保存成功！",function(){alert("dddddd");});||yyAlert("保存成功！",ok);
 * @example yyConfirm(“提示语”,callback_OK,callback_CANCEL,"标题") 	 消息确认框 "标题"参数 可不填 默认,
 * callback_OK表示点击 “确认” 执行回调方法 必填，callback_CANCEL 表示点击“取消” 执行回调函数 可不填.
 * 例子：yyConfirm("确认要删除吗？",ok,cancel); //ok是方法，cancel是方法
 * @example layerModelHide(); 			 取消按钮 隐藏 弹出层
 **********************************************************************
 * layerModel参数可配置项：
 ****************************************************************************
 * 	配置项		*	类型		*	默认值	*	描述
 ****************************************************************************
 *
 *	center 			Boolean 	true 		弹出层是否始终居中 （浏览器大小改变居中/拖动滚动条居中）
 *	drag 			Boolean 	true 		拖拽效果	true：启用拖拽效果。false：禁用拖拽效果。
 *	locked 			Boolean 	true 		是否开启遮罩层	true：开启遮罩。false：禁用遮罩。
 *	zIndex 			number 		9999 		弹出层的层级大小
 *	opacity 		number 		0.5 		背景遮罩透明度	0：为完全透明	1：未完全不透明
 *	title 			string 		系统提示 		弹出层的标题
 *	timer 			Number 		0 			定时关闭的时间，大于0才会有效
 *	bgColor 		string 		#fffaf6 	背景遮罩的颜色 （可采用#666,#999,#e5dfda ,#e5e5e5,#ff8800）
 *	width/height 	Number 		0/0 		设置弹出层的宽度和高度，单位为px，传参时无需带单位，建议少用，一般在样式中指定width最好。
 *	close 			Function 	null 		设置关闭弹出层后执行的回调函数，只有返回false才不会关闭。
 *	left/top 		Number 		350/100 	设置弹出层的位置，单位为px，传参时无需带单位，要想让其生效，必须设置fixed:false和center:false。如{"fixed"：false,"center":false,"left":200,"top":100}
 *	head 			Boolean 	true 		是否显示头部title
 *	isClose 		Boolean 	true 		是否出现关闭按钮
 *	shake 			Boolean 	false 		是否出现抖动效果
 *	staySame 		Boolean 	false 		是否保持弹出元素原样，也就是没有插件自己装饰的头部和边框，元素本来啥样就弹出啥样。
 *	init 			function 	null 		初始化弹出层完成后的回调函数！
 *	blurClose 		Boolean 	false 		是否点击弹出层外部空间可将其关闭。
 *
 **********************************************************************/
$(function($) {
    var _dynamicId = "";
    //获取动态拼接id
    var _ydynamicId = "";
    //获取动态拼接id 第一层的 弹出层页面再弹出提示 记住第一级id
    var methods = {
        o:{
            isIe:!-[ 1 ] || document.documentMode >= 9,
            //后面的是判断IE9、IE10的
            ie6:!-[ 1 ] && !window.XMLHttpRequest,
            ie9_10:document.documentMode >= 9,
            bgLayer:"layerModel_mask",
            dataId:"layerModel_main",
            wrapper:"layerModel_wrapper",
            warpperContent:"layerModel_content",
            warpperTitle:"layerModel_title",
            warpperCloseBtn:"layerModel_closeBtn",
            warpperOwnContent:"layerModel_ownContent",
            replaceClose:"replaceClose",
            dragableClass:"dragable",
            defaultWidth:300
        },
        generateId:function() {
            _dynamicId = "_" + new Date().getTime();
            return _dynamicId;
        },
        init:function(data, options) {
            var defaults = {
                center:true,
                locked:true,
                fixed:true,
                drag:true,
                zIndex:9999,
                opacity:"0.5",
                title:"系统提示",
                staySame:false,
                width:0,
                height:0,
                timer:0,
                bgColor:"#e5dfda",
                left:350,
                top:100,
                head:true,
                isClose:true,
                shake:false,
                blurClose:false,
                close:null,
                init:null
            };
            var settings = $.extend({}, defaults, options);
            //将一个空对象做为第一个参数
            var s = this;
            var generateId = s.generateId();
            if (typeof data === "object") {
                data = data instanceof $ ? data :$(data);
                if (settings.staySame) {
                    data = s.createRender(data, settings, generateId);
                } else {
                    data = s.createContainer(data, settings, generateId).hide();
                }
            } else if (typeof data === "string" || typeof data === "number") {
                data = $("<div id='" + s.o.dataId + generateId + "'></div>").html(data).appendTo(document.body).hide();
            } else {
                alert("Layer Error : Unsupport data type :" + typeof data);
                return;
            }
            if (settings.locked && !s.hasBgLayer()) {
                var mask = $("<div class='" + s.o.bgLayer + "' id='" + s.o.bgLayer + "'></div>").appendTo(document.body).css({
                    background:settings.bgColor,
                    opacity:settings.opacity
                });
                if (s.o.ie6) {
                    mask.html('<iframe src="about:blank" style="width:100%;height:100%;position:absolute;top:0;left:0;z-index:-1;scrolling=no;filter:alpha(opacity=' + settings.opacity * 100 + ')"></iframe>');
                }
            }
            data.css({
                position:settings.fixed ? s.o.ie6 ? "absolute" :"fixed" :"absolute",
                "z-index":settings.zIndex,
                left:settings.left,
                top:settings.top
            }).show();
            if (settings.center) {
                s.fixLayer(data);
                $(window).bind("resize scroll", function() {
                    s.fixLayer(data);
                });
            }
            if (settings.drag) {
                s.dragLayer(data, settings);
            }
            if (settings.shake) {
                s.shakeLayer(data);
            }
            if (settings.init && typeof settings.init === "function") {
                settings.init();
            }
            if (settings.timer > 0) {
                setTimeout(function() {
                    $("#" + s.o.replaceClose + generateId).trigger("click");
                }, parseInt(settings.timer, 10) || 3e3);
            }
            // 点击弹出层外部自动关闭弹出层，默认不关闭
            if (settings.blurClose) {
                $("#" + s.o.bgLayer).click(function(e) {
                    s.close($("#" + s.o.wrapper + generateId), settings, generateId);
                    e.stopPropagation();
                });
            }
            return data;
        },
        createContainer:function(data, settings, generateId) {
            var s = this;
            //如果context未定义，则是通过html拼接的方式追加的否则就是原本就存在的，关闭后需要返回原地方
            var isHtmlSlice = data.context == undefined ? true :false;
            var wrapperHtml = new Array();
            wrapperHtml.push("<div class='" + s.o.wrapper + "' id='" + s.o.wrapper + generateId + "'>");
            wrapperHtml.push("<div class='" + s.o.warpperContent + "' id='" + s.o.warpperContent + generateId + "'>");
            wrapperHtml.push("<a class='" + s.o.replaceClose + "' id='" + s.o.replaceClose + generateId + "'></a>");
            if (settings.head) {
                wrapperHtml.push("<h4 class='" + s.o.warpperTitle + " " + s.o.dragableClass + "' id='" + s.o.warpperTitle + generateId + "'>");
                if (settings.isClose) {
                    wrapperHtml.push("<a href='javascript:void(0);' title='关闭' class='" + s.o.warpperCloseBtn + "' id='" + s.o.warpperCloseBtn + generateId + "'>&times;</a>");
                }
                wrapperHtml.push(settings.title + "</h4>");
            }
            wrapperHtml.push("<div id='" + s.o.warpperOwnContent + generateId + "' class='" + s.o.warpperOwnContent + "'></div></div></div>");
            s.container = $(wrapperHtml.join(""));
            s.container.appendTo(document.body);
            data.clone(true).appendTo("#" + s.o.warpperOwnContent + generateId).show().attr("id", data.attr("id") || s.o.dataId + generateId);
            //div默认宽度为100%，所以建议将所有弹出的元素设置宽度，否则弹出层宽度为100%
            var w = $("#" + data.attr("id")).width() || $("#" + s.o.dataId + generateId).width() || s.o.defaultWidth;
            //指定了高度
            var tempWidth = w;
            if (settings.height > 0) {
                if (settings.width > 0) {
                    tempWidth = settings.width;
                    if (settings.width <= w) {
                        $("#" + s.o.warpperOwnContent + generateId).css({
                            width:settings.width,
                            "overflow-x":"auto"
                        });
                    } else {
                        //如果指定的宽度大于元素本身的宽度，那么需要将元素居中
                        //让元素始终居中显示
                        var xPadding = (settings.width - w) / 2 + 8;
                        $("#" + s.o.warpperOwnContent + generateId).css({
                            padding:"4px " + xPadding + "px"
                        });
                    }
                }
                s.container.width(tempWidth + 0);
                $("#" + s.o.warpperContent + generateId).width(tempWidth + 0);
                $("#" + s.o.warpperOwnContent + generateId).css({
                    height:settings.height,
                    "overflow-y":"auto"
                });
            } else {
                if (settings.width > 0) {
                    tempWidth = settings.width;
                    if (settings.width <= w) {
                        $("#" + s.o.warpperOwnContent + generateId).css({
                            width:settings.width,
                            "overflow-x":"auto"
                        });
                    }
                }
                s.container.width(tempWidth + 22);
                $("#" + s.o.warpperContent + generateId).width(tempWidth + 20);
            }
            $("#" + s.o.warpperCloseBtn + generateId).click(function(e) {
                $("#" + s.o.replaceClose + generateId).trigger("click");
                $("#layerModel_mask").hide();
            });
            $("#" + s.o.replaceClose + generateId).click(function(e) {
                s.close($("#" + s.o.wrapper + generateId), settings, generateId);
                e.stopPropagation();
            });
            //点击按钮事件触发 关闭回调函数
            $("#btn2").bind("click", function(e) {
                s.close($("#" + s.o.wrapper + generateId), settings, generateId);
                e.stopPropagation();
            });
            if (!isHtmlSlice) {
                s.elemBack(data, generateId);
            }
            data.detach();
            return s.container;
        },
        createRender:function(data, settings, generateId) {
            var s = this;
            //如果context未定义，则是通过html拼接的方式追加的否则就是原本就存在的，关闭后需要返回原地方
            var isHtmlSlice = data.context == undefined ? true :false;
            var temp = $("<div class='" + s.o.wrapper + " seeImg' style='background:#fff;' id='" + s.o.wrapper + generateId + "'><a class='" + s.o.replaceClose + "' id='" + s.o.replaceClose + generateId + "'></a></div>");
            s.container = $("<div class='div11'> </div>");
            temp.appendTo(document.body);
            s.container.appendTo(temp);
            data.clone(true).appendTo(s.container).show().attr("id", data.attr("id") || s.o.dataId + generateId);
            $("#" + s.o.replaceClose + generateId).click(function(e) {
                s.close($("#" + s.o.wrapper + generateId), settings, generateId);
                e.stopPropagation();
            });
            if (!isHtmlSlice) {
                s.elemBack(data, generateId);
            }
            //data.detach();
            return temp;
        },
        elemBack:function(data, generateId) {
            var s = this;
            // 让传入的元素在对话框关闭后可以返回到原来的地方
            var display = data.css("display");
            var obj = data[0];
            var prev = obj.previousSibling;
            var next = obj.nextSibling;
            var parent = obj.parentNode;
            s["elemBack_" + generateId] = function() {
                if (prev && prev.parentNode) {
                    prev.parentNode.insertBefore(obj, prev.nextSibling);
                } else if (next && next.parentNode) {
                    next.parentNode.insertBefore(obj, next);
                } else if (parent) {
                    parent.appendChild(obj);
                }
                data.css({
                    display:display
                });
            };
        },
        isLastLayer:function() {
            var s = this;
            return $("." + s.o.wrapper).length <= 0;
        },
        hasBgLayer:function() {
            var s = this;
            return $("." + s.o.bgLayer).length > 0;
        },
        close:function(data, settings, generateId) {
            var s = this;
            var result = true;
            if (settings.close) {
                result = settings.close();
            }
            //调用回调函数
            if (result == undefined || result) {
                data.remove();
                if (s.isLastLayer()) {
                    $("#" + s.o.bgLayer).remove();
                }
            }
            if (s["elemBack_" + generateId]) {
                s["elemBack_" + generateId]();
            }
        },
        closeLayer:function(obj) {
            var s = this;
            var $wapper = $(obj).parents("div." + s.o.wrapper);
            $("." + s.o.replaceClose, $wapper).trigger("click");
        },
        fixLayer:function(data) {
            var s = this;
            var T = ($(window).height() - data.innerHeight()) / 2 + (s.o.ie6 ? $(document).scrollTop() :data.scrollTop());
            var L = ($(window).width() - data.width()) / 2 + (s.o.ie6 ? $(document).scrollLeft() :data.scrollLeft());
            // 考虑到用户体验，T不能 < 0
            return data.css({
                left:L,
                top:T >= 0 ? T :50
            });
        },
        dragLayer:function(data, settings) {
            var s = this;
            var move = false;
            // 移动标记
            var x = 0, y = 0;
            // 鼠标离控件左上角的相对位置
            var o = data.find("." + s.o.dragableClass).css({
                cursor:"move"
            });
            var a = o[0];
            o.mousedown(function(e) {
                //IE9 IE10居然把e.button改成0了，
                var isLeftClick = s.o.isIe && e.button == 1 || !s.o.isIe && e.button == 0 || s.o.ie9_10 && e.button == 0;
                if (isLeftClick) {
                    // data.fadeTo(20, 0.25);// 点击后开始拖动并透明显示
                    s.o.isIe ? a.setCapture() :window.captureEvents(Event.MOUSEMOVE);
                    move = true;
                    x = e.pageX - parseInt(data.css("left"));
                    y = e.pageY - parseInt(data.css("top"));
                    $(document).mousemove(function(e) {
                        if (move) {
                            var sx = e.pageX - x;
                            // 移动时根据鼠标位置计算控件左上角的绝对位置
                            var sy = e.pageY - y;
                            data.css({
                                top:sy,
                                left:sx
                            });
                        }
                    }).mouseup(function() {
                        // data.fadeTo("fast", 1);// 松开鼠标后停止移动并恢复成不透明
                        move = false;
                        x = 0;
                        y = 0;
                        s.o.isIe ? a.releaseCapture() :window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
                    });
                } else {
                    return false;
                }
            });
        },
        shakeLayer:function(data) {
            var ll = ($(window).width() - data.width()) / 2;
            var loop = 4;
            for (var i = 1; i <= loop; i++) {
                data.animate({
                    left:ll - (loop * 10 - 10 * i)
                }, 50);
                data.animate({
                    left:ll + 2 * (loop * 10 - 10 * i)
                }, 50);
            }
        }
    };
    $.fn.layerModel = function(options) {
        $("#layerModel_mask").show();
        return this.each(function(idx, item) {
            methods.init(item, options);
        });
    };
    $.fn.close = function() {
        methods.closeLayer(this);
    };
    $.fn.fix = function() {
        var mn = $(this).parents("." + methods.o.wrapper);
        return methods.fixLayer($(mn[0]));
    };
    //提示语
    var callClickId = "console-btn-alert";
    //回调点击事件Id
    //判断是否点击确认\取消按钮事件。如果点击了，就不触发layerModelAlertColse 方法
    var falgHide = true;
    yyAlert = function(e, callback_OK, t) {
        _ydynamicId = _dynamicId;
        //提示时，需要赋值 原动态id
        var altertTitle = "消息提示";
        if (t != undefined) {
            altertTitle = t;
        }
        var n = [ '<div class="popCueBox">', '<div class="editBox">' + e + "</div>", '<div class="addBtn">', '<a class="btn2 btnsF16" id="console-btn-alert"  href="javascript:void(0);">确定</a>', "</div>", "</div>" ].join(""), r = $("#layerModel_notice").layerModel({
            init:function() {},
            title:altertTitle,
            drag:true,
            locked:false,
            head:true,
            isClose:true,
            width:350,
            height:150,
            close:layerModelAlertColse
        });
        $("#layerModel_notice").html(n);
        //赋值
        $("#console-btn-alert").focus();
        //焦点移到确定按钮
        $("#console-btn-alert").keydown(function(e) {
            //回车触发事件
            if (e.keyCode == 13) {
                $(this).trigger("click");
            }
        });
        $("#console-btn-alert").click(function() {
            //点击事件
            falgHide = false;
            $("#console-btn-alert").unbind();
            if (callback_OK && typeof callback_OK == "function") {
                //点击确认
                callback_OK(true);
            }
            layerModelHide();
        });
    };
    //确认语句
    yyConfirm = function(e, callback_OK, callback_CANCEL, t) {
        _ydynamicId = _dynamicId;
        //提示时，需要赋值 原动态id
        var altertTitle = "消息确认";
        if (t != undefined) {
            altertTitle = t;
        }
        var n = [ '<div class="popCueBox">', '<div class="editBox">' + e + "</div>", '<div class="addBtn">', '<a class="btn2 btnsF16" id="console-btn-confirm" href="javascript:void(0);">确定</a>', '<a class="btn1 btnsF16" id="console-btn-cancel" href="javascript:void(0);">取消</a>', "</div>", "</div>" ].join(""), r = $("#layerModel_notice").layerModel({
            init:function() {},
            title:altertTitle,
            drag:true,
            locked:false,
            bgColor:"#FFFFFF",
            head:true,
            width:350,
            height:150,
            isClose:true
        });
        $("#layerModel_notice").html(n);
        //赋值
        $("#console-btn-confirm").focus();
        //焦点移到确定按钮
        $("#console-btn-confirm").keydown(function(e) {
            //回车触发事件
            if (e.keyCode == 13) {
                $(this).trigger("click");
            }
        });
        $("#console-btn-confirm").click(function() {
            $("#console-btn-confirm").unbind();
            if (callback_OK && typeof callback_OK == "function") {
                //点击确认 看是否有回调函数
                callback_OK(true);
            }
            layerModelHide();
        });
        $("#console-btn-cancel").keydown(function(e) {
            //回车触发事件
            if (e.keyCode == 13) {
                $(this).trigger("click");
            }
        });
        $("#console-btn-cancel").click(function() {
            $("#console-btn-cancel").unbind();
            if (callback_CANCEL && typeof callback_CANCEL == "function") {
                //点击取消 看是否有回调函数
                callback_CANCEL(false);
            }
            $("#console-btn-cancel").close();
        });
    };
    //隐藏显示框
    layerModelHide = function() {
        $(".layerModel_wrapper").hide();
        $("#layerModel_mask").hide();
        if (_ydynamicId != "") {
            //判断是否有层上层  
            $("#replaceClose" + _ydynamicId).trigger("click");
            //回调函数
            _ydynamicId = "";
        }
        $("#replaceClose" + _dynamicId).trigger("click");
        //回调函数
        $("#layerModel_mask").remove();
    };
    //提示语确认 点击关闭按钮，操作回调函数
    layerModelAlertColse = function() {
        if (!falgHide) {
            falgHide = true;
            return;
        }
        //点击关闭按钮，重新调用点击事件
        $("#" + callClickId).trigger("click");
    };
    //定义div
    layerModel_notice = $('<div id="layerModel_notice" ></div>');
    $(document.body).append(layerModel_notice);
});