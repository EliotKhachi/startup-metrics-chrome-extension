// Configuration and data management
class StartupMetrics {
    constructor() {
        this.sheetId = '';
        this.apiKey = '';
        this.init();
    }

    async init() {
        await this.loadConfig();
        this.setupEventListeners();
        this.updateTime();
        setInterval(() => this.updateTime(), 1000);
        
        // Load data if configuration exists
        if (this.sheetId && this.apiKey) {
            this.loadMetricsData();
        }
    }

    // Time display functionality
    updateTime() {
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
            <div style="font-size: 1rem; margin-top: 5px; opacity: 0.8;">${dateString}</div>
        `;
    }

    // Configuration management
    async saveConfig() {
        const sheetId = document.getElementById('sheetId').value.trim();
        const apiKey = document.getElementById('apiKey').value.trim();
        
        if (!sheetId || !apiKey) {
            this.showStatus('Please enter both Sheet ID and API Key', 'error');
            return;
        }
        
        this.sheetId = sheetId;
        this.apiKey = apiKey;
        
        // Save to Chrome storage
        await chrome.storage.local.set({
            sheetId: this.sheetId,
            apiKey: this.apiKey
        });
        
        this.showStatus('Configuration saved! Loading data...', 'success');
        this.loadMetricsData();
    }

    async loadConfig() {
        try {
            const result = await chrome.storage.local.get(['sheetId', 'apiKey']);
            if (result.sheetId && result.apiKey) {
                this.sheetId = result.sheetId;
                this.apiKey = result.apiKey;
                document.getElementById('sheetId').value = this.sheetId;
                document.getElementById('apiKey').value = this.apiKey;
            }
        } catch (error) {
            console.error('Error loading config:', error);
        }
    }

    // Google Sheets API integration
    async loadMetricsData() {
        if (!this.sheetId || !this.apiKey) {
            this.showStatus('Please configure your Sheet ID and API Key first', 'error');
            return;
        }

        try {
            this.showStatus('Loading metrics data...', 'loading');
            this.setLoadingState(true);

            // Construct the API URL to fetch cells B1, B2, B3
            const range = 'B1:B3';
            const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.sheetId}/values/${range}?key=${this.apiKey}`;
            
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (data.values && data.values.length >= 3) {
                const [revenue, burn, runway] = data.values.flat();
                this.updateMetricsDisplay(revenue, burn, runway);
                this.showStatus('✅ Data loaded successfully!', 'success');
                
                // Hide status after 3 seconds
                setTimeout(() => {
                    this.hideStatus();
                }, 3000);
            } else {
                throw new Error('Sheet does not contain data in cells B1, B2, B3');
            }
        } catch (error) {
            console.error('Error loading metrics:', error);
            this.showStatus(`❌ Error: ${error.message}`, 'error');
        } finally {
            this.setLoadingState(false);
        }
    }

    // Update the metrics display
    updateMetricsDisplay(revenue, burn, runway) {
        // Format currency values
        const formatCurrency = (value) => {
            const num = parseFloat(value);
            if (isNaN(num)) return value;
            return num.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            });
        };

        // Format runway (assuming it's in months)
        const formatRunway = (value) => {
            const num = parseFloat(value);
            if (isNaN(num)) return value;
            return `${num.toFixed(1)}`;
        };

        document.getElementById('revenue').textContent = formatCurrency(revenue);
        document.getElementById('burn').textContent = formatCurrency(burn);
        document.getElementById('runway').textContent = formatRunway(runway);
    }

    // UI state management
    setLoadingState(isLoading) {
        const metricsGrid = document.getElementById('metricsGrid');
        if (isLoading) {
            metricsGrid.classList.add('loading');
        } else {
            metricsGrid.classList.remove('loading');
        }
    }

    showStatus(message, type) {
        const statusElement = document.getElementById('dataStatus');
        statusElement.textContent = message;
        statusElement.className = `status ${type}`;
        statusElement.style.display = 'block';
    }

    hideStatus() {
        const statusElement = document.getElementById('dataStatus');
        statusElement.style.display = 'none';
    }

    // Event listeners
    setupEventListeners() {
        document.getElementById('saveConfig').addEventListener('click', () => {
            this.saveConfig();
        });

        document.getElementById('refreshData').addEventListener('click', () => {
            this.loadMetricsData();
        });

        // Allow Enter key to save configuration
        ['sheetId', 'apiKey'].forEach(id => {
            document.getElementById(id).addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.saveConfig();
                }
            });
        });
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new StartupMetrics();
});

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