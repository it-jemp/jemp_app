import{i as oe,_ as H,u as K,d as ue}from"./C-Yo0tKg.js";import{a1 as A,r as E,k as o,_ as U,I as Q,J as w,l as W,v as M,e as de,n as X,H as ce,t as j,o as f,x as g,b as q,G as k,y as h,z as v,a as R,D as C,ab as fe,$ as J,ac as B,F as O,B as F,C as N,ad as ge,Y as me,ae as ve}from"./BVj0UT8w.js";import{u as ye,a as be}from"./C24xjUBW.js";import{u as G}from"./D9r3FV7v.js";const he=(e,t)=>{const i=A("form-events",void 0),a=A("form-group",void 0),d=A("form-inputs",void 0);a&&(e!=null&&e.id&&(a.inputId.value=e==null?void 0:e.id),d&&(d.value[a.name.value]=a.inputId.value));const l=E(!1);function u(n,r){i&&i.emit({type:n,path:r})}function c(){u("blur",a==null?void 0:a.name.value),l.value=!0}function b(){u("change",a==null?void 0:a.name.value)}const z=ye(()=>{(l.value||a!=null&&a.eagerValidation.value)&&u("input",a==null?void 0:a.name.value)},300);return{inputId:o(()=>(e==null?void 0:e.id)??(a==null?void 0:a.inputId.value)),name:o(()=>(e==null?void 0:e.name)??(a==null?void 0:a.name.value)),size:o(()=>{var r;const n=t.size[a==null?void 0:a.size.value]?a==null?void 0:a.size.value:null;return(e==null?void 0:e.size)??n??((r=t.default)==null?void 0:r.size)}),color:o(()=>{var n;return(n=a==null?void 0:a.error)!=null&&n.value?"red":e==null?void 0:e.color}),emitFormBlur:c,emitFormInput:z,emitFormChange:b}},pe={wrapper:"",inner:"",label:{wrapper:"flex content-center items-center justify-between",base:"block font-medium text-gray-700 dark:text-gray-200",required:"after:content-['*'] after:ms-0.5 after:text-red-500 dark:after:text-red-400"},size:{"2xs":"text-xs",xs:"text-xs",sm:"text-sm",md:"text-sm",lg:"text-sm",xl:"text-base"},container:"mt-1 relative",description:"text-gray-500 dark:text-gray-400",hint:"text-gray-500 dark:text-gray-400",help:"mt-2 text-gray-500 dark:text-gray-400",error:"mt-2 text-red-500 dark:text-red-400",default:{size:"sm"}},$=Q(w.ui.strategy,w.ui.input,oe),Ie=W({components:{UIcon:H},inheritAttrs:!1,props:{modelValue:{type:[String,Number],default:""},type:{type:String,default:"text"},id:{type:String,default:null},name:{type:String,default:null},placeholder:{type:String,default:null},required:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},autofocus:{type:Boolean,default:!1},autofocusDelay:{type:Number,default:100},icon:{type:String,default:null},loadingIcon:{type:String,default:()=>$.default.loadingIcon},leadingIcon:{type:String,default:null},trailingIcon:{type:String,default:null},trailing:{type:Boolean,default:!1},leading:{type:Boolean,default:!1},loading:{type:Boolean,default:!1},padded:{type:Boolean,default:!0},size:{type:String,default:null,validator(e){return Object.keys($.size).includes(e)}},color:{type:String,default:()=>$.default.color,validator(e){return[...w.ui.colors,...Object.keys($.color)].includes(e)}},variant:{type:String,default:()=>$.default.variant,validator(e){return[...Object.keys($.variant),...Object.values($.color).flatMap(t=>Object.keys(t))].includes(e)}},inputClass:{type:String,default:null},class:{type:[String,Object,Array],default:()=>""},ui:{type:Object,default:()=>({})},modelModifiers:{type:Object,default:()=>({})}},emits:["update:modelValue","blur","change"],setup(e,{emit:t,slots:i}){const{ui:a,attrs:d}=K("input",M(e,"ui"),$,M(e,"class")),{size:l,rounded:u}=ue({ui:a,props:e}),{emitFormBlur:c,emitFormInput:b,size:z,color:n,inputId:r,name:y}=he(e,$),m=o(()=>l.value??z.value),p=E(de({},e.modelModifiers,{trim:!1,lazy:!1,number:!1})),I=E(null),P=()=>{var s;e.autofocus&&((s=I.value)==null||s.focus())},Y=s=>{p.value.trim&&(s=s.trim()),(p.value.number||e.type==="number")&&(s=fe(s)),t("update:modelValue",s),b()},_=s=>{p.value.lazy||Y(s.target.value)},x=s=>{if(e.type==="file"){const S=s.target.files;t("change",S)}else{const S=s.target.value;t("change",S),p.value.lazy&&Y(S),p.value.trim&&(s.target.value=S.trim())}},ee=s=>{c(),t("blur",s)};X(()=>{setTimeout(()=>{P()},e.autofocusDelay)});const ae=o(()=>{var S,L;const s=((L=(S=a.value.color)==null?void 0:S[n.value])==null?void 0:L[e.variant])||a.value.variant[e.variant];return ce(j(a.value.base,a.value.form,u.value,a.value.placeholder,e.type==="file"&&a.value.file.base,a.value.size[m.value],e.padded?a.value.padding[m.value]:"p-0",s==null?void 0:s.replaceAll("{color}",n.value),(V.value||i.leading)&&a.value.leading.padding[m.value],(Z.value||i.trailing)&&a.value.trailing.padding[m.value]),e.inputClass)}),V=o(()=>e.icon&&e.leading||e.icon&&!e.trailing||e.loading&&!e.trailing||e.leadingIcon),Z=o(()=>e.icon&&e.trailing||e.loading&&e.trailing||e.trailingIcon),ne=o(()=>e.loading?e.loadingIcon:e.leadingIcon||e.icon),te=o(()=>e.loading&&!V.value?e.loadingIcon:e.trailingIcon||e.icon),le=o(()=>j(a.value.icon.leading.wrapper,a.value.icon.leading.pointer,a.value.icon.leading.padding[m.value])),ie=o(()=>j(a.value.icon.base,n.value&&w.ui.colors.includes(n.value)&&a.value.icon.color.replaceAll("{color}",n.value),a.value.icon.size[m.value],e.loading&&a.value.icon.loading)),re=o(()=>j(a.value.icon.trailing.wrapper,a.value.icon.trailing.pointer,a.value.icon.trailing.padding[m.value])),se=o(()=>j(a.value.icon.base,n.value&&w.ui.colors.includes(n.value)&&a.value.icon.color.replaceAll("{color}",n.value),a.value.icon.size[m.value],e.loading&&!V.value&&a.value.icon.loading));return{ui:a,attrs:d,name:y,inputId:r,input:I,isLeading:V,isTrailing:Z,inputClass:ae,leadingIconName:ne,leadingIconClass:ie,leadingWrapperIconClass:le,trailingIconName:te,trailingIconClass:se,trailingWrapperIconClass:re,onInput:_,onChange:x,onBlur:ee}}}),$e=["id","name","value","type","required","placeholder","disabled"];function ze(e,t,i,a,d,l){const u=H;return f(),g("div",{class:v(e.type==="hidden"?"hidden":e.ui.wrapper)},[q("input",k({id:e.inputId,ref:"input",name:e.name,value:e.modelValue,type:e.type,required:e.required,placeholder:e.placeholder,disabled:e.disabled,class:e.inputClass},e.attrs,{onInput:t[0]||(t[0]=(...c)=>e.onInput&&e.onInput(...c)),onBlur:t[1]||(t[1]=(...c)=>e.onBlur&&e.onBlur(...c)),onChange:t[2]||(t[2]=(...c)=>e.onChange&&e.onChange(...c))}),null,16,$e),h(e.$slots,"default"),e.isLeading&&e.leadingIconName||e.$slots.leading?(f(),g("span",{key:0,class:v(e.leadingWrapperIconClass)},[h(e.$slots,"leading",{disabled:e.disabled,loading:e.loading},()=>[R(u,{name:e.leadingIconName,class:v(e.leadingIconClass)},null,8,["name","class"])])],2)):C("",!0),e.isTrailing&&e.trailingIconName||e.$slots.trailing?(f(),g("span",{key:1,class:v(e.trailingWrapperIconClass)},[h(e.$slots,"trailing",{disabled:e.disabled,loading:e.loading},()=>[R(u,{name:e.trailingIconName,class:v(e.trailingIconClass)},null,8,["name","class"])])],2)):C("",!0)],2)}const Ye=U(Ie,[["render",ze]]),T=Q(w.ui.strategy,w.ui.formGroup,pe),Se=W({inheritAttrs:!1,props:{name:{type:String,default:null},size:{type:String,default:null,validator(e){return Object.keys(T.size).includes(e)}},label:{type:String,default:null},description:{type:String,default:null},required:{type:Boolean,default:!1},help:{type:String,default:null},error:{type:[String,Boolean],default:null},hint:{type:String,default:null},class:{type:[String,Object,Array],default:()=>""},ui:{type:Object,default:()=>({})},eagerValidation:{type:Boolean,default:!1}},setup(e){const{ui:t,attrs:i}=K("formGroup",M(e,"ui"),T,M(e,"class")),a=A("form-errors",null),d=o(()=>{var c,b;return e.error&&typeof e.error=="string"||typeof e.error=="boolean"?e.error:(b=(c=a==null?void 0:a.value)==null?void 0:c.find(z=>z.path===e.name))==null?void 0:b.message}),l=o(()=>t.value.size[e.size??T.default.size]),u=E(G("$K7dDJpdOWE"));return J("form-group",{error:d,inputId:u,name:o(()=>e.name),size:o(()=>e.size),eagerValidation:o(()=>e.eagerValidation)}),{ui:t,attrs:i,inputId:u,size:l,error:d}}}),ke=["for"];function we(e,t,i,a,d,l){return f(),g("div",k({class:e.ui.wrapper},e.attrs),[q("div",{class:v(e.ui.inner)},[e.label||e.$slots.label?(f(),g("div",{key:0,class:v([e.ui.label.wrapper,e.size])},[q("label",{for:e.inputId,class:v([e.ui.label.base,e.required?e.ui.label.required:""])},[e.$slots.label?h(e.$slots,"label",B(k({key:0},{error:e.error,label:e.label,name:e.name,hint:e.hint,description:e.description,help:e.help}))):(f(),g(O,{key:1},[F(N(e.label),1)],64))],10,ke),e.hint||e.$slots.hint?(f(),g("span",{key:0,class:v([e.ui.hint])},[e.$slots.hint?h(e.$slots,"hint",B(k({key:0},{error:e.error,label:e.label,name:e.name,hint:e.hint,description:e.description,help:e.help}))):(f(),g(O,{key:1},[F(N(e.hint),1)],64))],2)):C("",!0)],2)):C("",!0),e.description||e.$slots.description?(f(),g("p",{key:1,class:v([e.ui.description,e.size])},[e.$slots.description?h(e.$slots,"description",B(k({key:0},{error:e.error,label:e.label,name:e.name,hint:e.hint,description:e.description,help:e.help}))):(f(),g(O,{key:1},[F(N(e.description),1)],64))],2)):C("",!0)],2),q("div",{class:v([e.label?e.ui.container:""])},[h(e.$slots,"default",B(ge({error:e.error}))),typeof e.error=="string"&&e.error?(f(),g("p",{key:0,class:v([e.ui.error,e.size])},[e.$slots.error?h(e.$slots,"error",B(k({key:0},{error:e.error,label:e.label,name:e.name,hint:e.hint,description:e.description,help:e.help}))):(f(),g(O,{key:1},[F(N(e.error),1)],64))],2)):e.help||e.$slots.help?(f(),g("p",{key:1,class:v([e.ui.help,e.size])},[e.$slots.help?h(e.$slots,"help",B(k({key:0},{error:e.error,label:e.label,name:e.name,hint:e.hint,description:e.description,help:e.help}))):(f(),g(O,{key:1},[F(N(e.help),1)],64))],2)):C("",!0)],2)],16)}const Ze=U(Se,[["render",we]]);class D extends Error{constructor(t){super(t),this.message=t,Object.setPrototypeOf(this,D.prototype)}}const Be=W({props:{schema:{type:[Object,Function],default:void 0},state:{type:Object,required:!0},validate:{type:Function,default:()=>[]},validateOn:{type:Array,default:()=>["blur","input","change","submit"]}},emits:["submit","error"],setup(e,{expose:t,emit:i}){const a=G("$Z55GngiEgp"),d=be(`form-${a}`);X(()=>{d.on(async n=>{var r;n.type!=="submit"&&((r=e.validateOn)!=null&&r.includes(n.type))&&await b(n.path,{silent:!0})})}),me(()=>{d.reset()});const l=E([]);J("form-errors",l),J("form-events",d);const u=E({});J("form-inputs",u);async function c(){let n=await e.validate(e.state);if(e.schema)if(Oe(e.schema))n=n.concat(await Fe(e.state,e.schema));else if(Ce(e.schema))n=n.concat(await je(e.state,e.schema));else if(Ne(e.schema))n=n.concat(await Ae(e.state,e.schema));else if(qe(e.schema))n=n.concat(await Je(e.state,e.schema));else throw new Error("Form validation failed: Unsupported form schema");return n}async function b(n,r={silent:!1}){let y=n;if(n&&!Array.isArray(n)&&(y=[n]),y){const m=l.value.filter(I=>!y.includes(I.path)),p=(await c()).filter(I=>y.includes(I.path));l.value=m.concat(p)}else l.value=await c();if(l.value.length>0){if(r.silent)return!1;throw new D(`Form validation failed: ${JSON.stringify(l.value,null,2)}`)}return e.state}async function z(n){var y;const r=n;try{(y=e.validateOn)!=null&&y.includes("submit")&&await b(),r.data=e.state,i("submit",r)}catch(m){if(!(m instanceof D))throw m;const p={...r,errors:l.value.map(I=>({...I,id:u.value[I.path]}))};i("error",p)}}return t({validate:b,errors:l,setErrors(n,r){r?l.value=l.value.filter(y=>y.path!==r).concat(n):l.value=n},async submit(){await z(new Event("submit"))},getErrors(n){return n?l.value.filter(r=>r.path===n):l.value},clear(n){n?l.value=l.value.filter(r=>r.path!==n):l.value=[]}}),{onSubmit:z}}});function Ce(e){return e.validate&&e.__isYupSchema__}function Ee(e){return e.inner!==void 0}async function je(e,t){try{return await t.validate(e,{abortEarly:!1}),[]}catch(i){if(Ee(i))return i.inner.map(a=>({path:a.path??"",message:a.message}));throw i}}function Oe(e){return e.parse!==void 0}async function Fe(e,t){const i=await t.safeParseAsync(e);return i.success===!1?i.error.issues.map(a=>({path:a.path.join("."),message:a.message})):[]}function Ne(e){return e.validateAsync!==void 0&&e.id!==void 0}function Ve(e){return e.isJoi===!0}async function Ae(e,t){try{return await t.validateAsync(e,{abortEarly:!1}),[]}catch(i){if(Ve(i))return i.details.map(a=>({path:a.path.join("."),message:a.message}));throw i}}function qe(e){return"_parse"in e||"_run"in e||typeof e=="function"&&"schema"in e}async function Je(e,t){var a;return((a=(await("_parse"in t?t._parse(e):"_run"in t?t._run({typed:!1,value:e},{}):t(e))).issues)==null?void 0:a.map(d=>{var l;return{path:((l=d.path)==null?void 0:l.map(u=>u.key).join("."))||"",message:d.message}}))||[]}function Me(e,t,i,a,d,l){return f(),g("form",{onSubmit:t[0]||(t[0]=ve((...u)=>e.onSubmit&&e.onSubmit(...u),["prevent"]))},[h(e.$slots,"default")],32)}const Le=U(Be,[["render",Me]]);export{Ye as _,Ze as a,Le as b,he as u};
