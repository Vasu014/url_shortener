function myJumbotron() {
    var winHeight = $(window).height();
    // make wrapper div whole height of window
    $('.containerr').css({
        height: winHeight
    });
    // make jumbotron be in the middle vertically
    $('.jumbotron').css({
        marginTop: (winHeight / 3) + 'px'
    });
}

$(document).ready(function() {
    myJumbotron();
});