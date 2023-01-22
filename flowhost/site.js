const id = getUrlVars()["id"]

Webflow.push(() => {
	$memberstackDom.getMemberJSON().then((meta) => {
		const json = meta.data
		const site = json.sites[id]
    const info = site.info
		const settings = site.settings
		const clicks = settings.clicks
		const textfields = settings.textfields

		// Site data
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

		// Settings: clicks
		for (var i = 0; i < Object.keys(clicks).length; i++) {
			if (Object.values(clicks)[i]) {
				$(`[data-fh-click=${Object.keys(clicks)[i]}]`).click()
			}
		}

		// Settings: textfields
		for (var i = 0; i < Object.keys(textfields).length; i++) {
			if (Object.values(textfields)[i]) {
				$(`[data-fh-textfield=${Object.keys(textfields)[i]}]`).val(Object.values(textfields)[i])
			}
		}
	})
})
