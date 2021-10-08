
// Implementing the tweet character counter
$(document).ready(function () {
  $("#tweet-text").on("input", function(event) {

    let counter = 140;
    let tweetLength = ($(this).val()).length;
    counter = counter - tweetLength;

    $(this).next().children(".tweet-counter").text(counter);

    // Determines when character limit is exceeded so that counter can change colour
    if (counter < 0) {
      $(this).next().children(".tweet-counter").addClass("exceed-limit")
    } else {
      $(this).next().children(".tweet-counter").removeClass("exceed-limit")
    }
  });
});





