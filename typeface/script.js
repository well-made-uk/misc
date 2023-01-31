let videoPostOffset = 100

function initVideo(image) {
  const src = $(image).attr('data-video-url')
  const videoInner = $(image).closest('.video-inner')
  const ended = $(videoInner).find('.video-post-wrap')
  const section = $(image).closest('.section-layout')
  $(image).replaceWith(`<video aria-label="Video" autoplay muted style="width:100%;height:100%;background:black;object-fit:cover">
    	<source src="${src}" type="video/mp4">
    	Your browser does not support the video tag.
    </video>`)
  const video = $(videoInner).find('video')
  $(video).on('ended',()=>{
      $(ended).fadeIn(300)
      $(videoInner).find('.video-wrap').fadeOut(300)
      $(videoInner).css('height','auto')
      $(section).css('padding-bottom',videoPostOffset)
      $('.as-seen-on').slideUp(300)
      minifyVideo(videoInner)
  });
}

function playVideo(video,button) {
  $(video).trigger('play')
  if (button) {
    $(button).hide()
    $(button).siblings().show()
  }
}

function pauseVideo(video,button) {
  $(video).trigger('pause')
  if (button) {
    $(button).hide()
    $(button).siblings().show()
  }
}

function expandVideo(container,button) {
  $(container).addClass('expanded')
  $(container).closest('.section-layout').css('min-height','100vh')
  if (button) {
    $(button).hide()
    $(button).siblings().show()
  }
}

function minifyVideo(container,button) {
  $(container).removeClass('expanded')
  $(container).closest('.section-layout').css('min-height','1vh')
  if (button) {
    $(button).hide()
    $(button).siblings().show()
  }
}

function muteVideo(video,button) {
  $(video).prop('muted',true);
  if (button) {
    $(button).hide()
    $(button).siblings().show()
  }
}

function unmuteVideo(video,button) {
  $(video).prop('muted',false);
  if (button) {
    $(button).hide()
    $(button).siblings().show()
  }
}



// Start document.loaded stuff
var Webflow = Webflow || [];
Webflow.push(function () {



  window.clearTimeout( speedTest );
  $('.video-post-wrap').css('display','flex')
  $('.video-post-wrap').hide()
  // Expand/Minify buttons
  $('[data-transport-expand]').click((e)=>{
    const button = e.target
    const container = $(button).closest('.video-inner')
    const videoContainer = $(button).closest('.video-transport').siblings('.video-container')
    if (!$(videoContainer).find('video').length) {
      initVideo($(videoContainer).find('img'))
    }
    expandVideo(container,button)
  })
  $('[data-transport-minify]').click((e)=>{
    const button = e.target
    const container = $(button).closest('.video-inner')
    const videoContainer = $(button).closest('.video-transport').siblings('.video-container')
    if (!$(videoContainer).find('video').length) {
      initVideo($(videoContainer).find('img'))
    }
    minifyVideo(container,button)
  })

  // Mute/Unmute buttons
  $('[data-transport-mute]').click((e)=>{
    const button = e.target
    const videoContainer = $(button).closest('.video-transport').siblings('.video-container')
    if (!$(videoContainer).find('video').length) {
      initVideo($(videoContainer).find('img'))
    }
    muteVideo($(videoContainer).find('video'),button)
  })
  $('[data-transport-unmute]').click((e)=>{
    const button = e.target
    const videoContainer = $(button).closest('.video-transport').siblings('.video-container')
    if (!$(videoContainer).find('video').length) {
      initVideo($(videoContainer).find('img'))
    }
    unmuteVideo($(videoContainer).find('video'),button)
  })

  // Play/Pause buttons
  $('[data-transport-play]').click((e)=>{
    const button = e.target
    const videoContainer = $(button).closest('.video-transport').siblings('.video-container')
    if (!$(videoContainer).find('video').length) {
      initVideo($(videoContainer).find('img'))
    }
    playVideo($(videoContainer).find('video'),button)
  })
  $('[data-transport-pause]').click((e)=>{
    const button = e.target
    const videoContainer = $(button).closest('.video-transport').siblings('.video-container')
    if (!$(videoContainer).find('video').length) {
      initVideo($(videoContainer).find('img'))
    }
    pauseVideo($(videoContainer).find('video'),button)
  })

  const navOffset = $('.w-nav').outerHeight()
  const videoContentOffset = $('.video-heading').outerHeight()
  videoPostOffset = $('.video-post-wrap').outerHeight()
  $('.section-layout.video-parallax').css('padding-top',`calc(${navOffset}px + 2rem)`)
  $('body').append(`<style>.video-inner {opacity:1;top:${navOffset+videoContentOffset}px;transition:all 0.5s ease;}</style>`)
  console.log(connection + ' connection detected.')

  if (connection == 'fast') {
    $('[data-transport-expand]').click()
    $('[data-transport-play]').click()
  }
})
