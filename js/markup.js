a5 = window.a5 || {};
a5.markup = function(){
    var emptyTags = /^br|frame|hr|img|input|link|meta|range|spacer|wbr|area|param|col$/i;

    var markup = function(o){
        if(typeof o == 'string'){
            return o;
        }
        var b = '';
        if(Object.prototype.toString.call(o) === '[object Array]') {
            for (var i = 0, l = o.length; i < l; i++) {
                b += markup(o[i]);
            }
            return b;
        }
        if(!o.tag){
            o.tag = 'div';
        }
        b += '<' + o.tag;
        for(var attr in o){
            if(attr === 'tag' || attr === 'children' || attr === 'cn' || attr === 'html' || typeof o[attr] === 'function') continue;
            if(attr === 'style'){
                var s = o['style'];
                if(typeof s === 'function'){
                    s = s.call();
                }
                if(typeof s === 'string'){
                    b += ' style="' + s + '"';
                }else if(typeof s === 'object'){
                    b += ' style="';
                    for(var key in s){
                        if(typeof s[key] !== 'function'){
                            b += key + ':' + s[key] + ';';
                        }
                    }
                    b += '"';
                }
            }else{
                if(attr === 'cls'){
                    b += ' class="' + o['cls'] + '"';
                }else if(attr === 'htmlFor'){
                    b += ' for="' + o['htmlFor'] + '"';
                }else{
                    b += ' ' + attr + '="' + o[attr] + '"';
                }
            }
        }
        if(emptyTags.test(o.tag)){
            b += '/>';
        }else{
            b += '>';
            var cn = o.children || o.cn;
            if(cn){
                b += markup(cn);
            } else if(o.html){
                b += o.html;
            }
            b += '</' + o.tag + '>';
        }
        return b;
    };

    return markup;
}();
