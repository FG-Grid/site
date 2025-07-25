Function.prototype.task = function(scope, args){
    var fn = this,
        id,
        call = function(){
            clearInterval(id);
            id = null;
            fn.apply(scope, args || []);
        };

    var task = {
        delay: function(delay, newArgs){
            task.cancel();
            args = newArgs || args;
            id = setInterval(call, delay);
        },
        cancel: function(){
            if(id){
                clearInterval(id);
                id = null;
            }
        }
    };
    return task;
};

Function.prototype.buffer = function(scope, millis, args){
    var t = this.task(scope, args);
    return function(){
        t.delay(millis);
    };
};

/*
 *  SimpleBar.js - v1.1.6
 */
!function(a){"use strict";"function"==typeof define&&define.amd?define(["jquery"],a($,window,document,void 0)):"object"==typeof exports?a(require("jquery"),window,document,void 0):a(window.jQuery,window,document,void 0)}(function(a,b,c,d){function e(){var b=a('<div class="scrollbar-width-tester" style="width:50px;height:50px;overflow-y:scroll;top:-200px;left:-200px;"><div style="height:100px;"></div>'),c=0,d=0;return a("body").append(b),c=a(b).innerWidth(),d=a("div",b).innerWidth(),b.remove(),c-d}function f(b,c){this.el=b,this.$el=a(b),this.$track,this.$scrollbar,this.dragOffset,this.flashTimeout,this.$contentEl=this.$el,this.$scrollContentEl=this.$el,this.scrollDirection="vert",this.scrollOffsetAttr="scrollTop",this.sizeAttr="height",this.scrollSizeAttr="scrollHeight",this.offsetAttr="top",this.options=a.extend({},f.DEFAULTS,c),this.init()}var g=e();f.DEFAULTS={wrapContent:!0,autoHide:!0},f.prototype.init=function(){return 0===g?(this.$el.css("overflow","auto"),void 0):(("horizontal"===this.$el.data("sbar-dir")||this.$el.hasClass("sbar horizontal"))&&(this.scrollDirection="horiz",this.scrollOffsetAttr="scrollLeft",this.sizeAttr="width",this.scrollSizeAttr="scrollWidth",this.offsetAttr="left"),this.options.wrapContent&&this.$el.wrapInner('<div class="sbar-scroll-content"><div class="sbar-content"></div></div>'),this.$contentEl=this.$el.find(".sbar-content"),this.$el.prepend('<div class="sbar-track"><div class="sbar-scrollbar"></div></div>'),this.$track=this.$el.find(".sbar-track"),this.$scrollbar=this.$el.find(".sbar-scrollbar"),this.$scrollContentEl=this.$el.find(".sbar-scroll-content"),this.resizeScrollContent(),this.options.autoHide&&this.$el.on("mouseenter",a.proxy(this.flashScrollbar,this)),this.$scrollbar.on("mousedown",a.proxy(this.startDrag,this)),this.$scrollContentEl.on("scroll",a.proxy(this.startScroll,this)),this.resizeScrollbar(),this.options.autoHide||this.showScrollbar(),void 0)},f.prototype.startDrag=function(b){b.preventDefault();var d=b.pageY;"horiz"===this.scrollDirection&&(d=b.pageX),this.dragOffset=d-this.$scrollbar.offset()[this.offsetAttr],a(c).on("mousemove",a.proxy(this.drag,this)),a(c).on("mouseup",a.proxy(this.endDrag,this))},f.prototype.drag=function(a){a.preventDefault();var b=a.pageY,c=null,d=null,e=null;"horiz"===this.scrollDirection&&(b=a.pageX),c=b-this.$track.offset()[this.offsetAttr]-this.dragOffset,d=c/this.$track[this.sizeAttr](),e=d*this.$contentEl[0][this.scrollSizeAttr],this.$scrollContentEl[this.scrollOffsetAttr](e)},f.prototype.endDrag=function(){a(c).off("mousemove",this.drag),a(c).off("mouseup",this.endDrag)},f.prototype.resizeScrollbar=function(){if(0!==g){var a=this.$contentEl[0][this.scrollSizeAttr],b=this.$scrollContentEl[this.scrollOffsetAttr](),c=this.$track[this.sizeAttr](),d=c/a,e=Math.round(d*b)+2,f=Math.floor(d*(c-2))-2;a>c?("vert"===this.scrollDirection?this.$scrollbar.css({top:e,height:f}):this.$scrollbar.css({left:e,width:f}),this.$track.show()):this.$track.hide()}},f.prototype.startScroll=function(a){this.$el.trigger(a),this.flashScrollbar()},f.prototype.flashScrollbar=function(){this.resizeScrollbar(),this.showScrollbar()},f.prototype.showScrollbar=function(){this.$scrollbar.addClass("visible"),this.options.autoHide&&("number"==typeof this.flashTimeout&&b.clearTimeout(this.flashTimeout),this.flashTimeout=b.setTimeout(a.proxy(this.hideScrollbar,this),1e3))},f.prototype.hideScrollbar=function(){this.$scrollbar.removeClass("visible"),"number"==typeof this.flashTimeout&&b.clearTimeout(this.flashTimeout)},f.prototype.resizeScrollContent=function(){var a=/firefox/i.test(navigator.userAgent);a&&("vert"===this.scrollDirection?(this.$scrollContentEl.width(this.$el.width()+g),this.$scrollContentEl.height(this.$el.height())):(this.$scrollContentEl.width(this.$el.width()),this.$scrollContentEl.height(this.$el.height()+g)))},f.prototype.recalculate=function(){this.resizeScrollContent(),this.resizeScrollbar()},f.prototype.getScrollElement=function(){return this.$scrollContentEl},f.prototype.getContentElement=function(){return this.$contentEl},a(b).on("load",function(){a("[data-sbar-dir]").each(function(){a(this).sbar()})});var h=a.fn.sbar;a.fn.sbar=function(b){var c,e=arguments;return"undefined"==typeof b||"object"==typeof b?this.each(function(){a.data(this,"sbar")||a.data(this,"sbar",new f(this,b))}):"string"==typeof b?(this.each(function(){var d=a.data(this,"sbar");d instanceof f&&"function"==typeof d[b]&&(c=d[b].apply(d,Array.prototype.slice.call(e,1))),"destroy"===b&&a.data(this,"sbar",null)}),c!==d?c:this):void 0},a.fn.sbar.Constructor=f,a.fn.sbar.noConflict=function(){return a.fn.sbar=h,this}});
