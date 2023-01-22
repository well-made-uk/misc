/*! Created by well-made.uk | GPL 3.0 License: https://choosealicense.com/licenses/gpl-3.0/ */

function videoScroller(id,targetWidth,targetHeight) {

    const ogth = targetHeight

    // Get elements
    const container = $('[data-video-id='+id+']').closest('.section-layout')
    const video = $(container).find('.video-inner')

    var videoWidth = 0
    var videoHeight = 0
    var maxScrollDistance = 0
    var widthDiff = 0
    var heightDiff = 0
    var pixelsPerScrollX = 0
    var pixelsPerScrollY = 0

    function calc() {
            // Get dimensions
        videoWidth = window.innerWidth
        videoHeight = window.innerHeight

        // distance over which zoom effect takes place
        maxScrollDistance = $('.video-parallax').height() / 2;

        // Is screen more than double the height of the target height?
        if ($(window).width() < 480 || $(window).height() < 480) {
    targetHeight = window.innerHeight / 2
} else {targetHeight = ogth}

        // calculate diff and how many pixels to zoom per pixel scrolled
        widthDiff = videoWidth - targetWidth;
        heightDiff = videoHeight - targetHeight
        pixelsPerScrollX =(widthDiff / maxScrollDistance);
        pixelsPerScrollY =(heightDiff / maxScrollDistance);
    }

    window.onresize = calc;
    calc()

    $(window).scroll(function () {
        // the currently scrolled-to position - max-out at maxScrollDistance
        var scrollTopPos = Math.min($(document).scrollTop(), maxScrollDistance);

        // how many pixels to adjust by
        var scrollChangePxX =  Math.floor(scrollTopPos * pixelsPerScrollX);
        var scrollChangePxY =  Math.floor(scrollTopPos * pixelsPerScrollY);

        // calculate the new sizes
        var zoomedWidth = videoWidth - scrollChangePxX;
        var zoomedHeight = videoHeight - scrollChangePxY;

        // set the sizes
        video.css('width', zoomedWidth).css('height',zoomedHeight);
    });
}

var Webflow = Webflow || [];
Webflow.push(function () {
  const videos = $('[data-video-id]')
  for (let i = 0; i < videos.length; i++) {
    const videoParent = videos[i]
    const video = $(videoParent).children('video')
    const id = $(videoParent).attr('data-video-id')
    const ended = $(`[data-video-ended=${id}]`)
    const play = $(`[data-video-play=${id}]`)

    $('[data-transport-play='+id+']').on('click',(event)=>{
      $(video).trigger('play');
      $(event.target).hide()
      $(event.target).siblings().show()
    })
    $('[data-transport-pause='+id+']').on('click',(event)=>{
      $(video).trigger('pause');
      $(event.target).hide()
      $(event.target).siblings().show()
    })
    $('[data-transport-unmute='+id+']').on('click',(event)=>{
      $(video).prop('muted',false);
      $(event.target).hide()
      $(event.target).siblings().show()
    })
    $('[data-transport-mute='+id+']').on('click',(event)=>{
      $(video).prop('muted',true);
      $(event.target).hide()
      $(event.target).siblings().show()
    })

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


  $('.video-inner').css('width',window.innerWidth).css('height',window.innerHeight)

});
