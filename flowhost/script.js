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

  // Remove loader
  window.setTimeout($('.loader').fadeOut(500), 300)

  // Add tooltipper if needed
  if ($('.tooltip-trigger')) {
    $('body').append('<script type="module" src="https://unpkg.com/tooltipper@1/tooltipper.min.mjs"><\/script><script defer src="https://unpkg.com/tooltipper@1/tooltipper.min.js"><\/script>')
  }
});
