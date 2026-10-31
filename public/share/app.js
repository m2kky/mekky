const status=document.querySelector('#status');let timer;
function announce(text){clearTimeout(timer);status.textContent=text;timer=setTimeout(()=>status.textContent='',6500)}
const dialog=document.querySelector('#qr-dialog');
document.querySelector('#qr-open').addEventListener('click',()=>dialog.showModal());
document.querySelector('#qr-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});
document.querySelector('#share').addEventListener('click',async()=>{const url='https://muhammedmekky.com/share';try{if(navigator.share){await navigator.share({title:'Muhammed Mekky',text:'Let’s stay connected.',url})}else{await navigator.clipboard.writeText(url);announce('Link copied. Ready to share.')}}catch(e){if(e.name!=='AbortError')announce('Copy this link: '+url)}});
