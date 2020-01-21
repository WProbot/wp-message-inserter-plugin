;(function($) {
"use strict";

// Sets Cookies
function setCookie(name, value, days) {
  var d = new Date();
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
  document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
} // Reads Cookies


function getCookie(name) {
  var v = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
  return v ? v[2] : null;
} // Faux "Session" checking/setting
// Timestamp


var currentcount = getCookie("count");
var timestamp = Math.floor(new Date().getTime() / 1000);

if (!getCookie("count")) {
  // First Visit - set count to 1
  setCookie("count", 1, 365); // Set a timecheck cookie for an hour from now

  setCookie("timecheck", timestamp + 3600, 365);
} else {
  if (timestamp > getCookie("timecheck")) {
    // Update Timecheck to new value
    setCookie("timecheck", timestamp + 3600, 365); // Count exists already and it has been an hour. Update count

    setCookie("count", ++currentcount, 365);
  }
}

$(document).ready(function () {
  // Get our value for days to set cookie
  var closetimedays = parseInt($(".closetimedays").val()); // Get our value for hours and divide by 24 to get proper percent of a day

  var closetimehours = $(".closetimehours").val() / 24; // Our Total for when the cookie should expire and show the banner again

  var cookiedaytotal = closetimedays + closetimehours; // Check if we should be showing the banner

  if ($(".pop-banner").length && "true" !== getCookie("sm-closed") && !$(".pop-banner").hasClass("check-session-banner")) {
    $(".pop-banner").addClass("d-block");
  } // Popup Banner Close Button


  $(".sm-close-btn").on("click", function (e) {
    e.preventDefault();
    setCookie("sm-closed", true, cookiedaytotal);
    $(".pop-banner").hide();
  }); // Session Validating and showing proper banner

  var operators = {
    gt: function gt(a, b) {
      return a >= b;
    },
    lt: function lt(a, b) {
      return a <= b;
    }
  };
  $(".check-session-banner").each(function () {
    var banner_session_count = $(this).find(".session_count_to_check").val();
    var banner_session_operator = $(this).find(".session_count_operator").val();

    if (operators[banner_session_operator](currentcount, parseInt(banner_session_count))) {
      if (!$(this).hasClass("pop-banner")) {
        $(this).addClass("validated");
      } else {
        !getCookie("sm-closed") ? $(this).addClass("validated") : "";
      }
    }
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvb2tpZXMuanMiXSwibmFtZXMiOlsic2V0Q29va2llIiwibmFtZSIsInZhbHVlIiwiZGF5cyIsImQiLCJEYXRlIiwic2V0VGltZSIsImdldFRpbWUiLCJkb2N1bWVudCIsImNvb2tpZSIsInRvR01UU3RyaW5nIiwiZ2V0Q29va2llIiwidiIsIm1hdGNoIiwiY3VycmVudGNvdW50IiwidGltZXN0YW1wIiwiTWF0aCIsImZsb29yIiwiJCIsInJlYWR5IiwiY2xvc2V0aW1lZGF5cyIsInBhcnNlSW50IiwidmFsIiwiY2xvc2V0aW1laG91cnMiLCJjb29raWVkYXl0b3RhbCIsImxlbmd0aCIsImhhc0NsYXNzIiwiYWRkQ2xhc3MiLCJvbiIsImUiLCJwcmV2ZW50RGVmYXVsdCIsImhpZGUiLCJvcGVyYXRvcnMiLCJndCIsImEiLCJiIiwibHQiLCJlYWNoIiwiYmFubmVyX3Nlc3Npb25fY291bnQiLCJmaW5kIiwiYmFubmVyX3Nlc3Npb25fb3BlcmF0b3IiXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQSxTQUFTQSxTQUFULENBQW1CQyxJQUFuQixFQUF5QkMsS0FBekIsRUFBZ0NDLElBQWhDLEVBQXNDO0FBQ3JDLE1BQUlDLENBQUMsR0FBRyxJQUFJQyxJQUFKLEVBQVI7QUFDQUQsRUFBQUEsQ0FBQyxDQUFDRSxPQUFGLENBQVVGLENBQUMsQ0FBQ0csT0FBRixLQUFjLEtBQUssRUFBTCxHQUFVLEVBQVYsR0FBZSxJQUFmLEdBQXNCSixJQUE5QztBQUNBSyxFQUFBQSxRQUFRLENBQUNDLE1BQVQsR0FBa0JSLElBQUksR0FBRyxHQUFQLEdBQWFDLEtBQWIsR0FBcUIsa0JBQXJCLEdBQTBDRSxDQUFDLENBQUNNLFdBQUYsRUFBNUQ7QUFDQSxDLENBRUQ7OztBQUNBLFNBQVNDLFNBQVQsQ0FBbUJWLElBQW5CLEVBQXlCO0FBQ3hCLE1BQUlXLENBQUMsR0FBR0osUUFBUSxDQUFDQyxNQUFULENBQWdCSSxLQUFoQixDQUFzQixZQUFZWixJQUFaLEdBQW1CLGVBQXpDLENB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QUFDUSx1QkFBRCxDQUFULENBQ0MxQixZQURELEVBRUNPLFFBQVEsQ0FBQ2lCLG9CQUFELENBRlQsQ0FERCxFQUtFO0FBQ0QsVUFBSSxDQUFDcEIsQ0FBQyxDQUFDLElBQUQsQ0FBRCxDQUFRUSxRQUFSLENBQWlCLFlBQWpCLENBQUwsRUFBcUM7QUFDcENSLFFBQUFBLENBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUVMsUUFBUixDQUFpQixXQUFqQjtBQUNBLE9BRkQsTUFFTztBQUNOLFNBQUNoQixTQUFTLENBQUMsV0FBRCxDQUFWLEdBQTBCTyxDQUFDLENBQUMsSUFBRCxDQUFELENBQVFTLFFBQVIsQ0FBaUIsV0FBakIsQ0FBMUIsR0FBMEQsRUFBMUQ7QUFDQTtBQUNEO0FBQ0QsR0FyQkQ7QUFzQkEsQ0ExREQiLCJmaWxlIjoid3AtbWVzc2FnZS1pbnNlcnRlci1wbHVnaW4tZnJvbnQtZW5kLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gU2V0cyBDb29raWVzXG5mdW5jdGlvbiBzZXRDb29raWUobmFtZSwgdmFsdWUsIGRheXMpIHtcblx0dmFyIGQgPSBuZXcgRGF0ZSgpO1xuXHRkLnNldFRpbWUoZC5nZXRUaW1lKCkgKyAyNCAqIDYwICogNjAgKiAxMDAwICogZGF5cyk7XG5cdGRvY3VtZW50LmNvb2tpZSA9IG5hbWUgKyBcIj1cIiArIHZhbHVlICsgXCI7cGF0aD0vO2V4cGlyZXM9XCIgKyBkLnRvR01UU3RyaW5nKCk7XG59XG5cbi8vIFJlYWRzIENvb2tpZXNcbmZ1bmN0aW9uIGdldENvb2tpZShuYW1lKSB7XG5cdHZhciB2ID0gZG9jdW1lbnQuY29va2llLm1hdGNoKFwiKF58OykgP1wiICsgbmFtZSArIFwiPShbXjtdKikoO3wkKVwiKTtcblx0cmV0dXJuIHYgPyB2WzJdIDogbnVsbDtcbn1cblxuLy8gRmF1eCBcIlNlc3Npb25cIiBjaGVja2luZy9zZXR0aW5nXG4vLyBUaW1lc3RhbXBcbnZhciBjdXJyZW50Y291bnQgPSBnZXRDb29raWUoXCJjb3VudFwiKTtcbnZhciB0aW1lc3RhbXAgPSBNYXRoLmZsb29yKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC8gMTAwMCk7XG5pZiAoIWdldENvb2tpZShcImNvdW50XCIpKSB7XG5cdC8vIEZpcnN0IFZpc2l0IC0gc2V0IGNvdW50IHRvIDFcblx0c2V0Q29va2llKFwiY291bnRcIiwgMSwgMzY1KTtcblxuXHQvLyBTZXQgYSB0aW1lY2hlY2sgY29va2llIGZvciBhbiBob3VyIGZyb20gbm93XG5cdHNldENvb2tpZShcInRpbWVjaGVja1wiLCB0aW1lc3RhbXAgKyAzNjAwLCAzNjUpO1xufSBlbHNlIHtcblx0aWYgKHRpbWVzdGFtcCA+IGdldENvb2tpZShcInRpbWVjaGVja1wiKSkge1xuXHRcdC8vIFVwZGF0ZSBUaW1lY2hlY2sgdG8gbmV3IHZhbHVlXG5cdFx0c2V0Q29va2llKFwidGltZWNoZWNrXCIsIHRpbWVzdGFtcCArIDM2MDAsIDM2NSk7XG5cblx0XHQvLyBDb3VudCBleGlzdHMgYWxyZWFkeSBhbmQgaXQgaGFzIGJlZW4gYW4gaG91ci4gVXBkYXRlIGNvdW50XG5cdFx0c2V0Q29va2llKFwiY291bnRcIiwgKytjdXJyZW50Y291bnQsIDM2NSk7XG5cdH1cbn1cblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG5cdC8vIEdldCBvdXIgdmFsdWUgZm9yIGRheXMgdG8gc2V0IGNvb2tpZVxuXHR2YXIgY2xvc2V0aW1lZGF5cyA9IHBhcnNlSW50KCQoXCIuY2xvc2V0aW1lZGF5c1wiKS52YWwoKSk7XG5cblx0Ly8gR2V0IG91ciB2YWx1ZSBmb3IgaG91cnMgYW5kIGRpdmlkZSBieSAyNCB0byBnZXQgcHJvcGVyIHBlcmNlbnQgb2YgYSBkYXlcblx0dmFyIGNsb3NldGltZWhvdXJzID0gJChcIi5jbG9zZXRpbWVob3Vyc1wiKS52YWwoKSAvIDI0O1xuXG5cdC8vIE91ciBUb3RhbCBmb3Igd2hlbiB0aGUgY29va2llIHNob3VsZCBleHBpcmUgYW5kIHNob3cgdGhlIGJhbm5lciBhZ2FpblxuXHR2YXIgY29va2llZGF5dG90YWwgPSBjbG9zZXRpbWVkYXlzICsgY2xvc2V0aW1laG91cnM7XG5cblx0Ly8gQ2hlY2sgaWYgd2Ugc2hvdWxkIGJlIHNob3dpbmcgdGhlIGJhbm5lclxuXHRpZiAoXG5cdFx0JChcIi5wb3AtYmFubmVyXCIpLmxlbmd0aCAmJlxuXHRcdFwidHJ1ZVwiICE9PSBnZXRDb29raWUoXCJzbS1jbG9zZWRcIikgJiZcblx0XHQhJChcIi5wb3AtYmFubmVyXCIpLmhhc0NsYXNzKFwiY2hlY2stc2Vzc2lvbi1iYW5uZXJcIilcblx0KSB7XG5cdFx0JChcIi5wb3AtYmFubmVyXCIpLmFkZENsYXNzKFwiZC1ibG9ja1wiKTtcblx0fVxuXG5cdC8vIFBvcHVwIEJhbm5lciBDbG9zZSBCdXR0b25cblx0JChcIi5zbS1jbG9zZS1idG5cIikub24oXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdHNldENvb2tpZShcInNtLWNsb3NlZFwiLCB0cnVlLCBjb29raWVkYXl0b3RhbCk7XG5cdFx0JChcIi5wb3AtYmFubmVyXCIpLmhpZGUoKTtcblx0fSk7XG5cblx0Ly8gU2Vzc2lvbiBWYWxpZGF0aW5nIGFuZCBzaG93aW5nIHByb3BlciBiYW5uZXJcblx0dmFyIG9wZXJhdG9ycyA9IHtcblx0XHRndDogZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0cmV0dXJuIGEgPj0gYjtcblx0XHR9LFxuXHRcdGx0OiBmdW5jdGlvbihhLCBiKSB7XG5cdFx0XHRyZXR1cm4gYSA8PSBiO1xuXHRcdH1cblx0fTtcblxuXHQkKFwiLmNoZWNrLXNlc3Npb24tYmFubmVyXCIpLmVhY2goZnVuY3Rpb24oKSB7XG5cdFx0dmFyIGJhbm5lcl9zZXNzaW9uX2NvdW50ID0gJCh0aGlzKVxuXHRcdFx0LmZpbmQoXCIuc2Vzc2lvbl9jb3VudF90b19jaGVja1wiKVxuXHRcdFx0LnZhbCgpO1xuXG5cdFx0dmFyIGJhbm5lcl9zZXNzaW9uX29wZXJhdG9yID0gJCh0aGlzKVxuXHRcdFx0LmZpbmQoXCIuc2Vzc2lvbl9jb3VudF9vcGVyYXRvclwiKVxuXHRcdFx0LnZhbCgpO1xuXG5cdFx0aWYgKFxuXHRcdFx0b3BlcmF0b3JzW2Jhbm5lcl9zZXNzaW9uX29wZXJhdG9yXShcblx0XHRcdFx0Y3VycmVudGNvdW50LFxuXHRcdFx0XHRwYXJzZUludChiYW5uZXJfc2Vzc2lvbl9jb3VudClcblx0XHRcdClcblx0XHQpIHtcblx0XHRcdGlmICghJCh0aGlzKS5oYXNDbGFzcyhcInBvcC1iYW5uZXJcIikpIHtcblx0XHRcdFx0JCh0aGlzKS5hZGRDbGFzcyhcInZhbGlkYXRlZFwiKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdCFnZXRDb29raWUoXCJzbS1jbG9zZWRcIikgPyAkKHRoaXMpLmFkZENsYXNzKFwidmFsaWRhdGVkXCIpIDogXCJcIjtcblx0XHRcdH1cblx0XHR9XG5cdH0pO1xufSk7XG4iXX0=
}(jQuery));
