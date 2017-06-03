window.onload = init;

function init() {
    var insertHTML = '';
    var picArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    var rotateAngle = 360 / picArr.length;

    for( let i = 0; i < picArr.length; i++ ) {
        insertHTML = insertHTML + '<img src="./image/'+ (i+1) +'.jpg" id="pic'+ (i+1) +'">';
    }

    var items = document.querySelector('.carousel-items');
    items.innerHTML = insertHTML;


    var transform = function (element, value, key) {
        key = key || "Transform";
        ["Moz", "O", "Ms", "Webkit", ""].forEach(function (prefix) {
            element.style[prefix + key] = value;
        });

        return element;
    }
    var transZ = 480 / Math.tan((rotateAngle / 0.98 / 180) * Math.PI);
    var indexPiece = 0;

    picArr.forEach(function (i, j) {
        transform(document.getElementById("pic" + i), "rotateY(" + j * rotateAngle + "deg) translateZ(" + (transZ + 50) + "px)");
    });

    document.querySelector('.carousel-items').onclick = function(e){
        transform(this, "rotateY(" + (-1 * rotateAngle * ++indexPiece) + "deg)");
    }
}


