(function(){
    var els = [
      'slide',
      'banner',
      'item',
      'brand',
      'container',
      'overlay',
      'ct',
      'person',
      'doc',
      'side',

      'screen',
      'desktop',
      'laptop',
      'tablet',
      'phone',
      'ipad',

      'left',
      'right',

      'btn',

      'icon',

      // todo
      'tabs',
      'tab',

      'cols',
      'rows',

      'bd',
      'hd',
      'ft'
  ];
  for(var i = 0, len = els.length; i < len; i++){
      document.createElement(els[i]);
  }
})();