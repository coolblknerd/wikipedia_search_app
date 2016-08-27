$(document).ready(function() {

  var api = 'https://en.wikipedia.org/w/api.php?action=query&list=search&prop=revisions&format=json&srsearch=';
  //-- srsearch => searches for page titles or content matching value
  //-- prop=revisions => will give info on latest revision of article

  $('input').keydown(function(e) {

    //-- This will trigger the search after pressing enter (keycode = 13) --//
    if (e.keyCode == 13) {
      var search = encodeURI($('input').val()),
      call = api + search + '&callback=?';

      //-- API call to wikipedia --//
      $.getJSON(call, function(data) {
        var stringify = JSON.stringify(data.query.search),
        title = JSON.stringify(data.query.search[0].title),
        results = JSON.parse(stringify),

        //-- finalResults will build divs to append to page --//
        finalResults = $.map(results, function(query, i) {
          var box = $("<div></div>");
          $('<h4><a href="http://en.wikipedia.org/wiki/' + query.title + '"target=' + '_blank>' + query.title + '</h4>').appendTo(box);
          $('<p>' + query.snippet + '...' + '</p>').appendTo(box);
          return box
        });

        //-- Will fade in search results to page --//
        $('.result').html(finalResults).hide().fadeIn('slow');
      });
    }
  });
});
