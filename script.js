document.addEventListener("DOMContentLoaded", function () {
    const quoteElement = document.getElementById("quote");
    const authorElement = document.getElementById("author");
    const newQuoteBtn = document.getElementById("new-quote-btn");

    function getQuote() {
        fetch("https://api.quotable.io/random")
            .then(response => response.json())
            .then(data => {
                quoteElement.textContent = data.content;
                authorElement.textContent = "- " + data.author;
            })
            .catch(error => {
                console.error("Error fetching quote:", error);
            });
    }

    newQuoteBtn.addEventListener("click", getQuote);

    // Initial quote fetch on page load
    getQuote();
});
