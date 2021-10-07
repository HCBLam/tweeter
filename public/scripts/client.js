/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(() => {


  const escapeText = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };


  const createTweetElement = function(tweet) {

    const $tweet = $(`
      <article class="tweet">
        <header class="tweet-header">
          <div class="persona">
            <img class="avatar" src="${tweet.user.avatars}">
            <p>${tweet.user.name}</p>
          </div>
          <p class="handle">${tweet.user.handle}</p>
        </header>
        <div class="statement">
          ${escapeText(tweet.content.text)}
        </div>
        <footer class="tweet-footer">
          <div class="date">${timeago.format(tweet.created_at)}</div>
          <div class="icons">
            <i class="fas fa-flag"></i>
            <i class="fas fa-retweet"></i>
            <i class="fas fa-heart"></i>
          </div>
        </footer>
      </article>
    `);
    return $tweet;
  };



  const renderTweets = function(tweets) {
    const $tweetsContainer = $(".tweets-container");
    // $tweetsContainer.empty();

    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $tweetsContainer.prepend($tweet);
    };
  };



  const loadTweets = function() {

    $.ajax({
      url: "/tweets/",
      method: "GET",
      dataType: "json",
      success: (tweets) => {
        renderTweets(tweets);
      },
      error: (err) => {
        console.log('Could not get the tweets information.');
      }
    });

    // $.get("/tweets/", function(tweets) {
    //   renderTweets(tweets)
    // }, "json");
  }

  loadTweets();



  // $("#error-warning").slidedown.("fast", function() {
  // })



  const $tweetForm = $(".tweet-form");
  $tweetForm.submit((event) => {
    event.preventDefault();


    const $tweetText = $("#tweet-text").val();
    if (!$tweetText || $tweetText === '') {

      // alert('Your tweet is empty! No one can hear it!')
      // return;
    }

    if ($tweetText.length > 140) {

      // alert('Your tweet is too long!');
      // return;
    }


    const serializeTweet = $tweetForm.serialize();
    $.post("/tweets/", serializeTweet, () => {
      loadTweets();

      // Reset the text input after submission
      $("#tweet-text").val('');

      // Reset the counter after submission
      $('#tweet-count').text(140);

      // $(this).children(".button-counter").children("tweet-counter").text(140);
      //console.log this to see what value you get
    });

  });




});









