const factContainer = document.getElementById('fact');
const newFactBtn = document.getElementById('new-fact-btn');
const copyBtn = document.getElementById('copy-btn');

// Function to fetch a random fact from the API
function getFact() {
    fetch('https://uselessfacts.jsph.pl/random.json?language=en')
        .then(response => response.json())
        .then(data => {
            factContainer.textContent = data.text;
        })
        .catch(error => {
            console.error('Error fetching random fact:', error);
            factContainer.textContent = 'Failed to fetch random fact. Please try again later.';
        });
}

copyBtn.addEventListener('click', () => {
    const textToCopy = factContainer.textContent;
    navigator.clipboard.writeText(textToCopy)
        .then(() => {
            alert('Fact copied to clipboard!');
        })
        .catch(err => {
            console.error('Unable to copy fact to clipboard: ', err);
            alert('Failed to copy fact. Please try again.');
        });
});

// Event listener for the "New Fact" button
newFactBtn.addEventListener('click', getFact);

// Fetch a random fact when the page loads
getFact();
