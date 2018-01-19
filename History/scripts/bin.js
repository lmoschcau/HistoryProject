function initBin() {
    calcFakePages();
    st_build();
    $("[data-source]").click(function () { showSource(this) });
}

$(initBin);

function calcFakePages() {
    var length = $(".page").length * $(window).height() * 2;
    $("#fakeContent").css("height", (length + "px"));
}

function showSource(obj) {
    var source = obj.getAttribute("data-source");
    if (source.length >= 0) {
        $("#sourcePanel").html(source);
        $("#sourcePanel")[0].style.top = $(obj).offset().top - $(window).scrollTop() + "px";
        $("#sourcePanel")[0].style.left = (($(obj).offset().left - $(window).scrollLeft()) + ($(obj).width() / 2) + "px");
        $("#sourcePanel")[0].style.display = "block";
        toggleOverlay(true);
    }
}

function toggleOverlay(state) {
    if (state) {
        $("#overlay")[0].style.display = "block";
    } else {
        $("#overlay")[0].style.display = "none";
        $("#sourcePanel")[0].style.display = "none";
    }
}

function slideShow() {
    $('html, body').animate({ scrollTop: 0 }, 3000);
    $('html, body').animate({ scrollTop: $("#fakeContent").height() }, 60000);
}

function pageScroll(destination) {
    $('html, body').animate({ scrollTop: (destination * $(window).height() * 2) + 200 }, 3000);
};
