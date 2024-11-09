let eventsContainer = document.getElementById('events-container');
let addEventButton = document.getElementById('add-event');

// Store interval IDs to manage individual countdowns
let intervalIds = new Map();

// Function to create a new event block
function createEventBlock() {
    const eventBlock = document.createElement('div');
    eventBlock.classList.add('event-block'); // Add class for styling

    // Event block HTML structure
    eventBlock.innerHTML = `
        <div>
            <label>Event Name:</label>
            <input type="text" class="event-name" placeholder="Enter event name">
        </div>
        <div>
            <label>Event Date & Time:</label>
            <input type="datetime-local" class="event-datetime">
        </div>
        <div class="show-event"></div>
        <button class="start" type="button">Start</button>
        <button class="stop" type="button">Stop</button>
    `;

    eventsContainer.appendChild(eventBlock); // Add the event block to the container

    // Add functionality to start and stop buttons
    const startButton = eventBlock.querySelector('.start');
    const stopButton = eventBlock.querySelector('.stop');
    const showEvent = eventBlock.querySelector('.show-event');
    const eventDateTime = eventBlock.querySelector('.event-datetime');

    let intervalId;

    // Start countdown function for each event
    startButton.addEventListener('click', () => {
        const eventTime = new Date(eventDateTime.value).getTime();
        if (isNaN(eventTime) || eventTime <= new Date().getTime()) {
            alert('Please select a valid future date and time.');
            return;
        }

        // Clear any previous interval to avoid multiple countdowns for the same event
        if (intervalId) clearInterval(intervalId);

        intervalId = setInterval(() => {
            const now = new Date().getTime();
            const timeLeft = eventTime - now;

            if (timeLeft <= 0) {
                clearInterval(intervalId);
                showEvent.innerText = 'Time Up!';
                alert('Time Up!');
            } else {
                const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

                showEvent.innerHTML = `Countdown: ${days}d ${hours}h ${minutes}m ${seconds}s`;
            }
        }, 1000);
    });

    // Stop countdown function for each event
    stopButton.addEventListener('click', () => {
        clearInterval(intervalId);
        showEvent.innerText = 'Countdown stopped.';
    });
}

// Add event listener to the "Add Event" button
addEventButton.addEventListener('click', createEventBlock);
