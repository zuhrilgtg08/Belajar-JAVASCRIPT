// fetch Refactoring
const tombolCarikan = document.querySelector('.button-carikan');
tombolCarikan.addEventListener('click', async function () {
    const inputKeyword = document.querySelector('.keyword');
    const movies = await getMovies(inputKeyword.value);
    updateAntarMuka(movies);
});

// ketika tombol detail di click
// event binding
document.addEventListener('click', async function (e) {
    if (e.target.classList.contains('detail-modal')) {
        const imdbID = e.target.dataset.imdbid;
        const movieDetail = await getMovieDetail(imdbID);
        updateModalDetail(movieDetail);
    }
});

// function
function getMovies(keyword) {
    return fetch('http://www.omdbapi.com/?apikey=3d310eee&s=' + keyword)
        .then(response => response.json())
        .then(response => response.Search);
}

function updateAntarMuka(films) {
    let cards = '';
    films.forEach(f => cards += showCards(f));
    const movieContainer = document.querySelector('.film-container');
    movieContainer.innerHTML = cards;
}

function getMovieDetail(imdbid) {
    return fetch('http://www.omdbapi.com/?apikey=3d310eee&i=' + imdbid)
        .then(response => response.json())
        .then(movies => movies);
}

function updateModalDetail(detail) {
    const movieDetail = showModalDetails(detail);
    const showModal = document.querySelector('.modal-body');
    showModal.innerHTML = movieDetail;
}

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