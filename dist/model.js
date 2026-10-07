export const emptyData=()=>({user:null,spots:[],indicators:[],results:[],dna:null,hands:[],interfaces:[],achievements:[]});
export const emptyAdapter={async load(){return emptyData()}};
export async function loadHeroes(adapter=emptyAdapter){try{const data=await adapter.load();if(!data||typeof data!=='object')throw Error();return {status:'ready',data:{...emptyData(),...data},error:null}}catch{return {status:'error',data:emptyData(),error:'NÃO FOI POSSÍVEL CARREGAR SEU JOGO.'}}}
export const routes=['home','mission','spots','analysis','dna','hands','interfaces','journey','profile'];
export function resolveRoute(hash){const route=hash.replace(/^#\/?/,'');return routes.includes(route)?route:'home'}
export function readPreferences(storage){try{const p=JSON.parse(storage.getItem('heroes.preferences')||'{}');return {format:p?.format==='cash'?'cash':'tournament',reducedMotion:p?.reducedMotion===true}}catch{return {format:'tournament',reducedMotion:false}}}
export function savePreferences(storage,p){try{storage.setItem('heroes.preferences',JSON.stringify(p));return true}catch{return false}}
export function hasResults(data){return Array.isArray(data.results)&&data.results.length>0}
