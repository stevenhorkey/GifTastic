// api: jocHuSXyJl9YL61rdYLxmy6ccBiHxt0k



// var term = $("#gif-input").val();
var gifTastic ={
    terms : [],
    displayGifs : function(){
        var term = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + term + "&api_key=jocHuSXyJl9YL61rdYLxmy6ccBiHxt0k&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            console.log(response);

            $('.gif-section').empty();
            for (var i = 0; i < response.data.length; i++){
                var gif = $('<img/>').attr("src", response.data[i].images["original_still"].url);
                gif.addClass('gif-img');
                console.log(this);
                $(".gif-section").append(gif)
            }
            $('.gif-img').on("click", function(){
                var src = $(this).attr('src')
                if(src.includes('_s.gif')){
                    $(this).attr('src', src.replace('_s.gif','.gif'));
                }
                else{
                    $(this).attr('src', src.replace('.gif','_s.gif'));
                }
            })
        });
    },
    renderButtons : function(){
        $(".button-selection").empty();

        var term = $("#gif-input").val().trim();  

        if (!gifTastic.terms.includes(term)){
            if(term !== ""){

                gifTastic.terms.push(term); 
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
}

$(document).ready(function(){

    $("#find-gif").on("click", function(event) {
        event.preventDefault();
    
        var term = $("#gif-input").val().trim();
    
        console.log(term);
            
        gifTastic.renderButtons();
    });
    
    $(document).on("click", ".gif-button", gifTastic.displayGifs);
    
    gifTastic.renderButtons();
})






