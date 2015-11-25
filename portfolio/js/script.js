/**
 * Created by i68066 on 9/2/15.
 */

window.onload = function () {
    myId = document.getElementById("secondMenu");
    myId.className = "top"
};
window.onrefresh= function () {
    myId = document.getElementById("secondMenu");
    myId.className = "show"
};
var myScrollFunc = function () {
    var y = window.scrollY;
    if (y >= 44) {
        myId.className = "show"
    } else {
        myId.className = "top"
    }
};

window.addEventListener("scroll", myScrollFunc);
