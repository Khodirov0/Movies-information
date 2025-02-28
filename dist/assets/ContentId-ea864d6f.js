import{p as z,q as O,s as j,x as G,y as Y,r as b,H as at,I as it,J as ct,K as B,u as L,c as p,n as q,b as C,o as n,h as I,i as A,d as u,e,k as $,w as R,t as m,L as N,f,C as k,G as lt,F as U,B as T,j as rt,M as H,N as J,T as dt,O as ut,z as vt,D as _t,E as mt,P as ht,Q as gt}from"./index-6f6eabef.js";const yt=z("videos",{state:()=>({movie:null,tv:null}),actions:{async getVideos(t,l){try{if(t!=="movie"&&t!=="tv"){console.error("Invalid type:",t);return}const a=(await O({method:"GET",url:`${j}/${t}/${l}/videos?language=${G}`,headers:Y})).data.results||[];if(a.length===0){console.warn("No videos found");return}t==="movie"?this.movie=a[a.length-1]:this.tv=a[a.length-1]}catch(s){console.error("Error in videos.js:",s)}}}}),ft=z("recommendation",{state:()=>({movie:null,tv:null}),actions:{async getRecommendation(t,l,s=1){try{const v=(await O({method:"GET",url:`${j}/${t}/${l}/recommendations?language=${G}&page=${s}`,headers:Y})).data.results||[],i=[];v.forEach(r=>{(r.vote_average||0)>=6&&i.length<4&&i.push(r)}),t==="movie"?this.movie=i:this.tv=i}catch(a){console.error("Error in useRecommendation:",a)}}}});const pt={key:0,class:"content-id__intro"},bt={key:0,class:"content-id__pay"},kt={class:"content-id__pay-box"},wt={class:"content-id__pay-box-btns"},$t=["src"],It={class:"content-id__intro-block"},xt={class:"content-id__intro-left"},Ct={class:"content-id__intro-left-title"},St={class:"content-id__intro-left-overview"},Ft={class:"content-id__intro-left-data"},Rt={style:{"margin-right":"15px","font-weight":"700"}},Pt={key:0},Mt={class:"runtime"},Nt={class:"content-id__intro-buttons"},Bt={style:{display:"flex","column-gap":"10px"}},Lt={class:"content-id__intro-right"},Ut=["src"],Tt={key:1,class:"content-id__intro"},Vt=["src"],Dt=["src"],Et={__name:"IntroId",props:{type:String,content:Object,video:Object,movieId:String},setup(t){const l=b(!1),s=()=>{l.value=!0,g.value=!0},a=at(),v=it(),i=ct(),r=B(),c=L(),o=t,_=b(!1),g=b(!1),d=b(0),h=p(()=>[{id:1126166,video:new URL("/Movies-information/assets/1-8cb2c957.mp4",self.location).href,title:o.content.title},{id:1084199,video:new URL("/Movies-information/assets/2-e8084013.mp4",self.location).href,title:o.content.title},{id:516729,video:new URL("/Movies-information/assets/3-c18a551f.mp4",self.location).href,title:o.content.title},{id:774370,video:new URL("/Movies-information/assets/4-a0d8821e.mp4",self.location).href,title:o.content.title},{id:710295,video:new URL("/Movies-information/assets/5-39931c3b.mp4",self.location).href,title:o.content.title}]);q(()=>{const y=sessionStorage.getItem("cashPay");d.value=y?parseInt(y,10):0});const V=p(()=>o.content?a.isPaid(o.content.id):!1),K=()=>{V.value?g.value=!0:_.value=!0},x=b(""),S=b("");h.value.some(y=>y.id===o.content.id)||(S.value="Movies currently being shown in the cinema");const Q=()=>{o.content&&!V.value&&(d.value>=2e4?(d.value-=2e4,sessionStorage.setItem("cashPay",d.value.toString()),a.payForMovie(o.content),_.value=!1,g.value=!0,x.value=""):x.value="Insufficient balance. Please add funds.")},W=()=>{_.value=!_.value,_.value||(x.value="")},D=p(()=>r.path.includes("/history")||r.path.includes("/favourites")),P=p(()=>i.history.some(y=>y.id===o.content.id)),M=p(()=>v.favorites.some(y=>y.id===o.content.id)),X=()=>{M.value?v.removeFavorite(o.content.id):v.addFavorite(o.content)},Z=()=>{c.go(-1)},tt=()=>{P.value?i.removeFromHistory(o.content.id):i.addToHistory(o.content)},et=()=>{g.value=!1,l.value=!1};return(y,E)=>{const F=C("font-awesome-icon"),ot=C("watch-btn"),nt=C("trailer-btn");return n(),I(dt,{name:"content-id__intro",mode:"out-in"},{default:A(()=>[t.content&&!g.value?(n(),u("div",pt,[e("button",{class:"content-id__close",onClick:Z},[$(F,{icon:"times"})]),_.value?(n(),u("div",bt,[R(e("div",{class:"content-id__alert"},m(x.value),513),[[N,x.value]]),R(e("div",{class:"content-id__alert"},m(S.value),513),[[N,S.value]]),e("div",kt,[E[0]||(E[0]=e("h2",{class:"content-id__pay-box-title"}," You need to pay 20,000 sum to watch this movie ",-1)),e("div",wt,[e("button",{class:"content-id__pay-box-btns_btn",onClick:W}," Cancel "),R(e("button",{class:"content-id__pay-box-btns_btn",onClick:Q}," Pay Now ",512),[[N,!S.value]])])])])):f("",!0),e("img",{src:k(lt)+t.content.backdrop_path,alt:"",class:"content-id__intro-bg"},null,8,$t),e("div",It,[e("div",xt,[e("h2",Ct,m(t.content.title||t.content.name),1),e("p",St,m(t.content.overview),1),e("p",Ft,[e("span",Rt,m(t.content.vote_average.toFixed(1)),1),e("span",null,m(new Date(t.content.first_air_date||t.content.release_date).getFullYear()),1),(n(!0),u(U,null,T(t.content.genres.slice(0,3),(w,st)=>(n(),u("span",{key:w.id},[rt(m(w.name)+" ",1),st<t.content.genres.slice(0,3).length-1?(n(),u("span",Pt,", ")):f("",!0)]))),128)),e("span",Mt,m(t.content.runtime?y.runtime:""),1)]),e("div",Nt,[$(ot,{type:t.type,id:t.content.id,onClick:K},null,8,["type","id"]),t.video?(n(),I(nt,{key:0,onClick:s,type:t.type,id:t.content.id},null,8,["type","id"])):f("",!0),e("div",Bt,[D.value?f("",!0):(n(),u("button",{key:0,onClick:X,class:"bookmark"},[$(F,{icon:[M.value?"fas":"far","bookmark"],class:H([{rotated:M.value},"bookmark__item"])},null,8,["icon","class"])])),D.value?f("",!0):(n(),u("button",{key:1,onClick:tt,class:"bookmark"},[$(F,{icon:["fas",P.value?"eye-slash":"eye"],class:H([{rotated:P.value},"bookmark__item"])},null,8,["icon","class"])]))])])]),e("div",Lt,[e("img",{src:k(J)+t.content.poster_path,alt:"",class:"content-id__intro-poster"},null,8,Ut)])])])):g.value?(n(),u("div",Tt,[l.value&&t.video?(n(),u("iframe",{key:0,src:`https://www.youtube.com/embed/${t.video.key}?rel=0&controls=1&autoplay=1&modestbranding=0&fs=0&showinfo=0&cc_load_policy=1`,title:"Трейлер",frameborder:"0",allow:"autoplay",allowfullscreen:""},null,8,Vt)):h.value?(n(),u("video",{class:"content-id__intro-video",controls:"",key:h.value.find(w=>w.id===parseInt(k(r).params.id)).id},[e("source",{src:h.value.find(w=>w.id===parseInt(k(r).params.id)).video,type:"video/mp4"},null,8,Dt)])):f("",!0),e("button",{class:"content-id__close content-id__video-close",onClick:et},[$(F,{icon:"times"})])])):f("",!0)]),_:1})}}},Ht={class:"content-id__budget"},zt={class:"content-id__budget-items"},Ot={class:"content-id__budget-item-title"},jt={class:"content-id__budget-item-text"},Gt={__name:"BudgetId",props:["content","type"],setup(t){var c,o,_;const l=t,s=((c=l.content.budget)==null?void 0:c.toLocaleString())||"0",a=((o=l.content.revenue)==null?void 0:o.toLocaleString())||"0",v=((_=l.content)==null?void 0:_.status)||"N/A",i=l.content.original_title||l.content.original_name,r=ut([{id:1,title:"Budget",text:`$ ${s}`},{id:2,title:"Fees",text:`$ ${a}`},{id:3,title:"Status",text:v},{id:4,title:"Original title",text:i}]);return(g,d)=>(n(),u("div",Ht,[e("div",zt,[(n(!0),u(U,null,T(r,h=>(n(),u("div",{class:"content-id__budget-item",key:h.id},[e("h2",Ot,m(h.title),1),e("p",jt,m(h.text),1)]))),128))])]))}},Yt={key:0,class:"content-id__recom"},qt={class:"container"},At={class:"content-id__recom-title"},Jt={class:"content-id__recom-list"},Kt={alt:"",loading:"lazy"},Qt={__name:"RecomId",props:["recomId","type"],setup(t){const l=t,s=B(),a=L(),v=c=>c>=8?{backgroundColor:"#e1c171",border:"2px solid white",color:"black"}:c>6.9?{backgroundColor:"green"}:{backgroundColor:"grey"},i=c=>c.toFixed(1),r=c=>{s.params.id!==c.toString()&&a.push(`/${l.type}/${c}`).then(()=>{location.reload()})};return vt(()=>s.params.id,()=>{location.reload()}),(c,o)=>{const _=C("router-link"),g=_t("lazy");return t.recomId?(n(),u("div",Yt,[e("div",qt,[e("h2",At,m(t.recomId.length>0?"Recommended":"No recommended"),1),e("div",Jt,[(n(!0),u(U,null,T(t.recomId,d=>(n(),I(_,{class:"content-id__recom-item",key:d.id,to:`/${t.type}/${d.id}`,vote_average:d.vote_average,onClick:h=>r(d.id)},{default:A(()=>[e("p",{style:mt(v(d.vote_average))},m(i(d.vote_average)),5),R(e("img",Kt,null,512),[[g,k(J)+d.poster_path]]),e("h2",null,m(d.title||d.name),1)]),_:2},1032,["to","vote_average","onClick"]))),128))])])])):f("",!0)}}},Wt={key:0,class:"content-id"},Xt={class:"content-id__box"},te={__name:"ContentId",props:{type:String},setup(t){const s=b(t.type),a=ht(),v=yt(),i=ft(),r=B();L();const c=p(()=>s.value==="movie"?a.movieId:a.tvId),o=p(()=>s.value==="movie"?v.movie:v.tv),_=p(()=>s.value==="movie"?i.movie:i.tv);return q(async()=>{await a.getDetails(s.value,r.params.id),await v.getVideos(s.value,r.params.id),await i.getRecommendation(s.value,r.params.id)}),gt(()=>{s.value==="movie"?(a.movieId=null,v.movie=null,i.movie=null):(a.tvId=null,v.tv=null,i.tv=null)}),(g,d)=>{const h=C("loader");return c.value?(n(),u("section",Wt,[e("div",Xt,[$(Et,{type:s.value,content:c.value,video:o.value,movieId:k(r).params.id},null,8,["type","content","video","movieId"]),c.value?(n(),I(Gt,{key:0,content:c.value},null,8,["content"])):f("",!0),k(i)&&_.value?(n(),I(Qt,{key:1,type:s.value,recomId:_.value},null,8,["type","recomId"])):f("",!0)])])):(n(),I(h,{key:1}))}}};export{te as _};
