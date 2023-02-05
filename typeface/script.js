function initVideo(image) {
  const src = $(image).attr('data-video-url')
  const videoInner = $(image).closest('.video-inner')
  const ended = $(videoInner).find('.video-post-wrap')
  const section = $(image).closest('.section-layout')
  $(image).replaceWith(`<video aria-label="Video" class="video-container" muted>
    	<source src="${src}" type="video/mp4">
    	Your browser does not support the video tag.
    </video>`)
  const video = $(videoInner).find('video')
  if (!($(videoInner).attr('data-video-id') == 'modal')) {
    $(video).on('ended',()=>{
        $(ended).fadeIn(300)
        if (window.innerWidth > 767) {
          $(videoInner).find('.video-wrap').fadeOut(300,()=>{$(videoInner).find('.video-wrap').remove()})
          $(videoInner).css('height','auto')
          $('.as-seen-on').slideUp(300)
        }
        $(section).css('padding-bottom','280px')
        minifyVideo(videoInner)
    });
  }
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
    if (!$(button).is('[data-close-modal]')) {
      $(button).hide()
      $(button).siblings().show()
    }
  }
}

function expandVideo(container,button) {
  $(container).addClass('expanded')
  $(container).closest('.section-layout').css('min-height','100vh')
  $('.w-nav').slideUp(500)
  if (button) {
    $(button).hide()
    $(button).siblings().show()
  }
  $(container).closest('.section-layout').get(0).scrollIntoView();
}

