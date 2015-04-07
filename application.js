this.GificiencyAPI = {};

this.GificiencyAPI = (function() {

  var randomizer, random;

  randomizer = function(collection) {
    var randomNumber;
    randomNumber = Math.floor(Math.random() * collection.length);
    return collection[randomNumber];
  };

  random = function() {
    $.get('http://gificiency.com/gifs.json', function( data ) {

      var gif = randomizer( JSON.parse(data) )['url'];

      $('<img />').attr('src', gif).load(function() {
        $(this).remove();
        $('.gif')
          .removeClass('is-loading')
          .attr('data-url', gif)
          .css('background-image', 'url(' + gif + ')')
          .wrap('<a href="' + gif + '" target="_blank"></a>')
      });

    });
  };

  return {
    random: random
  };

})();

var _this = this;
$(function() { _this.GificiencyAPI.random(); });
