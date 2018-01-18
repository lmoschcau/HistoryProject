var transitions = {
    list: [],
    addTransition: function (object, cssStyle, unit, transitionStartScroll, transitionEndScroll, start, end, easing) {
        this.list.push(new transition(object, cssStyle, unit, transitionStartScroll, transitionEndScroll, start, end, easing));
    },
    addTransitionsAutomatic: function () {
        var objects = $("[data-transition]");
        function returnOne(first, second) {
            var first = (typeof first !== 'undefined') ? first : second;
            return first;
        }
        for (var i = 0; i < objects.length; i++) {
            var transitionsJSON = JSON.parse(objects[i].getAttribute("data-transition").replace(/["']/g, '"'));
            for (var c = 0; c < transitionsJSON.transitions.length; c++) {
                var cu = transitionsJSON.transitions[c];
                transitions.addTransition(objects[i], returnOne(cu.c, cu.css), returnOne(cu.u, cu.unit), returnOne(cu.sY, cu.startY), returnOne(cu.eY, cu.endY), returnOne(cu.sV, cu.startValue), returnOne(cu.eV, cu.endValue), returnOne(cu.e, cu.easing));
            }
        }
        console.log(objects);
    }
};
function transition(object, cssStyle, unit, transitionStartScroll, transitionEndScroll, start, end, easing) {
    this.object = object;
    this.cssStyle = cssStyle;
    this.unit = unit.split("$V") || $Vpx;
    this.transitionStartScroll = transitionStartScroll;
    this.transitionEndScroll = transitionEndScroll;
    this.start = start;
    this.end = end;
    this.easing = easing;
}
transition.prototype.isInRange = function (scroll) {
    return ((this.absolute(this.transitionStartScroll) < scroll) && (scroll < this.absolute(this.transitionEndScroll)));
}

transition.prototype.absolute = function (value) {
    return (value / 50 * $(window).height());
}

transition.prototype.updateTransition = function () {
    var easingFunction = $.easing[this.easing];
    if (typeof easingFunction === "function") {
        this.object.style[this.cssStyle] = (this.unit[0] + easingFunction(0, ($(document).scrollTop() - this.absolute(this.transitionStartScroll)), this.start, (this.end - this.start), (this.absolute(this.transitionEndScroll) - this.absolute(this.transitionStartScroll))) + this.unit[1]);
    } else { console.error("'" + this.easing + "' is not an easing function") }
}

function update() {
    for (var i = 0; i < transitions.list.length; i++) {
        if (transitions.list[i].isInRange($(document).scrollTop())) {
            transitions.list[i].updateTransition();
        }
    }
    requestAnimationFrame(update);
}

function init() {
    transitions.addTransitionsAutomatic();
    update();
}
$(init);