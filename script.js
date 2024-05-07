// Define variables outside the DOMContentLoaded event listener for global accessibility
const quoteElement = document.getElementById("quote");
const authorElement = document.getElementById("author");
const tagsElement = document.getElementById("tags");

document.addEventListener("DOMContentLoaded", function () {
    const newQuoteBtn = document.getElementById("new-quote-btn");

    function getQuote() {
        fetch("https://api.quotable.io/random")
            .then(response => response.json())
            .then(data => {
                console.log(data); // Log the API response for debugging
                quoteElement.textContent = data.content;
                authorElement.textContent = "- " + data.author;
                const tags = data.tags.join(", ");
                tagsElement.textContent = "Tags: " + tags;
            })
            .catch(error => {
                console.error("Error fetching random quote:", error);
            });
    }

    function searchByTag(tag) {
        fetch(`https://api.quotable.io/quotes?tags=${tag}`)
            .then(response => response.json())
            .then(data => {
                console.log(data); // Log the API response for debugging
    
                const quotes = data.results;
    
                if (quotes.length > 0) {
                    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
                    console.log("Random Quote:", randomQuote); // Log the random quote for debugging
                    quoteElement.textContent = randomQuote.content;
                    console.log("Quote Element Text Content:", quoteElement.textContent); // Log the quote element text content for debugging
                    authorElement.textContent = "- " + randomQuote.author;
                    console.log("Author Element Text Content:", authorElement.textContent); // Log the author element text content for debugging
                    const tags = randomQuote.tags.join(", ");
                    tagsElement.textContent = "Tags: " + tags;
                    console.log("Tags Element Text Content:", tagsElement.textContent); // Log the tags element text content for debugging
                } else {
                    quoteElement.textContent = "No quotes found for this tag.";
                    authorElement.textContent = "";
                    tagsElement.textContent = "";
                }
            })
            .catch(error => {
                console.error("Error fetching quotes by tag:", error);
            });
    }
    

    newQuoteBtn.addEventListener("click", getQuote);

    // Search by tag functionality
    const tagSearchForm = document.getElementById("tag-search-form");
    tagSearchForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const tag = event.target.tag.value;
        if (tag.trim() !== "") {
            searchByTag(tag);
        }
    });

    // Initial quote fetch on page load
    getQuote();
});
