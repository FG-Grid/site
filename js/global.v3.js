$(function($){
    var win = $(window),
        html = $('html'),
        strack = html.hasClass('scroll-track'),
        main = $('main');

    main.delegate('a.scroll', 'click', function(e){
        var target = this.href.split('#')[1],
            el;
        if(target && (el = $('#' + target))){
            e.preventDefault();
            $('html, body').animate({scrollTop: el.offset().top-55}, 250);
        }
    });

    var fs = $('slide[fullsize],ct[fullsize]');
    if(fs.length){
        var resize = function(){
            // 55 is the fixed hd size
            var h = Math.max(640, window.innerHeight - (strack ? 0 : 55));
            fs.css('height', h + 'px');
        };

        win.resize(resize).trigger("resize");
        win.on('orientationchange', resize);
    }

    $('slide a.down-arrow, a.scroll-down').click(function(e){
        e.preventDefault();
        var slide = $(this).up('slide', 10)[0];

        $('html, body').animate({
            scrollTop: (slide ? slide.offsetTop+slide.offsetHeight : window.innerHeight)-55
        }, 250);
    });

    var scrolled = false;
    win.scroll(function(e){
        var scroll = win.scrollTop();
        if(scrolled && scroll <= 5){
            scrolled = false;
            html.removeClass('scrolled');
        }else if(!scrolled && scroll > 5){
            scrolled = true;
            html.addClass('scrolled');
        }
    });

    if(strack){
      var clone = $('main > hd').clone();
      
      clone.addClass('clone').appendTo(main);
      $('[data-menu]', clone).attr('data-menu', 'menu-help-clone');
      $('#menu-help', clone).attr('id', 'menu-help-clone');
    }
    
    var _subscribe = function(){
      if( $('form.sform a.btn').attr('used') === 'true'){
        return;
      }
    
      $.ajax({
        url: "/subscribe/",
        data: {
          email: $('form.sform input').val()
        },
        method: 'POST'
      }).done(function(data){
        if(data.success === true){
          $('form.sform a.btn').attr('used', true);
          
          $('form.sform input').parent().css('display', 'none');
          $('form.sform a.btn').html(data.text);
        }
        else{
          $('form.sform input').css({
            'background': '#ffe9e9',
            'border': '1px solid #f9d3d5'
          });
        }
      });
    }

    $('form.sform a.btn').click(function(){
      _subscribe();
    });

    $('form.sform input').keypress(function(e){
      if(e.which == 13){
        _subscribe();
        
        return false; // swallow event
      }
    });



    $('screen.swap').each(function(i, item){
        var imgs = $('img', item),
            len = imgs.length,
            active = 0;

        var n = parseInt(item.getAttribute('delay') || 3, 10) * 1000;

        setInterval(function(){
            active++;
            if(active >= len){
                active = 0;
            }
            imgs.removeClass('active');
            $(imgs.get(active)).addClass('active');
        }, n);

    });
});
