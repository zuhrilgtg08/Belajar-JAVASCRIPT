const container = document.querySelector('.container');
const jumboImg = document.querySelector('.img-jumbo');
const thumbs = document.querySelectorAll('.thumb');

container.addEventListener('click', function (e) {
    // cek jika di klik apakah thumb ?
    if (e.target.className == 'thumb') {
        jumboImg.src = e.target.src;
        jumboImg.classList.add('fade');
        setTimeout(function () {
            jumboImg.classList.remove('fade');
        }, 500);

        thumbs.forEach(function (thumb) {
            // if (thumb.classList.contains('active')) {
            //     thumb.classList.remove('active');
            // }
            thumb.className = 'thumb';
        });

        e.target.classList.add('active');
    }
});