jQuery('document').ready(function($) {
  $('.menu-toggler').click(setTimeout(mobileMenu,200));
  $('.elementor-nav-menu').hover(setTimeout(desktopMenu,200));
  
  css = "<style id='menuStyle'></style>";
  jQuery('body').append(css);
})

function desktopMenu() {
  // Get height of elements
  totalHeight = jQuery('.elementor-location-header').height();
        
  // Add CSS
  css = "<style>#nav-menu-main .sub-menu[style] {top:" + totalHeight + "px!important}</style>";
  jQuery('#menuStyle').html = css
}

function mobileMenu() {
  // Add mobile menu icon
  jQuery('#mobile-menu-nav .menu-item-has-children').prepend('<i style="display:none" class="fa fa-caret-down opener" onCLick="opener()"></i>');
        
  // Hide mobile submenu by default
  jQuery('#mobile-menu-nav .menu-item-has-children .sub-menu').hide();
}

// Function for opening the mobile submenu
function opener() {
    jQuery('#mobile-menu-nav .sub-menu').slideToggle(200);
}