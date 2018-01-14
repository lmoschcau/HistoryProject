var transitions = {
    list: [],
    addTransition: function (object, cssStyle, unit, transitionStartScroll, transitionEndScroll, start, end, easing) {
        this.list.push(new transition(object, cssStyle, unit, transitionStartScroll, transitionEndScroll, start, end, easing));
    },
    addTransitionsAutomatic: function () {
        var objects = $("[data-transition]");
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
    return ((this.transitionStartScroll < scroll) && (scroll < this.transitionEndScroll));
}

transition.prototype.updateTransition = function () {
    easingFunction = $.easing[this.easing];
    if (typeof easingFunction === "function") {
        parameter = [0, ($(document).scrollTop() - this.transitionStartScroll), this.start, (this.end - this.start), (this.transitionEndScroll - this.transitionStartScroll)];
        this.object.style[this.cssStyle] = (this.unit[0] + easingFunction.apply(null, parameter) + this.unit[1]);
    } else { console.error("'" + this.easing + "' is not an easing function") }
}

function update() {
    for (i = 0; i < transitions.list.length; i++) {
        if (transitions.list[i].isInRange($(document).scrollTop())) {
            transitions.list[i].updateTransition();
        }
    }
    requestAnimationFrame(update);
}
$(update());