let modalSetupComplete = false
let heroSetupComplete = false
let heroLoaded = false

function heroSetup() {
  if (heroLoaded) {return}

  const hero = $('#video-hero')
  const videoInner = $(hero).find('.video-inner')
  const controls = $(hero).find('[control]')
  const links = $(hero).find('[link]')
  const image = $(hero).find('.video-container')
  const videosrc = $(image).attr('video')
  const postVideo = $(hero).find('.video-post-inner')
  let video = $('body')

  // Improved video sizing
  $('body').append(`<style id='dys'>.expanded {width:100vw;height:100vh}</style>`)
  function videoSize() {
    $('#dys').replaceWith(`<style id='dys'>.expanded {width:${window.innerWidth}px;height:${window.innerHeight}px}</style>`)
  }
  videoSize()
  $(window).resize(videoSize)
  $(hero).css('min-height',`${window.innerHeight}px`)

  function loadVideo(muted) {
    $(image).replaceWith(`<video class="video-container">
      <source src="${videosrc}" type="video/mp4">
      Your browser does not support the video tag.
    </video>`)
    video = $(hero).find('.video-container')

    // Set controls
    $(controls).each(function(i, obj) {
      const control = $(obj).attr('control')
      switch(control) {
        case 'play':
          $(obj).click(()=>{
            $(video).trigger('play')
            if ($(obj).siblings().length) {
              $(obj).hide()
              $(obj).siblings().show()
            }
          })
          break;
          case 'pause':
            $(obj).click(()=>{
              $(video).trigger('pause')
              if ($(obj).siblings().length) {
                $(obj).hide()
                $(obj).siblings().show()
              }
            })
          break;
          case 'mute':
            $(obj).click(()=>{
              $(video).prop('muted',true)
              if ($(obj).siblings().length) {
                $(obj).hide()
                $(obj).siblings().show()
              }
            })
          break;
          case 'unmute':
            $(obj).click(()=>{
              $(video).prop('muted',false)
              if ($(obj).siblings().length) {
                $(obj).hide()
                $(obj).siblings().show()
              }
            })
          break;
          case 'minify':
            $(obj).click(()=>{
              $(videoInner).removeClass('expanded')
              $(links).fadeOut(200)
              $('.w-nav').css('z-index','101')
              $(hero).css('min-height',`0`)
              if ($(obj).siblings().length) {
                $(obj).hide()
                $(obj).siblings().show()
              }
            })
          break;
          case 'expand':
            $(obj).click(()=>{
              $(videoInner).addClass('expanded')
              $(links).fadeIn(300)
              $('.w-nav').css('z-index','99')
              $(hero).css('min-height',`${window.innerHeight}px`)
              if ($(obj).siblings().length) {
                $(obj).hide()
                $(obj).siblings().show()
              }
            })
          }
        })

        // Set links
        $(links).each(function(i, obj) {
          const link = $(obj).attr('link')
          $(obj).click(()=>{
            $(hero).find(`[control=${link}]`).click()
          })
        })

        // Set ended
        function heroEnd() {
          $(postVideo).slideDown(300)
          $('.as-seen-on').slideUp(300)
          $('#video-hero').animate({'padding-bottom':'4rem','min-height':'0'},300)
          $(links).fadeOut(300)
          $(videoInner).slideUp(300,()=>{
            $(videoInner).remove()
            $('.w-nav').css('z-index','101')
          })
        }
        $(video).on('ended',heroEnd)

        if (muted) {$(video).prop('muted','true')}
        $(hero).find('[control=play]').click()
      }
  // if (connection == 'fast' && !heroLoaded) {
    loadVideo('muted')
  // }
}

function modalSetup() {
    if (modalSetupComplete) {return}

    const section = $('#video-modal')
    const image = $(section).find('.video-container')
    const videosrc = $(image).attr('video')

    // Set video
    $(image).replaceWith(`<video class="video-container">
      <source src="${videosrc}" type="video/mp4">
      Your browser does not support the video tag.
    </video>`)

    const video = $(section).find('.video-container')
    const controls = $(section).find('[control]')

    // Set controls
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
            $(video).prop('muted',true)
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
            $(section).find('[control=pause]').click()
            $(section).fadeOut(200)
          })
      }
    })
    $('[control=open-modal]').click(()=>{
      $(section).fadeIn(300,()=>{$(section).find('[control=play]').click()})
    })
    $(video).on('ended',()=>{
      $(section).fadeOut(300)
    })
    modalSetupComplete = true
    $(section).fadeIn(300,()=>{$(video).trigger('play')})
  }

// Start document.loaded stuff
var Webflow = Webflow || [];
Webflow.push(function () {

  $('[control=open-modal]').click(()=>{
    if ( !modalSetupComplete ) {modalSetup()}
  })
  if ( $('#video-hero').length > 0 ) {
    if ( !heroSetupComplete) {heroSetup()}
  }
})
