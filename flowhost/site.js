const id = getUrlVars()["id"]

Webflow.push(() => {
  // Give an empty origin value to all inputs
  $('input').attr('data-origin','')

  // Get site data from MemberStack
	$memberstackDom.getMemberJSON().then((meta) => {
		const json = meta.data
		const site = json.sites[id]
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

    // Create active settings array
    let changes = []

		// Set site clicks
		for (var i = 0; i < Object.keys(clicks).length; i++) {
			if (Object.values(clicks)[i]) {
        const el = $(`[data-fh-click=${Object.keys(clicks)[i]}]`)
				$(el).click()
        $(el).siblings('input').attr('data-origin', 'true')
			}
		}

    // Set site textfields
		/*for (var i = 0; i < Object.keys(textfields).length; i++) {
			if (Object.values(textfields)[i]) {
				$(`[data-fh-textfield=${Object.keys(textfields)[i]}]`).val(Object.values(textfields)[i])
        $(el).attr('data-origin', values(textfields)[i])
			}
		}*/

		// Set site textfields
		for (var i = 0; i < Object.keys(textfields).length; i++) {
			if (Object.values(textfields)[i]) {
        const el = $(`[data-fh-textfield=${Object.keys(textfields)[i]}]`)
				$(el).val(Object.values(textfields)[i])
        $(el).attr('data-origin', Object.values(textfields)[i])
			}
		}

	}) // End MemberStack Fetch

  // Watch for changes
  $('input').change(function() {
      changes.push($(this))
  })

})

// Submit page "Settings"
function submit() {

}
