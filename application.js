this.GificiencyAPI = {};

this.GificiencyAPI = (function() {
  var getGifs, getRandomGif, init, randomizer, _gifs, _initialized;
  _gifs = [];
  _categories = [];
  _initialized = false;
  init = function() {
    getGifs();
    _initialized = true;
    return this;
  };
  randomizer = function(collection) {
    var randomNumber;
    randomNumber = Math.floor(Math.random() * collection.length);
    return collection[randomNumber];
  };
  getGifs = function() {
    if (!_initialized) {
      $.ajax({
        url: 'http://gificiency.com/gifs.json',
        async: false,
        dataType: 'json',
        success: function(json) {
          return _gifs = json;
        }
      });
    }
    return _gifs;
  };
  getRandomGif = function() {
    var result;
    result = randomizer(_gifs);
    return result['url'];
  };
  return {
    init: init,
    all: getGifs,
    random: getRandomGif,
  };
})();

var _this = this;

$(document).on('ready', function() {
  var gif = _this.GificiencyAPI.init().random();

  $('<img />').attr('src', gif).load(function() {
    $(this).remove();
    $('.gif')
      .removeClass('is-loading')
      .css('background-image', 'url(' + gif + ')');
  });
});
