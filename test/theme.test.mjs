import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
const code=readFileSync(new URL('../dist/theme.js',import.meta.url),'utf8');
function setup(saved,matches=false,fail=false){
 const events={},writes=[],attrs={},root={dataset:{}},notice={textContent:''};let systemChange;
 const document={documentElement:root,querySelector:s=>s==='#notice'?notice:{setAttribute:(k,v)=>attrs[k]=v},addEventListener:(k,fn)=>events[k]=fn};
 runInNewContext(code,{document,window:{matchMedia:()=>({matches,addEventListener:(k,fn)=>systemChange=fn})},localStorage:{getItem:()=>{if(fail)throw Error();return saved;},setItem:(...args)=>{if(fail)throw Error();writes.push(args);}}});
 return {root,attrs,writes,notice,change:matches=>systemChange({matches}),toggle:()=>events.click({target:{closest:()=>true}})};
}
test('theme follows system until explicitly selected, then persists independently',()=>{
 const app=setup(null,true);assert.equal(app.root.dataset.theme,'dark');
 app.change(false);assert.equal(app.root.dataset.theme,'light');
 app.toggle();assert.equal(app.root.dataset.theme,'dark');assert.equal(app.attrs['aria-pressed'],'true');
 assert.deepEqual(app.writes,[['rhetoric-theme','dark']]);
 app.change(false);assert.equal(app.root.dataset.theme,'dark');
 assert.equal(setup('light',true).root.dataset.theme,'light');
 assert.equal(setup('dark',false).root.dataset.theme,'dark');
 assert.equal(setup('invalid',true).root.dataset.theme,'dark');
});
test('theme works when storage is unavailable',()=>{
 const app=setup(null,false,true);app.toggle();assert.equal(app.root.dataset.theme,'dark');assert.match(app.notice.textContent,/could not remember/);
});
