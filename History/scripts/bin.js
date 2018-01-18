function calcFakePages() {
    var length = $(".page").length * $(window).height();
    $("#fakeContent").css("height", (length + "px"));
}

function initBin() {
    calcFakePages();
    $("[data-source]").click(function () { showSource(this) });
}

$(initBin);

function showSource(obj) {
    $("#sourcePanel").html(obj.getAttribute("data-source"));
    $("#sourcePanel")[0].style.top = $(obj).offset().top - $(window).scrollTop() + "px";
    $("#sourcePanel")[0].style.left = (($(obj).offset().left - $(window).scrollLeft()) + ($(obj).width() / 2) + "px");
    $("#sourcePanel")[0].style.display = "block";
    toggleOverlay(true);
}

function toggleOverlay(state) {
    if (state) {
        $("#overlay")[0].style.display = "block";
    } else {
        $("#overlay")[0].style.display = "none";
        $("#sourcePanel")[0].style.display = "none";
    }
}