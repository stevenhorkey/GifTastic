// api-key: jocHuSXyJl9YL61rdYLxmy6ccBiHxt0k

var gifTastic = {
    // Global array to hold inputed terms. Used to compare later.
    terms : [],
    displayGifs : function(){
        var term = $(this).attr("data-name");
        // API url which takes the term to search
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + term + "&api_key=jocHuSXyJl9YL61rdYLxmy6ccBiHxt0k&limit=10";
        // AJAX call 
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            // Logs response in console for developer use.
            console.log(response);
            // Removes non-relevant gifs from previous call
            $('.gif-section').empty();
            // For each of the ten images in the response, an image element is made, given a relevent image source, given a class of gif-img, and added to the gif section on the html document.
            for (var i = 0; i < response.data.length; i++){
                var gif = $('<img/>').attr("src", response.data[i].images["original_still"].url);
                gif.addClass('gif-img');
                $(".gif-section").append(gif)
            }
            // When a gif image is clicked on, the ending part of the source url is changed so that the gif stars playing when clicked, and stops when clicked again.
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
        // Sets term equal to user input
        var term = $("#gif-input").val().trim();  
        // If term hasn't been called before, than a button for it will be made.
        if (!gifTastic.terms.includes(term)){
            if(term !== ""){
                // Pushes term to terms array to check against next time
                gifTastic.terms.push(term); 
                
                var button = $("<button>");
                // Adds classes to each button
                button.addClass("gif-button btn btn-standard");
                // Adds relevant data-name and term to each button
                button.attr("data-name", term);
                // Gives each button the text of the term inputed
                button.text(term);
                // Dumps each button made into the button section inside the html document
                $(".button-section").append(button);
            }
        }    
    }
}
// Assures the document is ready before js is executed.
$(document).ready(function(){
    // When the gif seach button is clicked, the default reload is dismissed, and the render button function is called.
    $("#find-gif").on("click", function(event) {
        event.preventDefault();
            
        gifTastic.renderButtons();
    });
    // When a button is clicked, the corresponding gifs display on the page
    $(document).on("click", ".gif-button", gifTastic.displayGifs);
})






