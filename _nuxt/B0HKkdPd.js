import{_ as _e,a as Ie,b as ke,c as Se}from"./BP52qfS7.js";import{i as we,p as Pe,u as Re,f as Te,c as w,_ as Z,a as $e}from"./assNn817.js";import{u as se,e as De,_ as re,g as Ce,f as ie}from"./C-Yo0tKg.js";import{l as C,r as R,k as P,$ as Oe,n as de,Y as Ae,a0 as Be,a2 as B,a1 as Ee,_ as ce,I as pe,J as L,v as W,H as fe,t as ve,o as M,x as $,y as j,B as F,C as z,G as E,e as Ne,S as oe,K as U,c as D,w as h,a as S,z as T,b as V,a8 as Ue,a7 as He,D as H,F as q,E as Q,U as Le,ag as je,af as Fe}from"./BVj0UT8w.js";import{u as ze}from"./D9r3FV7v.js";import{w as Ke,h as xe,j as Je,a as I,t as Ve,u as qe,i as K,A as x,I as X,d as Qe,N as ue,e as _,v as Ye,k as le,_ as me,O as Ge,l as We}from"./DHUlcN1m.js";import{s as Ze,u as Xe}from"./Cmk03uGg.js";import{_ as et}from"./BVn11vDl.js";import"./C24xjUBW.js";import"./F-HmMk7F.js";const tt={base:"inline-flex items-center justify-center text-gray-900 dark:text-white",padding:"px-1",size:{xs:"h-4 min-w-[16px] text-[10px]",sm:"h-5 min-w-[20px] text-[11px]",md:"h-6 min-w-[24px] text-[12px]"},rounded:"rounded",font:"font-medium font-sans",background:"bg-gray-100 dark:bg-gray-800",ring:"ring-1 ring-gray-300 dark:ring-gray-700 ring-inset",default:{size:"sm"}};var nt=(e=>(e[e.Open=0]="Open",e[e.Closed=1]="Closed",e))(nt||{}),at=(e=>(e[e.Pointer=0]="Pointer",e[e.Other=1]="Other",e))(at||{});function ot(e){requestAnimationFrame(()=>requestAnimationFrame(e))}let ge=Symbol("MenuContext");function J(e){let i=Ee(ge,null);if(i===null){let p=new Error(`<${e} /> is missing a parent <Menu /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(p,J),p}return i}let ut=C({name:"Menu",props:{as:{type:[Object,String],default:"template"}},setup(e,{slots:i,attrs:p}){let f=R(1),g=R(null),v=R(null),t=R([]),o=R(""),s=R(null),m=R(1);function y(n=r=>r){let r=s.value!==null?t.value[s.value]:null,u=Ge(n(t.value.slice()),l=>I(l.dataRef.domRef)),c=r?u.indexOf(r):null;return c===-1&&(c=null),{items:u,activeItemIndex:c}}let d={menuState:f,buttonRef:g,itemsRef:v,items:t,searchQuery:o,activeItemIndex:s,activationTrigger:m,closeMenu:()=>{f.value=1,s.value=null},openMenu:()=>f.value=0,goToItem(n,r,u){let c=y(),l=Te(n===w.Specific?{focus:w.Specific,id:r}:{focus:n},{resolveItems:()=>c.items,resolveActiveIndex:()=>c.activeItemIndex,resolveId:a=>a.id,resolveDisabled:a=>a.dataRef.disabled});o.value="",s.value=l,m.value=u??1,t.value=c.items},search(n){let r=o.value!==""?0:1;o.value+=n.toLowerCase();let u=(s.value!==null?t.value.slice(s.value+r).concat(t.value.slice(0,s.value+r)):t.value).find(l=>l.dataRef.textValue.startsWith(o.value)&&!l.dataRef.disabled),c=u?t.value.indexOf(u):-1;c===-1||c===s.value||(s.value=c,m.value=1)},clearSearch(){o.value=""},registerItem(n,r){let u=y(c=>[...c,{id:n,dataRef:r}]);t.value=u.items,s.value=u.activeItemIndex,m.value=1},unregisterItem(n){let r=y(u=>{let c=u.findIndex(l=>l.id===n);return c!==-1&&u.splice(c,1),u});t.value=r.items,s.value=r.activeItemIndex,m.value=1}};return Ke([g,v],(n,r)=>{var u;d.closeMenu(),xe(r,Je.Loose)||(n.preventDefault(),(u=I(g))==null||u.focus())},P(()=>f.value===0)),Oe(ge,d),Ve(P(()=>qe(f.value,{0:K.Open,1:K.Closed}))),()=>{let n={open:f.value===0,close:d.closeMenu};return x({ourProps:{},theirProps:e,slot:n,slots:i,attrs:p,name:"Menu"})}}}),lt=C({name:"MenuButton",props:{disabled:{type:Boolean,default:!1},as:{type:[Object,String],default:"button"},id:{type:String,default:null}},setup(e,{attrs:i,slots:p,expose:f}){var g;let v=(g=e.id)!=null?g:`headlessui-menu-button-${X()}`,t=J("MenuButton");f({el:t.buttonRef,$el:t.buttonRef});function o(d){switch(d.key){case _.Space:case _.Enter:case _.ArrowDown:d.preventDefault(),d.stopPropagation(),t.openMenu(),B(()=>{var n;(n=I(t.itemsRef))==null||n.focus({preventScroll:!0}),t.goToItem(w.First)});break;case _.ArrowUp:d.preventDefault(),d.stopPropagation(),t.openMenu(),B(()=>{var n;(n=I(t.itemsRef))==null||n.focus({preventScroll:!0}),t.goToItem(w.Last)});break}}function s(d){switch(d.key){case _.Space:d.preventDefault();break}}function m(d){e.disabled||(t.menuState.value===0?(t.closeMenu(),B(()=>{var n;return(n=I(t.buttonRef))==null?void 0:n.focus({preventScroll:!0})})):(d.preventDefault(),t.openMenu(),ot(()=>{var n;return(n=I(t.itemsRef))==null?void 0:n.focus({preventScroll:!0})})))}let y=Ze(P(()=>({as:e.as,type:i.type})),t.buttonRef);return()=>{var d;let n={open:t.menuState.value===0},{...r}=e,u={ref:t.buttonRef,id:v,type:y.value,"aria-haspopup":"menu","aria-controls":(d=I(t.itemsRef))==null?void 0:d.id,"aria-expanded":t.menuState.value===0,onKeydown:o,onKeyup:s,onClick:m};return x({ourProps:u,theirProps:r,slot:n,attrs:i,slots:p,name:"MenuButton"})}}}),st=C({name:"MenuItems",props:{as:{type:[Object,String],default:"div"},static:{type:Boolean,default:!1},unmount:{type:Boolean,default:!0},id:{type:String,default:null}},setup(e,{attrs:i,slots:p,expose:f}){var g;let v=(g=e.id)!=null?g:`headlessui-menu-items-${X()}`,t=J("MenuItems"),o=R(null);f({el:t.itemsRef,$el:t.itemsRef}),we({container:P(()=>I(t.itemsRef)),enabled:P(()=>t.menuState.value===0),accept(n){return n.getAttribute("role")==="menuitem"?NodeFilter.FILTER_REJECT:n.hasAttribute("role")?NodeFilter.FILTER_SKIP:NodeFilter.FILTER_ACCEPT},walk(n){n.setAttribute("role","none")}});function s(n){var r;switch(o.value&&clearTimeout(o.value),n.key){case _.Space:if(t.searchQuery.value!=="")return n.preventDefault(),n.stopPropagation(),t.search(n.key);case _.Enter:if(n.preventDefault(),n.stopPropagation(),t.activeItemIndex.value!==null){let u=t.items.value[t.activeItemIndex.value];(r=I(u.dataRef.domRef))==null||r.click()}t.closeMenu(),me(I(t.buttonRef));break;case _.ArrowDown:return n.preventDefault(),n.stopPropagation(),t.goToItem(w.Next);case _.ArrowUp:return n.preventDefault(),n.stopPropagation(),t.goToItem(w.Previous);case _.Home:case _.PageUp:return n.preventDefault(),n.stopPropagation(),t.goToItem(w.First);case _.End:case _.PageDown:return n.preventDefault(),n.stopPropagation(),t.goToItem(w.Last);case _.Escape:n.preventDefault(),n.stopPropagation(),t.closeMenu(),B(()=>{var u;return(u=I(t.buttonRef))==null?void 0:u.focus({preventScroll:!0})});break;case _.Tab:n.preventDefault(),n.stopPropagation(),t.closeMenu(),B(()=>Ye(I(t.buttonRef),n.shiftKey?le.Previous:le.Next));break;default:n.key.length===1&&(t.search(n.key),o.value=setTimeout(()=>t.clearSearch(),350));break}}function m(n){switch(n.key){case _.Space:n.preventDefault();break}}let y=Qe(),d=P(()=>y!==null?(y.value&K.Open)===K.Open:t.menuState.value===0);return()=>{var n,r;let u={open:t.menuState.value===0},{...c}=e,l={"aria-activedescendant":t.activeItemIndex.value===null||(n=t.items.value[t.activeItemIndex.value])==null?void 0:n.id,"aria-labelledby":(r=I(t.buttonRef))==null?void 0:r.id,id:v,onKeydown:s,onKeyup:m,role:"menu",tabIndex:0,ref:t.itemsRef};return x({ourProps:l,theirProps:c,slot:u,attrs:i,slots:p,features:ue.RenderStrategy|ue.Static,visible:d.value,name:"MenuItems"})}}}),rt=C({name:"MenuItem",inheritAttrs:!1,props:{as:{type:[Object,String],default:"template"},disabled:{type:Boolean,default:!1},id:{type:String,default:null}},setup(e,{slots:i,attrs:p,expose:f}){var g;let v=(g=e.id)!=null?g:`headlessui-menu-item-${X()}`,t=J("MenuItem"),o=R(null);f({el:o,$el:o});let s=P(()=>t.activeItemIndex.value!==null?t.items.value[t.activeItemIndex.value].id===v:!1),m=Pe(o),y=P(()=>({disabled:e.disabled,get textValue(){return m()},domRef:o}));de(()=>t.registerItem(v,y)),Ae(()=>t.unregisterItem(v)),Be(()=>{t.menuState.value===0&&s.value&&t.activationTrigger.value!==0&&B(()=>{var a,b;return(b=(a=I(o))==null?void 0:a.scrollIntoView)==null?void 0:b.call(a,{block:"nearest"})})});function d(a){if(e.disabled)return a.preventDefault();t.closeMenu(),me(I(t.buttonRef))}function n(){if(e.disabled)return t.goToItem(w.Nothing);t.goToItem(w.Specific,v)}let r=Re();function u(a){r.update(a)}function c(a){r.wasMoved(a)&&(e.disabled||s.value||t.goToItem(w.Specific,v,0))}function l(a){r.wasMoved(a)&&(e.disabled||s.value&&t.goToItem(w.Nothing))}return()=>{let{disabled:a,...b}=e,k={active:s.value,disabled:a,close:t.closeMenu};return x({ourProps:{id:v,ref:o,role:"menuitem",tabIndex:a===!0?void 0:-1,"aria-disabled":a===!0?!0:void 0,onClick:d,onFocus:n,onPointerenter:u,onMouseenter:u,onPointermove:c,onMousemove:c,onPointerleave:l,onMouseleave:l},theirProps:{...p,...b},slot:k,attrs:p,slots:i,name:"MenuItem"})}}});const Y=pe(L.ui.strategy,L.ui.kbd,tt),it=C({inheritAttrs:!1,props:{value:{type:String,default:null},size:{type:String,default:()=>Y.default.size,validator(e){return Object.keys(Y.size).includes(e)}},class:{type:[String,Object,Array],default:()=>""},ui:{type:Object,default:()=>({})}},setup(e){const{ui:i,attrs:p}=se("kbd",W(e,"ui"),Y),f=P(()=>fe(ve(i.value.base,i.value.size[e.size],i.value.padding,i.value.rounded,i.value.font,i.value.background,i.value.ring),e.class));return{ui:i,attrs:p,kbdClass:f}}});function dt(e,i,p,f,g,v){return M(),$("kbd",E({class:e.kbdClass},e.attrs),[j(e.$slots,"default",{},()=>[F(z(e.value),1)])],16)}const be=ce(it,[["render",dt]]),G=pe(L.ui.strategy,L.ui.dropdown,De),ct=C({components:{HMenu:ut,HMenuButton:lt,HMenuItems:st,HMenuItem:rt,UIcon:re,UAvatar:Z,UKbd:be},inheritAttrs:!1,props:{items:{type:Array,default:()=>[]},mode:{type:String,default:"click",validator:e=>["click","hover"].includes(e)},open:{type:Boolean,default:void 0},disabled:{type:Boolean,default:!1},popper:{type:Object,default:()=>({})},openDelay:{type:Number,default:()=>G.default.openDelay},closeDelay:{type:Number,default:()=>G.default.closeDelay},class:{type:[String,Object,Array],default:()=>""},ui:{type:Object,default:()=>({})}},emits:["update:open"],setup(e,{emit:i}){const{ui:p,attrs:f}=se("dropdown",W(e,"ui"),G,W(e,"class")),g=P(()=>Ne(e.mode==="hover"?{offsetDistance:0}:{},e.popper,p.value.popper)),[v,t]=Xe(g.value),o=R(null);let s=null,m=null;de(()=>{var b,k;const l=(b=v.value)==null?void 0:b.$.provides;if(!l)return;const a=Object.getOwnPropertySymbols(l);o.value=a.length&&l[a[0]],e.open&&((k=o.value)==null||k.openMenu())});const y=P(()=>{var k,O,A;if(e.mode!=="hover")return{};const l=((k=e.popper)==null?void 0:k.offsetDistance)||((O=p.value.popper)==null?void 0:O.offsetDistance)||8,a=(A=g.value.placement)==null?void 0:A.split("-")[0],b=`${l}px`;return a==="top"||a==="bottom"?{paddingTop:b,paddingBottom:b}:a==="left"||a==="right"?{paddingLeft:b,paddingRight:b}:{paddingTop:b,paddingBottom:b,paddingLeft:b,paddingRight:b}});function d(l){!l.cancelable||!o.value||(o.value.menuState===0?o.value.closeMenu():o.value.openMenu())}function n(){e.mode!=="hover"||!o.value||(m&&(clearTimeout(m),m=null),o.value.menuState!==0&&(s=s||setTimeout(()=>{o.value.openMenu&&o.value.openMenu(),s=null},e.openDelay)))}function r(){e.mode!=="hover"||!o.value||(s&&(clearTimeout(s),s=null),o.value.menuState!==1&&(m=m||setTimeout(()=>{o.value.closeMenu&&o.value.closeMenu(),m=null},e.closeDelay)))}function u(l,a,{href:b,navigate:k,close:O,isExternal:A}){a.click&&a.click(l),b&&!A&&(k(l),O())}oe(()=>e.open,(l,a)=>{o.value&&(a===void 0||l===a||(l?o.value.openMenu():o.value.closeMenu()))}),oe(()=>{var l;return(l=o.value)==null?void 0:l.menuState},(l,a)=>{a===void 0||l===a||i("update:open",l===0)});const c=ie;return We(()=>ze("$ctlRmIk4j0")),{ui:p,attrs:f,popper:g,trigger:v,container:t,containerStyle:y,onTouchStart:d,onMouseEnter:n,onMouseLeave:r,onClick:u,getNuxtLinkProps:Ce,twMerge:fe,twJoin:ve,NuxtLink:c}}}),pt=["disabled"];function ft(e,i,p,f,g,v){const t=U("HMenuButton"),o=re,s=Z,m=be,y=U("HMenuItem"),d=ie,n=U("HMenuItems"),r=U("HMenu");return M(),D(r,E({as:"div",class:e.ui.wrapper},e.attrs,{onMouseleave:e.onMouseLeave}),{default:h(({open:u})=>[S(t,{ref:"trigger",as:"div",disabled:e.disabled,class:T(e.ui.trigger),role:"button",onMouseenter:e.onMouseEnter,onTouchstartPassive:e.onTouchStart},{default:h(()=>[j(e.$slots,"default",{open:u,disabled:e.disabled},()=>[V("button",{disabled:e.disabled}," Open ",8,pt)])]),_:2},1032,["disabled","class","onMouseenter","onTouchstartPassive"]),u&&e.items.length?(M(),$("div",{key:0,ref:"container",class:T([e.ui.container,e.ui.width]),style:Ue(e.containerStyle),onMouseenter:i[0]||(i[0]=(...c)=>e.onMouseEnter&&e.onMouseEnter(...c))},[S(He,E({appear:""},e.ui.transition),{default:h(()=>[V("div",null,[e.popper.arrow?(M(),$("div",{key:0,"data-popper-arrow":"",class:T(Object.values(e.ui.arrow))},null,2)):H("",!0),S(n,{class:T([e.ui.base,e.ui.divide,e.ui.ring,e.ui.rounded,e.ui.shadow,e.ui.background,e.ui.height]),static:""},{default:h(()=>[(M(!0),$(q,null,Q(e.items,(c,l)=>(M(),$("div",{key:l,class:T(e.ui.padding)},[(M(!0),$(q,null,Q(c,(a,b)=>(M(),D(d,E({key:b,ref_for:!0},e.getNuxtLinkProps(a),{custom:""}),{default:h(({href:k,target:O,rel:A,navigate:ye,isExternal:he,isActive:ee})=>[S(y,{disabled:a.disabled},{default:h(({active:te,disabled:ne,close:Me})=>[(M(),D(Le(k?"a":"button"),{href:ne?void 0:k,rel:A,target:O,class:T(e.twMerge(e.twJoin(e.ui.item.base,e.ui.item.padding,e.ui.item.size,e.ui.item.rounded,te||ee?e.ui.item.active:e.ui.item.inactive,ne&&e.ui.item.disabled),a.class)),onClick:N=>e.onClick(N,a,{href:k,navigate:ye,close:Me,isExternal:he})},{default:h(()=>[j(e.$slots,a.slot||"item",{item:a},()=>{var N;return[a.icon?(M(),D(o,{key:0,name:a.icon,class:T(e.twMerge(e.twJoin(e.ui.item.icon.base,te||ee?e.ui.item.icon.active:e.ui.item.icon.inactive),a.iconClass))},null,8,["name","class"])):a.avatar?(M(),D(s,E({key:1,ref_for:!0},{size:e.ui.item.avatar.size,...a.avatar},{class:e.ui.item.avatar.base}),null,16,["class"])):H("",!0),V("span",{class:T(e.twMerge(e.ui.item.label,a.labelClass))},z(a.label),3),(N=a.shortcuts)!=null&&N.length?(M(),$("span",{key:2,class:T(e.ui.item.shortcuts)},[(M(!0),$(q,null,Q(a.shortcuts,ae=>(M(),D(m,{key:ae},{default:h(()=>[F(z(ae),1)]),_:2},1024))),128))],2)):H("",!0)]})]),_:2},1032,["href","rel","target","class","onClick"]))]),_:2},1032,["disabled"])]),_:2},1040))),128))],2))),128))]),_:3},8,["class"])])]),_:3},16)],38)):H("",!0)]),_:3},16,["class","onMouseleave"])}const vt=ce(ct,[["render",ft]]),mt=C({__name:"Navigation",setup(e){const i=$e(),p=async()=>{console.log("cio");const{error:f}=await i.auth.signOut();f&&console.log(f)};return(f,g)=>{const v=Z,t=vt;return M(),D(t,{items:[[{label:"Settings",icon:"i-heroicons-cog-8-tooth",to:"/"}],[{label:"Logout",icon:"i-heroicons-arrow-right-end-on-rectangle",click:p}]]},{default:h(()=>[S(v,{src:"https://avatars.githubusercontent.com/u/739984?v=4",alt:"Avatar"})]),_:1},8,["items"])}}}),Pt=C({__name:"default",setup(e){const i=[{label:"Registra Presenza",to:"/"}];return(p,f)=>{const g=_e,v=mt,t=Ie,o=et,s=ke,m=Se,y=je,d=Fe;return M(),D(d,null,{default:h(()=>[S(y,null,{default:h(()=>[S(y,null,{default:h(()=>[S(t,{links:i,to:"/"},{logo:h(()=>[F(" JEMP "),S(g,{label:"beta",variant:"subtle"})]),right:h(()=>[S(v)]),_:1}),S(o,null,{default:h(()=>[j(p.$slots,"default")]),_:3}),S(m,null,{left:h(()=>[F(" Copyright © "+z(new Date().getFullYear())+". V 0.0.1 ",1)]),right:h(()=>[S(s)]),_:1})]),_:3})]),_:3})]),_:3})}}});export{Pt as default};
