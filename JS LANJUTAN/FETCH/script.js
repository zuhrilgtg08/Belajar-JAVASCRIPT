// Jquery
// $('.button-carikan').on('click', function () {
//     $.ajax({
//         url: 'http://www.omdbapi.com/?apikey=3d310eee&s=' + $('.keyword').val(),
//         success: results => {
//             const film = results.Search;
//             let cards = '';
//             film.forEach(f => {
//                 cards += showCards(f);
//             });

//             $('.film-container').html(cards);

//             // ketika button modal di klick
//             $('.detail-modal').on('click', function () {
//                 // console.log($(this).data('imdbid'));
//                 $.ajax({
//                     url: 'http://www.omdbapi.com/?apikey=3d310eee&i=' + $(this).data('imdbid'),
//                     success: f => {
//                         const filmDetails = showModalDetails(f);
//                         $('.modal-body').html(filmDetails);
//                     },
//                     error: (e) => {
//                         console.log(e.responseText);
//                     }
//                 });
//             });
//         },
//         error: (e) => {
//             console.log(e.responseText);
//         }
//     });
// });

// Fetch
const searchButton = document.querySelector('.button-carikan');
const inputSearch = document.querySelector('.keyword');
const movieContainer = document.querySelector('.film-container');

searchButton.addEventListener('click', function () {
    fetch('http://www.omdbapi.com/?apikey=3d310eee&s=' + inputSearch.value)
        .then(response => response.json())
        .then(response => {
            const movies = response.Search;
            let cards = '';
            movies.forEach(m => cards += showCards(m));
            movieContainer.innerHTML = cards;

            // ketika button modal di klik
            const modalDetail = document.querySelectorAll('.detail-modal');
            modalDetail.forEach(btn => {
                btn.addEventListener('click', function () {
                    const imdbID = this.dataset.imdbid;
                    fetch('http://www.omdbapi.com/?apikey=3d310eee&i=' + imdbID)
                        .then(response => response.json())
                        .then(movies => {
                            const movieDetail = showModalDetails(movies);
                            const showModal = document.querySelector('.modal-body');
                            showModal.innerHTML = movieDetail;
                        });
                });
            });
        });
});

function showCards(f) {
    return `<div class="col-md-4 my-4">
                <div class="card">
                    <img src="${f.Poster}" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">${f.Title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${f.Year}</h6>
                        <a href="#" class="btn btn-primary detail-modal" data-toggle="modal" data-target="#detailModal" data-imdbid="${f.imdbID}">Show Details</a>
                    </div>
                </div>
            </div>`;
}

function showModalDetails(f) {
    return `<div class="container-fluid">
                <div class="row">
                    <div class="col-md-3">
                        <img src="${f.Poster}" alt="cardImg" class="img-fluid">
                    </div>
                    <div class="col-md">
                        <ul class="list-group">
                            <li class="list-group-item"><h4>${f.Title} (${f.Year})</h4></li>
                            <li class="list-group-item"><strong>Director : </strong> ${f.Director}</li>
                            <li class="list-group-item"><strong>Actors: </strong> ${f.Actors}</li>
                            <li class="list-group-item"><strong>Writer: </strong> ${f.Writer}</li>
                            <li class="list-group-item"><strong>Plot: </strong>${f.Plot}</li >
                            <li class="list-group-item"><strong>Type: </strong> ${f.Type}</li>
                        </ul>
                    </div>
                </div>
            </div>`;
}