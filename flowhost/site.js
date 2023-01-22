const id = getUrlVars()["id"]

Webflow.push(() => {
  let changes = 0
  // Hide changes count
  $('#changes-count-container').css('display','flex')
  $('#changes-count-container').hide()

  // Get site data from MemberStack
	$memberstackDom.getMemberJSON().then((meta) => {
		const ms = meta.data
		site = ms.sites[id]
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
      $('#changes-count').text(`${changes} changes pending.`)
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
      $('#changes-count').text(`${changes} changes pending.`)
      if (changes < 1) {
        $('#changes-count-container').hide()
      } else {$('#changes-count-container').fadeIn(200)}
    })


	}) // End MemberStack Fetch

})

function collectChanges() {
  let changes = []
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
    changes.push({
      category: msCat,
      setting: msKey,
      value: val
    })
  })
  msSubmit(changes)
  // return changes
}

function nfSubmit() {
  if (!changes) {return}
}

function msSubmit(changes) {
  for (var i = 0; i < Object.keys(changes).length; i++) {
    site.settings[changes[i].category][changes[i].setting] = changes[i].value
  }
}
