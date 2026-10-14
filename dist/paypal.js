(()=>{
 const config=JSON.parse(document.querySelector('#paypal-config').textContent);
 const load=document.querySelector('#paypal-load'),status=document.querySelector('#paypal-status');
 let rendered=false,loading=false;
 function syncDiscount(){const active=!document.querySelector('#remove').hidden;document.querySelector('#paypal-payment-area').hidden=active;document.querySelector('#paypal-discount-warning').hidden=!active;}
 new MutationObserver(syncDiscount).observe(document.querySelector('#remove'),{attributes:true,attributeFilter:['hidden']});syncDiscount();
 load.addEventListener('click',async()=>{
  if(loading||rendered)return;loading=true;load.disabled=true;status.textContent=config.loading;
  try{
   if(!window.paypal?.HostedButtons){await new Promise((resolve,reject)=>{
    document.querySelector('#lumibrain-paypal-sdk')?.remove();
    const script=document.createElement('script');script.id='lumibrain-paypal-sdk';
    script.src='https://www.paypal.com/sdk/js?client-id=BAAoLz38ZtN18icDU9woa3UrycFHVH2OQb6UJedjgg80KXeZ0DAZK7K0giVgP1wcjWP0BjmCFsrorGGJsw&components=hosted-buttons&enable-funding=venmo&currency=USD&locale='+encodeURIComponent(config.locale);
    script.onload=resolve;script.onerror=reject;document.head.appendChild(script);
   });}
   if(!window.paypal?.HostedButtons)throw new Error('HostedButtons unavailable');
   await window.paypal.HostedButtons({hostedButtonId:'KZPW6SPBU9VSG'}).render('#paypal-container-KZPW6SPBU9VSG');
   rendered=true;load.hidden=true;status.textContent='';
  }catch(error){status.textContent=config.error;load.disabled=false;document.querySelector('#paypal-container-KZPW6SPBU9VSG').replaceChildren();}
  finally{loading=false;}
 });
})();
