const puppeteer = require('puppeteer');

const loginUrl = "https://www.hackerrank.com/auth/login";

const email = "jogos25427@seinfaq.com";
const password = "jagga@12345";

const answer = 
`#include <cmath>
#include <cstdio>
#include <vector>
#include <iostream>
#include <algorithm>
using namespace std;
int main() {
    int i,n,sum;
    cin>>n;
    int a[n];
    for(i=0; i<n; i++){
        cin>>a[i];
    }
    sum = 0;
    for(i=0; i<n; i++){
        sum = sum + a[i];
    }
    cout<<sum;
    return 0;
}`


const startBrowser = async () => {
    try {
        const browser = await puppeteer.launch({
            headless: false,
            args: ["--start-maximized"],
            defaultViewport: null
        })
        let page = await browser.newPage();

        await Promise.all([page.goto(loginUrl), page.waitForNavigation()]);

        await page.type("input[id='input-1']", email, { delay: 50 });

        await page.type("input[type='password']", password, { delay: 50 })

        await page.click("button[data-analytics='LoginPassword']", { delay: 50 });

        await waitnClick(".topic-card a[data-attr1='algorithms']", page);

        await waitnClick("input[value='warmup']", page);

        const allChallengeArr = await page.$$(".ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled", { delay: 50 });

        console.log(allChallengeArr.length);


        let questionSolved = questionSolver(page,allChallengeArr[0],answer)





        //  await Promise.all([page.goto(loginUrl),page.waitForNavigation()])

        //  await page.type("#input-1",email,{delay:50});

        //  await page.type("#input-2",password,{delay:50});

        //  await Promise.all([page.click("#tab-1-content-1 > div.login-form.auth-form.theme-m > form > div.form-item.clearfix > button > div > span",{delay:50}),page.waitForNavigation()]);

        //  await Promise.all([page.click("#topics > div.dashboard-section-grid > div > div > ul > li:nth-child(1) > a > div > div",{delay:50}),page.waitForNavigation()]);


        //  const checkel = await page.$(".filter-group:nth-child(4) .checkbox-wrap input");

        //  await Promise.all([checkel.click(),page.waitForSelector("#contest-challenges-problem")])


        //  const buttons = await page.$$("#contest-challenges-problem",{delay:50});

        //  await Promise.all([buttons[0].click({delay:50}),page.waitForNavigation()]);

        //  await page.waitForSelector(".checkbox-input");

        //  const el = await page.$(".checkbox-input");

        //  await el.click();
        // await Promise.all([page.click(".monaco-editor.no-user-select.vs",{delay:50}),page.waitForNavigation()]);

        // await Promise.all([page.click(".checkbox-input"),page.waitForSelector(".custom-input .custominput")]);
    } catch (e) {
        console.log(e);
    }

}
async function waitnClick(selector, cpage) {
    await cpage.waitForSelector(selector);

    let selectorClicked = await cpage.click(selector);

    return selectorClicked;
}

async function questionSolver(page, question, answer) {
    const res = await question.click();

    await page.waitForNavigation();

    await waitnClick(".monaco-editor.no-user-select", page)

    await waitnClick(".checkbox-input", page)

    await page.waitForSelector("textarea#input-1", page);
    
    await page.type("textarea#input-1",answer,{delay:10});

    await page.keyboard.down("Control");

    await page.keyboard.down("A",{delay:100});

    await page.keyboard.down("X",{delay:100});
    
    await page.keyboard.up("Control");

    await waitnClick(".monaco-editor.no-user-select",page)
    
    await page.keyboard.down("Control");
    
    await page.keyboard.down("A",{delay:100});

    await page.keyboard.down("V",{delay:100});

    await page.keyboard.up("Control");

    // await page.click(".hr-monaco__run-code",{delay:50});

    // await page.waitForNavigation();

    await page.click(".hr-monaco-submit",{delay:50})

}

startBrowser();

