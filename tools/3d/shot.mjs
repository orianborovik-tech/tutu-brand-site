import {chromium} from 'playwright-core';
const [file,out,yaw='0',zoom='1']=process.argv.slice(2);
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium',args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});
const p=await b.newPage({viewport:{width:1200,height:1200}});
p.on('console',m=>console.log('[page]',m.text()));
await p.goto(`http://127.0.0.1:8765/render.html?file=${file}&yaw=${yaw}&zoom=${zoom}`);
await p.waitForFunction(()=>window.done||window.err,{timeout:120000});
await p.screenshot({path:out}); await b.close();
