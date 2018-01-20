function initBin() { // initalize combined function
    calcFakePages(); // call calcFakePages()
    st_build(); // call st_build() inside circle.js
    $("[data-source]").click(function () { showSource(this) }); // apply click event to all source elements (Quellen)
}

$(initBin); // call init() once dom is ready to be manipulated

function calcFakePages() { // calc fake content height because the page needs to bee scrollable
    var length = $(".page").length * $(window).height() * scrollFactor; // get number of pages, multiply by page hight and scrollFactor
    $("#fakeContent").css("height", (length + "px")); // set height of fake content
}

function showSource(obj) { // show source by object
    var source = obj.getAttribute("data-source"); // get the source text
    if (source.length >= 0) { // check if the source text is not empty
        $("#sourcePanel").html(source); // set HTML of the soucePanel object to the souce text
        $("#sourcePanel")[0].style.top = $(obj).offset().top - $(window).scrollTop() + "px"; // get the source objects offset and the global scrollValue and calculate the top offset
        $("#sourcePanel")[0].style.left = (($(obj).offset().left - $(window).scrollLeft()) + ($(obj).width() / 2) + "px"); // same procedure as with top offset but add 1/2 of the source objects width
        $("#sourcePanel")[0].style.display = "block"; // set the display from none to block
        toggleOverlay(true); // toggle the overlay to true
    }
}

function toggleOverlay(state) { //toggle overlay to state
    if (state) { // if overlay should be visible
        $("#overlay")[0].style.display = "block"; // set display from none to block
    } else {
        $("#overlay")[0].style.display = "none"; // set display value of overlay to none
        $("#sourcePanel")[0].style.display = "none"; // set display value of sourcePanel to none
    }
}

function slideShow() {
    $('html, body').animate({ scrollTop: 0 }, 3000); // scroll to the top of the page (in 3000ms(=3s))
    $('html, body').animate({ scrollTop: $("#fakeContent").height() }, 60000); // scroll to the bottom (fakeContent height) of the page (in 60000ms(=60s))
}

function pageScroll(destination, speed) { // scroll to destination
    $('html, body').animate({ scrollTop: (destination * $(window).height() * scrollFactor) + 200 }, speed); // scroll to destination (page number) * window height * scrollFactor + 200 (fix) (in speed ms)
};
