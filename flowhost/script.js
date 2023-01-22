var Webflow = Webflow || [];
Webflow.push(function () {
  $('[data-fn-expand]').click((event)=>{
    target = $(event.target).attr('data-fn-expand')
    panel = $('[data-fn-panel='+target+']')
    $(panel).removeClass('collapsed')
    $(event.target).remove()
  })
});
