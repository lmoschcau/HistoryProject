scrollFactor = 2; // devide speed by Factor
/*
all transitions. methods deal with the administration of transitions

all transition. methods deal with the manipulation of HTML elements trough transitions

 */


var transitions = {
    list: [], // creates array of all transition objects
    addTransition: function (object, cssStyle, unit, transitionStartScroll, transitionEndScroll, start, end, easing) { // function to add a transition to the array
        this.list.push(new transition(object, cssStyle, unit, transitionStartScroll, transitionEndScroll, start, end, easing));
    },
    addTransitionsAutomatic: function () { // function designed to call  addTransition automatic on every element with data-transition set
        var objects = $("[data-transition]"); // put all elements with data-transition set into objects
        function returnOne(first, second) { // shorthand version 
            var first = (typeof first !== 'undefined') ? first : second; // return one of the two
            return first;
        }
        for (var i = 0; i < objects.length; i++) { //iterate trough all objects 
            var transitionsJSON = JSON.parse(objects[i].getAttribute("data-transition").replace(/["']/g, '"')); // get the JSON data AND replace the ' with " AND parse to javascript object
            for (var c = 0; c < transitionsJSON.transitions.length; c++) { // iterate trough javascript object
                var cu = transitionsJSON.transitions[c]; // set current
                transitions.addTransition(objects[i], returnOne(cu.c, cu.css), returnOne(cu.u, cu.unit), returnOne(cu.sY, cu.startY), returnOne(cu.eY, cu.endY), returnOne(cu.sV, cu.startValue), returnOne(cu.eV, cu.endValue), returnOne(cu.e, cu.easing)); //call transitions.addTransition() to add transition
            }
        }
    },
    checkForDublicates: function () {
        for (var i = 0; i < this.list.length; i++) {
            for (var d = 0; d < this.list.length; d++) {
                if ((this.list[i].object == this.list[d].object) && (this.list[i].cssStyle == this.list[d].cssStyle) && i != d) {
                    this.list[i].dublicate = d;
                }
            }
        }
    }
};

function transition(object, cssStyle, unit, transitionStartScroll, transitionEndScroll, start, end, easing) { // define transition object
    this.object = object;
    this.cssStyle = cssStyle;
    this.unit = unit.split("$V") || $Vpx; // default
    this.transitionStartScroll = transitionStartScroll;
    this.transitionEndScroll = transitionEndScroll;
    this.start = start;
    this.end = end;
    this.easing = easing; // easing function from easing.js
    this.dublicate;
}

transition.prototype.isInRange = function (scroll) { // check if the specific transition has to get animated
    return ((this.absolute(this.transitionStartScroll) < scroll) && (scroll < this.absolute(this.transitionEndScroll)));
}

transition.prototype.elementIsNotInbetween = function (id, scroll) {
    if ((scroll < this.absolute(transitions.list[id].transitionEndScroll) < this.absolute(this.transitionStartScroll)) || (this.absolute(this.transitionEndScroll) > this.absolute(transitions.list[id].transitionStartScroll) > scroll)) {
        return false;
    } else { console.log("hh"); return true }
}

transition.prototype.absolute = function (value) { // convert from % to px
    return (value / (100 / scrollFactor) * $(window).height()); // also include scrollFactor
}

transition.prototype.updateTransition = function () { // apply style to HTML element
    var easingFunction = $.easing[this.easing]; // get function witch the name of easingFunction
    if (typeof easingFunction === "function") { // check if function exists
        this.object.style[this.cssStyle] = (this.unit[0] + easingFunction(0, ($(document).scrollTop() - this.absolute(this.transitionStartScroll)), this.start, (this.end - this.start), (this.absolute(this.transitionEndScroll) - this.absolute(this.transitionStartScroll))) + this.unit[1]); // apply and combine value with unit
    } else { console.error("'" + this.easing + "' is not an easing function") } // trow error if easing Function does not exists
}

function update() { // call updateTransition() on every transition in Range on requestAnimationFrame()
    if (flag) { // check if scrolling
        for (var i = 0; i < transitions.list.length; i++) { // iterate trough all transitions
            if (transitions.list[i].isInRange($(document).scrollTop())) { // is transition in range
                transitions.list[i].updateTransition(); // updateTransition()
            }
        }
    }
    requestAnimationFrame(update); // request new animation frame
}

function updateFix() { // fix elements wich are misplaced because of steps skipped while scrolling and are out of range
    scroll = $(document).scrollTop(); // get global scroll
    for (var i = 0; i < transitions.list.length; i++) { // iterate trough all transitions
        var nothingBlocking = true;
        var cur = transitions.list[i]; // set short variable
        if (cur.dublicate != null) {
            nothingBlocking = cur.elementIsNotInbetween(cur.dublicate, $(document).scrollTop());
        }
        if (nothingBlocking) {
            if (cur.absolute(cur.transitionStartScroll) > scroll) { // check if scroll is below transitionStartScroll
                cur.object.style[cur.cssStyle] = (cur.unit[0] + cur.start + cur.unit[1]); // apply and combine value with unit
            }
            if (cur.absolute(cur.transitionEndScroll) < scroll) { // check if scroll is above transitionEndScroll
                cur.object.style[cur.cssStyle] = (cur.unit[0] + cur.end + cur.unit[1]); // apply and combine value with unit
            }

        }
    }
}

function init() { // initalize combined function
    transitions.addTransitionsAutomatic(); // initally add transitions automatic
    transitions.checkForDublicates();
    update(); // start update() cicle
}
$(init); // call init() once dom is ready to be manipulated

var timer, flag = false; // flag to check if user is scrolling at any point in the script
$(window).scroll(function () { // check if user is scrolling
    if (!flag) { //set flag true if user is scrolling
        flag = true;
    }
    clearTimeout(timer); // if user is scrolling clear previous timer
    timer = setTimeout(function () { // set new timeout
        flag = false; // callback function is used to reset flag
    }, 200); // timeout after 200ms
});

setInterval(updateFix, 500); // call updateFix every 500ms to resolve issues