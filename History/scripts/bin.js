// =============== init ===============
// initialize combined function
function initBin() {
    // call st_build() inside circle.js
    st_build();
    // apply click event to all source elements (Quellen)
    $("[data-source]").click(function () { showSource(this) });
    // apply image source Link even though the user hasn't scrolled jet
    applyLink(true);
}

// call init() once dom is ready to be manipulated
$(initBin);

// calc fake content height because the page needs to bee scrollable
function calcFakePages() {
    // get number of pages, multiply by page hight and scrollFactor
    var length = $(".page").length * $(window).height() * scrollFactor;
    // set height of fake content
    $("#fakeContent").css("height", (length + "px"));
}
// =================== source Panel (Quellen) =================
// show source by object
function showSource(obj) {
    // get the source text
    var source = obj.getAttribute("data-source");
    // check if the source text is not empty
    if (source.length >= 0) {
        // set HTML of the sourcePanel object to the source text
        $("#sourcePanel").html(source);
        // get the source objects offset and the global scrollValue and calculate the top offset
        $("#sourcePanel")[0].style.top = $(obj).offset().top - $(window).scrollTop() + "px";
        // set the Pointer (the little triangle below the panel) to the same top value
        $("#sourcePointer")[0].style.top = $("#sourcePanel")[0].style.top;
        // same procedure as with top offset but add 1/2 of the source objects width
        var left = (($(obj).offset().left - $(window).scrollLeft()) + ($(obj).width() / 2))
        // position the pointer with the variable "left"
        $("#sourcePointer")[0].style.left = (left + "px");
        // check if the panel would be outside of the window
        if ((left - ($("#sourcePanel").width() / 2)) < 8) { left = ($("#sourcePanel").width() / 2) + 8;}
        // assign value to element
        $("#sourcePanel")[0].style.left = (left + "px");
        // set the display from none to block
        $("#sourcePanel")[0].style.display = "block";
        // set the display from none to block
        $("#sourcePointer")[0].style.display = "block";
        // toggle the overlay to true
        toggleOverlay(true);
    }
}

// toggle overlay to state
function toggleOverlay(state) {
    // if overlay should be visible
    if (state) {
        // set display from none to block
        $("#overlay")[0].style.display = "block";
        disableScroll()
    } else {
        // set display value of overlay to none
        $("#overlay")[0].style.display = "none";
        // set display value of sourcePanel to none
        $("#sourcePanel")[0].style.display = "none";
        // set display value of sourcePanel to none
        $("#sourcePointer")[0].style.display = "none";
        enableScroll()
    }
}
// ====================== tool Panel (SlideShow, jump top/bottom) =========================
function slideShow() {
    // scroll to the top of the page (in 3000ms(=3s))
    $('html, body').animate({ scrollTop: 0 }, 3000);
    // scroll to the bottom (fakeContent height) of the page (in 60000ms(=60s))
    $('html, body').animate({ scrollTop: ($("#fakeContent").height() - $(window).height()) }, 60000);
}

// scroll to destination
function pageScroll(destination, speed) {
    // scroll to destination (page number) * window height * scrollFactor + 200 (fix) (in speed ms)
    $('html, body').animate({ scrollTop: (destination * $(window).height() * scrollFactor) + 200 }, speed);
};
$(window).bind("load", function () {
    // total amount of bars on the loading screen
    var barsCount = 6
    // set event-handler to the bars (on iteration of animation css)
    $(".ani").one("animationiteration webkitAnimationIteration", function () {
        // remove class ani to prevent animation from running again
        $(this).removeClass("ani");
        // remove one from bars count
        barsCount--;
        // if all bars are inactive
        if (barsCount == 0) {
            // fade out loading bar
            setTimeout(function () { $("#loadingOverflow").css("width", "0px") }, 300);
            // fade out the loading panel
            setTimeout(function () { $("#loading").fadeOut(400) }, 100);
            // call calcFakePages()
            calcFakePages();
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
    // older FF
    if (window.addEventListener)
        window.addEventListener('DOMMouseScroll', preventDefault, false);
        // modern standard
    window.onwheel = preventDefault;
    // older browsers, IE
    window.onmousewheel = document.onmousewheel = preventDefault;
    // mobile
    window.ontouchmove = preventDefault;
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

// store all links of all images
var imageSources = [
    ["https://www.amazon.com/PAINTINGS-PORTRAIT-KAISER-WILHELM-EMPEROR/dp/B00HFTI9J8", "https://images-na.ssl-images-amazon.com/images/I/81fmts1JunL._SL1500_.jpg"],
    ["https://www.amazon.com/PAINTINGS-PORTRAIT-KAISER-WILHELM-EMPEROR/dp/B00HFTI9J8", "https://images-na.ssl-images-amazon.com/images/I/81fmts1JunL._SL1500_.jpg"],
    ["http://thaumazein-albert.blogspot.de/2014/09/villa-hugel-krupps-of-essen.html", "http://4.bp.blogspot.com/-aOeQLaLYPx4/VAk67xZJAqI/AAAAAAAAEo8/tdOrRprbaxQ/s1600/IMG_2148.JPG"],
    ["http://thaumazein-albert.blogspot.de/2014/09/villa-hugel-krupps-of-essen.html", "http://4.bp.blogspot.com/-aOeQLaLYPx4/VAk67xZJAqI/AAAAAAAAEo8/tdOrRprbaxQ/s1600/IMG_2148.JPG"],
    ["http://www.billerantik.de/products/Marine-Luftfahrt/Willy-Stoewer/Kaiser-Wilhelm-II-auf-dem-Deck-in-einem-Flottenmanoever-DEUTSCHE-FLOTTE-STOeWER-82.html", "http://www.billerantik.de/gallery2/main.php/d/81318-1/82_A3.jpg"],
    ["https://heiminsreich.wordpress.com/2011/12/28/deutsche-kolonien-in-afrika-schutzgebiete-deutsches-reich/", "https://i1.wp.com/upload.wikimedia.org/wikipedia/commons/6/69/Eckenbrecher_Tropische_Landschaft_in_Deutsch-Ostafrika.jpg"]
];
// last page index
var lastPage = 0;

// function to apply Link to imageSource Element
function applyLink(force) {
    // get new page index from page offset
    var newPage = Math.floor(($(document).scrollTop() / ($(window).height() * scrollFactor)));
    // check if page index has changed
    if (newPage != lastPage || force) {
        var color = $("#nav").children(":first").children().eq(newPage).children().eq(0).children().eq(0).css("color");
        // get the two links from the array
        var imageSource = imageSources[newPage];
        // compose a string to dump into the HTML element
        $("#imageSource").html('<div class="c"><div class="b"></div><a href="' + imageSource[0] + '">' + imageSource[0] + '</a><a href="' + imageSource[1] + '">' + imageSource[1] + '</a></div>');
        // apply colors to image source panel
        $("#imageSource div.b")[0].style.backgroundColor = color;
        // apply colors to image source panel
        $("#imageSource div.c a").css("color", color);
        // set last page index to new one
        lastPage = newPage;
        // on background image / link change : pull the image source tag out a bit
        $("#imageSource").addClass("ext");
        // after 1.5s put it back
        setTimeout(function () { $("#imageSource").removeClass("ext") },1500);
    }
}
// set interval to check every 200 ms if new page is present
setInterval(applyLink, 200);
