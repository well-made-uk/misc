

// Start document.loaded stuff
var Webflow = Webflow || [];
Webflow.push(function () {
  const navOffset = $('.w-nav').height()
  $('.section-layout.video-parallax').css('padding-top',`calc(${navOffset} + 2rem)`)
  console.log(`calc(${navOffset} + 2rem)`)
})
