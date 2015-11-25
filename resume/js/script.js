/**
 * Created by mkteagle on 10/3/15.
 */
var showText = function (target, message, index, interval) {
    if (index < message.length) {
        $(target).append(message[index++]);
        setTimeout(function () { showText(target, message, index, interval); }, interval);
    }
}
$(function () {

    showText("#msg", "Hello, World!", 0, 500);

});
window.onload = function () {
    var dropZoneOne = document.querySelector('#delta');
    var dropZoneTwo = document.querySelector('#ihc');
    var dropZoneThree = document.querySelector('#usu');
    var dropZoneFour = document.querySelector('#travelhost');
    var dropZoneFive = document.querySelector('#techmedia');
    var dropZoneSix = document.querySelector('#verizon');
    var dropZoneSeven = document.querySelector('#xactware');
    var dropZoneEight = document.querySelector('#matc');

    var dragElements = document.querySelectorAll('#draggable-items li');
    var elementDragged = null;
    for (var i = 0; i < dragElements.length; i++) {
        dragElements[i].addEventListener('dragstart', function (e) {
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text', this.innerHTML);
            elementDragged = this;
        });
        dragElements[i].addEventListener('dragend', function (e) {
            elementDragged = null;
        });
    }
    ;
    dropZoneOne.addEventListener('dragover', function (e) {
        if (e.preventDefault) {
            e.preventDefault();
        }
        e.dataTransfer.dropEffect = 'move';
        return false;
    });
    dropZoneOne.addEventListener('dragenter', function (e) {
        this.className = "over";
    });
    dropZoneOne.addEventListener('dragleave', function (e) {
        this.className = "";
    });
    dropZoneOne.addEventListener('drop', function (e) {
        if (e.preventDefault)e.preventDefault();
        if (e.stopPropagation)e.stopPropagation();
        this.className = "";
        this.innerHTML = e.dataTransfer.getData('text');
        document.querySelector('#draggable-items').removeChild(elementDragged);
        elementDragged = null;
        return false;
    });
    dropZoneTwo.addEventListener('dragover', function (e) {
        if (e.preventDefault) {
            e.preventDefault();
        }
        e.dataTransfer.dropEffect = 'move';
        return false;
    });
    dropZoneTwo.addEventListener('dragenter', function (e) {
        this.className = "over";
    });
    dropZoneTwo.addEventListener('dragleave', function (e) {
        this.className = "";
    });
    dropZoneTwo.addEventListener('drop', function (e) {
        if (e.preventDefault)e.preventDefault();
        if (e.stopPropagation)e.stopPropagation();
        this.className = "";
        this.innerHTML = e.dataTransfer.getData('text');
        document.querySelector('#draggable-items').removeChild(elementDragged);
        elementDragged = null;
        return false;
    });

    dropZoneThree.addEventListener('dragover', function (e) {
        if (e.preventDefault) {
            e.preventDefault();
        }
        e.dataTransfer.dropEffect = 'move';
        return false;
    });
    dropZoneThree.addEventListener('dragenter', function (e) {
        this.className = "over";
    });
    dropZoneThree.addEventListener('dragleave', function (e) {
        this.className = "";
    });
    dropZoneThree.addEventListener('drop', function (e) {
        if (e.preventDefault)e.preventDefault();
        if (e.stopPropagation)e.stopPropagation();
        this.className = "";
        this.innerHTML = e.dataTransfer.getData('text');
        document.querySelector('#draggable-items').removeChild(elementDragged);
        elementDragged = null;
        return false;
    });

    dropZoneFour.addEventListener('dragover', function (e) {
        if (e.preventDefault) {
            e.preventDefault();
        }
        e.dataTransfer.dropEffect = 'move';
        return false;
    });
    dropZoneFour.addEventListener('dragenter', function (e) {
        this.className = "over";
    });
    dropZoneFour.addEventListener('dragleave', function (e) {
        this.className = "";
    });
    dropZoneFour.addEventListener('drop', function (e) {
        if (e.preventDefault)e.preventDefault();
        if (e.stopPropagation)e.stopPropagation();
        this.className = "";
        this.innerHTML = e.dataTransfer.getData('text');
        document.querySelector('#draggable-items').removeChild(elementDragged);
        elementDragged = null;
        return false;
    });

    dropZoneFive.addEventListener('dragover', function (e) {
        if (e.preventDefault) {
            e.preventDefault();
        }
        e.dataTransfer.dropEffect = 'move';
        return false;
    });
    dropZoneFive.addEventListener('dragenter', function (e) {
        this.className = "over";
    });
    dropZoneFive.addEventListener('dragleave', function (e) {
        this.className = "";
    });
    dropZoneFive.addEventListener('drop', function (e) {
        if (e.preventDefault)e.preventDefault();
        if (e.stopPropagation)e.stopPropagation();
        this.className = "";
        this.innerHTML = e.dataTransfer.getData('text');
        document.querySelector('#draggable-items').removeChild(elementDragged);
        elementDragged = null;
        return false;
    });

    dropZoneSix.addEventListener('dragover', function (e) {
        if (e.preventDefault) {
            e.preventDefault();
        }
        e.dataTransfer.dropEffect = 'move';
        return false;
    });
    dropZoneSix.addEventListener('dragenter', function (e) {
        this.className = "over";
    });
    dropZoneSix.addEventListener('dragleave', function (e) {
        this.className = "";
    });
    dropZoneSix.addEventListener('drop', function (e) {
        if (e.preventDefault)e.preventDefault();
        if (e.stopPropagation)e.stopPropagation();
        this.className = "";
        this.innerHTML = e.dataTransfer.getData('text');
        document.querySelector('#draggable-items').removeChild(elementDragged);
        elementDragged = null;
        return false;
    });

    dropZoneSeven.addEventListener('dragover', function (e) {
        if (e.preventDefault) {
            e.preventDefault();
        }
        e.dataTransfer.dropEffect = 'move';
        return false;
    });
    dropZoneSeven.addEventListener('dragenter', function (e) {
        this.className = "over";
    });
    dropZoneSeven.addEventListener('dragleave', function (e) {
        this.className = "";
    });
    dropZoneSeven.addEventListener('drop', function (e) {
        if (e.preventDefault)e.preventDefault();
        if (e.stopPropagation)e.stopPropagation();
        this.className = "";
        this.innerHTML = e.dataTransfer.getData('text');
        document.querySelector('#draggable-items').removeChild(elementDragged);
        elementDragged = null;
        return false;
    });

    dropZoneEight.addEventListener('dragover', function (e) {
        if (e.preventDefault) {
            e.preventDefault();
        }
        e.dataTransfer.dropEffect = 'move';
        return false;
    });
    dropZoneEight.addEventListener('dragenter', function (e) {
        this.className = "over";
    });
    dropZoneEight.addEventListener('dragleave', function (e) {
        this.className = "";
    });
    dropZoneEight.addEventListener('drop', function (e) {
        if (e.preventDefault)e.preventDefault();
        if (e.stopPropagation)e.stopPropagation();
        this.className = "";
        this.innerHTML = e.dataTransfer.getData('text');
        document.querySelector('#draggable-items').removeChild(elementDragged);
        elementDragged = null;
        return false;
    });
    var list = document.getElementById("draggable-items");
    function shuffleNodes() {
        var nodes = list.children, i = 0;
        nodes = Array.prototype.sort.call(nodes);
        while(i < nodes.length) {
            list.appendChild(nodes[i]);
            ++i;
        }
    }
    shuffleNodes();
    $(function () {
        $('[data-toggle="popover"]').popover()
    })
};
function reset() {
    var arr = ["Delta High School", "Intermountain Healthcare", "Utah State University", "Travelhost Magazine", "TechMedia Network", "Verizon Wireless", "Xactware", "MATC"];
    var ul = document.getElementById("draggable-items");
    ul.innerHTML = '';
    for (var i = 0;i < arr.length; i++) {
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(arr[i]));
        ul.appendChild(li);
        li.setAttribute('draggable', true);

    }
    document.getElementById("delta").setAttribute('data-placeholder', 'Drag Here!');
    document.getElementById("ihc").setAttribute('data-placeholder', 'Drag Here!');
    document.getElementById("travelhost").setAttribute('data-placeholder', 'Drag Here!');
    document.getElementById("techmedia").setAttribute('data-placeholder', 'Drag Here!');
    document.getElementById("verizon").setAttribute('data-placeholder', 'Drag Here!');
    document.getElementById("usu").setAttribute('data-placeholder', 'Drag Here!');
    document.getElementById("xactware").setAttribute('data-placeholder', 'Drag Here!');
    document.getElementById("matc").setAttribute('data-placeholder', 'Drag Here!');
};
function validate () {
    var delt = document.getElementById("delta").innerHTML;
    if (delt == "Delta High School") {
        document.getElementById("delta").style.background = 'green';
    }
    else {
        document.getElementById("delta").style.background = 'red';
    }
    var ih = document.getElementById("ihc").innerHTML;
    if (ih == "Intermountain Healthcare") {
        document.getElementById("ihc").style.background = 'green';
    }
    else {
        document.getElementById("ihc").style.background = 'red';
    }
    var us = document.getElementById("usu").innerHTML;
    if (us == "Utah State University") {
        document.getElementById("usu").style.background = 'green';
    }
    else {
        document.getElementById("usu").style.background = 'red';
    }
    var travel = document.getElementById("travelhost").innerHTML;
    if (travel == "Travelhost Magazine") {
        document.getElementById("travelhost").style.background = 'green';
    }
    else {
        document.getElementById("travelhost").style.background = 'red';
    }
    var tech = document.getElementById("techmedia").innerHTML;
    if (tech == "TechMedia Network") {
        document.getElementById("techmedia").style.background = 'green';
    }
    else {
        document.getElementById("techmedia").style.background = 'red';
    }
    var ver = document.getElementById("verizon").innerHTML;
    if (ver == "Verizon Wireless") {
        document.getElementById("verizon").style.background = 'green';
    }
    else {
        document.getElementById("verizon").style.background = 'red';
    }
    var xact = document.getElementById("xactware").innerHTML;
    if (xact == "Xactware") {
        document.getElementById("xactware").style.background = 'green';
    }
    else {
        document.getElementById("xactware").style.background = 'red';
    }
    var mat = document.getElementById("matc").innerHTML;
    if (mat == "MATC") {
        document.getElementById("matc").style.background = 'green';
    }
    else {
        document.getElementById("matc").style.background = 'red';
    }
}
