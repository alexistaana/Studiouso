$(document).ready(function () {
    function ShowLoginSelection() {
        $('#loginScreenSelect').on("click", function (e) {
            e.preventDefault();
            $('#create-account-form').fadeOut(500, function (e) {
                $('#login-form').fadeIn(500);
            });
        });
    }

    function ShowCreateAccSelection() {
        $('#createAccScreenSelect').on("click", function (e) {
            e.preventDefault();
            $('#login-form').fadeOut(500, function (e) {
                $('#create-account-form').fadeIn(500);
            });
        });
    }

    function init(){
        $(ShowLoginSelection);
        $(ShowCreateAccSelection);
    }

    $(init);

})