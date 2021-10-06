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
            <img class="avatar" src="${tweetData.user.avatars}">
            <p>${tweetData.user.name}</p>
          </div>
          <p class="handle">${tweetData.user.handle}</p>
        </header>
        <div class="statement">
          ${tweetData.content.text}
        </div>
        <footer class="tweet-footer">
          <div class="date">${tweetData.created_at}</div>
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










// Test / driver code (temporary). Eventually will get this from the server.
const tweetData = {
  "user": {
    "name": "Descartes",
    "avatars": "https://i.imgur.com/nlhLi3I.png",
    "handle": "@rd"
  },
  "content": {
    "text": "Je pense , donc je suis"
  },
  "created_at": 1633438673665
}

const $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
console.log($tweet); // to see what it looks like
$('.tweets-container').append($tweet);



});










