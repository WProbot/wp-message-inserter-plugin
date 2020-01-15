"use strict";

(function($) {
	// Sets Cookies
	function setCookie(name, value, days) {
		var d = new Date();
		d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
		document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
	}

	// Reads Cookies
	function getCookie(name) {
		var v = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
		return v ? v[2] : null;
	}

	// Faux "Session" checking/setting
	// Timestamp
	var currentcount = getCookie("count");
	var timestamp = Math.floor(new Date().getTime() / 1000);
	if (!getCookie("count")) {
		// First Visit - set count to 1
		setCookie("count", 1, 365);

		// Set a timecheck cookie for an hour from now
		setCookie("timecheck", timestamp + 3600, 365);
	} else {
		if (timestamp > getCookie("timecheck")) {
			// Update Timecheck to new value
			setCookie("timecheck", timestamp + 3600, 365);

			// Count exists already and it has been an hour. Update count
			setCookie("count", ++currentcount, 365);
		}
	}

	$(document).ready(function() {
		var closetimedays = parseInt($(".closetimedays").val());
		var closetimehours = $(".closetimehours").val() / 24;
		var cookiedaytotal = closetimedays + closetimehours;

		// Check if we should be showing the banner
		if ($(".pop-banner").length && "true" !== getCookie("sm-closed")) {
			$(".pop-banner").addClass("d-block");
		}

		// Popup Banner Close Button
		$(".sm-close-btn").on("click", function(e) {
			e.preventDefault();
			setCookie("sm-closed", true, cookiedaytotal);
			$(".pop-banner").hide();
		});
	});
})(jQuery);
