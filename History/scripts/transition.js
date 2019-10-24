// divide speed by Factor
scrollFactor = 2;
/*
===================================== general =========================================================
all transitions. methods deal with the administration of transitions
all transition. methods deal with the manipulation of HTML elements trough transitions
===================================== function ========================================================
this procedure only works with a maximum of two transitions of the same type (cssStyle) on one object

 */

class Transition {
    // define transition object
    constructor(object, cssStyle, unit, transitionStartScroll, transitionEndScroll, start, end, easing) {
        this.object = object;
        this.cssStyle = cssStyle;
        // default
        this.unit = unit.split("$V") || $Vpx;
        this.transitionStartScroll = transitionStartScroll;
        this.transitionEndScroll = transitionEndScroll;
        this.start = start;
        this.end = end;
        // easing function from easing.js
        this.easing = easing;
        // same transition type on same object
        this.duplicate;
    }

    // check if the specific transition has to get animated
    isInRange(scroll) {
        return ((this.absolute(this.transitionStartScroll) < scroll) && (scroll < this.absolute(this.transitionEndScroll)));
    }

    // check if there is another object between scroll and the this object
    elementIsNotInBetween(duplicate, scroll) {
        // check for positive or negative
        if ((scroll < this.absolute(duplicate.transitionEndScroll) < this.absolute(this.transitionStartScroll)) || (this.absolute(this.transitionEndScroll) > this.absolute(duplicate.transitionStartScroll) > scroll)) {
            // there is a element in between (false not)
            return false;
            // there is no element in between (not)
        } else { return true; }
    }

    // convert from % to px
    absolute(value) {
        // also include scrollFactor
        return (value / (100 / scrollFactor) * $(window).height());
    }

    // apply style to HTML element
    updateTransition() {
        // get function witch the name of easingFunction
        var easingFunction = $.easing[this.easing];
        // check if function exists
        if (typeof easingFunction === "function") {
            // apply and combine value with unit
            this.object.style[this.cssStyle] = (this.unit[0] + easingFunction(0, ($(document).scrollTop() - this.absolute(this.transitionStartScroll)), this.start, (this.end - this.start), (this.absolute(this.transitionEndScroll) - this.absolute(this.transitionStartScroll))) + this.unit[1]);
            // trow error if easing Function does not exists
        } else { console.error("'" + this.easing + "' is not an easing function") }
    }
}

class TransitionManager {
    constructor() {
        this.list = [];
    }

    // function to add a transition to the array
    addTransition(object, cssStyle, unit, transitionStartScroll, transitionEndScroll, start, end, easing) {
        this.list.push(new Transition(object, cssStyle, unit, transitionStartScroll, transitionEndScroll, start, end, easing));
    }

    // function designed to call  addTransition automatic on every element with data-transition set
    addTransitionsAutomatic() {
        // put all elements with data-transition set into objects
        var objects = $("[data-transition]");
        // shorthand version
        let returnOne = (first, second) => {
            // return one of the two
            var first = (typeof first !== 'undefined') ? first : second;
            return first;
        }
        //iterate trough all objects
        for (var i = 0; i < objects.length; i++) {
            // get the JSON data AND replace the ' with " AND parse to javascript object
            var transitionsJSON = JSON.parse(objects[i].getAttribute("data-transition").replace(/["']/g, '"'));
            // iterate trough javascript object
            for (var c = 0; c < transitionsJSON.transitions.length; c++) {
                // set current
                var cu = transitionsJSON.transitions[c];
                //call transitions.addTransition() to add transition
                this.addTransition(objects[i], returnOne(cu.c, cu.css), returnOne(cu.u, cu.unit), returnOne(cu.sY, cu.startY), returnOne(cu.eY, cu.endY), returnOne(cu.sV, cu.startValue), returnOne(cu.eV, cu.endValue), returnOne(cu.e, cu.easing));
            }
        }
    }

    // check if another transition of same type is assigned for the same object
    checkForDuplicates() {
        // iterate trough all objects
        for (var i = 0; i < this.list.length; i++) {
            // iterate trough all objects again to compare them
            for (var d = 0; d < this.list.length; d++) {
                // if there is a duplicate
                if ((this.list[i].object == this.list[d].object) && (this.list[i].cssStyle == this.list[d].cssStyle) && i != d) {
                    // set duplicate
                    this.list[i].duplicate = d;
                }
            }
        }
    }

    // call updateTransition() on every transition in Range on requestAnimationFrame()
    update() {
        // check if scrolling
        if (flag) {
            // iterate trough all transitions
            for (var i = 0; i < this.list.length; i++) {
                // is transition in range
                if (this.list[i].isInRange($(document).scrollTop())) {
                    // updateTransition()
                    this.list[i].updateTransition();
                }
            }
        }
        // request new animation frame
        requestAnimationFrame(() => {this.update()});
    }

    // fix elements which are misplaced because of steps skipped while scrolling and are out of range
    updateFix() {
        // get global scroll
        scroll = $(document).scrollTop();
        // iterate trough all transitions
        for (var i = 0; i < this.list.length; i++) {
            // as a default there is no element blocking
            var nothingBlocking = true;
            // set short variable
            var cur = this.list[i];
            // if there is an duplicate transition check for blocking elements
            if (cur.duplicate != null) {
                // check for the duplicate object
                nothingBlocking = cur.elementIsNotInBetween(this.list[cur.duplicate], $(document).scrollTop());
            }
            // if nothing is blocking
            if (nothingBlocking) {
                // check if scroll is below transitionStartScroll
                if (cur.absolute(cur.transitionStartScroll) > scroll) {
                    // apply and combine value with unit
                    cur.object.style[cur.cssStyle] = (cur.unit[0] + cur.start + cur.unit[1]);
                }
                // check if scroll is above transitionEndScroll
                if (cur.absolute(cur.transitionEndScroll) < scroll) {
                    // apply and combine value with unit
                    cur.object.style[cur.cssStyle] = (cur.unit[0] + cur.end + cur.unit[1]);
                }
    
            }
        }
    }
}



var transitions
// initialize combined function
function init() {
    transitions = new TransitionManager();
    // initially add transitions automatic
    transitions.addTransitionsAutomatic();
    transitions.checkForDuplicates();
    // start update() circle
    transitions.update();
    // call updateFix every 500ms to resolve issues
    setInterval(() => {transitions.updateFix()}, 500);
}
// call init() once dom is ready to be manipulated
$(init);

// flag to check if user is scrolling at any point in the script
var timer, flag = false;
// check if user is scrolling
$(window).scroll(function () {
    // set flag true if user is scrolling
    if (!flag) {
        flag = true;
    }
    // if user is scrolling clear previous timer
    clearTimeout(timer);
    // set new timeout
    timer = setTimeout(function () {
        // callback function is used to reset flag
        flag = false; 
        // timeout after 200ms
    }, 200); 
});
