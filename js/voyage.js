jQuery('document').ready(function($) {
  
  $('.menu-toggler').click(mobileMenu());
  // Get height of elements
  const totalHeight = $('.elementor-location-header').height();
        
  // Add CSS
  const css = "<style>#nav-menu-main .sub-menu[style] {top:" + totalHeight + "px!important}</style>";
  $('body').append(css);
})

function mobileMenu() {
  // Add mobile menu icon
  jQuery('#mobile-menu-nav .menu-item-281').prepend('<i style="display:none" class="fa fa-caret-down opener" onCLick="opener()"></i>');
        
  // Hide mobile submenu by default
  jQuery('#mobile-menu-nav .sub-menu').hide();
}

// Function for opening the mobile submenu
function opener() {
    jQuery('#mobile-menu-nav .sub-menu').slideToggle(200);
  }