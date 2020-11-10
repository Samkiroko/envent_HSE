(function($) {
    "use strict";

    // on ready function
    jQuery(document).ready(function($) {

        $(window).on('load', function() {
			//preloader
			jQuery("#status").fadeOut();
			jQuery("#preloader").delay(350).fadeOut("slow");	
		});	

        //menu toggle icon on small width
        $(".menu_toggle").click(function() {
            $(".real_menu").addClass('open_menu');
        });
        $(".menu_overlay").click(function() {
            $(".real_menu.open_menu").removeClass('open_menu');
        });

        $(".close_btn").click(function() {
            $(".real_menu.open_menu").removeClass('open_menu');
        });

        //menu on small width
        $("ul.sub-menu").parent().prepend('<i class="flaticon-arrow483"></i>');
        $("ul.sub-menu li ul").parent().prepend('<i class="flaticon-arrow483"></i>');
        var w = window.innerWidth;
        if (w <= 992) {
            $(".real_menu ul.nav > li:has(ul) > a").click(function(e) {
                e.preventDefault();
                $(this).parent('.real_menu ul.nav li').children('ul.sub-menu').slideToggle();
            });
            $(".real_menu ul.nav li ul.sub-menu li a").click(function(e) {
                $(this).parent('.real_menu ul.nav li ul.sub-menu li').children('ul').slideToggle();
            });
        } else {
            //...
        }

        // parallax effect
        $(function() {
            $.stellar({
                horizontalScrolling: false,
                verticalOffset: 1
            });
        });

        //smooth scrolling
        $.smoothScroll();

        // wow animation
        var wow = new WOW({
            boxClass: 'wow', // animated element css class (default is wow)
            animateClass: 'animated', // animation css class (default is animated)
            offset: 0, // distance to the element when triggering the animation (default is 0)
            mobile: true, // trigger animations on mobile devices (default is true)
            live: true, // act on asynchronously loaded content (default is true)
            callback: function(box) {
                // the callback is fired every time an animation is started
                // the argument that is passed in is the DOM node being animated
            }
        });
        wow.init();

        // addvertise slider
        $(".add_slider .owl-carousel").owlCarousel({
            loop: true,
            items: 1,
            dots: false,
            nav: true,
            autoHeight: true,
            touchDrag: false,
            mouseDrag: false,
            margin: 0,
            autoplay: false,
            slideSpeed: 100,
            navText: ['<i class="flaticon-direction129"></i>', '<i class="flaticon-fastforward4"></i>'],
            responsive: {
                0: {
                    items: 1,
                    nav: false,
                    dots: true,
                },
                600: {
                    items: 1,
                    nav: false,
                    dots: true,
                },
                768: {
                    items: 1,
                    nav: true,
                },
                1100: {
                    items: 1,
                    nav: true,
                }
            }
        });

        // addvertise slider
        $(".testimonial_slider .owl-carousel").owlCarousel({
            loop: true,
            items: 1,
            dots: true,
            nav: false,
            autoHeight: true,
            touchDrag: false,
            mouseDrag: false,
            margin: 0,
            autoplay: false,
            animateIn: 'zoomIn',
            animateOut: 'fadeOut',
            navText: ['', '']
        });

        // property detail slider
        $(".property_image .owl-carousel").owlCarousel({
            loop: true,
            items: 1,
            dots: false,
            nav: true,
            autoHeight: true,
            touchDrag: false,
            mouseDrag: false,
            margin: 0,
            autoplay: false,
            animateIn: 'fadeIn',
            animateOut: 'fadeOut',
            navText: ['previous', 'next']
        });

        // close button
        $(".tag_close button").click(function() {
            $(".popup_wrapper").hide(500);
        });

        // With JQuery
        $("#price").slider();
        $("#price").on("slide", function(slideEvt) {
            $("#priceSliderVal").text(slideEvt.value);
        });

        // Listview-Gridview button
        $(".view_button #grid").click(function(event) {
            event.preventDefault();
            $(".grid_view").show();
            $(".list_view").hide();
            $(this).addClass('active');
            $(".view_button #list").removeClass('active');
        });
        //$(".list_view").hide();
        $(".view_button #list").click(function(event) {
            event.preventDefault();
            $(".grid_view").hide();
            $(".list_view").show();
            $(this).addClass('active');
            $(".view_button #grid").removeClass('active');
        });
		
		//contact form submition
		$("#rs_submit").on("click", function() {
			var e = $("#uname").val();
			var t = $("#umail").val();
			var n = $("#sub").val();
			var r = $("#msg").val();
			$.ajax({
				type: "POST",
				url: "ajaxmail.php",
				data: {
					username: e,
					useremail: t,
					useresubject: n,
					mesg: r
				},
				success: function(n) {
					var i = n.split("#");
					if (i[0] == "1") {
						$("#uname").val("");
						$("#umail").val("");
						$("#subj").val("");
						$("#msg").val("");
						$("#err").html(i[1])
					} else {
						$("#uname").val(e);
						$("#umail").val(t);
						$("#subj").val(t);
						$("#msg").val(r);
						$("#err").html(i[1])
					}
				}
			})
		});
		
		//partner slider
        $(".partner_slider .owl-carousel").owlCarousel({
            loop: true,
            items: 4,
            dots: false,
            nav: false,
            autoHeight: true,
            touchDrag: false,
            mouseDrag: false,
            margin: 0,
            autoplay: true,
            navText: ['', ''],
			responsive: {
                0: {
                    items: 2,
                    nav: false,
                    dots: true,
                },
                600: {
                    items: 2,
                    nav: false,
                    dots: true,
                },
                768: {
                    items: 3,
                    nav: true,
                },
                1100: {
                    items: 4,
                    nav: true,
                }
            }
        });

    });

})();