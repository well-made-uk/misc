jQuery(document).ready(function() {
  setTimeout(mobileMenu,200);
  jQuery('.elementor-nav-menu').on('hover',desktopMenu);
  jQuery(document).append('<style ="menuStyle"></style>');
  const styleStuff = jQuery("#menuStyle");
})

function desktopMenu() {
  // Get height of elements
  totalHeight = $('.elementor-location-header').height();
        
  // Add CSS
  css = "#nav-menu-main .sub-menu[style] {top:" + totalHeight + "px!important}";
  styleStuff.innerHTML = css;
}

function mobileMenu() {
  // Add mobile menu icon
  jQuery('#mobile-menu-nav .menu-item-has-children').prepend('<i style="display:none" class="fa fa-caret-down opener" onClick="opener"></i>');
        
  // Hide mobile submenu by default
  jQuery('#mobile-menu-nav .menu-item-has-children .sub-menu').slideToggle(200);
}

// Function for opening the mobile submenu
function opener() {
    jQuery('#mobile-menu-nav .menu-item-has-children .sub-menu').slideToggle(200);
}