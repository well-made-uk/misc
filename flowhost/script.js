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

  window.setTimeout($('.loader').fadeOut(500), 300)
});
