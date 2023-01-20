const APILINK = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=0c2744c9cdbe9df3f3b38530a61427c9&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCHAPI = 'https://api.themoviedb.org/3/search/movie?&api_key=0c2744c9cdbe9df3f3b38530a61427c9&query=';

const main=document.querySelector('.mainContent');
const form=document.querySelector('.searchBar');
const search= document.getElementById('query'); 

const botBar=document.querySelector('.botBar');
const prev=document.querySelector('.prev');
const next=document.querySelector('.next');
const pageNum=document.querySelector('.pageNum');


let index=1;
pageNum.innerHTML=`<u>${index}</u>   ${index+1}    ${index+2} `;
prev.addEventListener('click',()=>{
    if(index<=1){
        return;
    }else{
        index--;
        main.innerHTML='';
        pageNum.innerHTML=`<u>${index}</u>   ${index+1}    ${index+2} `;
        let Movies=`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=0c2744c9cdbe9df3f3b38530a61427c9&page=${index}`;
        returnMovies(Movies);
    }
})
next.addEventListener('click',()=>{
    if(index>=10){
        return;
    }else{
        index++;
        main.innerHTML='';
        pageNum.innerHTML=`<u>${index}</u>   ${index+1}    ${index+2} `;
        let Movies=`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=0c2744c9cdbe9df3f3b38530a61427c9&page=${index}`;
        returnMovies(Movies);
    }
})
returnMovies(APILINK);
function returnMovies(url){
    fetch(url).then(res=>res.json())
    .then(function(data){
        data.results.forEach(e=>{
            const div_card=document.createElement('div');
            div_card.setAttribute('class','card');

            const img_tag=document.createElement('img');
            const p_tag=document.createElement('p');

            const div_option=document.createElement('div');
            div_option.setAttribute('class','optionBtn');

            div_option.innerHTML=`
            <button id="download" onclick="window.location.href='movie.html?id=${e.id}&title=${e.title}&poster_path=${e.poster_path}'">Reviews</button>
            <button id="streamOnline" onclick="window.location.href='https://soapgate.org/'">Stream Online</button>
            `;

            img_tag.src=IMG_PATH+e.poster_path;
            p_tag.innerHTML=e.title;

            // div_option.appendChild(btn1);
            // div_option.appendChild(btn2);

            div_card.appendChild(img_tag);
            div_card.appendChild(p_tag);
            div_card.appendChild(div_option);

            main.appendChild(div_card);

        });
    });
}

form.addEventListener('submit',e=>{ 
    e.preventDefault();
    main.innerHTML='';
    botBar.style.display='none';
    const searchItem= search.value;

    if(searchItem){
        returnMovies(SEARCHAPI+searchItem);
        search.value='';
    }
})