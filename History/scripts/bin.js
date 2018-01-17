function calcFakePages() {
    var length = $("#pages").children.length * $(window).height();
    $("#fakeContent").css("height", (length + "px"));
}

$(calcFakePages);