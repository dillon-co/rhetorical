import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
const root=new URL('../dist/',import.meta.url);
const read=name=>readFileSync(new URL(name,root),'utf8');
const code=read('sw.js');
test('offline install includes every app asset and valid installation icons',async()=>{
 const events={};let assets;
 runInNewContext(code,{self:{addEventListener:(name,fn)=>events[name]=fn},caches:{open:async()=>({addAll:async list=>assets=Array.from(list)})}});
 let ready;events.install({waitUntil:p=>ready=p});await ready;
 const files=readdirSync(root,{recursive:true}).filter(name=>/\.(html|js|css|png|webmanifest)$/.test(name)&&name!=='sw.js');
 assert.deepEqual(assets.map(name=>name.slice(2)).sort(),files.sort());
 const manifest=JSON.parse(read('manifest.webmanifest'));
 assert.equal(manifest.display,'standalone');assert.equal(manifest.start_url,'./');
 for(const size of [192,512]){
  const icon=manifest.icons.find(i=>i.sizes===`${size}x${size}`);assert.ok(icon);
  const png=readFileSync(new URL(icon.src,root));assert.equal(png.readUInt32BE(16),size);assert.equal(png.readUInt32BE(20),size);
 }
 assert.ok(read('index.html').includes('rel="manifest"'));
 assert.ok(read('index.html').includes('src="pwa.js"'));
});
test('offline requests use the snapshot and activation keeps unrelated caches',async()=>{
 const events={},deleted=[];let claimed=false,network=0;
 const cache={match:async request=>request==='./index.html'?'PAGE':request.url.endsWith('app.js')?'SCRIPT':undefined};
 runInNewContext(code,{URL,fetch:async()=>{network++;return 'NETWORK';},self:{location:{origin:'https://example.test'},clients:{claim:async()=>claimed=true},addEventListener:(name,fn)=>events[name]=fn},caches:{open:async()=>cache,keys:async()=>['rhetoric-offline-v0','rhetoric-offline-v4','other-app'],delete:async key=>deleted.push(key)}});
 let ready;events.activate({waitUntil:p=>ready=p});await ready;
 assert.deepEqual(deleted,['rhetoric-offline-v0']);assert.ok(claimed);
 async function request(url,mode='cors',method='GET'){
  let response;events.fetch({request:{url,mode,method},respondWith:p=>response=p});return await response;
 }
 assert.equal(await request('https://example.test/practice/?launch=1','navigate'),'PAGE');
 assert.equal(await request('https://example.test/practice/app.js'),'SCRIPT');assert.equal(network,0);
 assert.equal(await request('https://external.test/source'),undefined);
 assert.equal(await request('https://example.test/api','cors','POST'),undefined);
 assert.equal(await request('https://example.test/unknown.png'),'NETWORK');
});
