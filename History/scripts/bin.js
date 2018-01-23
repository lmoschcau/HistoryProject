// =============== init ===============
function initBin() { // initalize combined function
    st_build(); // call st_build() inside circle.js
    $("[data-source]").click(function () { showSource(this) }); // apply click event to all source elements (Quellen)
    applyLink(true); // apply image source Link even though the user hasn´t scrolled jet
}

$(initBin); // call init() once dom is ready to be manipulated

function calcFakePages() { // calc fake content height because the page needs to bee scrollable
    var length = $(".page").length * $(window).height() * scrollFactor; // get number of pages, multiply by page hight and scrollFactor
    $("#fakeContent").css("height", (length + "px")); // set height of fake content
}
// =================== source Panel (Quellen) =================
function showSource(obj) { // show source by object
    var source = obj.getAttribute("data-source"); // get the source text
    if (source.length >= 0) { // check if the source text is not empty
        $("#sourcePanel").html(source); // set HTML of the soucePanel object to the souce text
        $("#sourcePanel")[0].style.top = $(obj).offset().top - $(window).scrollTop() + "px"; // get the source objects offset and the global scrollValue and calculate the top offset
        $("#sourcePointer")[0].style.top = $("#sourcePanel")[0].style.top; // set the Pointer (the little triangle below the panel) to the same top value
        var left = (($(obj).offset().left - $(window).scrollLeft()) + ($(obj).width() / 2)) // same procedure as with top offset but add 1/2 of the source objects width
        $("#sourcePointer")[0].style.left = (left + "px"); // position the pointer with the variable "left"
        if ((left - ($("#sourcePanel").width() / 2)) < 8) { left = ($("#sourcePanel").width() / 2) + 8;} // check if the panel would be outside of the window
        $("#sourcePanel")[0].style.left = (left + "px"); // assign value to element
        $("#sourcePanel")[0].style.display = "block"; // set the display from none to block
        $("#sourcePointer")[0].style.display = "block"; // set the display from none to block
        toggleOverlay(true); // toggle the overlay to true
    }
}

function toggleOverlay(state) { //toggle overlay to state
    if (state) { // if overlay should be visible
        $("#overlay")[0].style.display = "block"; // set display from none to block
        disableScroll()
    } else {
        $("#overlay")[0].style.display = "none"; // set display value of overlay to none
        $("#sourcePanel")[0].style.display = "none"; // set display value of sourcePanel to none
        $("#sourcePointer")[0].style.display = "none"; // set display value of sourcePanel to none
        enableScroll()
    }
}
// ====================== tool Panel (SlideShow, jump top/bottom) =========================
function slideShow() {
    $('html, body').animate({ scrollTop: 0 }, 3000); // scroll to the top of the page (in 3000ms(=3s))
    $('html, body').animate({ scrollTop: ($("#fakeContent").height() - $(window).height()) }, 60000); // scroll to the bottom (fakeContent height) of the page (in 60000ms(=60s))
}

function pageScroll(destination, speed) { // scroll to destination
    $('html, body').animate({ scrollTop: (destination * $(window).height() * scrollFactor) + 200 }, speed); // scroll to destination (page number) * window height * scrollFactor + 200 (fix) (in speed ms)
};
$(window).bind("load", function () {
    var barsCount = 6; // total amount of bars on the loading screen
    $(".ani").one("animationiteration webkitAnimationIteration", function () { // set eventhandler to the bars (on iteration of animation css)
        $(this).removeClass("ani"); // remove class ani to prevent animation from running again
        barsCount--; // remove one from bars count
        if (barsCount == 0) { // if all bars are inactive
            setTimeout(function () { $("#loadingOverflow").css("width", "0px") }, 300); // fade out loading bar
            setTimeout(function () { $("#loading").fadeOut(400) }, 100); // fade out the loading panel
            calcFakePages(); // call calcFakePages()
        }
    });
});

