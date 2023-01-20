// getting information from the link
const url= new URL(location.href);
const movieId=url.searchParams.get('id');

const APILINK = 'https://megaview.manasgupta24.repl.co/api/v1/reviews/';
const MOVIE_DATA=`https://api.themoviedb.org/3/movie/${movieId}?api_key=0c2744c9cdbe9df3f3b38530a61427c9&language=en-US`;
const MORE_IMAGES=`https://api.themoviedb.org/3/movie/${movieId}/images?api_key=0c2744c9cdbe9df3f3b38530a61427c9`;
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
// const SEARCHAPI = 'https://api.themoviedb.org/3/search/movie?&api_key=0c2744c9cdbe9df3f3b38530a61427c9&query=';

const main=document.querySelector('.mainConten');
const title=document.querySelector('.title');
const posterImg=document.querySelector('.posterImg')
const runTime=document.querySelector('.runTime');
const genRes=document.querySelector('.genres');
const releaseDate=document.querySelector('#releaseDate');
const overview=document.querySelector('.overView');
const budGet=document.querySelector('.budGet');
const reveNue=document.querySelector('.reveNue');
const backdrop=document.querySelector('.backdrop');

fetch(MOVIE_DATA).then(res=>res.json())
.then((data)=>{
  console.log(data);
  title.textContent=data.original_title;
  posterImg.src=IMG_PATH+data.poster_path;
  backdrop.src=IMG_PATH+data.backdrop_path;
  runTime.textContent=`runtime : ${data.runtime} mins`;
  releaseDate.innerHTML=data.release_date;
  overview.innerHTML=data.overview;
  genRes.textContent=`genres : `;
  for(let i=0;i<data.genres.length;i++){
    if(i==data.genres.length-1){
      genRes.textContent+=`${data.genres[i].name}`;
    }else{
      genRes.textContent+=`${data.genres[i].name} , `;
    }
  }
  let usd=new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'});
  budGet.innerHTML=`budget : <br> ${usd.format(data.budget)}`;
  reveNue.innerHTML=`box office : <br> ${usd.format(data.revenue)}`;
});
// const form=document.querySelector('.searchBar');
// const search= document.getElementById('query'); 

const div_new = document.createElement('div');
div_new.innerHTML = `
  <div class="cardReview">
    <div class="y">Add New Review</div>
    <input type="text" id="new_user" value="" placeholder="user"><br><br>
    <textarea type="text" id="new_review" value="" placeholder="review"></textarea><br><br>
    <button class="saveBtn" onclick="saveReview('new_review', 'new_user')">Save💾</button>
  </div>
`
main.appendChild(div_new)

returnReview(APILINK);
function returnReview(url){
    fetch(url+"movie/"+movieId).then(res=>res.json())
    .then(function(data){
        data.forEach(review=>{
            const div_card=document.createElement('div');
            div_card.setAttribute('class','cardReview');
            div_card.setAttribute('id',`${review._id}`);
            div_card.innerHTML=`
            <p><strong>User: </strong>${review.user}</p>
            <p><strong>Review: </strong></p>
            <div id="x">${review.review}</div>
            <div id="optionBtn">
            <button id="download" style="border-radius:10px;margin:5px" onclick="editReview('${review._id}','${review.review}','${review.user}')">Edit🖋️</button>
            <button id="streamOnline" style="border-radius:10px;margin:5px"  onclick="deleteReview('${review._id}')">Remove🗑️</button>               
            </div>
            `;
            main.appendChild(div_card);
        });
    });
}

function editReview(id, review, user) {

    const element = document.getElementById(id);
    const reviewInputId = "review" + id
    const userInputId = "user" + id
    
    element.innerHTML = `
                <p><strong>Review: </strong>
                  <input type="text" id="${reviewInputId}" value="${review}">
                </p>
                <p><strong>User: </strong>
                  <input type="text" id="${userInputId}" value="${user}">
                </p>
                <p><a href="#" onclick="saveReview('${reviewInputId}', '${userInputId}', '${id}',)">💾</a>
                </p>
    
    `
}
function saveReview(reviewInputId, userInputId, id="") {
    const review = document.getElementById(reviewInputId).value;
    const user = document.getElementById(userInputId).value;
  
    if (id) {
        fetch(APILINK + id, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"user": user, "review": review})
    }).then(res => res.json())
    .then(res => {
        console.log(res)
        location.reload();
    });  
    // for new review      
    } else {
        fetch(APILINK + "new", {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"user": user, "review": review, "movieId": movieId})
        }).then(res => res.json())
        .then(res => {
            location.reload();
        });
    }
}
function deleteReview(id) {
    fetch(APILINK + id, {
      method: 'DELETE'
    }).then(res => res.json())
      .then(res => {
        console.log(res)
        location.reload();
      });    
  }
// form.addEventListener('submit',e=>{ 
//     e.preventDefault();
//     main.innerHTML='';

//     const searchItem= search.value;

//     if(searchItem){
//         returnMovies(SEARCHAPI+searchItem);
//         search.value='';
//     }
// })

// color code
