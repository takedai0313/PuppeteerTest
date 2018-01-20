const puppeteer = require('puppeteer');
const chai = require('chai');
const expect = chai.expect;

describe("バリテーションチェック全パターンの実施", ()=> {
	let browser;
	let page;

	before(async ()=> {
		const puppeteerOption = {
			headless: true,
			timeout: 10000
		};

		browser = await puppeteer.launch(puppeteerOption);
		page = await browser.newPage();
	});

	after(async ()=>{
		await browser.close();
	});

	describe("名前が空白のとき", ()=> {
		it("名前が必須の旨の赤いエラーメッセージが表示される", async ()=> {
			// 画面操作
			await page.goto('http://nstilab.image.strage.s3-website-ap-northeast-1.amazonaws.com'); //inputの値をテストのたびにリセットするためにページ更新
			await page.click('#sexInput label:nth-child(2) input');
			await page.type('#email', 'test_test01@test.co.jp');
			await page.type('#confirmEmail', 'test_test01@test.co.jp');
			await page.select('#browser', 'Chrome');
			await page.type('#message', 'テストメッセージ');
			await page.click('#agreementInput label input');
			await page.click('#sendButton');
			// 一応キャプチャをとる
			await page.screenshot({path: 'img/01_nameTest1.png', fullPage: true});

			//テスト対象の要素取得(Textと色)
			const testedElementId = '#errorInfo span';
			await page.waitFor(testedElementId);
			const testedText = await page.$eval(testedElementId, testedText=> testedText.innerText);
			const testedColor = await page.$eval(testedElementId, testedColor=> testedColor.style.color);

			//テスト実施
			expect(testedText).to.eql("名前は必須項目です\n");
			expect(testedColor).to.eql("red");
		});
	});

	describe("名前が50文字以上入力されたとき", ()=> {
		it("名前の文字数の上限をオーバーしている旨の赤いエラーメッセージが表示される", async ()=> {
			// 画面操作
			await page.goto('http://nstilab.image.strage.s3-website-ap-northeast-1.amazonaws.com'); //inputの値をテストのたびにリセットするためにページ更新
			await page.type('#name', 'あいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあ');
			await page.click('#sexInput label:nth-child(2) input');
			await page.type('#email', 'test_test01@test.co.jp');
			await page.type('#confirmEmail', 'test_test01@test.co.jp');
			await page.select('#browser', 'Chrome');
			await page.type('#message', 'テストメッセージ');
			await page.click('#agreementInput label input');
			await page.click('#sendButton');
			// 一応キャプチャをとる
			await page.screenshot({path: 'img/02_nameTest2.png', fullPage: true});

			//テスト対象の要素取得(Textと色)
			const testedElementId = '#errorInfo span';
			await page.waitFor(testedElementId);
			const testedText = await page.$eval(testedElementId, testedText=> testedText.innerText);
			const testedColor = await page.$eval(testedElementId, testedColor=> testedColor.style.color);


			//テスト実施
			expect(testedText).to.eql("名前は50文字以下で入力してください\n");
			expect(testedColor).to.eql("red");
		});
	});

	describe("性別が選択されなかったとき", ()=> {
		it("性別選択が必須の旨の赤いエラーメッセージが表示される", async ()=> {
			// 画面操作
			await page.goto('http://nstilab.image.strage.s3-website-ap-northeast-1.amazonaws.com'); //inputの値をテストのたびにリセットするためにページ更新
			await page.type('#name', 'テストテスト');
			await page.type('#email', 'test_test01@test.co.jp');
			await page.type('#confirmEmail', 'test_test01@test.co.jp');
			await page.select('#browser', 'Chrome');
			await page.type('#message', 'テストメッセージ');
			await page.click('#agreementInput label input');
			await page.click('#sendButton');
			// 一応キャプチャをとる
			await page.screenshot({path: 'img/03_sexTest.png', fullPage: true});

			//テスト対象の要素取得(Textと色)
			const testedElementId = '#errorInfo span';
			await page.waitFor(testedElementId);
			const testedText = await page.$eval(testedElementId, testedText=> testedText.innerText);
			const testedColor = await page.$eval(testedElementId, testedColor=> testedColor.style.color);


			//テスト実施
			expect(testedText).to.eql("性別は必須項目です\n");
			expect(testedColor).to.eql("red");
		});
	});

	describe("メールアドレスが入力されなかったとき", ()=> {
		it("メールアドレスが必須の旨の赤いエラーメッセージが表示される", async ()=> {
			// 画面操作
			await page.goto('http://nstilab.image.strage.s3-website-ap-northeast-1.amazonaws.com'); //inputの値をテストのたびにリセットするためにページ更新
			await page.type('#name', 'テストテスト');
			await page.click('#sexInput label:nth-child(2) input');
			await page.type('#confirmEmail', 'test_test01@test.co.jp');
			await page.select('#browser', 'Chrome');
			await page.type('#message', 'テストメッセージ');
			await page.click('#agreementInput label input');
			await page.click('#sendButton');
			// 一応キャプチャをとる
			await page.screenshot({path: 'img/04_mailTest.png', fullPage: true});

			//テスト対象の要素取得(Textと色)
			const testedElementId = '#errorInfo span';
			await page.waitFor(testedElementId);
			const testedText = await page.$eval(testedElementId, testedText=> testedText.innerText);
			const testedColor = await page.$eval(testedElementId, testedColor=> testedColor.style.color);


			//テスト実施
			expect(testedText).to.eql("メールアドレスは必須です\n");
			expect(testedColor).to.eql("red");
		});
	});

	describe("メールアドレスが201文字入力されたとき", ()=> {
		it("メールアドレスは200文字以下の旨の赤いエラーメッセージが表示される", async ()=> {
			// 画面操作
			await page.goto('http://nstilab.image.strage.s3-website-ap-northeast-1.amazonaws.com'); //inputの値をテストのたびにリセットするためにページ更新
			await page.type('#name', 'テストテスト');
			await page.click('#sexInput label:nth-child(2) input');
			await page.type('#email', 'teststeststeststeststeststeststeststeststeststeststeststeststeststeststeststeststeststeststeststeststeststeststeststeststeststeststeststeststeststeststeststeststeststeststeststeststeststests@test.co.jp');
			await page.type('#confirmEmail', 'teststeststeststeststeststeststeststeststeststeststeststeststeststeststeststeststeststeststeststeststeststeststeststeststeststeststeststeststeststeststeststeststeststeststeststeststeststests@test.co.jp');
			await page.select('#browser', 'Chrome');
			await page.type('#message', 'テストメッセージ');
			await page.click('#agreementInput label input');
			await page.click('#sendButton');
			// 一応キャプチャをとる
			await page.screenshot({path: 'img/05_mailTest.png', fullPage: true});

			//テスト対象の要素取得(Textと色)
			const testedElementId = '#errorInfo span';
			await page.waitFor(testedElementId);
			const testedText = await page.$eval(testedElementId, testedText=> testedText.innerText);
			const testedColor = await page.$eval(testedElementId, testedColor=> testedColor.style.color);


			//テスト実施
			expect(testedText).to.eql("メールアドレスは200文字以下です\n");
			expect(testedColor).to.eql("red");
		});
	});

	describe("期待するメールアドレスの形式じゃなかったとき", ()=> {
		it("期待するメールアドレスではない旨の赤いエラーメッセージが表示される", async ()=> {
			// 画面操作
			await page.goto('http://nstilab.image.strage.s3-website-ap-northeast-1.amazonaws.com'); //inputの値をテストのたびにリセットするためにページ更新
			await page.type('#name', 'テストテスト');
			await page.click('#sexInput label:nth-child(2) input');
			await page.type('#email', 'test_test01');
			await page.type('#confirmEmail', 'test_test01');
			await page.select('#browser', 'Chrome');
			await page.type('#message', 'テストメッセージ');
			await page.click('#agreementInput label input');
			await page.click('#sendButton');
			// 一応キャプチャをとる
			await page.screenshot({path: 'img/06_mailTest.png', fullPage: true});

			//テスト対象の要素取得(Textと色)
			const testedElementId = '#errorInfo span';
			await page.waitFor(testedElementId);
			const testedText = await page.$eval(testedElementId, testedText=> testedText.innerText);
			const testedColor = await page.$eval(testedElementId, testedColor=> testedColor.style.color);


			//テスト実施
			expect(testedText).to.eql("正しいメールアドレスの形式ではありません\n");
			expect(testedColor).to.eql("red");
		});
	});

	describe("メールアドレスが確認用メールアドレスと一致していなかったとき", ()=> {
		it("メールアドレスが一致しない旨の赤いエラーメッセージが表示される", async ()=> {
			// 画面操作
			await page.goto('http://nstilab.image.strage.s3-website-ap-northeast-1.amazonaws.com'); //inputの値をテストのたびにリセットするためにページ更新
			await page.type('#name', 'テストテスト');
			await page.click('#sexInput label:nth-child(2) input');
			await page.type('#email', 'test_test01@test.co.jp');
			await page.type('#confirmEmail', 'test_test02@test.co.jp');
			await page.select('#browser', 'Chrome');
			await page.type('#message', 'テストメッセージ');
			await page.click('#agreementInput label input');
			await page.click('#sendButton');
			// 一応キャプチャをとる
			await page.screenshot({path: 'img/07_mailTest.png', fullPage: true});

			//テスト対象の要素取得(Textと色)
			const testedElementId = '#errorInfo span';
			await page.waitFor(testedElementId);
			const testedText = await page.$eval(testedElementId, testedText=> testedText.innerText);
			const testedColor = await page.$eval(testedElementId, testedColor=> testedColor.style.color);


			//テスト実施
			expect(testedText).to.eql("確認用メールアドレスが一致しません\n");
			expect(testedColor).to.eql("red");
		});
	});

	describe("メッセージに501文字以上入力されたとき", ()=> {
		it("メッセージは500文字以下である旨の赤いエラーメッセージが表示される", async ()=> {
			// 画面操作
			await page.goto('http://nstilab.image.strage.s3-website-ap-northeast-1.amazonaws.com'); //inputの値をテストのたびにリセットするためにページ更新
			await page.type('#name', 'テストテスト');
			await page.click('#sexInput label:nth-child(2) input');
			await page.type('#email', 'test_test01@test.co.jp');
			await page.type('#confirmEmail', 'test_test01@test.co.jp');
			await page.select('#browser', 'Chrome');
			await page.type('#message', 'あいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあ');
			await page.click('#agreementInput label input');
			await page.click('#sendButton');
			// 一応キャプチャをとる
			await page.screenshot({path: 'img/08_msgTest.png', fullPage: true});

			//テスト対象の要素取得(Textと色)
			const testedElementId = '#errorInfo span';
			await page.waitFor(testedElementId);
			const testedText = await page.$eval(testedElementId, testedText=> testedText.innerText);
			const testedColor = await page.$eval(testedElementId, testedColor=> testedColor.style.color);


			//テスト実施
			expect(testedText).to.eql("メッセージは500文字以下です\n");
			expect(testedColor).to.eql("red");
		});
	});

	describe("規約の確認チェックがされていなかったとき", ()=> {
		it("規約確認のチェックがされていない旨の赤いエラーメッセージが表示される", async ()=> {
			// 画面操作
			await page.goto('http://nstilab.image.strage.s3-website-ap-northeast-1.amazonaws.com'); //inputの値をテストのたびにリセットするためにページ更新
			await page.type('#name', 'テストテスト');
			await page.click('#sexInput label:nth-child(2) input');
			await page.type('#email', 'test_test01@test.co.jp');
			await page.type('#confirmEmail', 'test_test01@test.co.jp');
			await page.select('#browser', 'Chrome');
			await page.type('#message', 'テストメッセージ');
			await page.click('#sendButton');
			// 一応キャプチャをとる
			await page.screenshot({path: 'img/08_agreementTest.png', fullPage: true});

			//テスト対象の要素取得(Textと色)
			const testedElementId = '#errorInfo span';
			await page.waitFor(testedElementId);
			const testedText = await page.$eval(testedElementId, testedText=> testedText.innerText);
			const testedColor = await page.$eval(testedElementId, testedColor=> testedColor.style.color);

			//テスト実施
			expect(testedText).to.eql("規約を確認し、規約確認にチェックをつけてください\n");
			expect(testedColor).to.eql("red");
		});
	});

	describe("複数(全て)の入力欄が空白だったとき", ()=> {
		it("全てのエラーメッセージが赤で表示される", async ()=> {
			// 画面操作
			await page.goto('http://nstilab.image.strage.s3-website-ap-northeast-1.amazonaws.com'); //inputの値をテストのたびにリセットするためにページ更新
			await page.click('#sendButton');
			// 一応キャプチャをとる
			await page.screenshot({path: 'img/09_allTest.png', fullPage: true});

			//テスト対象の要素取得(Textと色)
			const testedElementId = '#errorInfo span';
			await page.waitFor(testedElementId);
			const testedText = await page.$eval(testedElementId, testedText=> testedText.innerHTML);
			const testedColor = await page.$eval(testedElementId, testedColor=> testedColor.style.color);
			const arrayTestedTxt = testedText.split("<br>");

			//テスト実施
			expect(arrayTestedTxt.length).to.eql(5);
			expect(arrayTestedTxt[0]).to.eql("名前は必須項目です");
			expect(arrayTestedTxt[1]).to.eql("性別は必須項目です");
			expect(arrayTestedTxt[2]).to.eql("メールアドレスは必須です");
			expect(arrayTestedTxt[3]).to.eql("規約を確認し、規約確認にチェックをつけてください");
			expect(testedColor).to.eql("red");
		});
	});
});
