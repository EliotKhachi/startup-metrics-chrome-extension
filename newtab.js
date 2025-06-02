// Function to update the current time
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
    });
    const dateString = now.toLocaleDateString([], {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    document.getElementById('currentTime').innerHTML = `
        <div>${timeString}</div>
        <div style="font-size: 1rem; margin-top: 10px; opacity: 0.8;">${dateString}</div>
    `;
}

// Update time immediately
updateTime();

// Update time every second
setInterval(updateTime, 1000);

// Add a greeting based on time of day
function addGreeting() {
    const hour = new Date().getHours();
    let greeting;
    
    if (hour < 12) {
        greeting = "Good Morning!";
    } else if (hour < 17) {
        greeting = "Good Afternoon!";
    } else {
        greeting = "Good Evening!";
    }
    
    // Add greeting after a short delay for better animation effect
    setTimeout(() => {
        const container = document.querySelector('.container');
        const greetingElement = document.createElement('div');
        greetingElement.style.cssText = `
            font-size: 1.1rem;
            margin-bottom: 20px;
            opacity: 0;
            animation: fadeInUp 1s ease-out 0.9s both;
        `;
        greetingElement.textContent = greeting;
        container.insertBefore(greetingElement, container.firstChild);
    }, 500);
}

// Add greeting when page loads
addGreeting(); 