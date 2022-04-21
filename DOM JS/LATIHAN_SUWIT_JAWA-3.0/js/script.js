// Tangkap img komputer
const imgComputer = document.querySelector('.img-computer');
const selectAll = Array.from(document.querySelectorAll('.pilihan > img'));
const info = document.querySelector('.info');

// Tangkap score komputer dan player
const scoreComputer = document.getElementById('score-computer');
const scorePlayer = document.getElementById('score-player');
let scorePlayerCount = 0;
let scoreComputerCount = 0;

// Deklarasi kesempatan main
const kesempatan = document.getElementById('kesempatan');
let totalKesempatan = 3;

// tangkap score-result dan score-result-object
const scoreResult = document.querySelector('.nofocus');
const scoreResultObject = document.getElementById('score-result-object');

// bikin function tangkap pilihan computer
function getPilihanComputer() {
    const computer = Math.random();
    if (computer < 0.33) return 'semut';
    else if (computer >= 0.33 && computer < 0.667) return 'orang';
    return 'gajah';
}

// bikin Function memperoleh hasil dengan params (computer, player)
function getHasil(computer, player) {
    if (player === computer) return 'SERI!';
    else if (player === 'semut') {
        if (computer === 'orang') {
            scoreComputerCount += 1;
            totalKesempatan -= 1;
            return 'KALAH!';
        } else {
            scorePlayerCount += 1;
            return 'MENANG!';
        }
    } else if (player === 'orang') {
        if (computer === 'semut') {
            scorePlayerCount += 1;
            return 'MENANG!';
        } else {
            scoreComputerCount += 1;
            totalKesempatan -= 1;
            return 'KALAH!';
        }
    } else if (player === 'gajah') {
        if (computer === 'orang') {
            scorePlayerCount += 1;
            return 'MENANG!';
        } else {
            scoreComputerCount += 1;
            totalKesempatan -= 1;
            return 'KALAH!';
        }
    }
}

// bikin function hasil pada antarmuka website
let bgInfo;

function infoBg(hasil) {
    if (hasil === 'SERI!') {
        info.style.backgroundColor = '#EDEDED';
        info.classList.add('text-black');
    } else if (hasil === 'MENANG!') {
        info.classList.remove('text-black');
        info.style.backgroundColor = '#2BBB0E';
    } else if (hasil === 'KALAH!') {
        info.classList.remove('text-black');
        info.style.backgroundColor = 'crimson';
    }
}

// bikin function acak gambar
let i = 0;

function acakGambar() {
    const start = new Date().getTime();

    setInterval(function () {
        if (new Date().getTime() - start > 1100) {
            clearInterval;
            return;
        }

        imgComputer.setAttribute('src', selectAll[i++].getAttribute('src'));
        if (i === selectAll.length) {
            i = 0;
        }
    }, 120);
}

// bikin function Tampilkan note pada computer
function noteComputer() {
    const kalimat = Math.random();
    if (kalimat < 0.2) return 'Good Luck next Time (ndak bisa bahasa enggres wkwkwk)';
    else if (kalimat >= 0.2 && kalimat < 0.4) return 'Yok Bisa Yok!';
    else if (kalimat >= 0.4 && kalimat < 0.6) return 'Ahh Kok Menyerah SIh?';
    else if (kalimat >= 0.6 && kalimat < 0.8) return 'Bangsat Lu Computer Anying';
    return 'Yah nggak tahu, kok tanya saya..';
}

// bikin function tampilkan note ke player
function notePlayer() {
    const kalimatPlayer = Math.random();
    if (kalimatPlayer < 0.2) return 'GG Gaming!';
    else if (kalimatPlayer >= 0.2 && kalimatPlayer < 0.4) return 'Lanjut Kalahkan Bro!';
    else if (kalimatPlayer >= 0.4 && kalimatPlayer < 0.6) return 'Computernya Kena Mental Min wkwk';
    else if (kalimatPlayer >= 0.6 && kalimatPlayer < 0.8) return 'INTERESTING Lo Bro!';
    return 'Hmm... Tidak Diragukan Lagi You The Best!';
}

// PROGRAM RULES MAIN
selectAll.forEach(function (img) {
    img.addEventListener('click', function () {
        const pilihanComputer = getPilihanComputer();
        const pilihanPlayer = this.className;
        const hasil = getHasil(pilihanComputer, pilihanPlayer);

        setTimeout(function () {
            if (pilihanComputer === 'semut') {
                imgComputer.setAttribute('src', 'img/semut.png');
                imgComputer.setAttribute('alt', 'Semut');
                imgComputer.setAttribute('title', 'Semut');
            } else if (pilihanComputer === 'orang') {
                imgComputer.setAttribute('src', 'img/orang.png');
                imgComputer.setAttribute('alt', 'Orang');
                imgComputer.setAttribute('title', 'Orang');
            } else if (pilihanComputer === 'gajah') {
                imgComputer.setAttribute('src', 'img/gajah.png');
                imgComputer.setAttribute('alt', 'Gajah');
                imgComputer.setAttribute('title', 'Gajah');
            }

            info.textContent = hasil;
            infoBg(hasil);

            scoreComputer.textContent = scoreComputerCount;
            scorePlayer.textContent = scorePlayerCount;

            kesempatan.textContent = totalKesempatan;
            if (totalKesempatan < 0) {
                kesempatan.textContent = totalKesempatan = 0;
            }

            if (scoreComputerCount >= 4) {
                scoreResult.classList.remove('hidden');
                scoreResultObject.textContent = 'Computer';
                scoreResultObject.style.color = '#5C33F6';
                document.getElementById('score-result-note').textContent = noteComputer();
                scoreComputer.textContent = scoreComputerCount = 4;
            } else if (scorePlayerCount >= 4) {
                scoreResult.classList.remove('hidden');
                scoreResultObject.textContent = 'Player';
                scoreResultObject.style.color = '#DA0037';
                document.getElementById('score-result-note').textContent = notePlayer();
                scorePlayer.textContent = scorePlayerCount = 4;
            }
        }, 1100);

        acakGambar();
    });
});

scoreResult.querySelector('button').addEventListener('click', function () {
    scoreResult.classList.add('hidden');
    scoreComputer.textContent = scoreComputerCount = 0;
    scorePlayer.textContent = scorePlayerCount = 0;
    kesempatan.textContent = totalKesempatan = 3;

    info.classList.remove('text-black');
    info.style.backgroundColor = '#F9F9F9';
    info.textContent = '';
    info.classList.remove('text-black');
    info.style.backgroundColor = '#F9F9F9';
    info.textContent = '';
});