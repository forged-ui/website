$(function() {
  "use strict";

  var nav_offset_top = $('header').height() + 50;
    /*-------------------------------------------------------------------------------
	  Navbar
	-------------------------------------------------------------------------------*/
    function navbarFixed(){
        if ( $('.header_area').length ){
            $(window).scroll(function() {
                var scroll = $(window).scrollTop();
                if (scroll >= nav_offset_top ) {
                    $(".header_area").addClass("navbar_fixed");
                } else {
                    $(".header_area").removeClass("navbar_fixed");
                }
            });
        };
    };
    navbarFixed();

    var iframe = document.createElement("iframe");

    iframe.style.display = "none";

    iframe.onload = function() {
        iframe.style.display = "block";
    };

    window.addEventListener("message", function(event) {
        if (!event.data) {
            return;
        }

        var parts = event.data.split("→");

        if (parts[0] === "gitstore.height") {
            iframe.style.height = parts[1] + "px";
        }

        if (parts[0] === "gitstore.location") {
            var link = document.createElement("a");
            link.setAttribute("href", parts[1]);
            link.setAttribute("target", "_blank");
            link.click();
        }

        if (parts[0] === "gitstore.reload") {
            iframe.contentWindow.postMessage(event.data, "*");
        }
    });

    var target = document.querySelector("#gitstore-embed");

    if (target) {
        target.appendChild(iframe);
        iframe.src = "https://enjoy.gitstore.app/repositories/OwenMelbz/forged-ui/embed";
    }

    function iframeAutoScale() {
        'use strict';

        $('iframe').each(function () {
            var
                parentWidth = $(this).parent().innerWidth(),
                ratio = 0.75,	// default ratio (4:3)
                width = $(this).attr('width'),
                height = $(this).attr('height');

            // overwrite default ratio if width and height attributes are not set
            if (width !== undefined && height !== undefined) {
                ratio = height / width;
            }

            $(this).attr('width', parentWidth);
            $(this).attr('height', parentWidth * ratio);
        });
    }

    // onload
    $(document).ready(function () {
        iframeAutoScale();
    });

    // on window resize
    $(window).resize(function () {
        iframeAutoScale();
    });
});


