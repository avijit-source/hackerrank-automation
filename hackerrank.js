const puppeteer = require('puppeteer');

const loginUrl = "https://www.hackerrank.com/auth/login";

const email = "YOUR_EMAIL";
const password = "YOUR_PASS";

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

    await page.click(".hr-monaco-submit",{delay:50})

}

startBrowser();

