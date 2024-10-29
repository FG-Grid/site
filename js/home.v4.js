$(function($){
    var win = $(window);
    $('item.masker, desktop[m]').mouseenter(function(e){
        if(win.width() > 700){
            $.fly(this).up('slide').addClass('mask-' + this.getAttribute('m'));
        }
    }).mouseleave(function(e){
        if(win.width() > 700){
            $.fly(this).up('slide').removeClass('mask-' + this.getAttribute('m'));
        }
    });
});