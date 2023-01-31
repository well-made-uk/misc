

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
    const container = $(button).closest('.video-inner')
    expandVideo(container,button)
  })
  $('[data-transport-minify]').click((e)=>{
    const button = e.target
    const container = $(button).closest('.video-inner')
    minifyVideo(container,button)
  })
})

function initVideo(image) {
  const src = $(image).attr('data-video-url')
  $(image).replace(```
    <video aria-label="Video" autoplay muted style="width:100%;height:100%;background:black;object-fit:cover;transition:all 0.4s ease">
    	<source src="${src}" type="video/mp4">
    	Your browser does not support the video tag.
    </video>
  ```)
}

function playVideo(video,button) {
  $(video).trigger('play')
  $(button).hide()
  $(button).siblings().hide()
}

function pauseVideo(video,button) {
  $(video).trigger('pause')
  $(button).hide()
  $(button).siblings().hide()
}

function expandVideo(container,button) {
  $(container).addClass('expanded')
  $(button).hide()
  $(button).siblings().show()
  $(button).closest('.section-layout').css('min-height','100vh')
}

function minifyVideo(container,button) {
  $(container).removeClass('expanded')
  $(button).hide()
  $(button).siblings().show()
  $(button).closest('.section-layout').css('min-height','1vh')
}
