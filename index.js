import{i as c,S as p}from"./assets/vendor-B07T6_gy.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&l(i)}).observe(document,{childList:!0,subtree:!0});function r(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function l(e){if(e.ep)return;e.ep=!0;const o=r(e);fetch(e.href,o)}})();const d=s=>s.reduce((t,r)=>t+`
      <li class="gallery-card">
        <a class="gallery-link" href="${r.largeImageURL}">
          <img class="gallery-img" src="${r.webformatURL}" alt="${r.tags}" />
        </a>
        <div class="gallery-info">
          <p><span>Likes:</span> ${r.likes}</p>
          <p><span>Views:</span> ${r.views}</p>
          <p><span>Comments:</span> ${r.comments}</p>
          <p><span>Downloads:</span> ${r.downloads}</p>
        </div>
      </li>
    `,""),m=s=>fetch(`https://pixabay.com/api/?key=47683521-7bc13f64e806eb93b38e1f294&q=${s}&image_type=photo&orientation=horizontal&safesearch=true`).then(t=>{if(!t.ok)throw new Error(t.status);return t.json()}),f=document.querySelector(".js-search-form"),n=document.querySelector(".js-gallery"),u=document.querySelector(".js-loader");let a;const h=s=>{s.preventDefault();const t=s.currentTarget.elements.user_query.value.trim();if(t===""){c.error({message:"Please enter a search word",position:"topRight",timeout:3e3});return}n.innerHTML="",u.classList.remove("is-hidden"),m(t).finally(()=>{u.classList.add("is-hidden")}).then(r=>{if(r.total===0){c.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",timeout:3e3}),n.innerHTML="";return}n.innerHTML=d(r.hits),a?a.refresh():a=new p(".gallery-link",{captions:!0,captionsData:"alt",captionDelay:250})}).catch(r=>{console.log(r)})};f.addEventListener("submit",h);
//# sourceMappingURL=index.js.map
