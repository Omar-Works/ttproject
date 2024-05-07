const jokeElement = document.getElementById("joke");
const newJokeBtn = document.getElementById("new-joke-btn");
const copyBtn = document.getElementById('copy-btn');

function getJoke() {
    fetch("https://v2.jokeapi.dev/joke/Any?safe-mode")
        .then(response => response.json())
        .then(data => {
            if (data.type === "single") {
                jokeElement.textContent = data.joke;
            } else if (data.type === "twopart") {
                jokeElement.textContent = data.setup + " " + data.delivery;
            }
        })
        .catch(error => {
            console.error("Error fetching joke:", error);
        });
}

copyBtn.addEventListener('click', () => {
    const textToCopy = jokeElement.textContent;
    navigator.clipboard.writeText(textToCopy)
        .then(() => {
            alert('Joke copied to clipboard!');
        })
        .catch(err => {
            console.error('Unable to copy joke to clipboard: ', err);
            alert('Failed to copy joke. Please try again.');
        });
});

// Initial joke fetch on page load
getJoke();

// Fetch a new joke when the "New Joke" button is clicked
newJokeBtn.addEventListener("click", getJoke);