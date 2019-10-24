scrollFactor = 2; // divide speed by Factor
/*
===================================== general =========================================================
all transitions. methods deal with the administration of transitions
all transition. methods deal with the manipulation of HTML elements trough transitions
===================================== function ========================================================
this procedure only works with a maximum of two transitions of the same type (cssStyle) on one object

 */

class Transition {
    constructor(object, cssStyle, unit, transitionStartScroll, transitionEndScroll, start, end, easing) { // define transition object
        this.object = object;
        this.cssStyle = cssStyle;
        this.unit = unit.split("$V") || $Vpx; // default
        this.transitionStartScroll = transitionStartScroll;
        this.transitionEndScroll = transitionEndScroll;
        this.start = start;
        this.end = end;
        this.easing = easing; // easing function from easing.js
        this.duplicate; // same transition type on same object
    }

    isInRange(scroll) { // check if the specific transition has to get animated
        return ((this.absolute(this.transitionStartScroll) < scroll) && (scroll < this.absolute(this.transitionEndScroll)));
    }

    elementIsNotInBetween(duplicate, scroll) { // check if there is another object between scroll and the this object
        if ((scroll < this.absolute(duplicate.transitionEndScroll) < this.absolute(this.transitionStartScroll)) || (this.absolute(this.transitionEndScroll) > this.absolute(duplicate.transitionStartScroll) > scroll)) { // check for positive or negative
            return false; // there is a element in between (false not)
        } else { return true; } // there is no element in between (not)
    }

    absolute(value) { // convert from % to px
        return (value / (100 / scrollFactor) * $(window).height()); // also include scrollFactor
    }

    updateTransition() { // apply style to HTML element
        var easingFunction = $.easing[this.easing]; // get function witch the name of easingFunction
        if (typeof easingFunction === "function") { // check if function exists
            this.object.style[this.cssStyle] = (this.unit[0] + easingFunction(0, ($(document).scrollTop() - this.absolute(this.transitionStartScroll)), this.start, (this.end - this.start), (this.absolute(this.transitionEndScroll) - this.absolute(this.transitionStartScroll))) + this.unit[1]); // apply and combine value with unit
        } else { console.error("'" + this.easing + "' is not an easing function") } // trow error if easing Function does not exists
    }
}

class TransitionManager {
    constructor() {
        this.list = [];
    }

    addTransition(object, cssStyle, unit, transitionStartScroll, transitionEndScroll, start, end, easing) { // function to add a transition to the array
        this.list.push(new Transition(object, cssStyle, unit, transitionStartScroll, transitionEndScroll, start, end, easing));
    }

    addTransitionsAutomatic() { // function designed to call  addTransition automatic on every element with data-transition set
        var objects = $("[data-transition]"); // put all elements with data-transition set into objects
        let returnOne = (first, second) => { // shorthand version 
            var first = (typeof first !== 'undefined') ? first : second; // return one of the two
            return first;
        }
        for (var i = 0; i < objects.length; i++) { //iterate trough all objects 
            var transitionsJSON = JSON.parse(objects[i].getAttribute("data-transition").replace(/["']/g, '"')); // get the JSON data AND replace the ' with " AND parse to javascript object
            for (var c = 0; c < transitionsJSON.transitions.length; c++) { // iterate trough javascript object
                var cu = transitionsJSON.transitions[c]; // set current
                this.addTransition(objects[i], returnOne(cu.c, cu.css), returnOne(cu.u, cu.unit), returnOne(cu.sY, cu.startY), returnOne(cu.eY, cu.endY), returnOne(cu.sV, cu.startValue), returnOne(cu.eV, cu.endValue), returnOne(cu.e, cu.easing)); //call transitions.addTransition() to add transition
            }
        }
    }

    checkForDuplicates() { // check if another transition of same type is assigned for the same object
        for (var i = 0; i < this.list.length; i++) { // iterate trough all objects
            for (var d = 0; d < this.list.length; d++) { // iterate trough all objects again to compare them
                if ((this.list[i].object == this.list[d].object) && (this.list[i].cssStyle == this.list[d].cssStyle) && i != d) { // if there is a duplicate
                    this.list[i].duplicate = d; // set duplicate
                }
            }
        }
    }

    update() { // call updateTransition() on every transition in Range on requestAnimationFrame()
        if (flag) { // check if scrolling
            for (var i = 0; i < this.list.length; i++) { // iterate trough all transitions
                if (this.list[i].isInRange($(document).scrollTop())) { // is transition in range
                    this.list[i].updateTransition(); // updateTransition()
                }
            }
        }
        requestAnimationFrame(() => {this.update()}); // request new animation frame
    }

    updateFix() { // fix elements which are misplaced because of steps skipped while scrolling and are out of range
        scroll = $(document).scrollTop(); // get global scroll
        for (var i = 0; i < this.list.length; i++) { // iterate trough all transitions
            var nothingBlocking = true; // as a default there is no element blocking
            var cur = this.list[i]; // set short variable
            if (cur.duplicate != null) { // if there is an duplicate transition check for blocking elements
                nothingBlocking = cur.elementIsNotInBetween(this.list[cur.duplicate], $(document).scrollTop()); // check for the duplicate object
            }
            if (nothingBlocking) { // if nothing is blocking
                if (cur.absolute(cur.transitionStartScroll) > scroll) { // check if scroll is below transitionStartScroll
                    cur.object.style[cur.cssStyle] = (cur.unit[0] + cur.start + cur.unit[1]); // apply and combine value with unit
                }
                if (cur.absolute(cur.transitionEndScroll) < scroll) { // check if scroll is above transitionEndScroll
                    cur.object.style[cur.cssStyle] = (cur.unit[0] + cur.end + cur.unit[1]); // apply and combine value with unit
                }
    
            }
        }
    }
}



var transitions
function init() { // initialize combined function
    transitions = new TransitionManager();
    transitions.addTransitionsAutomatic(); // initially add transitions automatic
    transitions.checkForDuplicates();
    transitions.update(); // start update() circle
    setInterval(() => {transitions.updateFix()}, 500); // call updateFix every 500ms to resolve issues
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
