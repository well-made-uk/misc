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

  function loadVideo() {
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
          $('#video-hero').animate({'padding-bottom':'4rem','min-height':'0'},300)
          $(links).fadeOut(300)
          $(videoInner).removeClass('expanded')
          $(videoInner).fadeOut(300,()=>{
            $(videoInner).remove()
            $('.w-nav').css('z-index','101')
          })
        }
        $(video).on('ended',heroEnd)

        if (connection == 'fast') {
          $(video).prop('muted','true')
          $(hero).find('[control=play]').click()
        } else {console.log('Slow connection detected.')}
      }
    loadVideo()
}

function heroSetupMobile() {
  const modal = $('#video-modal-mobile')
  const controls = $(modal).find('[control]')
  const image = $(modal).find('.video-post-inner')

  function loadVideo(e) {
    $(e).replaceWith(`<video controls autoplay class="video-container" style="max-width:100%;height:auto">
      <source src="${videosrc}" type="video/mp4">
      Your browser does not support the video tag.
    </video>`)
    $('.video-post-inner').replaceWith(`<video controls class="video-container" style="max-width:100%;height:auto">
      <source src="${videosrc}" type="video/mp4">
      Your browser does not support the video tag.
    </video>`)
  }

  $(controls).each((i, obj)=>{
    const control = $(obj).attr('control')
    switch(control) {
      case 'close':
      $(obj).click(()=>{
        $(modal).fadeOut(300,()=>{$(modal).remove()})
      })
    }
  })
  $('[control=open-modal]').click((e)=>{
    if ( $(e.target).hasClass('.video-post-inner') ) {
      loadVideo(e.target)
    } else {
      loadVideo($(e.target).closest('.video-post-inner'))
    }

  })
}

function modalSetup() {
    if (modalSetupComplete) {return}

    const section = $('#video-modal')
    const image = $(section).find('.video-container')

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

  const lottie = Webflow.require('lottie').lottie;

  (function(a){(jQuery.browser=jQuery.browser||{}).mobile=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);

  if ( jQuery.browser.mobile ) {
    if ( $('#video-hero').length > 0 ) {
      $('.video-inner').remove()
      $('#video-hero .video-post-inner').css('display','block').css('opacity','1')
      $('.w-nav').css('z-index','101')
    }
    if ( $('#video-modal-mobile').length > 0 ) {
      $('#video-modal').remove()
      heroSetupMobile()
    }
  } else {
    if ( $('#video-hero').length > 0 ) {
      heroSetup()
    }
    $('[control=open-modal]').click(()=>{
      if ( !modalSetupComplete ) {modalSetup()}
    })
  }

  if ($('[data-carousel-lottie]').length) {
    $('[data-carousel-lottie]').each((e,obj)=>{
      const id = $(obj).attr('data-carousel-lottie')
      const lottieEl = $(obj)
      const listEl = $(`[data-carousel-list=${id}]`)
      const carouselItems = $(listEl).children('[data-carousel]')
      // carousel(lottieEl,carouselItems)
    })
  }


  // Lottie async
  var sc=0;
  window.addEventListener('scroll', function() {
    if(sc == 0){
      sc=1;
      $('[data-lottie]').each((i,obj)=>{
        lottie.loadAnimation({
            container: obj,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: $(obj).attr('data-lottie')
        });
      })
      $('[data-carousel-lottie]').each((i,obj)=>{
        const animation = lottie.loadAnimation({
            container: $(obj),
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: $(`[data-carousel-list=flow]`).children('[data-carousel]').attr('data-carousel')
        })
      })
      /*$('[data-carousel-lottie]').each((i,obj)=>{
        console.log(`Working on:`)
        console.log(obj)
        const id = $(obj).attr('data-carousel-lottie')
        console.log(`ID: ${id}.`)
        const list = $(`[data-carousel-list=${id}]`).children('[data-carousel]')
        console.log(`${list.length} items.`)
        const length = list.length
        let e = 0

        function lottieCarousel() {
          console.log(`Loading carousel item ${e}.`)
          const animation = lottie.loadAnimation({
              container: $(obj),
              renderer: 'svg',
              loop: true,
              autoplay: true,
              path: $(list[e]).attr('data-carousel')
          })
          console.log(`Loaded:`)
          console.log(animation)
          $(list).removeClass('active')
          $(list[e]).addClass('active')
          e++
          if (e > length) {e = 0}
          animation.addEventListener('complete',lottieCarousel)
        }
        lottieCarousel()
      })*/
    }
  });
})
