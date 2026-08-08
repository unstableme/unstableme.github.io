import{j as e,r as c,u as E,a as N}from"./index--wJZ1fW3.js";function $({className:l}){return e.jsxs("svg",{viewBox:"0 0 560 270",className:l,fill:"currentColor","aria-hidden":"true",focusable:"false",children:[e.jsx("path",{d:`M338 108
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
               L 262 158 Z`}),e.jsx("path",{d:"M186 192 L 168 198 L 170 210 L 196 208 Z"})]})}function B(){const l=c.useRef(null),m=c.useRef(null),d=c.useRef([]),w=c.useRef(-9999),x=E(),g=N(),f=!x&&!g;return c.useEffect(()=>{const u=l.current;if(!u)return;const t=m.current,s=t==null?void 0:t.getContext("2d");let r=window.innerWidth,a=window.innerHeight;t&&(t.width=r,t.height=a);const C=()=>{r=window.innerWidth,a=window.innerHeight,t&&(t.width=r,t.height=a)};window.addEventListener("resize",C);let p=0;const R=()=>r<768?260:420,M=()=>{const Z=a*1.2,j=Math.min(1,Math.max(0,window.scrollY/Z)),z=j,L=R(),o=-L+z*(r+L*1.6),S=Math.sin(Date.now()/260)*(x?0:3),v=a*.78+S;if(u.style.transform=`translate(${o}px, ${v-a*.5}px)`,u.style.opacity=j>=1?"0":"1",s&&t&&f){const y=Math.abs(o-w.current);if(y>.5&&o>0&&o<r){const n=Math.min(6,Math.ceil(y/6));for(let i=0;i<n;i++)d.current.push({x:o+L*.1+Math.random()*30,y:v+30+(Math.random()-.5)*40,vx:-1.2-Math.random()*1.5,vy:-.4-Math.random()*.8,life:1,size:10+Math.random()*18})}w.current=o,s.clearRect(0,0,r,a),s.globalCompositeOperation="screen";for(const n of d.current){n.x+=n.vx,n.y+=n.vy,n.vx*=.985,n.vy*=.985,n.life-=.014;const i=n.size*(1+(1-n.life)*1.6),b=Math.max(0,n.life)*.28,h=s.createRadialGradient(n.x,n.y,0,n.x,n.y,i);h.addColorStop(0,`rgba(245, 197, 24, ${b})`),h.addColorStop(.5,`rgba(220, 160, 30, ${b*.35})`),h.addColorStop(1,"rgba(0,0,0,0)"),s.fillStyle=h,s.beginPath(),s.arc(n.x,n.y,i,0,Math.PI*2),s.fill()}d.current=d.current.filter(n=>n.life>0)}p=requestAnimationFrame(M)};return p=requestAnimationFrame(M),()=>{cancelAnimationFrame(p),window.removeEventListener("resize",C)}},[f,x]),e.jsxs("div",{className:"fixed inset-0 pointer-events-none z-[6]","aria-hidden":"true",children:[f&&e.jsx("canvas",{ref:m,className:"absolute inset-0",style:{filter:"blur(6px)"}}),e.jsx("div",{ref:l,className:"absolute top-1/2 left-0 will-change-transform text-[#04040a]",style:{filter:"drop-shadow(0 8px 18px rgba(0,0,0,0.8))"},children:e.jsx($,{className:"w-[260px] md:w-[420px] h-auto"})})]})}export{B as BatpodRider};
