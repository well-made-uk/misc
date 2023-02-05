function heroSetup() {
  const hero = $('#video-hero')
  const videoInner = $(hero).find('.video-inner')
  const controls = $(hero).find('[control]')

  // Improved video sizing
  const style = $(document).append(`<style>.expanded {width:100vw;height:100vh}</style>`)
  function videoSize() {
    $(style).replaceWith(`<style>.expanded {width:${window.innerWidth}px;height:${window.innerHeight}px}</style>`)
  }
  videoSize()
  $(window).resize(videoSize)
}

function modalSetup() {
    const section = $('#video-modal')
    const video = $(section).find('video')
    const controls = $(section).find('[control]')
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
            $(video).trigger('pause')
            $(section).fadeOut(200)
          })
      }
      $('[control=open-modal]').click(()=>{
        $(section).fadeIn(300,()=>{$(video).trigger('play')})
      })
    })
  }



// Start document.loaded stuff
var Webflow = Webflow || [];
Webflow.push(function () {

  if ( $('#video-modal').length > 0 ) {modalSetup()}
  if ( $('#video-hero').legnth > 0 ) {heroSetup()}

})
