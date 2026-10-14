const config=JSON.parse(document.querySelector('#locale-config').textContent);
const money=cents=>new Intl.NumberFormat(config.locale,{style:'currency',currency:config.currency}).format(cents/100);
for(const el of document.querySelectorAll('[data-money]'))el.textContent=money(Number(el.dataset.money));
for(const select of document.querySelectorAll('.language-select'))select.addEventListener('change',()=>{window.location.href=select.value;});
const checkout=document.querySelector('#checkout');
for(const b of document.querySelectorAll('[data-open]'))b.addEventListener('click',()=>checkout.showModal());
for(const b of document.querySelectorAll('.close'))b.addEventListener('click',()=>b.closest('dialog').close());
document.querySelector('#privacy').addEventListener('click',e=>{e.preventDefault();document.querySelector('#privacyDialog').showModal();});
for(const d of document.querySelectorAll('dialog'))d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close();}});
const offers={LUMI10:{percent:10,id:'DEMO-LUMI'},PARTNER15:{percent:15,id:'DEMO-PARTNER'}};
function totals(percent){const discount=Math.round(config.annualCents*percent/100);return{discount,total:config.rentalCents+config.annualCents-discount,net:config.annualCents-discount};}
function reset(){document.querySelector('#discount').textContent=money(0);document.querySelector('#total').textContent=money(totals(0).total);document.querySelector('#attribution').textContent=config.refund;document.querySelector('#remove').hidden=true;}
function apply(){reset();const code=document.querySelector('#code').value.trim().toUpperCase();if(!Object.hasOwn(offers,code)){document.querySelector('#status').textContent=config.invalid;return;}const o=offers[code],t=totals(o.percent);document.querySelector('#discount').textContent='−'+money(t.discount)+' ('+o.percent+'%)';document.querySelector('#total').textContent=money(t.total);document.querySelector('#status').textContent=config.applied;document.querySelector('#attribution').textContent=o.id+' · '+config.commission+' '+o.percent+'% · '+money(Math.round(t.net*o.percent/100))+'. '+config.refund;document.querySelector('#remove').hidden=false;}
document.querySelector('#apply').addEventListener('click',apply);document.querySelector('#code').addEventListener('keydown',e=>{if(e.key==='Enter')apply();});document.querySelector('#remove').addEventListener('click',()=>{reset();document.querySelector('#code').value='';document.querySelector('#status').textContent=config.removed;});
