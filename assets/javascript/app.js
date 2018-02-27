// api: jocHuSXyJl9YL61rdYLxmy6ccBiHxt0k



// var term = $("#gif-input").val();
var terms = [];

function displayGifs(){

    var term = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + term + "&api_key=jocHuSXyJl9YL61rdYLxmy6ccBiHxt0k&limit=20";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);

        $('.gif-section').empty();
        for (var i = 0; i < response.data.length; i++){
            var gif = $('<img/>').attr("src", response.data[i].images["preview_gif"].url)
            gif.addClass('gif-img')
            $(".gif-section").append(gif)

        }
    
    });
}

function renderButtons(){

    $(".button-selection").empty();

    var term = $("#gif-input").val().trim();  

       

        if (!terms.includes(term)){
            if(term !== ""){

                terms.push(term); 
                // user inputs a term
                // if that term is not already in terms, than make a button for it.
                var button = $("<button>");

                button.addClass("gif-button btn btn-standard");

                button.attr("data-name", term);

                button.text(term);

                $(".button-section").append(button);
                console.log("render buttons");
            }

            

    }    

}

$(document).ready(function(){

    $("#find-gif").on("click", function(event) {
        event.preventDefault();
    
        var term = $("#gif-input").val().trim();
    
        console.log(term);
        
    
        // terms.push(term);
    
        renderButtons();
    });
    
    $(document).on("click", ".gif-button", displayGifs);
    
    renderButtons();
})






