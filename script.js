const key="c6cf19f5fc524d7ca7528882601d115c";
const url="https://newsapi.org/v2/everything?q=";
window.addEventListener('load',()=>fetchnews("world"));

async function fetchnews(query){
    const res=await fetch(`${url}${query}&apiKey=${key}`)
    const data=await res.json()
    console.log(data)
    binddata(data.articles);
}
function binddata(articles){
    const cardcontainer=document.getElementById("card-container");
    const cardtemplate=document.getElementById("template");
    cardcontainer.innerHTML='';
    articles.forEach((article)=>{
        if(!article.urlToImage)return;
        const cardclone=cardtemplate.content.cloneNode(true);
        filldata(cardclone,article)
        cardcontainer.appendChild(cardclone);
    })
}

function filldata(cardclone,article){
    const img=cardclone.querySelector('#news-img')
    const title=cardclone.querySelector('#news-title')
    const source=cardclone.querySelector('#news-source')
    const desc=cardclone.querySelector('#desc')
    img.src=article.urlToImage;
    title.innerHTML=article.title;
    desc.innerHTML=article.description;
    const date=new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone:"Asia/Jakarta"
       
    })
    source.innerHTML=`${article.source.name} . ${date}`
    cardclone.firstElementChild.addEventListener("click",()=>{
        window.open(article.url,"_blank")
    })
}
let currselesct=null;
function onnavitem(id){
    fetchnews(id);  
    const navitem=document.getElementById(id);
    currselesct?.classList.remove('active');
    currselesct=navitem;
    currselesct.classList.add('active');
}

const searchbtn=document.getElementById('searchbtn')
const searchtext=document.getElementById('searchtext')

searchbtn.addEventListener("click",()=>{
    const query=searchtext.value;
    if(!query)return;
    fetchnews(query);
    currselesct?.classList.remove('active');
currselesct=null;
})
