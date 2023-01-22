const id = getUrlVars()["id"]
let changes = 0

Webflow.push(() => {

  // Get site data from MemberStack
	$memberstackDom.getMemberJSON().then((meta) => {
		ms = meta.data
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
      $('#changes-count > div').text(`${changes} changes pending`)
      if ($('input.changed')) {
        $('#changes-count').show()
      } else {$('#changes-count').show()}
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
      $('#changes-count > div').text(`${changes} changes pending`)
      if ($('input.changed')) {
        $('#changes-count').show()
      } else {$('#changes-count').show()}
    })

	}) // End MemberStack Fetch

})

// Submit page "Settings"
function submit() {

}
