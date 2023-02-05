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



// Start document.loaded stuff
var Webflow = Webflow || [];
Webflow.push(function () {

  modalSetup()

})
