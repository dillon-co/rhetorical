import {test} from 'node:test';
import assert from 'node:assert/strict';
import {speechStudies} from '../dist/studies.js';
import {emotions,parts} from '../dist/content.js';
import {studyEmotions} from '../dist/study-emotions.js';
import {emotionGuidance} from '../dist/emotion-guidance.js';
import {initialState,newSpeech} from '../dist/model.js';

test('speech studies show complete text, switch to openings, and preserve writing', async()=>{
 const state=initialState();const draft=newSpeech('My argument');draft.sections[0].variants=['First opening','Another opening'];draft.sections[0].selected=1;state.speeches=[draft];state.selectedSpeech=draft.id;
 for(const emotion of emotions)state.emotionDrafts[emotion.id]={state:'My audience context',passage:`My ${emotion.id} appeal`};
 const saved=JSON.stringify(state),root={innerHTML:''},devicePanel={innerHTML:''},events={};
 const original={document:globalThis.document,window:globalThis.window,localStorage:globalThis.localStorage};
 let writes=0;
 globalThis.localStorage={getItem:()=>saved,setItem:()=>{writes++;}};
 globalThis.document={querySelector:selector=>selector==='#app'?root:selector==='#workshop-device-content'?devicePanel:selector==='#main'?{focus(){}}:null,addEventListener:(name,fn)=>{events[name]=fn;}};
 globalThis.window={addEventListener(){}};
 const click=dataset=>events.click({target:{closest:()=>({dataset})}});
 try{
  await import('../dist/app.js');
  assert.ok(root.innerHTML.includes('id="workshop-device-select"'));
  const editorBefore=root.innerHTML;
  await events.change({target:{id:'workshop-device-select',value:'metaphor'}});
  assert.ok(devicePanel.innerHTML.includes('Trust is the foundation; promises are only the paint.'));
  assert.ok(devicePanel.innerHTML.includes('Give an idea another form'));
  assert.equal(root.innerHTML,editorBefore,'Changing the reference must not rerender the editor');
  assert.equal(writes,0);
  click({page:'studies'});
  const study=speechStudies[0];
  const text=study.sections.map(section=>section.text).join(' ');
  assert.equal(text.match(/\b[\w]+(?:[-’'][\w]+)*\b/g).length,271);
  assert.ok(text.endsWith('shall not perish from the earth.'));
  assert.ok(!text.includes('...'));
  for(const section of study.sections){
   assert.ok(root.innerHTML.includes(section.text));
   assert.ok(root.innerHTML.includes(`id="study-label-${section.part}"`));
   assert.ok(root.innerHTML.includes(section.explanation));
  }
  for(const entry of speechStudies){
   await events.change({target:{id:'study-select',value:entry.id}});
   assert.ok(root.innerHTML.includes(entry.title.replaceAll('&','&amp;')));
   const anchors=[...root.innerHTML.matchAll(/id="study-part-(\d+)"/g)].map(match=>match[1]);
   assert.equal(anchors.length,entry.sections.length);
   assert.equal(new Set(anchors).size,anchors.length);
   assert.ok(root.innerHTML.includes('Devices to notice'));
   assert.ok(root.innerHTML.includes('Six-part arrangement key'));
   assert.equal((root.innerHTML.match(/<summary title=/g)||[]).length,6);
   for(const part of parts)assert.ok(root.innerHTML.includes(part[1]));
   assert.ok(root.innerHTML.includes('Emotions this passage may evoke'));
   assert.ok(root.innerHTML.includes('Audience’s state of mind'));
   assert.ok(root.innerHTML.includes('Whom the feeling concerns'));
   assert.ok(root.innerHTML.includes('What provokes it'));
   assert.ok(root.innerHTML.includes('not a measured audience response'));
   for(const note of studyEmotions[entry.id]){
    assert.ok(entry.sections[note.section],`${entry.id}: missing passage`);
    assert.ok(emotions.some(e=>e.id===note.emotion));
    for(const field of ['effect','mechanism','state','person','cause'])assert.ok(note[field].length>20);
   }
   assert.ok(root.innerHTML.includes('class="speech-reader"'));
   if(entry.mode==='guide'){
    assert.ok(root.innerHTML.includes('Read the complete speech'));
    assert.ok(root.innerHTML.includes('not the complete speech'));
   }else assert.ok(root.innerHTML.includes('class="speech-reader-text"'));

  }
  await events.change({target:{id:'study-select',value:'jobs'}});
  const readerWrites=writes;
  events.input({target:{id:'reader-text',value:'My copy <script>unsafe</script>'}});
  await events.change({target:{id:'study-select',value:'churchill'}});
  assert.ok(!root.innerHTML.includes('My copy'));
  await events.change({target:{id:'study-select',value:'jobs'}});
  assert.ok(root.innerHTML.includes('My copy &lt;script&gt;unsafe&lt;/script&gt;'));
  assert.equal(writes,readerWrites);
  await events.change({target:{id:'study-select',value:'openings'}});
  assert.ok(root.innerHTML.includes('Ways to open a speech'));
  assert.ok(root.innerHTML.includes('One argument. Different openings.'));
  assert.ok(root.innerHTML.includes('Julius Caesar — Before facing Ariovistus in Gaul'));
  assert.ok(root.innerHTML.includes('Modern retelling supplied for the study'));
  assert.ok(root.innerHTML.includes('Challenge to authority'));
  assert.equal((root.innerHTML.match(/class="historical-opening"/g)||[]).length,7);
  await events.change({target:{id:'study-select',value:'gettysburg'}});
  assert.ok(root.innerHTML.includes('Full text of the Bliss copy'));
  click({page:'emotions',emotion:'emulation'});
  assert.ok(root.innerHTML.includes('<option value="emulation" selected>'));
  for(const emotion of emotions){
   await events.change({target:{id:'emotion-select',value:emotion.id}});
   const guide=emotionGuidance[emotion.id];
   assert.ok(guide,`Missing outline for ${emotion.id}`);
   for(const field of ['definition','state','person','cause','distinction']){
    assert.ok(guide[field].length>40);
    assert.ok(root.innerHTML.includes(guide[field]));
   }
   assert.ok(root.innerHTML.includes(`Book II, Part ${guide.chapter}`));
   assert.ok(root.innerHTML.includes('My audience context'));
   assert.ok(root.innerHTML.includes(`My ${emotion.id} appeal`));
  }
  const writesAfterEmotionSelection=writes;
  click({page:'studies',study:'endings'});
  assert.ok(root.innerHTML.includes('Ways to end a speech'));
  assert.ok(root.innerHTML.includes('One argument. Five endings.'));
  assert.equal((root.innerHTML.match(/class="historical-opening"/g)||[]).length,6);
  assert.ok(root.innerHTML.includes('William Wirt'));
  click({page:'workshop',workshopPart:'5'});
  assert.ok(root.innerHTML.includes('Explore historical endings & practice drill'));
  assert.ok(root.innerHTML.includes('Conclusion, variation 1'));
  click({part:'0'});
  click({page:'voice'});
  assert.ok(root.innerHTML.includes('data-page="voice" aria-current="page"'));
  assert.ok(root.innerHTML.includes('One passage. Four deliveries.'));
  assert.equal((root.innerHTML.match(/Quintilian’s advice:/g)||[]).length,5);
  assert.ok(root.innerHTML.includes('modern adaptations'));
  assert.ok(root.innerHTML.includes('Institutio Oratoria XI.3, §§52–54'));
  assert.ok(root.innerHTML.includes('data-page="studies"'));
  click({page:'workshop'});
  assert.ok(root.innerHTML.includes('Another opening'));
  assert.ok(!root.innerHTML.includes('Ways to open a speech'));
  click({page:'studies',study:'openings'});
  assert.ok(root.innerHTML.includes('Ways to open a speech'));
  assert.equal(writes,writesAfterEmotionSelection);
 }finally{Object.assign(globalThis,original);}
});

test('full transcripts and device quotations remain intact',()=>{
 const ids=speechStudies.map(study=>study.id);
 assert.equal(new Set(ids).size,ids.length);
 for(const study of speechStudies){
  assert.equal(new URL(study.source).protocol,'https:');
  let count=0;
  for(const section of study.sections){
   assert.ok(Number.isInteger(section.part)&&section.part>=0&&section.part<6);
   assert.ok(section.text&&section.explanation);
   for(const device of section.devices||[]){
    count++;
    assert.ok(device.name&&device.quote&&device.mechanism&&device.tryIt);
    if(study.mode!=='guide')assert.ok(section.text.includes(device.quote),`${study.id}: missing quotation`);
   }
  }
  assert.ok(count>=3,`${study.id}: needs device examples`);
 }
 for(const [id,words] of [['jfk-inaugural',1341],['reagan-brandenburg',2674]]){
  const text=speechStudies.find(study=>study.id===id).sections.map(section=>section.text).join(' ');
  assert.equal(text.trim().split(/\s+/).length,words);
 }
});

 test('Caesar in Gaul uses the supplied retelling with explicit attribution limits',()=>{
 const study=speechStudies.find(s=>s.id==='caesar-gaul');
 const text=study.sections.map(s=>s.text).join(' ');
 assert.match(study.edition,/User-supplied version/);
 assert.match(study.edition,/neither version is a verbatim transcript/);
 assert.ok(text.startsWith('Instead of negotiating or promising them rewards'));
 assert.ok(text.includes('to question where I am leading you?'));
 assert.ok(text.endsWith('while you lot crawl home in disgrace.”'));
 assert.equal(study.sections.length,6);
 });

test('Opis replaces Pharsalus and includes the conclusion',()=>{
 assert.ok(!speechStudies.some(s=>s.id==='caesar'));
 const study=speechStudies.find(s=>s.id==='alexander-opis');
 assert.equal(study.sections.length,7);
 assert.ok(study.sections.at(-1).text.endsWith('Go!”'));
 assert.match(study.edition,/Plain-English rendering/);
});
