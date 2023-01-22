const id = getUrlVars()["id"]

Webflow.push(() => {

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
						el.attr('src', Object.values(info)[i]).attr('origin', Object.values(info)[i]).removeAttr('srcset')
						break;
					case 'A':
						el.attr('href', `https://${Object.values(info)[i]}`).attr('origin', Object.values(info)[i]).text(Object.values(info)[i])
						break;
					default:
						el.attr('origin', Object.values(info)[i]).text(Object.values(info)[i])
				}
			}
		}

    // Create active settings array
    let changes = []

		// Set site clicks
		for (var i = 0; i < Object.keys(clicks).length; i++) {
			if (Object.values(clicks)[i]) {
				$(`[data-fh-click=${Object.keys(clicks)[i]}]`).click()
			}
		}

		// Set site textfields
		for (var i = 0; i < Object.keys(textfields).length; i++) {
			if (Object.values(textfields)[i]) {
				$(`[data-fh-textfield=${Object.keys(textfields)[i]}]`).val(Object.values(textfields)[i]).attr('origin', values(textfields)[i])
			}
		}

    // Watch for changes
    $('input').change(function() {
        changes.push($(this))
    })
	})

})

// Submit page "Settings"
function submit() {

}
