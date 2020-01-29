//start the document - so it's ready for loading
$(document).ready(function () {
    // have a starting array of example buttons the user can load with
    var sportStars = ['Kobe Bryant', 'Roger Clemens', 'Jose Canseco', 'Mike Tyson', 'Dale Earnhardt', 'Tom Brady', 'Ray Lewis'];

    // create the fuction that will create buttons to dump into the array
    function starButton() {
        $("#ssButtonView").empty();
        // for lop used to run through the array and add buttons and add values to the button - as seen by Phil in Class hours
        for (var i = 0; i < sportStars.length; i++) {
            var button = $("<button>");
            button.addClass("expression");
            button.attr("data-name", sportStars[i]);
            button.text(sportStars[i]);
            $("#ssButtonView").append(button);
        }

    }
    // run button function
    starButton();

    // need an onclick listener to start the function
    $(document).on("click", ".expression", function () {

        var athlete = $(this).html();
        // get results to verify i'm getting the input fron onclick
        console.log(athlete);

        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + athlete + "&api_key=NFZvIxAVw9n0UEj3BFzwe6mKbE58SUF2";
        console.log(queryURL);
        // need to create an api call, url and key -- see previous activities in class
        $.ajax({ url: queryURL, method: "GET" })
            // the promise for your jQuery Ajax api call
            .done(function (response) {
                var results = response.data;
                $("#superStarDisplay").empty();
                // console.log the response to see what and where the gif is, and look for q, limmit, and ratings
                // for loop to review the information from the web site call of the api
                for (var j = 0; j < results.length; j++) {
                    var imgDiv = $("<div>");
                    // grabing the images based on the data of the object
                    var imgView = results[j].images.fixed_height.url;
                    // need to be able to pause and animate the gifs
                    // having the Gif start off in the Still state, and later will allow you to click to animate
                    var imgStill = results[j].images.fixed_height.still.url;
                    console.log(imgView);

                    var superStarGif = $("<img>").attr("src", imgStill).attr("data-animate", imgView).attr("data-still", imgStill);
                    superStarGif.attr("data-state", "still");
                    $("superStarDisplay").prepend(superStarGif);
                    superStarGif.on("click", animateGif);

                    // based homework requirments, get the rating and add to the page
                    var rating = results[j].rating;
                    var displayRating = $("<p>").text("Rating of Gif: " + rating);
                    // make sure the rating is in front of the Gif
                    $("superStarDisplay").prepend(displayRating);


                }
            });

        // need a function here to animate the gif

        function animateGif() {
            var state = $(this).attr("data-state");
            console.log(state);
            if (state === "still") {
                $(this).attr("src", $(this).data("animate"));
                $(this).attr("data-state", "animate");
            }
            else {
                $(this).attr("src", $(this).data("still"));
                $(this).attr("data-state", "still");
            }

        }



    })


    //when the superStar button is clicked, need to generate more Gif search buttons
    $(document).on("click", "#superStarDisplay", function () {
        if ($("#superstarInpt").val().trim() == '') {
            alert("Please add your Super Star");
        }
        else {
            var athlete = $("#superstarInpt").val().trim();
            topics.push(athlete);
            $("#superstarInpt").val('');
            starButton();
            return false;

        }

    });





}); // closed out the app