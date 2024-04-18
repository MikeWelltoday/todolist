describe('Tasks', () => {
	it('base example, visually looks correct', async () => {
		// APIs from jest-puppeteer
		await page.goto('http://localhost:3001/iframe.html?id=app-tasks--primary&viewMode=story',
			{ waitUntil: 'networkidle2' })

		const image = await page.screenshot()

		// API from jest-image-snapshot
		expect(image).toMatchImageSnapshot()
	})
}, 60000)