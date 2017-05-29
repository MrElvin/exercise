let $ = function(element) {
    return document.querySelector(element);
}

let menu = $('.menu');
let area = $('.context-custom-container');

window.onload = init;

function init() {
    area.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        e.returnValue = false;

        menu.style.display = 'block';
        let menuWidth = menu.offsetWidth;
        let menuHeight = menu.offsetHeight;
        let totalWidth = document.body.offsetWidth;
        let totalHeight = area.offsetHeight;

        if((e.clientY + menuHeight - area.offsetTop > totalHeight) && e.clientX + menuWidth > totalWidth) {
            menu.style.left = e.clientX - menuWidth + 'px';
            menu.style.top = e.clientY - menuHeight + 'px';
        }
        else if(e.clientX + menuWidth > totalWidth) {
            menu.style.left = e.clientX - menuWidth + 'px';
            menu.style.top = e.clientY + 'px';
        }
        else if((e.clientY + menuHeight - area.offsetTop) > totalHeight) {
            menu.style.left = e.clientX + 'px';
            menu.style.top = e.clientY - menuHeight + 'px';
        }
        else {
            menu.style.left = e.clientX + 'px';
            menu.style.top = e.clientY + 'px';
        }
    }, false);
    document.addEventListener('click', function(e) {
        menu.style.display = 'none';
    }, false);
    menu.addEventListener('click', function(e){
        e.stopPropagation();
        if(e.target.tagName.toLowerCase() === 'a') {
            alert(e.target.innerText);
            menu.style.display = 'none';
        }
    }, false);
    menu.addEventListener('contextmenu', function(e){
        e.preventDefault();
        e.returnValue = false;
        if(e.target.tagName.toLowerCase() === 'a') {
            alert(e.target.innerText);
            menu.style.display = 'none';
        }
    }, false);
}