// ======================= prevent scroll ========== (source Panel) ===============
// from https://stackoverflow.com/questions/4770025/how-to-disable-scrolling-temporarily
// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

function preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault)
        e.preventDefault();
    e.returnValue = false;
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

function disableScroll() {
    if (window.addEventListener) // older FF
        window.addEventListener('DOMMouseScroll', preventDefault, false);
    window.onwheel = preventDefault; // modern standard
    window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
    window.ontouchmove = preventDefault; // mobile
    document.onkeydown = preventDefaultForScrollKeys;
}

function enableScroll() {
    if (window.removeEventListener)
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.onmousewheel = document.onmousewheel = null;
    window.onwheel = null;
    window.ontouchmove = null;
    document.onkeydown = null;
}

// ===================== image Source =======================

var imageSources = [ // store all links of all images
    ["https://www.amazon.com/PAINTINGS-PORTRAIT-KAISER-WILHELM-EMPEROR/dp/B00HFTI9J8", "https://images-na.ssl-images-amazon.com/images/I/81fmts1JunL._SL1500_.jpg"],
    ["https://www.amazon.com/PAINTINGS-PORTRAIT-KAISER-WILHELM-EMPEROR/dp/B00HFTI9J8", "https://images-na.ssl-images-amazon.com/images/I/81fmts1JunL._SL1500_.jpg"],
    ["http://thaumazein-albert.blogspot.de/2014/09/villa-hugel-krupps-of-essen.html", "http://4.bp.blogspot.com/-aOeQLaLYPx4/VAk67xZJAqI/AAAAAAAAEo8/tdOrRprbaxQ/s1600/IMG_2148.JPG"],
    ["http://thaumazein-albert.blogspot.de/2014/09/villa-hugel-krupps-of-essen.html", "http://4.bp.blogspot.com/-aOeQLaLYPx4/VAk67xZJAqI/AAAAAAAAEo8/tdOrRprbaxQ/s1600/IMG_2148.JPG"],
    ["http://www.billerantik.de/products/Marine-Luftfahrt/Willy-Stoewer/Kaiser-Wilhelm-II-auf-dem-Deck-in-einem-Flottenmanoever-DEUTSCHE-FLOTTE-STOeWER-82.html", "http://www.billerantik.de/gallery2/main.php/d/81318-1/82_A3.jpg"],
    ["https://heiminsreich.wordpress.com/2011/12/28/deutsche-kolonien-in-afrika-schutzgebiete-deutsches-reich/", "https://i1.wp.com/upload.wikimedia.org/wikipedia/commons/6/69/Eckenbrecher_Tropische_Landschaft_in_Deutsch-Ostafrika.jpg"]
];
var lastPage = 0; // last page index

function applyLink(force) { // function to apply Link to imageSource Element
    var newPage = Math.floor(($(document).scrollTop() / ($(window).height() * scrollFactor))); // get new page index from page offset
    if (newPage != lastPage || force) { // check if page index has changed 
        var color = $("#nav").children(":first").children().eq(newPage).children().eq(0).children().eq(0).css("color");
        var imageSource = imageSources[newPage]; // get the two links from the array
        $("#imageSource").html('<div class="c"><div class="b"></div><a href="' + imageSource[0] + '">' + imageSource[0] + '</a><a href="' + imageSource[1] + '">' + imageSource[1] + '</a></div>'); // compose a string to dump into the HTML element
        $("#imageSource div.b")[0].style.backgroundColor = color; // apply colors to image source panel
        $("#imageSource div.c a").css("color", color); // apply colors to image source panel
        lastPage = newPage; // set last page index to new one
        $("#imageSource").addClass("ext"); // on background image / link change : pull the image source tag aout a bit
        setTimeout(function () { $("#imageSource").removeClass("ext") },1500); // after 1.5s put it back
    }
}
setInterval(applyLink, 200); // set interval to check every 200 ms if new page is present
