window.onload = init;
document.onselectstart = function() {return false;}

function init() {
    let player = new Player(musicArray);
    player.init();
}

function Player(musicArray) {
    this.musicArray = musicArray.slice();
    this.id = 0;
    this.img = $('.cd-cover');
    this.audio = $('audio');
    this.title = $('.song-title');
    this.author = $('.song-author');
    this.rotateDeg = 0;
    this.rotateTimer = null;
    this.duration = $('.time-total');
    this.nowTime = $('.time-now');
    this.dataItem = null;
    this.loop = false;
    this.listLoop = true;
    this.audio.volume = 0.5;
    this.barTimer = null;
    this.downLoadSrc;
    this.bindClickEvent();
}

Player.prototype.init = function(id = 0) {
    this.id = id;
    this.dataItem = findItem(this.musicArray, id).element;
    this.img.src = this.dataItem.image;
    this.title.innerText = this.dataItem.name;
    this.author.innerText = this.dataItem.author;
    this.audio.src = this.dataItem.song;
    this.rotateDeg = 0;
    this.downLoadSrc = this.dataItem.song;
    $('.love span').className = this.dataItem.isLove ? 'glyphicon glyphicon-heart' : 'glyphicon glyphicon-heart-empty';
    this.setImgRotate();
    this.audio.addEventListener('canplay', this.displayBar.bind(this));
    $('.download-btn a').downLoad = this.dataItem.name;
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
    // play and pause
    playBtn.addEventListener('click', function(e) {
        if($('.play-btn span').classList.contains('glyphicon-play')) {
            self.audio.play();
            $('.play-btn span').className = 'glyphicon glyphicon-pause';
            self.audio.addEventListener('canplay', self.displayBar.bind(self));
        }
        else if($('.play-btn span').classList.contains('glyphicon-pause')) {
            self.audio.pause();
            $('.play-btn span').className = 'glyphicon glyphicon-play';
        }
    }, false);
    // add love
    let loveBtn = $('.love');
    loveBtn.addEventListener('click', function(e) {
        if(self.dataItem.isLove) {
            self.dataItem.isLove = false;
            $('.love span').className = 'glyphicon glyphicon-heart-empty';
        }
        else {
            self.dataItem.isLove = true;
            $('.love span').className = 'glyphicon glyphicon-heart';
        }
    }, false);
    // download
    let downLoad = $('.download-btn');
    downLoad.addEventListener('click', function(e) {
        $('.download-btn a').href = self.downLoadSrc;
    }, false);
    // upload
    let upload = $('.upload-btn');
    upload.addEventListener('click', function() {
        $('.upload-input').click();
    }, false);
    // random or listLoop
    let randomBtn = $('.random-btn');
    randomBtn.addEventListener('click', function(e) {
        if(self.listLoop) {
            self.listLoop = false;
            $('.random-btn span').className = 'glyphicon glyphicon-random';
        }else {
            self.listLoop = true;
            $('.random-btn span').className = 'glyphicon glyphicon-retweet';
        }
    }, false);
    // next song
    let nextBtn = $('.next-btn');
    nextBtn.addEventListener('click', function(e) {
        // list loop
        if(self.listLoop) {
            self.id = (self.id + 1) % musicArray.length;
            self.init(self.id);
            if($('.play-btn span').className = 'glyphicon glyphicon-play') {
                playBtn.click();
            }
        }else if(!self.listLoop) {
            let randomId = Math.floor(Math.random() * self.musicArray.length);
            self.id = randomId;
            self.init(self.id);
            if($('.play-btn span').className = 'glyphicon glyphicon-play') {
                playBtn.click();
            }
        }
        $('.time-total').innerText = '00:00';
        $('.time-now').innerText = '00:00';
    }, false);
    // delete song
    let deleteBtn = $('.delete');
    deleteBtn.addEventListener('click', function(e) {
        if(self.musicArray.length > 1) {
            self.musicArray.splice(findItem(self.musicArray, self.id).index, 1);
            nextBtn.click();
        }
        else {
            $('#delete-div').style.display = 'block';
        }
    }, false);
    // control volume
    let volumeBtn = $('.volume-btn');
    volumeBtn.addEventListener('click', function(e) {
        if(self.audio.volume !== 0) {
            $('.volume-btn span').className = 'glyphicon glyphicon-volume-off';
            self.audio.volume = 0;
            $('.volume-progress-now').style.height = 0 + 'px';
            $('.volume-progress-guider').style.bottom = $('.volume-progress-now').offsetHeight - 4 + 'px';
        }else {
            $('.volume-btn span').className = 'glyphicon glyphicon-volume-up';
            // regain volume
            self.audio.volume = 0.5;
            $('.volume-progress-now').style.height = 32 + 'px';
            $('.volume-progress-guider').style.bottom = $('.volume-progress-now').offsetHeight - 4 + 'px';
        }
    }, false);
    volumeBtn.addEventListener('mouseenter', function(e) {
        $('.volume-progress').style.display = 'block';
        $('.volume-progress').onmouseleave = function() {
            this.style.display = 'none';
        }
    }, false);
    volumeBtn.addEventListener('mouseleave', function(e) {
        if(e.relatedTarget !== $('.volume-progress')) {
            $('.volume-progress').style.display = 'none';
            $('.volume-progress').onmouseleave = null;
        }
    });
    // click volume progress bar
    let volumeProgress = $('.volume-progress-total');
    volumeProgress.addEventListener('click', function(e) {
        let totalHeight = volumeProgress.offsetHeight;
        let guider = $('.volume-progress-guider');
        let baseHeight = getScreenOffsetTop(volumeProgress) + 64;
        let guideHeight = getScreenOffsetTop(guider) + 3;
        let clickY = e.clientY + 141;

        let diffHeight = baseHeight - clickY;
        let percent = diffHeight / totalHeight;
        let nowHeight = 64 * percent;
        $('.volume-progress-now').style.height = nowHeight + 'px';
        $('.volume-progress-guider').style.bottom = $('.volume-progress-now').offsetHeight - 4 + 'px';
        self.audio.volume = percent < 0 ? 0 :percent;
        if(self.audio.volume <= 0) {
            $('.volume-btn span').className = 'glyphicon glyphicon-volume-off';
        }
        else {
            $('.volume-btn span').className = 'glyphicon glyphicon-volume-up';
        }
    }, false);
    // control play progress
    let songProgress = $('.song-progress-bar');
    songProgress.addEventListener('mouseenter', function(e) {
        $('.song-progress-guider').style.display = 'block';
    }, false);
    songProgress.addEventListener('mouseleave', function(e) {
        $('.song-progress-guider').style.display = 'none';
    }, false);

    songProgress.addEventListener('mousedown', function(e) {
        self.audio.pause();
        clearInterval(self.barTimer);
        let totalWidth = songProgress.offsetWidth;
        let guider = $('.song-progress-guider');
        let baseLeft = songProgress.offsetLeft;
        let clickX = e.offsetX;
        let diffWidth = clickX - baseLeft;
        let percent = diffWidth / totalWidth;
        let nowWidth = totalWidth * percent;
        move(e);
        this.addEventListener('mousemove', move, false);
        function move(e) {
            if(e.toElement.className === 'song-progress-guider') return null;
            clickX = e.offsetX;
            diffWidth = clickX - baseLeft;
            percent = diffWidth / totalWidth;
            nowWidth = totalWidth * percent;
            self.audio.currentTime = percent * self.audio.duration; 
            $('.song-progress-now').style.width = nowWidth + 'px';
            guider.style.left = $('.song-progress-now').offsetWidth - 3 + 'px';
        }
        document.addEventListener('mouseup', function() {
            self.audio.addEventListener('canplay', self.displayBar.bind(self));
            if(!$('.play-btn span').classList.contains('glyphicon-play')) self.audio.play();
            songProgress.removeEventListener('mousemove', move, false);
        }, false);
    }, false);
    // single loop
    let loopBtn = $('.loop-btn');
    loopBtn.addEventListener('click', function() {
         if(self.loop) {
            self.loop = false;
            $('.loop-btn span').className = 'glyphicon glyphicon-arrow-right';
        }else {
            self.loop = true;
            $('.loop-btn span').className = 'glyphicon glyphicon-refresh';
        }
    }, false);
}

