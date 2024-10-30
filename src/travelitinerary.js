// Function to load itineraries from local storage
function loadItineraries() {
    const destinations = JSON.parse(localStorage.getItem('destinations')) || [];
    const itineraryList = document.getElementById('itinerary-list');
    itineraryList.innerHTML = ''; // Clear the list before loading

    destinations.forEach((destination, destIndex) => {
        const destinationCard = document.createElement('div');
        destinationCard.classList.add('destination-card');
        destinationCard.innerHTML = `<h2>${destination.destination}</h2>`;

        destination.itineraries.forEach((itinerary, itinIndex) => {
            const itineraryCard = document.createElement('div');
            itineraryCard.classList.add('itinerary-card');
            itineraryCard.innerHTML = `
                <h3>Travel Date: ${itinerary.date}</h3>
                <p><strong>Morning:</strong> ${itinerary.morning}</p>
                <p><strong>Afternoon:</strong> ${itinerary.afternoon}</p>
                <p><strong>Evening:</strong> ${itinerary.evening}</p>
                <p><strong>Night:</strong> ${itinerary.night}</p><br>
                <button onclick="editItinerary(${destIndex}, ${itinIndex})">Edit</button>
                <button onclick="deleteItinerary(${destIndex}, ${itinIndex})">Delete</button>
            `;
            destinationCard.appendChild(itineraryCard);
        });

        itineraryList.appendChild(destinationCard);
    });
}

// Function to add a new itinerary
document.getElementById('add-itinerary-button').addEventListener('click', function() {
    const destination = document.getElementById('destination').value;
    const date = document.getElementById('date').value;
    const morning = document.getElementById('morning').value;
    const afternoon = document.getElementById('afternoon').value;
    const evening = document.getElementById('evening').value;
    const night = document.getElementById('night').value;

    if (destination && date && morning && afternoon && evening && night) {
        const destinations = JSON.parse(localStorage.getItem('destinations')) || [];
        const newItinerary = { date, morning, afternoon, evening, night };

        const existingDestination = destinations.find(d => d.destination === destination);
        if (existingDestination) {
            existingDestination.itineraries.push(newItinerary);
        } else {
            destinations.push({ destination, itineraries: [newItinerary] });
        }

        localStorage.setItem('destinations', JSON.stringify(destinations));
        loadItineraries();
        
        // Clear input fields
        document.getElementById('destination').value = '';
        document.getElementById('date').value = '';
        document.getElementById('morning').value = '';
        document.getElementById('afternoon').value = '';
        document.getElementById('evening').value = '';
        document.getElementById('night').value = '';
    } else {
        alert('Please fill in all fields.');
    }
});

// Function to edit an itinerary
function editItinerary(destIndex, itinIndex) {
    const destinations = JSON.parse(localStorage.getItem('destinations'));
    const itinerary = destinations[destIndex].itineraries[itinIndex];
    
    document.getElementById('destination').value = destinations[destIndex].destination;
    document.getElementById('date').value = itinerary.date;
    document.getElementById('morning').value = itinerary.morning;
    document.getElementById('afternoon').value = itinerary.afternoon;
    document.getElementById('evening').value = itinerary.evening;
    document.getElementById('night').value = itinerary.night;

    // Remove the itinerary after editing
    deleteItinerary(destIndex, itinIndex);
}

// Function to delete an itinerary
function deleteItinerary(destIndex, itinIndex) {
    const destinations = JSON.parse(localStorage.getItem('destinations'));
    destinations[destIndex].itineraries.splice(itinIndex, 1);
    
    // If no itineraries left for this destination, remove the destination
    if (destinations[destIndex].itineraries.length === 0) {
        destinations.splice(destIndex, 1);
    }

    localStorage.setItem('destinations', JSON.stringify(destinations));
    loadItineraries();
}

// Load itineraries when the page loads
loadItineraries();

// Function to go back to the previous page
function goBack() {
    window.history.back();
}