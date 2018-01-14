function Vector(x, y) {
    this.x = x || 0;
    this.y = y || 0;
}

var transitions = [];

function addTransitionObject(object, transitionStartScroll, transitionEndScroll, startVector, endVector, easing) {
    var transitionObject = { object, transitionStartScroll, transitionEndScroll, startVector, endVector, easing }
    transitions.push(transitionObject);
}

function update() {
    for (i = 0; i < transitions.length; i++) {
        if ()
    }
}