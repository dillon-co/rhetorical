import {test} from 'node:test';
import assert from 'node:assert/strict';
import {initialState,validateState,mergeBackup} from '../dist/model.js';
import {coreDevices,devices,topics} from '../dist/content.js';

test('device subjects persist with drafts and can change independently',async()=>{
 const state=initialState();state.deviceDrafts.chiasmus={text:'My existing lines'};
 const root={innerHTML:''},events={};let saved=JSON.stringify(state);
 const original={document:globalThis.document,window:globalThis.window,localStorage:globalThis.localStorage};
 globalThis.document={querySelector:s=>s==='#app'?root:s==='#main'?{focus(){}}:null,addEventListener:(name,fn)=>events[name]=fn};
 globalThis.window={addEventListener(){}};
 globalThis.localStorage={getItem:()=>saved,setItem:(key,value)=>saved=value};
 const click=dataset=>events.click({target:{closest:()=>({dataset})}});
 try{
  await import('../dist/app.js');
  click({page:'devices'});
  assert.equal((root.innerHTML.match(/★ Start here · /g)||[]).length,7);
  for(const id of coreDevices)assert.ok(devices.some(d=>d.id===id));
  const first=JSON.parse(saved).deviceDrafts.chiasmus.topic;
  assert.ok(topics.includes(first));
  assert.ok(root.innerHTML.includes('My existing lines'));
  click({action:'random-device-topic'});
  let draft=JSON.parse(saved).deviceDrafts.chiasmus;
  assert.notEqual(draft.topic,first);assert.equal(draft.text,'My existing lines');
  const second=draft.topic;
  events.input({target:{id:'device-text',value:'A revised line'}});
  await events.change({target:{id:'device-select',value:'metaphor'}});
  assert.ok(topics.includes(JSON.parse(saved).deviceDrafts.metaphor.topic));
  await events.change({target:{id:'device-select',value:'chiasmus'}});
  assert.equal(JSON.parse(saved).deviceDrafts.chiasmus.topic,second);
  assert.ok(root.innerHTML.includes('A revised line'));
  const restored=validateState(JSON.parse(saved));
  assert.equal(mergeBackup(initialState(),restored).deviceDrafts.chiasmus.topic,second);
  click({action:'random-device'});
  assert.ok(root.innerHTML.includes('Your practice subject'));
 }finally{Object.assign(globalThis,original);}
});
