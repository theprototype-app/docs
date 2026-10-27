// Boot the deployed app the way every docs capture needs it: service workers blocked (a PROD build
// registers /sw.js, which would hide route mocks and serve stale chunks), reduced motion, the
// first-run prompts answered, toasts hidden, and `window.__stores` published (debugStores).
const { chromium } = require('playwright');

const APP_URL = process.env.APP_URL || 'https://theprototype.pages.dev/';
// Headless WebGL on a real GPU (the 50-int docshot args); swiftshader is the fallback.
const GPU_ARGS = ['--ignore-gpu-blocklist', '--use-angle=vulkan', '--enable-features=Vulkan', '--enable-unsafe-swiftshader',
	'--disable-background-timer-throttling', '--disable-renderer-backgrounding'];

const DEVICES = {
	desktop: { viewport: { width: 1440, height: 900 } },
	// OPPO Find N6, the owner's phone: folded and unfolded (CSS px)
	'n6-folded': { viewport: { width: 390, height: 896 }, hasTouch: true, isMobile: true },
	'n6-unfolded': { viewport: { width: 760, height: 840 }, hasTouch: true, isMobile: true }
};

function launch() {
	return chromium.launch({ headless: true, args: GPU_ARGS });
}

/** @param {import('playwright').Browser} browser */
async function openApp(browser, { device = 'desktop', dpr = 2, theme = 'dark', storage = {}, url = APP_URL, video, motion = false } = {}) {
	const ctx = await browser.newContext({
		...DEVICES[device],
		deviceScaleFactor: dpr,
		serviceWorkers: 'block',
		reducedMotion: motion ? 'no-preference' : 'reduce',
		colorScheme: theme === 'light' ? 'light' : 'dark',
		...(video ? { recordVideo: video } : {})
	});
	await ctx.addInitScript((s) => {
		const set = (k, v) => localStorage.setItem(k, v);
		set('debugStores', 'true');
		set('hasSeenDisclaimer', 'true');
		set('hasSeenWelcome', 'true');
		set('perfOfferDismissed', 'true');
		set('perfReports:offered', 'no');
		set('errorReports:send', 'false');
		for (const [k, v] of Object.entries(s)) set(k, v);
	}, { theme, ...storage });
	const page = await ctx.newPage();
	const errors = [];
	page.on('pageerror', (e) => errors.push(e.message));
	await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 180000 });
	await page.waitForFunction(() => window.__stores && window.__stores.commandsHandler && window.__stores.objectsGroup, null, { timeout: 180000 });
	await page.waitForTimeout(4000);
	await answerRestore(page);
	await page.addStyleTag({ content: '.tp-toast,#toasts,.toasts-stack{display:none!important}' });
	return { ctx, page, errors };
}

async function answerRestore(page) {
	await page.locator('#restore-session-dismiss').click({ timeout: 1500 }).catch(() => {});
}

module.exports = { APP_URL, DEVICES, launch, openApp, answerRestore };
