var animation = false;
var controller = new ScrollMagic.Controller();

var ieVersion = "ie" + detectIE();
var html = document.getElementsByTagName("HTML")[0];
html.setAttribute("class", html.getAttribute('class') + " " + ieVersion);

var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;


function scroll_to_el(el,offset) {

	var offset = ((typeof offset !== "undefined") ? offset : 0);

	if (typeof (el) == "string") {

		var id = el;

	} else {

		var id = jQuery(el).attr("href");

	}

	(typeof jQuery("a[href='" + id + "']").data("offset") !== "undefined" ? offset = jQuery("a[href='" + id + "']").data("offset") : offset);

	//With exception to the mobile menu
	if (id != "#") {

		animation = true;

		jQuery('html, body').animate({

			scrollTop: jQuery(id).offset().top - offset

		}, 1000, 'swing', function () {

			animation = false;
			jQuery("body").unmousewheel();

		});

	}

}

function media_size(query) {

	return Modernizr.mq('screen and (' + query + ')');
}

jQuery(document).ready(function ($) {


	if($('.easy-scroll').length > 0){

		$('.easy-scroll').on("click",function(){

			scroll_to_el($(this).attr("href"),$(this).data("offset"));

		});

	}
	if ($("#main-nav-icon").length > 0) {

		var lastScrollTop = 0;
		var nav_icon = $("#main-nav-icon");
		var timeout;
		var main_nav = $('#main-nav');

		$(window).on("scroll", function (e) {

			if (!main_nav.hasClass("active")) {

				var st = $(this).scrollTop();

				clearTimeout(timeout);

				if (st > lastScrollTop) {
					timeout = setTimeout(function () {
						nav_icon.fadeOut(200);
					}, 200);
				} else {
					timeout = setTimeout(function () {
						nav_icon.fadeIn(0);
					}, 200);
				}

				lastScrollTop = st;
			}

		});

	}

	var left_els = $("[data-anim='left']");
	var right_els = $("[data-anim='right']");
	var in_els = $("[data-anim='in']");

	left_els.each(function () {

		var el = this;
		var offset = $(this).data("offset");

		if (offset == undefined) {

			offset = 0;

		}

		var tween = new TimelineMax()
			.from(el, 2, {
				opacity: 0,
				x: "-=200",
				ease: Expo.easeOut
			});

		var scene = new ScrollMagic.Scene({
				triggerElement: el
			})
			.triggerHook(1)
			.offset(offset)
			.setTween(tween)
			// .addIndicators()
			.addTo(controller);

	});

	right_els.each(function () {

		var el = this;
		var offset = $(this).data("offset");

		if (offset == undefined) {

			offset = 0;

		}

		var tween = new TimelineMax()
			.from(el, 2, {
				opacity: 0,
				x: "+=200",
				ease: Expo.easeOut
			});

		var scene = new ScrollMagic.Scene({
				triggerElement: el
			})
			.triggerHook(1)
			.offset(offset)
			.setTween(tween)
			// .addIndicators()
			.addTo(controller);

	});

	in_els.each(function () {

		var el = this;
		var offset = $(this).data("offset");

		if (offset == undefined) {

			offset = 0;

		}

		var tween = new TimelineMax()
			.from(el, 1, {
				opacity: 0,
				y: "+=200"
			});

		var scene = new ScrollMagic.Scene({
				triggerElement: el
			})
			.triggerHook(1)
			.offset(offset)
			.setTween(tween)
			// .addIndicators()
			.addTo(controller);

	});

});