const { delay } = require("bluebird");
const dayjs = require("dayjs");
const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer-core");
const pc = require("picocolors");
const ora = require("ora");
const spinner = ora();

spinner.color = "green";
spinner.start("正在启动浏览器");

function log(text) {
  spinner.text = text;
}
setInterval(() => {}, 1000);

console.time("耗时");

run();

async function run() {
  const { page, browser } = await createPage();
  await page.goto('https://blog.dolam.fun/');

  // const body = await page.$("body");
  const filename = path.join(__dirname, "image.jpg");

  await page.screenshot({ path: filename });

  spinner.succeed();
  await browser.close();
}
async function createPage() {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath:
      "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  return { browser, page };
}
