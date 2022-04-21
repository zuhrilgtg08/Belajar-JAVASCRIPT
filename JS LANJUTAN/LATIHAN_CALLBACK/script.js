$('.button-carikan').on('click', function () {
    $.ajax({
        url: 'http://www.omdbapi.com/?apikey=3d310eee&s=' + $('.keyword').val(),
        success: results => {
            const film = results.Search;
            let cards = '';
            film.forEach(f => {
                cards += showCards(f);
            });

            $('.film-container').html(cards);

            // ketika button modal di klick
            $('.detail-modal').on('click', function () {
                // console.log($(this).data('imdbid'));
                $.ajax({
                    url: 'http://www.omdbapi.com/?apikey=3d310eee&i=' + $(this).data('imdbid'),
                    success: f => {
                        const filmDetails = showModalDetails(f);
                        $('.modal-body').html(filmDetails);
                    },
                    error: (e) => {
                        console.log(e.responseText);
                    }
                });
            });
        },
        error: (e) => {
            console.log(e.responseText);
        }
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