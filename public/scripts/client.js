/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(() => {

  // Hide the empty tweet or character limit error upon loading the page
  $("div#error-warning").hide();


  // Display error message function
  const errorMessage = function(message) {
    $("div#error-warning").slideUp();
    setTimeout(() => {
      $(".error-message").html(`${message}`).parent().slideDown();
    }, 300)
  };


  // Escape function to prevent XSS
  const escapeText = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };


  // The form to write a new tweet
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


  // To render all the tweets in the database
  const renderTweets = function(tweets) {
    const $tweetsContainer = $(".tweets-container");
    $tweetsContainer.empty();

    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $tweetsContainer.prepend($tweet);
    }
  };


  // Request to get all tweets from the server
  const loadTweets = function() {
    $.ajax({
      url: "/tweets/",
      method: "GET",
      dataType: "json",
      success: (tweets) => {
        renderTweets(tweets);
      },
      error: () => {
        console.log('Could not get the tweets information.');
      }
    });
  };

  loadTweets();


  // Request to post a new tweet to the server
  const $tweetForm = $(".tweet-form");
  $tweetForm.submit((event) => {
    event.preventDefault();

    const $tweetText = $("#tweet-text").val();

    // Validation check to see if the input is empty; slide down error message
    if (!$tweetText.trim() || $tweetText.trim() === '') {
      $("div#error-warning").slideUp();
      const emptyMsg = 'Your tweet is empty! Please write something tweety!';
      errorMessage(emptyMsg);
      return;
    }

    // Validation check to see if the input is too long; slide down error message
    if ($tweetText.length > 140) {
      $("div#error-warning").slideUp();
      const longMsg = 'Your tweet is over the character limit!';
      errorMessage(longMsg);
      return;
    }

    // Slide any error message back up before posting a valid tweet
    $("div#error-warning").slideUp();

    // Encode and post the tweet to the server
    const serializeTweet = $tweetForm.serialize();
    $.post("/tweets/", serializeTweet, () => {
      loadTweets();

      // Reset the text input area after submission
      $("#tweet-text").val('');

      // Reset the character counter after submission
      $('#tweet-count').text(140);
    });
  });
});









