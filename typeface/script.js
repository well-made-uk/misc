

// Start document.loaded stuff
var Webflow = Webflow || [];
Webflow.push(function () {
  const navOffset = $('.w-nav').height()
  const videoContentOffset = $('#video-content').height()
  $('.section-layout.video-parallax').css('padding-top',`calc(${navOffset}px + 2rem)`)
  $('body').append(`<style>.video-inner {padding-top:${navOffset+videoContentOffset}px}`)

  // Expand/Minify buttons
  $('[data-transport-expand]').click((e)=>{
    const button = e.target
    const videoID = $(button).attr('data-transport-expand')
    $(`[data-video-id=${videoID}]`).addClass('expanded')
    $(button).hide()
    $(button).siblings().show()
    $(button).closest('.section-layout').css('min-height','100vh')
  })
  $('[data-transport-minify]').click((e)=>{
    const button = e.target
    const videoID = $(button).attr('data-transport-minify')
    $(`[data-video-id=${videoID}]`).removeClass('expanded')
    $(button).hide()
    $(button).siblings().show()
    $(button).closest('.section-layout').css('min-height','1vh')
  })
})
