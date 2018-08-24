$(document).ready(function () {
    $(window).scroll(function() {
        if($(document).scrollTop() > 20) {
            $('navBar').addClass('shrinkDown');
        }
        else{
            $('#navBar').removeClass('shrinkDown');
        }
    })
});