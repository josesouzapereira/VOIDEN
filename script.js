const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);

let progress=0;
const loaderBar=$("#loaderBar"), loaderPercent=$("#loaderPercent"), loader=$("#loader");
const loaderTimer=setInterval(()=>{
  progress+=Math.floor(Math.random()*9)+3;
  if(progress>=100){progress=100;clearInterval(loaderTimer);setTimeout(()=>loader.classList.add("done"),450)}
  loaderBar.style.width=progress+"%"; loaderPercent.textContent=String(progress).padStart(2,"0");
},80);

const cursor=$(".cursor"), dot=$(".cursor-dot");
let mx=innerWidth/2,my=innerHeight/2,cx=mx,cy=my;
addEventListener("pointermove",e=>{mx=e.clientX;my=e.clientY;dot.style.left=mx+"px";dot.style.top=my+"px"});
function cursorLoop(){cx+=(mx-cx)*.13;cy+=(my-cy)*.13;cursor.style.left=cx+"px";cursor.style.top=cy+"px";requestAnimationFrame(cursorLoop)} cursorLoop();

$$(".magnetic").forEach(el=>{
  el.addEventListener("pointermove",e=>{const r=el.getBoundingClientRect();el.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.18}px,${(e.clientY-r.top-r.height/2)*.18}px)`});
  el.addEventListener("pointerleave",()=>el.style.transform="");
});
$$("a,.product,.menu,.circle-link,.final-button").forEach(el=>{
  el.addEventListener("mouseenter",()=>{cursor.style.width="55px";cursor.style.height="55px"});
  el.addEventListener("mouseleave",()=>{cursor.style.width="34px";cursor.style.height="34px"});
});

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("show")}),{threshold:.12});
$$(".reveal").forEach(el=>observer.observe(el));

const menu=$("#menuBtn"), quick=$("#quickMenu"), closeMenu=$("#closeMenu");
menu.onclick=()=>quick.classList.add("open"); closeMenu.onclick=()=>quick.classList.remove("open");
$$(".quick-menu a").forEach(a=>a.onclick=()=>quick.classList.remove("open"));

const data={
 "01":{title:"VOID HOODIE",price:"R$ 389",code:"V-001 / 047",desc:"460GSM / COTTON / OVERSIZED / WASHED BLACK",art:"p1"},
 "02":{title:"ERROR TEE",price:"R$ 219",code:"V-002 / 047",desc:"240GSM / COTTON / BOX FIT / SCREEN PRINT",art:"p2"},
 "03":{title:"UTILITY PANT",price:"R$ 449",code:"V-003 / 047",desc:"NYLON / 6 POCKETS / ADJUSTABLE / BLACK",art:"p3"},
 "04":{title:"NULL CAP",price:"R$ 149",code:"V-004 / 047",desc:"COTTON / EMBROIDERED / UNSTRUCTURED",art:"p4"}
};
const modal=$("#productModal");
$$(".product").forEach(card=>card.addEventListener("click",()=>{
  const d=data[card.dataset.product];
  $("#modalTitle").textContent=d.title; $("#modalPrice").textContent=d.price; $("#modalCode").textContent=d.code; $("#modalDesc").textContent=d.desc;
  $("#modalArt").className="modal-art "+d.art; modal.classList.add("open"); document.body.style.overflow="hidden";
}));
function closeModal(){modal.classList.remove("open");document.body.style.overflow=""}
$("#modalClose").onclick=closeModal;
addEventListener("keydown",e=>{if(e.key==="Escape"){closeModal();quick.classList.remove("open")}});

addEventListener("scroll",()=>{
  const y=scrollY, h=document.documentElement.scrollHeight-innerHeight;
  document.documentElement.style.setProperty("--scroll",`${Math.min(1,y/h)}`);
  const hero=document.querySelector(".hero-image-inner");
  if(hero) hero.style.transform=`scale(${1.04+y*.00008}) translateY(${y*.025}px)`;
});
document.querySelectorAll(".product-visual").forEach(v=>{
  v.addEventListener("pointermove",e=>{
    const r=v.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
    v.querySelectorAll("::before"); v.style.transform=`perspective(900px) rotateX(${y*-3}deg) rotateY(${x*3}deg) scale(.985)`;
  });
  v.addEventListener("pointerleave",()=>v.style.transform="");
});
$$(".archive-card").forEach((c,i)=>{
  c.addEventListener("pointermove",e=>{const r=c.getBoundingClientRect();c.style.transform=`translateY(${((e.clientY-r.top)/r.height-.5)*-12}px)`});
  c.addEventListener("pointerleave",()=>c.style.transform="");
});
