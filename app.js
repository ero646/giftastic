	var nerdyStuff = ["Star Trek", "Star Wars", "Game of Thrones", "Lord of the Rings", "Marvel Comics", "Battlestar Galactica", "DC Comics", "Doctor Who", "Futurama", "Rick and Morty", "Westworld", "Firefly", "Legend of Zelda", "Harry Potter", "Pokemon"];
    var nerdyImage = "";

function showButtons () {
    $("#buttonItems").empty();
    $("#nerdy-input").val("");

    for (var i = 0; i < nerdyStuff.length; i++) {
        var button = $("<button class='btn btn-primary'>");
        button.addClass("nerdy");
        button.attr("nerdy-name", nerdyStuff[i]);
        button.text(nerdyStuff[i]);
        $("#buttonItems").append(button);
        $("#buttonItems").append(" ");
    }
}

showButtons();

$("#addNerdyThing").on("click", function(event) {
    $("#entry").empty();
    event.preventDefault();
    var nerdyInput = $("#nerdy-input").val().trim();
    var nerdyTerm = $(this).attr("nerdy-name");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + nerdyInput + "&limit=2&api_key=dc6zaTOxFJmzC";

        $.ajax({ url: queryURL, method: "GET"}).done(function(response) {
        if (response.pagination.total_count >= 10) {
            nerdyStuff.push(nerdyInput);
            showButtons(); }
        else if (response.pagination.total_count === 0) {
            $("#entry").html(" Sorry, there were no results for this. Please try soemthing else."); }
        else { $("#entry").html(" Sorry, there were only " + response.pagination.total_count + " results for this.  Please try again."); }
        $("#nerdy-input").val("");
        });

});

$(document).on("click", ".nerdy", display);

function display() {

  
    var nerdyTerm = $(this).attr("nerdy-name");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + nerdyTerm + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({ url: queryURL, method: "GET"}).done(function(response) {


        for (var j = 0; j < response.data.length; j++) {
            
            var active = response.data[j].images.fixed_width.url;
            var still = response.data[j].images.fixed_width_still.url;
            var rating = "Rating: " + (response.data[j].rating).toUpperCase();
            var nerdyImage = $("<img>");

            var ratingDiv = $("<div id='ratingDiv'>" + rating + "</div>");

            nerdyImage.attr({"active":active, "still":still, "src":still, "state":"still"});

            var ratingAndImage = $("<div>");
            $(ratingAndImage).css({"float":"left"});
            $(ratingAndImage).prepend(ratingDiv, nerdyImage);

            $("#ratings").prepend(ratingAndImage);

            $(nerdyImage).on("click", function(event) {
                
                var state = $(this).attr("state");
                var source = $(this).attr("src");

                if (state === "still") {
                $(this).attr("src", $(this).attr("active"));
                $(this).attr("state", "active"); }
                else {
                $(this).attr("src", $(this).attr("still"));
                $(this).attr("state", "still"); } 
            });

        }

   });

}