Player.prototype.displayBar = function() {
    let nowTime = this.nowTime;
    let audio = this.audio;
    let guider = $('.song-progress-guider');
    let nowBar = $('.song-progress-now');
    let bar = $('.song-progress-bar');
    let percent = 0;
    let self = this;
    $('.time-total').innerText = formatTime(self.audio.duration);
    audio.onended = function() {
        if(self.loop) {
            $('.play-btn').click();
            $('.play-btn').click();
        } 
        else {
            $('.next-btn').click();
            self.displayBar();
        }
    }
    clearInterval(self.barTimer);
    self.barTimer = setInterval(function() {
        nowTime.innerHTML = formatTime(audio.currentTime);
        percent = audio.currentTime / audio.duration;
        nowBar.style.width = 440 * percent + 'px';
        guider.style.left = nowBar.offsetWidth - 3 + 'px';
    }, 50);
}

function $(selector) {
    return document.querySelector(selector);
}

// find correct id
function findItem(arr, id) {
    let item = {};
    for(let i=0; i<arr.length; i++) {
        if(arr[i].id === id) {
            item.element = arr[i];
            item.index = i;
        }
    }
    return item;
}

// change s to 00:00
function formatTime(s) {
    let min = Math.floor((s / 60));
    let second = (s % 60).toFixed(0);
    let formatMin = min < 10 ? '0'+min : min;
    let formatSecond = second < 10 ? '0'+second : second;
    return formatMin + ':' + formatSecond;
}

function getScreenOffsetTop(ele) {
    let top = 0;
    while (ele) {
        top += ele.offsetTop;
        ele = ele.offsetParent;
    }
    return top;
}

function getScreenOffsetLeft(ele) {
    let left = 0;
    while (ele) {
        top += ele.offsetLeft;
        ele = ele.offsetParent;
    }
    return left;
}
