import{j as e,r as c,u as S,a as E}from"./index-BVHjrYgH.js";function N({className:l,style:d}){return e.jsxs("svg",{viewBox:"0 0 560 270",className:l,style:d,fill:"currentColor","aria-hidden":"true",focusable:"false",children:[e.jsx("path",{d:`M338 108
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
               L 262 158 Z`}),e.jsx("path",{d:"M186 192 L 168 198 L 170 210 L 196 208 Z"})]})}function A(){const l=c.useRef(null),d=c.useRef(null),x=c.useRef([]),C=c.useRef(-9999),p=S(),y=E(),f=!p&&!y;return c.useEffect(()=>{const u=l.current;if(!u)return;const t=d.current,a=t==null?void 0:t.getContext("2d");let r=window.innerWidth,s=window.innerHeight;t&&(t.width=r,t.height=s);const M=()=>{r=window.innerWidth,s=window.innerHeight,t&&(t.width=r,t.height=s)};window.addEventListener("resize",M);let L=0;const R=()=>r<768?260:420,g=()=>{const Z=s*.85,m=Math.min(1,Math.max(0,window.scrollY/Z)),w=R(),o=-w+m*(r+w*1.6),z=Math.sin(Date.now()/260)*(p?0:3),b=s*.72+z;if(u.style.transform=`translate(${o}px, ${b-s*.5}px)`,u.style.opacity=m>.82?String(Math.max(0,1-(m-.82)/.18)):"1",a&&t&&f){const v=Math.abs(o-C.current);if(v>.5&&o>0&&o<r){const n=Math.min(6,Math.ceil(v/6));for(let i=0;i<n;i++)x.current.push({x:o+w*.1+Math.random()*30,y:b+30+(Math.random()-.5)*40,vx:-1.2-Math.random()*1.5,vy:-.4-Math.random()*.8,life:1,size:10+Math.random()*18})}C.current=o,a.clearRect(0,0,r,s),a.globalCompositeOperation="screen";for(const n of x.current){n.x+=n.vx,n.y+=n.vy,n.vx*=.985,n.vy*=.985,n.life-=.014;const i=n.size*(1+(1-n.life)*1.6),j=Math.max(0,n.life)*.28,h=a.createRadialGradient(n.x,n.y,0,n.x,n.y,i);h.addColorStop(0,`rgba(245, 197, 24, ${j})`),h.addColorStop(.5,`rgba(220, 160, 30, ${j*.35})`),h.addColorStop(1,"rgba(0,0,0,0)"),a.fillStyle=h,a.beginPath(),a.arc(n.x,n.y,i,0,Math.PI*2),a.fill()}x.current=x.current.filter(n=>n.life>0)}L=requestAnimationFrame(g)};return L=requestAnimationFrame(g),()=>{cancelAnimationFrame(L),window.removeEventListener("resize",M)}},[f,p]),e.jsxs("div",{className:"fixed inset-0 pointer-events-none z-[6]","aria-hidden":"true",children:[f&&e.jsx("canvas",{ref:d,className:"absolute inset-0",style:{filter:"blur(6px)"}}),e.jsxs("div",{ref:l,className:"absolute top-1/2 left-0 will-change-transform",children:[e.jsx("div",{className:"absolute -inset-16",style:{background:"radial-gradient(ellipse 60% 45% at 55% 60%, rgba(245,197,24,0.22) 0%, rgba(245,197,24,0.07) 45%, transparent 70%)"}}),e.jsx(N,{className:"relative w-[260px] md:w-[420px] h-auto text-[#050508]",style:{filter:"drop-shadow(0 0 2px rgba(245,197,24,0.55)) drop-shadow(0 10px 22px rgba(0,0,0,0.9))"}})]})]})}export{A as BatpodRider};
