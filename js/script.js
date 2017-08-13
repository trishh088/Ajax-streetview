
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

    return false;
};

$('#form-container').submit(loadData); //calls the load data function
