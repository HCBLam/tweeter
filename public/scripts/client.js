/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(() => {



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
          ${tweet.content.text}
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
  }


  const renderTweets = function(tweets) {
    const $tweetsContainer = $(".tweets-container");
    // $tweetsContainer.empty();

    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $tweetsContainer.append($tweet);
    }
  }








// Test / driver code (temporary). Eventually will get this from the server.
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Marie",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@MCurrie"
    },
    "content": {
      "text": "Nothing in life is to be feared, it is only to be understood."
    },
    "created_at": 1561116232227
  },
  {
  "user": {
    "name": "Descartes",
    "avatars": "https://i.imgur.com/73hZDYK.png",
    "handle": "@rd"
  },
  "content": {
    "text": "Je pense , donc je suis"
  },
  "created_at": 1633438673665
  }
]

renderTweets(data);


});









