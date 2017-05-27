window.onload = init;

function init() {
    let player = new Player(musicArray);
    player.init();
}

function Player(musicArray) {
    this.musicArray = musicArray;
    this.img = $('.cd-cover');
    this.audio = $('audio');
    this.title = $('.song-title');
    this.author = $('.song-author');
    this.rotateDeg = 0;
    this.rotateTimer = null;
    this.duration = $('.time-total');
    this.downLoadSrc;
    this.bindClickEvent();
}

Player.prototype.init = function(id = 0) {
    let item = findItem(this.musicArray, id);
    this.img.src = item.image;
    this.title.innerText = item.name;
    this.author.innerText = item.author;
    this.audio.src = item.song;
    this.rotateDeg = 0;
    this.downLoadSrc = this.img.src;
    this.setImgRotate();
}

Player.prototype.setImgRotate = function() {
    clearInterval(this.rotateTimer);
    this.rotateTimer = setInterval(() => {
        this.rotateDeg += 0.5;
        this.rotateDeg %= 360;
        this.img.style.transform = 'rotate(' + this.rotateDeg + 'deg)';
    }, 50);
}

Player.prototype.bindClickEvent = function() {
    let playBtn = $('.play-btn');
    let self = this;
    playBtn.addEventListener('click', function(e) {
        if($('.play-btn span').classList.contains('glyphicon-play')) {
            self.audio.play();
            $('.play-btn span').className = 'glyphicon glyphicon-pause';
        }
        else if($('.play-btn span').classList.contains('glyphicon-pause')) {
            self.audio.pause();
            $('.play-btn span').className = 'glyphicon glyphicon-play';
        }
    }, false);
}

function $(selector) {
    return document.querySelector(selector);
}

// find correct id
function findItem(arr, id) {
    let item = null;
    arr.forEach(function(element) {
        if(element.id === id) item = element;
    });
    return item;
}

