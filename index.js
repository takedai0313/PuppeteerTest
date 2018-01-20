const puppeteer = require('puppeteer');

(async ()=> {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto('http://nstilab.image.strage.s3-website-ap-northeast-1.amazonaws.com');
	//await page.type('#lst-ib', 'Headless Chrome');
	await page.screenshot({path: 'example.png', fullPage: true});

	browser.close();
})();
