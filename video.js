var Webflow = Webflow || [];
Webflow.push(function () {
  const videos = $('[data-video-id]')
  for (let i = 0; i < videos.length; i++) {
    const videoParent = videos[i]
    const video = $(videoParent).children('video')
    const id = $(videoParent).attr('data-video-id')
    const ended = $(`[data-video-ended=${id}]`)
    const play = $(`[data-video-play=${id}]`)

    // Set the video wrapper up
    $(ended).css("display", "flex").hide()

    // Replay video function
    $(play).on('click',()=>{
        $(video).trigger('play')
        $(ended).fadeOut(300)
    })

    // End of video function
    $(video).on('ended',()=>{
          $(ended).fadeIn(300)
    });
  }

  // Set the section height
  // $('.video-parallax').css('height','calc(225vh + 560px + 4rem)')
});
