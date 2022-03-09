document.addEventListener("DOMContentLoaded", function() {
  jQuery('.menu-toggler').on('click',setTimeout(mobileMenu,200));
  jQuery('.elementor-nav-menu').on('hover',setTimeout(desktopMenu,200));
  
  cssel = document.createElement('style', {id: 'menuStyle'});
  document.body.appendChild(cssel);
})

function desktopMenu() {
  // Get height of elements
  totalHeight = document.querySelector('.elementor-location-header').offsetHeight();
        
  // Add CSS
  css = "#nav-menu-main .sub-menu[style] {top:" + totalHeight + "px!important}";
  document.getElementById('menuStyle').innerHTML = css
}

function mobileMenu() {
  // Add mobile menu icon
  i = document.createElement('i',{style: 'display:none',class: 'fa fa-caret-down opener',onClick: "opener"})
  document.querySelector('#mobile-menu-nav .menu-item-has-children').insertBefore(i, document.querySelector('#mobile-menu-nav .menu-item-has-children').firstChild);
        
  // Hide mobile submenu by default
  document.querySelector('#mobile-menu-nav .menu-item-has-children .sub-menu').toggle(this);
}

// Function for opening the mobile submenu
function opener() {
    document.querySelector('#mobile-menu-nav .menu-item-has-children .sub-menu').toggle(this);
}

function toggle(elem) {

	// If the element is visible, hide it
	if (window.getComputedStyle(elem).display === 'block') {
		hide(elem);
		return;
	}

	// Otherwise, show it
	show(elem);

};