import {test} from 'node:test';
import assert from 'node:assert/strict';
import {initialState,newSpeech,assembled,validateState,mergeBackup,pickDifferent,timerRemaining} from '../dist/model.js';
import {devices,emotions,parts} from '../dist/content.js';
test('speech variations assemble independently in six-part order',()=>{
 const s=newSpeech('A case for practice');s.sections[0].variants=['first','second'];s.sections[0].selected=1;s.sections[5].variants[0]='finish';
 assert.equal(assembled(s),'second\n\nfinish');assert.equal(s.sections[1].variants[0],'');
 const state=initialState();state.speeches.push(s);state.selectedSpeech=s.id;assert.deepEqual(validateState(JSON.parse(JSON.stringify(state))),state);
});
test('backup merge preserves both conflicting speeches and exercise text',()=>{
 const current=initialState(),s=newSpeech('Original');current.speeches.push(s);current.selectedSpeech=s.id;current.deviceDrafts.chiasmus={text:'My first attempt'};
 const incoming=structuredClone(current);incoming.speeches[0].sections[0].variants[0]='Imported opening';incoming.deviceDrafts.chiasmus.text='Another attempt';
 const merged=mergeBackup(current,incoming);assert.equal(merged.speeches.length,2);assert.equal(merged.speeches[0].sections[0].variants[0],'');assert.notEqual(merged.speeches[0].id,merged.speeches[1].id);assert.match(merged.deviceDrafts.chiasmus.text,/My first attempt[\s\S]*Another attempt/);assert.equal(current.speeches.length,1);
 assert.equal(mergeBackup(current,current).speeches.length,1);
});
test('invalid imports cannot mutate existing work',()=>{
 const s=initialState();const bad=structuredClone(s);bad.speeches=[newSpeech()];bad.speeches[0].sections[0].selected=2;
 assert.throws(()=>mergeBackup(s,bad));assert.equal(s.speeches.length,0);
 for(const data of [null,[],{}, {...s,version:9},{...s,blitz:{...s.blitz,prep:0}},{...s,deviceDrafts:JSON.parse('{"__proto__":{"text":"bad"}}')}]) assert.throws(()=>validateState(data));
});
test('curriculum is complete and has meaningful exercises',()=>{
 assert.equal(parts.length,6);assert.equal(devices.length,31);assert.equal(new Set(devices.map(d=>d.id)).size,31);assert.equal(emotions.length,14);
 for(const d of devices){assert.equal(d.examples.length,2);for(const field of ['mechanism','prompt','check'])assert.ok(d[field].length>20);}
});
test('fresh choices and deadline-based timers',()=>{
 assert.equal(pickDifferent(['a','b'],'a',()=>0),'b');assert.equal(timerRemaining(10000,1001),9);assert.equal(timerRemaining(10000,11000),0);
});
