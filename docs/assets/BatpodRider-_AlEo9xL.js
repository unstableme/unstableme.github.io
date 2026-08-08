import{j as n,r as l,u as W,a as k}from"./index-BQJiNl4u.js";function q({className:d,style:h}){return n.jsxs("svg",{viewBox:"0 0 560 270",className:d,style:h,fill:"currentColor","aria-hidden":"true",focusable:"false",children:[n.jsx("path",{d:`M338 108
               C 312 84, 268 74, 224 80
               C 186 85, 148 74, 112 58
               C 88 47, 58 44, 34 52
               C 56 62, 64 74, 52 84
               C 78 88, 90 98, 80 110
               C 106 110, 120 120, 112 132
               C 140 130, 158 138, 152 150
               C 182 144, 204 148, 210 158
               C 238 148, 268 142, 292 138
               L 344 126 Z`}),n.jsx("circle",{cx:"118",cy:"196",r:"62"}),n.jsx("circle",{cx:"440",cy:"196",r:"62"}),n.jsx("path",{d:`M118 176
               L 168 160
               L 236 150
               L 330 148
               L 402 156
               L 440 172
               L 452 196
               L 402 210
               L 320 216
               L 220 214
               L 150 208
               L 108 196 Z`}),n.jsx("path",{d:`M232 132
               C 250 108, 286 94, 318 92
               C 344 90, 366 96, 382 108
               L 398 122
               L 380 138
               C 356 128, 330 124, 304 128
               C 276 132, 254 142, 240 154
               L 224 148 Z`}),n.jsx("path",{d:`M382 102
               L 384 84 L 392 98
               C 398 96, 404 96, 410 100
               L 416 86 L 420 104
               C 428 112, 430 122, 424 130
               L 396 126
               C 386 120, 380 112, 382 102 Z`}),n.jsx("path",{d:`M360 116
               L 412 138 L 448 158
               L 442 172 L 400 158
               L 352 134 Z`}),n.jsx("path",{d:"M446 150 L 474 144 L 478 154 L 452 166 Z"}),n.jsx("path",{d:`M244 142
               C 224 148, 208 160, 200 176
               L 188 196 L 204 202
               C 216 188, 232 176, 250 168
               L 262 158 Z`}),n.jsx("path",{d:"M186 192 L 168 198 L 170 210 L 196 208 Z"})]})}function D(){const d=l.useRef(null),h=l.useRef(null),x=l.useRef([]),R=l.useRef(-9999),L=W(),B=k(),M=!L&&!B;return l.useEffect(()=>{const w=d.current;if(!w)return;const e=h.current,o=e==null?void 0:e.getContext("2d");let s=window.innerWidth,a=window.innerHeight;e&&(e.width=s,e.height=a);const Z=()=>{s=window.innerWidth,a=window.innerHeight,e&&(e.width=s,e.height=a)};window.addEventListener("resize",Z);let C=0;const F=()=>s<768?260:420,z=()=>{const g=Math.max(1,document.documentElement.scrollHeight-a),S=Math.max(1,Math.round(g/(a*.9))),b=g/S,r=F(),E=s+2*r,$=Math.min(Math.max(0,window.scrollY),g),p=Math.min(S-1,Math.floor($/b)),v=Math.min(1,($-p*b)/b),u=p%2===0?1:-1,f=u===1?-r+v*E:s-v*E,H=Math.sin(Date.now()/260)*(L?0:3),N=a*.64+v*a*.1+H,i=p===0?1:.7,P=p===0?1:.55;if(w.style.opacity=String(P),w.style.transform=`translate(${f}px, ${N-a*.5}px) scale(${u*i}, ${i}) rotate(3.5deg)`,o&&e&&M){const y=Math.abs(f-R.current),j=f+r/2;if(y>.5&&y<s&&j>-r&&j<s+r){const t=Math.min(6,Math.ceil(y/6));for(let c=0;c<t;c++)x.current.push({x:j-u*(r*.38+Math.random()*30)*i,y:N+30*i+(Math.random()-.5)*40*i,vx:-u*(1.2+Math.random()*1.5),vy:-.4-Math.random()*.8,life:1,size:(10+Math.random()*18)*i})}R.current=f,o.clearRect(0,0,s,a),o.globalCompositeOperation="screen";for(const t of x.current){t.x+=t.vx,t.y+=t.vy,t.vx*=.985,t.vy*=.985,t.life-=.014;const c=t.size*(1+(1-t.life)*1.6),A=Math.max(0,t.life)*.28,m=o.createRadialGradient(t.x,t.y,0,t.x,t.y,c);m.addColorStop(0,`rgba(245, 197, 24, ${A})`),m.addColorStop(.5,`rgba(220, 160, 30, ${A*.35})`),m.addColorStop(1,"rgba(0,0,0,0)"),o.fillStyle=m,o.beginPath(),o.arc(t.x,t.y,c,0,Math.PI*2),o.fill()}x.current=x.current.filter(t=>t.life>0)}C=requestAnimationFrame(z)};return C=requestAnimationFrame(z),()=>{cancelAnimationFrame(C),window.removeEventListener("resize",Z)}},[M,L]),n.jsxs("div",{className:"fixed inset-0 pointer-events-none z-[6]","aria-hidden":"true",children:[M&&n.jsx("canvas",{ref:h,className:"absolute inset-0",style:{filter:"blur(6px)"}}),n.jsxs("div",{ref:d,className:"absolute top-1/2 left-0 will-change-transform",children:[n.jsx("div",{className:"absolute -inset-16",style:{background:"radial-gradient(ellipse 60% 45% at 55% 60%, rgba(245,197,24,0.22) 0%, rgba(245,197,24,0.07) 45%, transparent 70%)"}}),n.jsx(q,{className:"relative w-[260px] md:w-[420px] h-auto text-[#050508]",style:{filter:"drop-shadow(0 0 2px rgba(245,197,24,0.55)) drop-shadow(0 10px 22px rgba(0,0,0,0.9))"}})]})]})}export{D as BatpodRider};
