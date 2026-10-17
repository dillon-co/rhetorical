import {devices, emotions, topics} from './content.js';
export const STORAGE_KEY = 'rhetoric-practice-v1';
export const uid = () => crypto.randomUUID();
export function newSpeech(title='Untitled speech') {
  return {id:uid(),title,sections:Array.from({length:6},()=>({selected:0,variants:['']}))};
}
export function initialState() {
  return {version:1,speeches:[],selectedSpeech:null,hideHints:false,deviceDrafts:{},emotionDrafts:{},blitz:{topic:topics[0],device:devices[0].id,notes:'',timed:false,prep:60,speak:180}};
}
export function assembled(speech) {return speech.sections.map(s=>s.variants[s.selected]).filter(Boolean).join('\n\n');}
const record = v => v !== null && typeof v === 'object' && !Array.isArray(v);
const string = v => typeof v === 'string';
export function validateState(s) {
  if (!record(s) || s.version !== 1 || !Array.isArray(s.speeches) || typeof s.hideHints !== 'boolean') throw Error('This is not a supported Rhetoric backup.');
  const ids = new Set();
  for(const speech of s.speeches) {
    if (!record(speech) || !string(speech.id) || ids.has(speech.id) || !string(speech.title) || !Array.isArray(speech.sections) || speech.sections.length!==6) throw Error('The backup contains an invalid speech.');
    ids.add(speech.id);
    for(const section of speech.sections) if (!record(section) || !Array.isArray(section.variants) || !section.variants.length || !section.variants.every(string) || !Number.isInteger(section.selected) || section.selected<0 || section.selected>=section.variants.length) throw Error('The backup contains an invalid variation.');
  }
  if (s.selectedSpeech!==null && !ids.has(s.selectedSpeech)) throw Error('The backup has an invalid selected speech.');
  for(const [name,items] of [['deviceDrafts',devices],['emotionDrafts',emotions]]) {
    if (!record(s[name])) throw Error('The backup contains invalid exercises.');
    const allowed=new Set(items.map(i=>i.id));
    for(const [key,val] of Object.entries(s[name])) {
      if (!allowed.has(key) || !record(val)) throw Error('The backup contains an unknown exercise.');
      const fields=name==='deviceDrafts'?['text','topic']:['state','person','cause','passage'];
      if (Object.keys(val).some(k=>!fields.includes(k)) || !Object.values(val).every(string)) throw Error('The backup contains invalid exercise text.');
    }
  }
  const b=s.blitz;
  if(!record(b) || !string(b.topic) || !string(b.notes) || !devices.some(d=>d.id===b.device) || typeof b.timed!=='boolean' || ![b.prep,b.speak].every(n=>Number.isInteger(n)&&n>=1&&n<=3600)) throw Error('The backup contains invalid blitz settings.');
  return s;
}
export function mergeBackup(current, incoming) {
  validateState(incoming);
  const next=structuredClone(current);
  for(const speech of incoming.speeches) {
    if(next.speeches.some(s=>JSON.stringify(s)===JSON.stringify(speech))) continue;
    const copy=structuredClone(speech);
    if(next.speeches.some(s=>s.id===copy.id)) {copy.id=uid();copy.title += ' (imported)';}
    next.speeches.push(copy);
  }
  next.selectedSpeech ||= next.speeches[0]?.id || null;
  for(const name of ['deviceDrafts','emotionDrafts']) for(const [id,fields] of Object.entries(incoming[name])) {
    next[name][id] ||= {};
    for(const [key,value] of Object.entries(fields)) {
      const old=next[name][id][key] || '';
      next[name][id][key] = !old ? value : !value || old===value ? old : old+'\n\n— Imported practice —\n'+value;
    }
  }
  if(incoming.blitz.notes && incoming.blitz.notes!==next.blitz.notes) next.blitz.notes += (next.blitz.notes?'\n\n':'')+'Imported round: '+incoming.blitz.topic+'\n'+incoming.blitz.notes;
  return validateState(next);
}
export function pickDifferent(items,current,random=Math.random) {
  const options=items.filter(x=>x!==current);
  return options[Math.floor(random()*options.length)] ?? current;
}
export function timerRemaining(deadline,now=Date.now()) {return Math.max(0,Math.ceil((deadline-now)/1000));}
