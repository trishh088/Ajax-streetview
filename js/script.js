
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    var streetStr = $('#street').val(); //input from street name
    var cityStr = $('#city').val(); //city input
    var address = streetStr + ',' + cityStr; //concatenating the street and city to add in the google api url

    $greeting.text('So,you want to live at ' + address + '?'); //adding the address as a greeting message

    var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x300&location=' + address + ''; //no need of api key and this loads the google api and takes our address as input and adds it to the url
    $body.append('<img class="bgimg" src=" ' + streetviewUrl + '" >'); //adds the url image to the background
    // YOUR CODE GOES HERE!


//NYT AJax request
    var nytimesUrl = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + cityStr + '&sort=newest&api-key=4c3e33c2b2534f8c958d1c1e6084f75e';
       $.getJSON(nytimesUrl,function(data){
     $nytHeaderElem.text('New york Times articles about ' + cityStr);
     articles = data.response.docs;
     for(var i=0;i<articles.length;i++){
       var article = articles[i];
       $nytElem.append('<li class="article">'+
           				'<a href="'+article.web_url+'">'+article.headline.main+
           					'</a>'+
           				'<p>' + article.snippet + '</p>'+
           				'</li>');     };
                }).fail(function(e) {
              $nytHeaderElem.text('New york Times articles could not be loaded ');

});


//WIKIPEDIA AJax
 var wikiUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + cityStr + '&format=json&callback=wikiCallback';
 var wikiRequestTimeout = setTimeout(function(){
   $wikiElem.text("failed to get wiki resources");
 },8000);  //error handling so after8s or 8000ms if the wiki doesnt load it gives this error  msg

 $.ajax({  //ajax request no api key requiredfor wiki api
   url:wikiUrl,
   dataType:"jsonp",
   //jsonp:"callback",
   success:function(response){
     var articleList = response[1];
     for(var i=0;i<articleList.length;i++){
       articleStr=articleList[i];
       var url='http://en.wikipedia.org/wiki/'+articleStr;
       $wikiElem.append('<li><a href=" '+url+' " >'+ articleStr+ '</a></li>');
     };
     clearTimeout(wikiRequestTimeout); //to stop the 8000ms timer
   }
 });
 return false; //important as you wont get the output without it

};

$('#form-container').submit(loadData); //calls the load data function
