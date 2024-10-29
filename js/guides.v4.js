$(function($){
    var win = $(window),
        body = $('#body'),
        side = $('main > bd > side'),
        bd = $('main > bd'),
        lw = 0;

    /*
    $('a', side).each(function(){
        var url = window.location.pathname;
        if(url.charAt(url.length-1) === '/'){
            url += 'index.php';
        }
        if($(this).attr('href') === url){
            var p = this.parentNode;
            // move to top
            //p.parentNode.insertBefore(p, p.parentNode.firstChild);
            // prepare for toc
            $(p).addClass('active').append('<div id="toc"></div>');
            $(this).click(function(e){
                e.preventDefault();
                //slide($('#toc > .h1-toc > li:first-child > btn')[0]);
            });
        }
    });
    */

    // config toggle
    bd.on('click', 'api > name', function(e){
        $(this.parentNode).toggleClass('expand');
    });

    var root = {tag: 'ul', cls: 'h1-toc', cn: []},
        p;

    var ids = {};

    root.child = function(el){
        var c = item(el);
        root.cn.push(c);
        return c;
    };

    var item = function(el){
        var id = el.id,
            text = String(el.getAttribute('data-toc') || el.innerText || el.textContent),
            suffix = 1,
            baseId;

        if(!id){
            id = baseId = text.toLowerCase().replace(/[^a-z0-9]/g, '');
            while(ids[id]){
                id = baseId + (++suffix);
            }
            el.id = id;
            ids[id] = true;
        }

        var d = {
            tag: 'li',
            cn: [{
                tag: 'a',
                href: '#' + id,
                'data-target': id,
                html: text
            }]
        };

        if(el.getAttribute('data-cp') === 'true'){
            d.cls = 'collapse';
        }

        d.child = function(el){
            if(!d.cn[1]){
                d.cn.push({
                    tag: 'btn'
                });
                d.cn.push({
                    cn: [{
                        tag: 'ul',
                        cls: el.tagName.toLowerCase() + '-toc',
                        cn: []
                    }]
                });
            }
            var c = item(el);
            d.cn[2].cn[0].cn.push(c);
            return c;
        };

        return d;
    };

    var depth,
        hash = {
            h1: root
        };

    var hs = $('h1,h2,h3,h4,h5', '#doc > bd');
    hs.each(function(i, el){
        if(el.getAttribute('data-toc') === 'false'){
            return;
        }
        var di = el.tagName.toLowerCase();
        if(di === 'h1'){
            hash.h2 = root.child(el);
            hash.h3 = null;
            hash.h4 = null;
        }else if(di === 'h2'){
            if(hash.h2){
                hash.h3 = hash.h2.child(el);
                hash.h4 = null;
            }
        }else if(di === 'h3'){
            if(hash.h3){
                hash.h4 = hash.h3.child(el);
                hash.h5 = null;
            }
        }else if(di === 'h4'){
            if(hash.h4){
                hash.h5 = hash.h4.child(el);
            }
        }else if(di === 'h5'){
            if(hash.h5){
                hash.h5.child(el);
            }
        }
    });

    var toc = $('#toc');
    toc.html(a5.markup(root));

    var scrollTo = function(target){
        if(target){
            var h = $('#' + target);
            if(h){
                var api = h.up('api', 3);
                if(api){
                    api.addClass('expand');
                }
                if(win.width() > 767){
                    bd.animate({
                        scrollTop: h[0].offsetTop-20
                    });
                }else {
                    $('html,body').animate({
                        scrollTop: h.offset().top - 80
                    });
                }
            }
        }
    };

    toc.on('click', 'a', function(e){
        e.preventDefault();
        if($.fly(this.parentNode).hasClass('collapse')){
            slide(this.nextSibling);
        }
        scrollTo($.fly(this).data('target'));
    });

    /*
    var slide = function(btn){
        var p = $(btn.parentNode),
            wrap = $(btn).next('div'),
            list = wrap[0].firstChild,
            h = list.offsetHeight;

        wrap.css('max-height', h);
        list.style.top = '-'+h+'px';

        // reflow for items that start collapsed
        setTimeout(function(){
            p.toggleClass('collapse');
        }, 1);

        // clear max height
        setTimeout(function(){
            wrap.css('max-height', '');
            $(wrap.firstChild).children('ul').parent().parent().addClass('collapse');
        }, 200);

        return btn;
    };
    */

    toc.on('click', 'btn', function(e){
        e.preventDefault();
        slide(this);
    });

    bd.on('click', 'a[data-toc]', function(e){
        e.preventDefault();
        scrollTo($(this).data('toc'));
    });

    bd.on('click', 'toc,t', function(e){
        e.preventDefault();
        var el = $(this),
            guide = el.attr('guide'),
            textId = String(this.innerText || this.textContent).toLowerCase().replace(/[^a-z0-9]/g, '');

        if(guide){
            var gs = guide.split('#'),
                g = gs[0],
                hd = gs[1];

            if(gs.length === 1){
                hd = textId;
            }

            if(g){
                document.location = g + '.php' + (hd ? '#' + hd : '');
            }else{
                scrollTo(hd);
            }
        }else{
            scrollTo(textId);
        }
    });

    setTimeout(function(){
        scrollTo(String(document.location).split('#')[1]);
    }, 50);

    var field = $('#isearch'),
        all,
        hl = [];

    var clearHL = function(){
        for(var i = 0, len = hl.length; i < len; i++){
            var n = hl[i];
            if(n.rtext){
                n.innerHTML = n.rtext;
            }
        }
        hl = [];
    };

    var search = function(){
        if(!all){
            all = $('api api', '#inds');
            gs = $('#inds > api');
        }

        // alphanum + underscore and dash
        var v = String(field.val()).replace(/[^a-z0-9_-]/ig, '');
        gs.removeClass('expand');

        if(!v){
            all.css('display', '');
            clearHL();
        }else{
            var re = new RegExp('(^|\\s|_)(' + v + ')', 'i');
            clearHL();

            all.each(function(){
                var c = this,
                    name = c.firstChild,
                    s = c.style,
                    group = c.parentNode.parentNode,
                    n = name.firstChild,
                    htext;

                var ntext = n.rtext || n.innerText || n.textContent;
                if((htext = ntext.replace(re, '$1<u>$2</u>')) !== ntext){
                    s.display = '';
                    n.rtext = ntext;
                    n.innerHTML = htext;
                    $(group).addClass('expand');
                    hl.push(n);
                    return;
                }

                var d = name.lastChild,
                    dtext = d.rtext || d.innerText || d.textContent;
                if((htext = dtext.replace(re, '$1<u>$2</u>')) !== dtext){
                    s.display = '';
                    d.rtext = dtext;
                    d.innerHTML = htext;
                    $(group).addClass('expand');
                    hl.push(d);
                    return;
                }
                s.display = 'none';
            })
        }
    };

    field.keyup(search.buffer(field, 500));

    $('#isearch-clear').click(function(e){
        e.preventDefault();
        field.val('');
        search();
    });


    // scrolling stuff

    var smaller = function(){
        bd.off('scroll', scroller);
    };

    var larger = function(){
        bd.on('scroll', scroller);
    };

    var hh,
        prev;

    // dom hideousness
    var plink = function(link){
        return link.parentNode.parentNode.parentNode.parentNode.firstChild;
    };

    var highlight = function(h){
        if(hh){
            if(hh.lid === h.id){
                return false;
            }
            hh.removeClass('hl');
        }
        hh = $('a[data-target="'+h.id+'"]').addClass('hl');
        hh.lid = h.id;
        return true;
    };

    var scroller = function(e){
        var min = 55,
            max = 85;
        for(var i = 0, len = hs.length; i < len; i++){
            var h = hs[i];
            if(h.getAttribute('data-toc') === 'false'){
                continue;
            }
            var y = $.fly(h).offset().top;

            if(y > min && y < max){
                highlight(h);
                break;
            }else if(y > max){
                if(prev){
                    highlight(prev);
                }
                break;
            }
            prev = h;
        }
    };


    // window resize

    var resize = function(){
        var h = win.height() - parseInt(bd.css('top'), 10);
        side.css('height', h);
        bd.css('height', h);

        var w = win.width();
        if(w < 768 && lw >= 768){
            smaller();
        }else if(w > 767 && lw <= 767){
            larger();
        }
    };

    win.resize(resize).trigger("resize");
    win.on('orientationchange', resize);
});
