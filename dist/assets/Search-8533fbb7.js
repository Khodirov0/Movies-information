import{d as B,e as E,f as M,l as T,h as q,u as F,r as c,g as I,o as A,w as j,i as k,a as l,c as u,j as v,k as d,m as z,v as K,n as U,b as y,F as x,p as Z,q as P,s as D}from"./index-95bdbdba.js";import{C as G}from"./ContentItem-846c830a.js";const $=B("search",{state:()=>({searchArray:[],adult:!1,totalResults:0,totalPages:0}),actions:{async getSearch(_="",a=1){if(_!=="")try{const o=await E({method:"GET",url:`${M}/search/multi?query=${_}&include_adult=${this.adult}&language=${T}&page=${a}`,headers:q}),h=o.data.results.filter(e=>e.poster_path&&(e.original_language==="en"||e.name||e.title)&&e.vote_average>=5);this.searchArray=h.sort((e,p)=>(p.vote_average||0)-(e.vote_average||0)),this.totalPages=o.data.total_pages,this.totalResults=o.data.total_results}catch(o){console.error("Error in search.js: ",o)}else this.searchArray=[],this.totalPages=0,this.totalResults=0}}}),L={class:"search"},H={class:"container"},J={key:0,style:{color:"red"},class:"search__lang"},O={class:"search__top"},Q=["placeholder"],W={key:1,class:"search__recommend"},X={class:"content__list"},Y={class:"load-more__button"},ee={__name:"Search",props:{type:{type:String,required:!1,default:""}},setup(_){const a=$(),o=F(),h=c("Find a movie, series..."),e=c([]),p=I(()=>a.totalPages),t=c(""),i=c(1),s=c(!1),m=c(!1),R=c(!1),b=async()=>{s.value||(s.value=!0,i.value=1,await a.getSearch(t.value,i.value),e.value=[...a.searchArray],s.value=!1)},C=async()=>{!s.value&&i.value<p.value&&(s.value=!0,i.value+=1,await a.getSearch(t.value,i.value),e.value.push(...a.searchArray),s.value=!1)},V=g=>{/^[A-Za-z\s]*$/.test(g.target.value)?m.value=!1:(m.value=!0,t.value=t.value.replace(/[^A-Za-z\s]/g,""))},f=async()=>{s.value||(s.value=!0,await o.getPopular("movie"),e.value=[...o.movie.slice(0,4)],s.value=!1)},w=()=>{t.value="",f()};return A(()=>{f()}),j(t,g=>{g.trim()===""&&w()}),(g,r)=>{const S=k("font-awesome-icon"),N=k("loader");return l(),u(x,null,[v("section",L,[v("div",H,[m.value?(l(),u("p",J," Please use only English language!!! ")):d("",!0),v("div",O,[z(v("input",{type:"text",class:"search__input",placeholder:h.value,"onUpdate:modelValue":r[0]||(r[0]=n=>t.value=n),onKeydown:r[1]||(r[1]=U(n=>t.value.trim()?b():f(),["enter"])),onInput:V},null,40,Q),[[K,t.value]]),t.value!=""?(l(),u("button",{key:0,class:"search__button",onClick:w},[y(S,{icon:"times"})])):d("",!0)]),R.value?(l(),u("h2",W,"Recommended")):d("",!0),v("div",X,[(l(!0),u(x,null,Z(e.value,n=>(l(),P(G,{key:n.id,content:n,type:n.media_type||"",vote_average:n.vote_average},null,8,["content","type","vote_average"]))),128)),t.value&&e.value.length>4&&i.value<p.value?(l(),u("div",{key:0,onClick:C,class:"load-more"},[r[2]||(r[2]=D(" Show More ")),v("button",Y,[y(S,{icon:["fas","chevron-right"]})])])):d("",!0)])])]),s.value===!0?(l(),P(N,{key:0})):d("",!0)],64)}}},se={__name:"Search",setup(_){const a=$();return A(()=>{a.searchArray=[],a.totalPages=[],a.totalResults=[]}),(o,h)=>(l(),u("div",null,[y(ee)]))}};export{se as default};