function minifyVideo(container,button) {
  $(container).removeClass('expanded')
  $(container).closest('.section-layout').css('min-height','1vh')
  $('.w-nav').slideDown(500)
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

/*

  window.clearTimeout( speedTest );
  $('.video-post-wrap').css('display','flex')
  $('.video-post-wrap').hide()
  // Expand/Minify buttons
  $('[data-transport-expand]').click((e)=>{
    const button = e.target
    const container = $(button).closest('.video-inner')
    let videoContainer = $(button).closest('.video-transport').siblings('.video-container')
    if ($(videoContainer).is('img')) {
      initVideo(videoContainer)
      videoContainer = $(button).closest('.video-transport').siblings('.video-container')
    }
    expandVideo(container,button)
  })
  $('[data-transport-minify]').click((e)=>{
    const button = e.target
    const container = $(button).closest('.video-inner')
    let videoContainer = $(button).closest('.video-transport').siblings('.video-container')
    if ($(videoContainer).is('img')) {
      initVideo(videoContainer)
      videoContainer = $(button).closest('.video-transport').siblings('.video-container')
    }
    minifyVideo(container,button)
  })

  // Mute/Unmute buttons
  $('[data-transport-mute]').click((e)=>{
    const button = e.target
    let videoContainer = $(button).closest('.video-transport').siblings('.video-container')
    if ($(videoContainer).is('img')) {
      initVideo(videoContainer)
      videoContainer = $(button).closest('.video-transport').siblings('.video-container')
    }
    muteVideo(videoContainer,button)
  })
  $('[data-transport-unmute]').click((e)=>{
    const button = e.target
    let videoContainer = $(button).closest('.video-transport').siblings('.video-container')
    if ($(videoContainer).is('img')) {
      initVideo(videoContainer)
      videoContainer = $(button).closest('.video-transport').siblings('.video-container')
    }
    unmuteVideo(videoContainer,button)
  })

  // Play/Pause buttons
  $('[data-transport-play]').click((e)=>{
    const button = e.target
    let videoContainer = $(button).closest('.video-transport').siblings('.video-container')
    if ($(videoContainer).is('img')) {
      initVideo(videoContainer)
      videoContainer = $(button).closest('.video-transport').siblings('.video-container')
    }
    playVideo(videoContainer,button)
  })
  $('[data-transport-pause]').click((e)=>{
    const button = e.target
    let videoContainer = $(button).closest('.video-transport').siblings('.video-container')
    if ($(videoContainer).is('img')) {
      initVideo(videoContainer)
      videoContainer = $(button).closest('.video-transport').siblings('.video-container')
    }
    pauseVideo(videoContainer,button)
  })
  $('[data-learn-more-button]').click((e)=>{
    const button = e.target
    const minify = $(button).closest('.video-links').siblings('.video-transport').find('[data-transport-minify]')
    $(minify).click()
  })

  // Close modal
  $('[data-close-modal]').click((e)=>{
    $('#video-modal').find('[data-transport-pause]')[0].click()
    $('#video-modal').fadeOut(200)
  })
  $('[data-open-modal]').click((e)=>{
    if ($('#video-modal').length == 0) {
      const image = $('#video-modal').find('[data-video-url]')
      const src = image.attr('data-video-url')
      $(image).replaceWith(`<video aria-label="Video" style="width:100%;height:100%;background:black;object-fit:cover">
        	<source src="${src}" type="video/mp4">
        	Your browser does not support the video tag.
        </video>`)
        $('#video-modal video').on('ended',()=>{
          $('#video-modal').find('[data-transport-pause]')[0].click()
          $('#video-modal').fadeOut(200)
        })
    }
    $('#video-modal').fadeIn(200,()=>{$('#video-modal').find('[data-transport-play]').click()})
  })

  const navOffset = $('.w-nav').outerHeight()
  const videoContentOffset = $('.video-heading').outerHeight()
  $('.section-layout.video-parallax').css('padding-top',`calc(${navOffset}px + 2rem)`)
  $('body').append(`<style>.video-inner {top:${navOffset+videoContentOffset}px;} .video-links {display:none} .expanded .video-links {display:flex}</style>`)
  $('body').append(`<style id="mod">.video-inner.expanded {width:100vw;height:100vh}</style>`)
  // console.log(connection + ' connection detected.')

  function videoExpandedSize() {
    const x = window.innerWidth
    const y = window.innerHeight
    $('#mod').replaceWith(`<style id="mod">.video-inner.expanded {width:${x}px;height:${y}px}</style>`)
  }
  videoExpandedSize()
  $(window).resize(videoExpandedSize)

  if (connection == 'fast' && window.innerWidth > 767) {
    $('[data-video-id=main] [data-transport-play]').click()
  } else if (window.innerWidth < 767) {
    const src = $('#video-modal').find('[data-video-url]').attr('data-video-url')
    $('#video-modal').find('[data-video-url]').replaceWith(`<video aria-label="Video" controls autoplay muted style="width:100%;height:100%;background:black;object-fit:cover">
      	<source src="${src}" type="video/mp4">
      	Your browser does not support the video tag.
      </video>`)
    $('[data-video-ended]').css('display','flex')
    $('#video-modal video').on('ended',()=>{
      $('#video-modal').find('[data-transport-pause]')[0].click()
      $('#video-modal').fadeOut(200)
    })
  }






*/






  function modalSetup() {
    const modal = $('#video-modal')
    const video = $(modal).find('video')
    const controls = $(modal).find('[control]')
    $(controls).each(function(i, obj) {
      const control = $(obj).attr('control')
      switch(control) {
        case 'play':
          $(obj).click(()=>{
            $(video).trigger('play')
            $(obj).hide()
            $(obj).siblings().show()
          })
        break;
        case 'pause':
          $(obj).click(()=>{
            $(video).trigger('pause')
            $(obj).hide()
            $(obj).siblings().show()
          })
        break;
        case 'mute':
          $(obj).click(()=>{
            $(video).prop('muted',false)
            $(obj).hide()
            $(obj).siblings().show()
          })
        break;
        case 'unmute':
          $(obj).click(()=>{
            $(video).prop('muted',false)
            $(obj).hide()
            $(obj).siblings().show()
          })
        break;
        case 'close':
          $(obj).click(()=>{
            $(video).trigger('pause')
            $(modal).fadeOut(200)
          })
      }
    })
  }
  modalSetup()


})
