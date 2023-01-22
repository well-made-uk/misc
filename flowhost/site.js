const id = getUrlVars()["id"]
let changes = 0

Webflow.push(() => {

  // Hide changes count
  $('#changes-count-container').css('display','flex')
  $('#changes-count-container').hide()

  // Get site data from MemberStack
	$memberstackDom.getMemberJSON().then((meta) => {
    msMeta = meta
		const ms = meta.data
		const site = ms.sites[id]
    const info = site.info
		const settings = site.settings
		const clicks = settings.clicks
		const textfields = settings.textfields

		// Set site data
		for (var i = 0; i < Object.keys(info).length; i++) {
			const el = $(`[data-fh-site=${Object.keys(info)[i]}]`)
			if (el) {
				switch (el.prop('nodeName')) {
					case 'IMG':
						el.attr('src', Object.values(info)[i]).removeAttr('srcset')
						break;
					case 'A':
						el.attr('href', `https://${Object.values(info)[i]}`)
            el.text(Object.values(info)[i])
						break;
					default:
						el.text(Object.values(info)[i])
				}
			}
		}

		// Set site clicks
		for (var i = 0; i < Object.keys(clicks).length; i++) {
			if (Object.values(clicks)[i]) {
        const el = $(`[data-fh-click=${Object.keys(clicks)[i]}]`)
				$(el).click()
        $(el).siblings('input').attr('data-origin', 'on')
			}
		}

		// Set site textfields
		for (var i = 0; i < Object.keys(textfields).length; i++) {
			if (Object.values(textfields)[i]) {
        const el = $(`[data-fh-textfield=${Object.keys(textfields)[i]}]`)
				$(el).val(Object.values(textfields)[i])
        $(el).attr('data-origin', $(el).val())
			}
		}

    // Watch for changes
    $('input:not(:checkbox)').change(function(e) {
      el = e.target
      if ($(el).val() == $(el).attr('data-origin')) {
        $(el).removeClass('changed')
        changes -= 1
      } else {
        $(el).addClass('changed')
        changes += 1
      }
      let noun = 'change'
      if (changes > 1) {
        noun = 'changes'
      }
      $('#changes-count').text(`${changes} ${noun} pending.`)
      if (changes < 1) {
        $('#changes-count-container').hide()
      } else {$('#changes-count-container').fadeIn(200)}
    })
    $('input:checkbox').change(function(e) {
      el = e.target
      if ( ($(el).is(':checked') && $(el).attr('data-origin') == 'on') || (!($(el).is(':checked')) && $(el).attr('data-origin') == 'off') ) {
        $(el).removeClass('changed')
        $(el).parent().removeClass('changed')
        changes -= 1
      } else {
        $(el).addClass('changed')
        $(el).parent().addClass('changed')
        changes += 1
      }
      let noun = 'change'
      if (changes > 1) {
        noun = 'changes'
      }
      $('#changes-count').text(`${changes} ${noun} pending.`)
      if (changes < 1) {
        $('#changes-count-container').hide()
      } else {$('#changes-count-container').fadeIn(200)}
    })

    // Remove loader
    window.setTimeout($('.loader').fadeOut(500), 300)

	}) // End MemberStack Fetch

})

function collectChanges() {
  let arr = []
  $('input.changed').each(function() {
    const el = $(this)
    const type = $(el).attr('type')
    let val = ''
    let msCat = ''
    let msKey = ''
    if (type == 'checkbox') {
      val = $(el).is(':checked')
      msCat = 'clicks'
      msKey = $(el).siblings('[data-fh-click]').attr('data-fh-click')
    } else {
      val = $(el).val()
      msCat = 'textfields'
      msKey = $(el).attr('data-fh-textfield')
    }
    arr.push({
      el: el,
      category: msCat,
      setting: msKey,
      value: val
    })
  })
  const ms = msPackage(arr)
  const nf = nfPackage(ms)
  patchNetlify(nf)
  // patchMemberstack(ms)
  // submit(ms,nf)
}

function nfPackage(ms) {
  const settings = ms.data.sites[id].settings
  let data = {
    "id": id,
    "notification_email": settings.textfields.notification_email,
    "processing_settings": {
      "css": {
        "bundle": settings.clicks.bundle_css,
        "minify": settings.clicks.minify_css
      },
      "js": {
        "bundle": settings.clicks.bundle_js,
        "minify": settings.clicks.minify_js
      },
      "images": {
        "optimize": settings.clicks.optimize_images
      }
    },
    "build_settings": {
      "env": {
        "optimize_fonts": settings.clicks.optimize_fonts,
        "auto_noopener": settings.clicks.auto_noopener,
        "auto_icon": settings.clicks.auto_icon,
        "auto_blank": settings.clicks.auto_blank,
        "auto_relative": settings.clicks.auto_relative,
        "accessibe": settings.textfields.accessibe,
        "formspree": settings.textfields.formspree,
        "plausible": settings.textfields.plausible
      }
    }
  }
  return data
}

function msPackage(arr) {
  const data = msMeta
  const site = msMeta.data.sites[id]
  for (var i = 0; i < Object.keys(arr).length; i++) {
    site.settings[arr[i].category][arr[i].setting] = arr[i].value
  }
  return data
}

function patchNetlify(data) {
  fetch('https://fh-functions.netlify.app/.netlify/functions/site', {
    method: 'POST',
    mode: 'no-cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then((response) => response.json())
}
