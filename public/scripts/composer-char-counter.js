


$(document).ready(function () {
  $("#tweet-text").on("input", function(event) {

    // let counter = $(this).next().children(".tweet-counter").val();
    // let tweetLength = ($(this).val()).length;
    // counter = counter - tweetLength;
    // $(this).next().children(".tweet-counter").text(counter);


    let counter = 140;
    let tweetLength = ($(this).val()).length;
    counter = counter - tweetLength;
    $(".tweet-counter").text(counter);


    if (counter < 0) {
      $(this).next().children(".tweet-counter").addClass("exceed-limit")
    } else {
      $(this).next().children(".tweet-counter").removeClass("exceed-limit")
    }


  })
});





