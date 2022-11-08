$( document ).ready(function() {

    // Open the first location block by default
    if( $(".brewpub-1") ) {
        $(".brewpub-1").find(".location-info").slideDown();
        $(".brewpub-1 h4").addClass("box-open");
    }

    $(".brewpubs h4").click(function() {

        // If location block is already open, close it and remove the box-open class from the title element
        if ( $(this).hasClass("box-open") ) {

            $(this).parent().find(".location-info").slideUp();
            $(this).parent().find("h4").removeClass("box-open");

        } else {

            $(this).parent().find(".location-info").slideDown();
           $(this).parent().find("h4").addClass("box-open");

        }
    });

});
