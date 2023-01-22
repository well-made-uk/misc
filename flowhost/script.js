// Get URL Vars
function getUrlVars() {
	var vars = [],
		hash
	const hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&')
	for (var i = 0; i < hashes.length; i++) {
		hash = hashes[i].split('=')
		vars.push(hash[0])
		vars[hash[0]] = hash[1]
	}
	return vars;
}




var Webflow = Webflow || [];
Webflow.push(function () {





  // Add panel expanders
  $('[data-fn-expand]').click((event)=>{
    target = $(event.target).attr('data-fn-expand')
    panel = $('[data-fn-panel='+target+']')
    $(panel).removeClass('collapsed')
    $(panel).siblings('.gradient-cover').remove()
    $(event.target).remove()
  })

  // Add tooltipper if needed
  if ($('.tooltip-trigger')) {
    $('body').append('<script type="module" src="https://unpkg.com/tooltipper@1/tooltipper.min.mjs"><\/script><script defer src="https://unpkg.com/tooltipper@1/tooltipper.min.js"><\/script>')
  }
});
