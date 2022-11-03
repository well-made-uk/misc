/* Phone number scripts */

// Format phone numbers
  const isNumericInput = (event) => {
    const key = event.keyCode
    return ((key >= 48 && key <= 57) || // Allow number line
        (key >= 96 && key <= 105) // Allow number pad
    )
}

const isModifierKey = (event) => {
    const key = event.keyCode
    return (event.shiftKey === true || key === 35 || key === 36) || // Allow Shift, Home, End
        (key === 8 || key === 9 || key === 13 || key === 46) || // Allow Backspace, Tab, Enter, Delete
        (key > 36 && key < 41) || // Allow left, up, right, down
        (
            // Allow Ctrl/Command + A,C,V,X,Z
            (event.ctrlKey === true || event.metaKey === true) &&
            (key === 65 || key === 67 || key === 86 || key === 88 || key === 90)
        )
}

const enforceFormat = (event) => {
    // Input must be of a valid number format or a modifier key, and not longer than ten digits
    if(!isNumericInput(event) && !isModifierKey(event)){
        event.preventDefault()
    }
}

const formatToPhone = (event) => {
    if(isModifierKey(event)) {return}

    const input = event.target.value.replace(/\D/g,'').substring(0,10) // First ten digits of input only
    const areaCode = input.substring(0,3)
    const middle = input.substring(3,6)
    const last = input.substring(6,10)

    if(input.length > 6){event.target.value = `(${areaCode}) ${middle}-${last}`}
    else if(input.length > 3){event.target.value = `(${areaCode}) ${middle}`}
    else if(input.length > 0){event.target.value = `(${areaCode}`}
}

/* Cookie scripts */
    function setCookie(cname, cvalue, exdays) {
    const d = new Date()
    d.setTime(d.getTime() + (exdays*24*60*60*1000))
    let expires = "expires="+ d.toUTCString()
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/"
  }
  function getCookie(cname) {
    let name = cname + "="
    let decodedCookie = decodeURIComponent(document.cookie)
    let ca = decodedCookie.split(';')
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i]
      while (c.charAt(0) == ' ') {
        c = c.substring(1)
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length)
      }
    }
    return ""
  }
  function checkCookie( cname, val ) {
    if (val) {
    	setCookie(cname, val, 7)
    }
    let cookie = getCookie(cname)
    $('.' + cname).val(cookie)
  }

  // Countdown script

  function pad(num, size) {
        var s = "0" + num
        return s.substr(s.length - size)
    }

    // fixes "Date.parse(date)" on safari
    function parseDate(date) {
        const parsed = Date.parse(date)
        if (!isNaN(parsed)) return parsed
        return Date.parse(date.replace(/-/g, '/').replace(/[a-z]+/gi, ' '))
    }

    function getTimeRemaining(endtime) {
        let total = parseDate(endtime) - Date.parse(new Date(new Date().toLocaleString("en-US", {timeZone: "America/Boise"}))) // timezone ex: Asia/Jerusalem)
        let seconds = Math.floor((total / 1000) % 60)
        let minutes = Math.floor((total / 1000 / 60) % 60)
        let hours = Math.floor((total / (1000 * 60 * 60)) % 24)
        let days = Math.floor(total / (1000 * 60 * 60 * 24))

        return { total, days, hours, minutes, seconds }
    }

    function clock(id, endtime) {
  			let el = $('#' + id).closest('.js-clock')
        let days = $(el).find('.js-days')
        let hours = $(el).find('.js-hours')
        let minutes = $(el).find('.js-minutes')
        let seconds = $(el).find('.js-seconds')

        var timeinterval = setInterval(function () {
            var time = getTimeRemaining(endtime)

             if (time.total <= 0) {
                 clearInterval(timeinterval)
             } else {
               if (time.days.length < 2) {
                 days.text(pad(time.days, 2))
               } else {days.text(time.days)}
                hours.text(pad(time.hours, 2))
                minutes.text(pad(time.minutes, 2))
                seconds.text(pad(time.seconds, 2))
             }
             $(()=>{$(days).closest('.js-clock').fadeIn({start: function () {$(this).css('display', 'flex')}})})
          }, 1000)
    }

