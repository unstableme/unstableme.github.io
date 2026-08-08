import{j as e,r as c,u as B,a as F}from"./index-C-NYSpAs.js";function P({className:l,style:d}){return e.jsxs("svg",{viewBox:"0 0 560 270",className:l,style:d,fill:"currentColor","aria-hidden":"true",focusable:"false",children:[e.jsx("path",{d:`M338 108
               C 312 84, 268 74, 224 80
               C 186 85, 148 74, 112 58
               C 88 47, 58 44, 34 52
               C 56 62, 64 74, 52 84
               C 78 88, 90 98, 80 110
               C 106 110, 120 120, 112 132
               C 140 130, 158 138, 152 150
               C 182 144, 204 148, 210 158
               C 238 148, 268 142, 292 138
               L 344 126 Z`}),e.jsx("circle",{cx:"118",cy:"196",r:"62"}),e.jsx("circle",{cx:"440",cy:"196",r:"62"}),e.jsx("path",{d:`M118 176
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
               L 108 196 Z`}),e.jsx("path",{d:`M232 132
               C 250 108, 286 94, 318 92
               C 344 90, 366 96, 382 108
               L 398 122
               L 380 138
               C 356 128, 330 124, 304 128
               C 276 132, 254 142, 240 154
               L 224 148 Z`}),e.jsx("path",{d:`M382 102
               L 384 84 L 392 98
               C 398 96, 404 96, 410 100
               L 416 86 L 420 104
               C 428 112, 430 122, 424 130
               L 396 126
               C 386 120, 380 112, 382 102 Z`}),e.jsx("path",{d:`M360 116
               L 412 138 L 448 158
               L 442 172 L 400 158
               L 352 134 Z`}),e.jsx("path",{d:"M446 150 L 474 144 L 478 154 L 452 166 Z"}),e.jsx("path",{d:`M244 142
               C 224 148, 208 160, 200 176
               L 188 196 L 204 202
               C 216 188, 232 176, 250 168
               L 262 158 Z`}),e.jsx("path",{d:"M186 192 L 168 198 L 170 210 L 196 208 Z"})]})}function k(){const l=c.useRef(null),d=c.useRef(null),x=c.useRef([]),b=c.useRef(-9999),u=B(),E=F(),L=!u&&!E;return c.useEffect(()=>{const v=l.current;if(!v)return;const t=d.current,r=t==null?void 0:t.getContext("2d");let s=window.innerWidth,a=window.innerHeight;t&&(t.width=s,t.height=a);const j=()=>{s=window.innerWidth,a=window.innerHeight,t&&(t.width=s,t.height=a)};window.addEventListener("resize",j);let m=0;const N=()=>s<768?260:420,y=()=>{const w=a*.9,o=N(),R=s+2*o,Z=Math.max(0,window.scrollY),$=Math.floor(Z/w),C=Z%w/w,h=$%2===0?1:-1,f=h===1?-o+C*R:s-C*R,A=Math.sin(Date.now()/260)*(u?0:3),z=a*.64+C*a*.1+A;if(v.style.transform=`translate(${f}px, ${z-a*.5}px) scaleX(${h}) rotate(3.5deg)`,r&&t&&L){const M=Math.abs(f-b.current),g=f+o/2;if(M>.5&&M<s&&g>-o&&g<s+o){const n=Math.min(6,Math.ceil(M/6));for(let i=0;i<n;i++)x.current.push({x:g-h*(o*.38+Math.random()*30),y:z+30+(Math.random()-.5)*40,vx:-h*(1.2+Math.random()*1.5),vy:-.4-Math.random()*.8,life:1,size:10+Math.random()*18})}b.current=f,r.clearRect(0,0,s,a),r.globalCompositeOperation="screen";for(const n of x.current){n.x+=n.vx,n.y+=n.vy,n.vx*=.985,n.vy*=.985,n.life-=.014;const i=n.size*(1+(1-n.life)*1.6),S=Math.max(0,n.life)*.28,p=r.createRadialGradient(n.x,n.y,0,n.x,n.y,i);p.addColorStop(0,`rgba(245, 197, 24, ${S})`),p.addColorStop(.5,`rgba(220, 160, 30, ${S*.35})`),p.addColorStop(1,"rgba(0,0,0,0)"),r.fillStyle=p,r.beginPath(),r.arc(n.x,n.y,i,0,Math.PI*2),r.fill()}x.current=x.current.filter(n=>n.life>0)}m=requestAnimationFrame(y)};return m=requestAnimationFrame(y),()=>{cancelAnimationFrame(m),window.removeEventListener("resize",j)}},[L,u]),e.jsxs("div",{className:"fixed inset-0 pointer-events-none z-[6]","aria-hidden":"true",children:[L&&e.jsx("canvas",{ref:d,className:"absolute inset-0",style:{filter:"blur(6px)"}}),e.jsxs("div",{ref:l,className:"absolute top-1/2 left-0 will-change-transform",children:[e.jsx("div",{className:"absolute -inset-16",style:{background:"radial-gradient(ellipse 60% 45% at 55% 60%, rgba(245,197,24,0.22) 0%, rgba(245,197,24,0.07) 45%, transparent 70%)"}}),e.jsx(P,{className:"relative w-[260px] md:w-[420px] h-auto text-[#050508]",style:{filter:"drop-shadow(0 0 2px rgba(245,197,24,0.55)) drop-shadow(0 10px 22px rgba(0,0,0,0.9))"}})]})]})}export{k as BatpodRider};
