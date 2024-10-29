if (!Array.isArray) {
  Array.isArray = function(arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  };
}

(function($){
    var fly = $(),
        push = Array.prototype.push;

    $.fly = function(elem){
        var len = fly.length,
            i;
        if($.isArray(elem)){
            fly.length = 0;
            i = push.apply(fly, elem);
        } else {
            if(elem instanceof $){
                return elem;
            }
            if(typeof elem == "string"){
                throw "use jQuery()";
            }
            fly[0] = elem;
            fly.length = i = 1;
        }
        // remove orphaned references
        while(i < len){
            delete fly[i++];
        }

        return fly;
    };

    $.fn.extend({
        up: function(selector, limit, dom){
            var target = this[0],
                doc = document.documentElement,
                depth = 0,
                stopEl;

            limit = limit || 50;
            if(isNaN(limit)){
                stopEl = $(limit)[0];
                limit = 100;
            }
            while(target && target.nodeType == 1 && depth < limit && target != doc && target != stopEl){
                if($.fly(target).is(selector)){
                    return dom ? target : $(target);
                }
                depth++;
                target = target.parentNode;
            }
            return null;
        }
    });

})($);




$(function($){

    var win = $(window),
        doc = $(document),
        body = $('#body'),
        w = win.width();

    $('slide[bg]').css('background-image', function(){
        var s = $(this),
            bg = s.attr('bg');
        if(bg.charAt(0) !== '/'){
            bg = 'img/' + bg;
        }
        if(w <= 767 && s.attr('sm')){
            s.addClass('bg');
            var ps = bg.split('.');
            return 'url(' + ps[0] + '-sm' + '.' + ps[1] + ')';
        }else if(w > 767){
            s.addClass('bg');
            return 'url(' + bg + ')';
        }else{
            return 'none';
        }
    });

    $('cols:not([layout])').attr('layout', 'column');
    $('rows:not([layout])').attr('layout', 'rows');

    body.on('click', 'nav > btn', function(e){
        e.preventDefault();
        var btn = $(this);
        btn.toggleClass('open');
        btn.next('bd, ul').toggleClass('open');
    });

    body.on('click', 'a[data-menu]', function(e){
        e.preventDefault();
        var el = $(this),
            menu = $('#' + el.data('menu'));

        var hide = function(){
            menu.hide();
            el.removeClass('open');
        };

        if(!el.hasClass('open')){ // if it's already open the body.click handler will hide it
            var off = el.offset();

            el.addClass('open');

            menu.show();
            menu.offset({
                left: off.left,
                top: off.top + el[0].offsetHeight
            });

            // timeout so current click doesn't hide when it propagates
            setTimeout(function(){
                body.one('click', hide);
            }, 100);
        }
    });
});