Webflow.push(function () {
  // Position the nav-bars etc
  height = $('.nav-bar.w-nav').outerHeight() * 1.5

  let videoCodeOne = '<iframe class="youtube-source" width="560" height="315" src="https://www.youtube.com/embed/'
  let videoCodeTwo = '?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'

  $('.video-thumbnail').click(function() {
	   let videoId = $(this).attr('data-video-id')
    let videoHeight = $(this).height()
    let parent = $(this).parent()
    $(this).closest('.youtube-container').addClass('open')
    $(this).siblings().fadeOut(200)
  	$(this).replaceWith(videoCodeOne + videoId + videoCodeTwo)
    parent.find('iframe').height(videoHeight)
  })

      // Add programs to Program menu
      $('#program-list .w-dyn-item').each(getCat)
      function getCat() {
          const cat = $( this ).find('div').text()
          $( this ).find('div').remove()
          $('#program-nav .navigationheadings:contains("' + cat + '")').closest('.w-dyn-item').append( this )
          $('.dropdown-item:contains("' + cat + '")').closest('.w-dropdown-toggle').siblings('.w-dropdown-list').append( this )
      }

      // .. Rinse and repeat for mobile (optimise this)
      $('#program-list-mobile .w-dyn-item').each(getCatMob)
      function getCatMob() {
        const cat = $( this ).find('.title').text()
        $( this ).find('.title').remove()
        $('.dropdown-title:contains("' + cat + '")').closest('.w-dropdown-toggle').siblings('.w-dropdown-list').append( this )
      }

      // Add phone number event listeners
      $('input[type="tel"]').on('keydown',enforceFormat)
      $('input[type="tel"]').on('keyup',formatToPhone)
      $('input[type="tel"]').attr('pattern','.{14}')
      $('input[type="tel"]').attr('placeholder','(012) 345-6789')

      // Info pack radio button stuff
      $('.info-pack input[type="radio"]').on('change',function() {
        if ($(this).closest('form').find('.require-study-permit').is(':checked')) {
          $(this).closest('form').find('.international-students').show()
          $(this).closest('form').find('.info-kit-button').hide()
        } else {
          $(this).closest('form').find('.international-students').hide()
          $(this).closest('form').find('.info-kit-button').show()
        }
      })

        // Get URL Parameters
        const queryString = window.location.search
        const urlParams = new URLSearchParams(queryString)
        const gclid = urlParams.get('gclid')
        const utm_source = urlParams.get('utm_source')
        const utm_campaign = urlParams.get('utm_campaign')
        const utm_medium = urlParams.get('utm_medium')
        const utm_content = urlParams.get('utm_content')
        const utm_term = urlParams.get('utm_term')
        const utm_source_platform = urlParams.get('utm_source_platform')
        const utm_creative_format = urlParams.get('utm_creative_format')
        const utm_marketing_tactic = urlParams.get('utm_marketing_tactic')

        // Check/set cookies
        checkCookie('utm_source',utm_source)
        checkCookie('utm_campaign',utm_campaign)
        checkCookie('utm_medium',utm_medium)
        checkCookie('utm_content',utm_content)
        checkCookie('utm_term',utm_term)
        checkCookie('utm_source_platform',utm_source_platform)
        checkCookie('utm_creative_format',utm_creative_format)
        checkCookie('utm_marketing_tactic',utm_marketing_tactic)
        checkCookie('gclid',gclid)

        //Add date fields
        $('.date').attr('type','date')

        // Automatically correct the offset of sticky elements
      	$('.team-left-info').css('top',height + 'px')
      	$('.sticky').css('top',height + 'px')
      	$('.anchor-offset').css('top','-' + height + 'px')
        $('.anchor-adjusted').css('top','-' + height + 'px')

        // Freeze background scrolling when mobile menu is open
        $('.menu-mob-2').on('click',function() {
           if ($(this).hasClass("w--open")) {
             $('.page-wrapper').css('overflow-y','hidden')
           } else {$('.page-wrapper').css('overflow-y','auto')}
        })
  })
