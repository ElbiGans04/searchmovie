// $('.search-button').on('click' , function(){
    // $.ajax({
//         url : 'http://www.omdbapi.com/?apikey=5408e7c0&s=' + $('.input-keyword').val(),
    
//         success: result => {
//             const movie = result.Search;
//             let hey = ``;
//             movie.forEach(function(x){
    
//                 hey += showCard(x);
                       
//             });
    
//             $('.targetku').html(hey);
    
    
//             //beri efek ketika diclick
//             $('.modal-detail-button').on('click' , function(){
    
//                 //ajak
//                 $.ajax({
//                     url : 'http://www.omdbapi.com/?apikey=5408e7c0&i=' + $(this).data('imdbid'),
    
//                     success : r => {
//                         const movieDetail = showDetail(r);
    
//                         $('.container-fluid').html(movieDetail);
                        
//                     },
    
                    
//                     error : e => {
//                         console.log(e.responseText);
//                     }
//                 })
//                 //akhir diclick
//             });
            
    
//         },
    
//         error: e => {
//             console.log(e.responseText);
//         }
//     })

// })



// const tombolCari = document.querySelector('.search-button');

// tombolCari.addEventListener('click' , function(){
//     const inputan = document.querySelector('.input-keyword');

//     fetch('http://www.omdbapi.com/?apikey=5408e7c0&s=' + inputan.value)
//         .then(result => result.json())
//         .then(result => {
//             const movie = result.Search;
//             let list = '';
//             movie.forEach(e => list += showCard(e))

//             const target = document.querySelector('.targetku');
//             target.innerHTML = list;
            

//             //detail bro
//             const modalBody = document.querySelectorAll('.modal-detail-button');
//             modalBody.forEach(m => {
//                 m.addEventListener('click' , function(){
//                     const imdbid = this.dataset.imdbid;
                    
//                     //req
//                     fetch('http://www.omdbapi.com/?apikey=5408e7c0&i=' + imdbid)
//                         .then(result => result.json())
//                         .then(m => {
//                             const movies = showDetail(m);
//                             const modalDetail = document.querySelector('.modal-body');
//                             modalDetail.innerHTML = movies;
//                         })
//                 })
//             })


//         })
// })


 //tombol cari
const tombolCari = document.querySelector('.search-button');

tombolCari.addEventListener('click' ,async function(){
    try{
        const inputan = document.querySelector('.input-keyword');
        const movies = await getMovies(inputan.value);
        updateUi(movies);
    }catch(err){
      alert(err)
    }
});

function getMovies(keyword) {
    return fetch('http://www.omdbapi.com/?apikey=5408e7c0&s=' + keyword)
        .then(result => {
            if(!result.ok){
                throw new Error(result.statusText)
            }
           return result.json();
        })
        .then(result => {
            if(result.Response === 'False'){
                throw new Error(result.Error);
            }
            return result.Search
        })
};

function updateUi(movies) {
    let list = '';
    movies.forEach(e => list += showCard(e))
    const target = document.querySelector('.targetku');
    target.innerHTML = list;
}




// datail 
document.addEventListener('click' , async function(e){
    if(e.target.classList.contains('modal-detail-button')){
        try{
            const imdbid = e.target.dataset.imdbid;
            const movieDetail = await getMoviesDetail(imdbid);
            updateMovieDetail(movieDetail);
        }catch(err){
           alert(err);
        }
        
    }
});

function updateMovieDetail(movieDetail){
    const movies = showDetail(movieDetail);
    const modalDetail = document.querySelector('.modal-body');
    modalDetail.innerHTML = movies;
}

function getMoviesDetail(imdbid){
    return fetch('http://www.omdbapi.com/?apikey=5408e7c0&i=' + imdbid)
    .then(result => {
        if(!result.ok){
            throw new Error(result.statusText)
        }
        return result.json()
    })
    .then(m => m)
};



function showCard(x){
    return `<div class="col-md-4 my-3">
                <div class="card" >
                <img src="${x.Poster}" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">${x.Title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${x.Year}</h6>
                    <a href="#" class="btn btn-primary modal-detail-button" data-toggle="modal" data-target="#detailMovie" data-imdbID = "${x.imdbID}">Show Detail</a>
                </div>
                </div>
            </div>`
}
function showDetail(r){
    return ` <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-3">
                            <img src="${r.Poster}" alt="" class="img-fluid">
                        </div>

                        <div class="col-md">
                        <ul class="list-group">
                            <li class="list-group-item"><h1>${r.Title}(${r.Year})</h1></li>
                            <li class="list-group-item"><strong>Director : </strong> ${r.Director}</li>
                            <li class="list-group-item"><strong>Actors :</strong> ${r.Actors}</li>
                            <li class="list-group-item"><strong>Writer :</strong> ${r.Writer}</li>
                            <li class="list-group-item"><strong>Plot :</strong> ${r.Plot}</li>
                        </ul>
                        </div>
                    </div>
            </div>`
}


fetch("http://www.omdbapi.com/?apikey=5408e7c0&s=avengers")
	.then(result => console.log(result))

