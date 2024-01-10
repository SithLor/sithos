import * as fs from 'fs';

//const fetch = require('node-fetch');


function extractUrls(obj) {
    const urls = [];
    for (let key in obj) {
        if (typeof obj[key] === 'string' && obj[key].startsWith('http')) {
            urls.push(obj[key]);
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
            urls.push(...extractUrls(obj[key]));
        }
    }
    return urls;
}
for (let i = 28989; i < 1000000; i++) {
    const e = await fetch(`https://api.scratch.mit.edu/projects/${i}`).then((res) => res.json());
    const urls = extractUrls(e);
    const ID = e.id;
    //create folder with ID
    fs.mkdirSync(`./projects/${ID}`, { recursive: true });
    //download all urls to folder with ID
    for (let i = 0; i < urls.length; i++) {
        const url = urls[i];
        const filename = url.split('/').pop();
        const res = await fetch(url).then((res) => res.arrayBuffer());
        fs.writeFileSync(`./projects/${ID}/${filename}`, Buffer.from(res));
    }
}
const e = await fetch(`https://api.scratch.mit.edu/projects/${2545435}`).then((res) => res.json());
const urls = extractUrls(e);
console.log(e);
console.log(urls);