function initBin() {
    calcFakePages();
    st_build();
    $("[data-source]").click(function () { showSource(this) });
}

$(initBin);

function calcFakePages() {
    var length = $(".page").length * $(window).height();
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

function pageScroll(destination) {
    window.scrollTo(0, destination * $(window).height());
}
