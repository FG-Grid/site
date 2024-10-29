(function(){
var l = window.localStorage;
  if(!window.localStorage){
	return;
  }

if(l.getItem('fancygrid-gdpr')){
  return;
}

var link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'cookies-policy/gdpr.css';

link.onload = runWidget;
document.body.appendChild(link);

function runWidget(){
	var el = document.createElement('div');
	document.body.appendChild(el);

	el.outerHTML = [
	  '<div id="fg-eu-cookie-confirmation" class="fg-cookie-notification-position-bottom can-use-gradients">',
		'<div id="fg-eu-cookie-confirmation-inner">',
		  '<p></p>',
		  '<p>By using FancyGrid, you agree to our <a href="cookies-policy" target="_blank">Cookie Policy</a>.</p>',
		  '<p></p>',
		  '<div id="fg-en-cookie-confirmation-buttons-area">',
			'<a href="#" id="fg-eu-confirmation-button">Accept</a>',
		  '</div>',
		'</div>',
	  '</div>'
	].join("");

	setTimeout(function(){
	  $('#fg-eu-cookie-confirmation').css('opacity', 1);
	  $('#fg-eu-cookie-confirmation-inner').css('opacity', 1);

	  $('#fg-eu-confirmation-button').on('click', function(e){
		 e.preventDefault();
		 localStorage.setItem('fancygrid-gdpr', true);
		 $('#fg-eu-cookie-confirmation').css('opacity', 0);
	  $('#fg-eu-cookie-confirmation-inner').css('opacity', 0);
	  });
	}, 1000);
}

})();
