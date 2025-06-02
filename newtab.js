// Configuration and data management
class StartupMetrics {
    constructor() {
        this.sheetId = '';
        this.oauthClientId = '';
        this.accessToken = null;
        this.init();
    }

    async init() {
        await this.loadConfig();
        this.updateTime();
        setInterval(() => this.updateTime(), 1000);
        
        // Load data if configuration exists
        if (this.sheetId && this.oauthClientId) {
            await this.authenticateAndLoadData();
            // Auto-refresh every 5 minutes
            setInterval(() => this.loadMetricsData(), 5 * 60 * 1000);
        } else {
            this.showSetupHint();
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
        
        const timeElement = document.getElementById('currentTime');
        if (timeElement) {
            timeElement.innerHTML = `
                <div>${timeString}</div>
                <div style="font-size: 1.2rem; margin-top: 5px; opacity: 0.7;">${dateString}</div>
            `;
        }
    }

    async loadConfig() {
        try {
            const result = await chrome.storage.local.get(['sheetId', 'oauthClientId']);
            if (result.sheetId && result.oauthClientId) {
                this.sheetId = result.sheetId;
                this.oauthClientId = result.oauthClientId;
            }
        } catch (error) {
            console.error('Error loading config:', error);
        }
    }

    // OAuth 2.0 Authentication
    async authenticateAndLoadData() {
        try {
            // Get OAuth token using Chrome Identity API
            const token = await new Promise((resolve, reject) => {
                chrome.identity.getAuthToken(
                    { 
                        interactive: true,
                        scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly']
                    },
                    (token) => {
                        if (chrome.runtime.lastError) {
                            console.error('Chrome identity error:', chrome.runtime.lastError);
                            reject(chrome.runtime.lastError);
                        } else {
                            resolve(token);
                        }
                    }
                );
            });

            this.accessToken = token;
            await this.loadMetricsData();
            
        } catch (error) {
            console.error('Authentication failed:', error);
            this.showStatus(`Authentication failed: ${error.message || error}`, 'error');
        }
    }

    // Google Sheets API integration with OAuth
    async loadMetricsData() {
        if (!this.sheetId || !this.accessToken) {
            this.showStatus('Configuration missing or not authenticated', 'error');
            return;
        }

        try {
            this.setLoadingState(true);

            // Construct the API URL to fetch cells B1, B2, B3 with OAuth token
            const range = 'B1:B3';
            const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.sheetId}/values/${range}`;
            
            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`,
                    'Content-Type': 'application/json'
                }
            });
            
            if (!response.ok) {
                const errorBody = await response.text();
                console.error('API Error response body:', errorBody);
                
                if (response.status === 401) {
                    // Token expired, try to get a new one
                    await this.refreshToken();
                    return this.loadMetricsData();
                }
                throw new Error(`API Error ${response.status} - Check your Sheet ID and permissions`);
            }
            
            const data = await response.json();
            
            if (data.values && data.values.length >= 3) {
                const [revenue, burn, runway] = data.values.flat();
                this.updateMetricsDisplay(revenue, burn, runway);
                this.hideStatus();
                this.hideSetupHint();
            } else {
                throw new Error('No data found in cells B1, B2, B3');
            }
        } catch (error) {
            console.error('Error loading metrics:', error);
            this.setLoadingState(false);
            this.showStatus(`Error: ${error.message}`, 'error');
        } finally {
            this.setLoadingState(false);
        }
    }

    // Refresh OAuth token
    async refreshToken() {
        try {
            // Remove cached token
            if (this.accessToken) {
                chrome.identity.removeCachedAuthToken({ token: this.accessToken });
            }
            
            // Get new token
            const token = await new Promise((resolve, reject) => {
                chrome.identity.getAuthToken(
                    { 
                        interactive: false,
                        scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly']
                    },
                    (token) => {
                        if (chrome.runtime.lastError) {
                            reject(chrome.runtime.lastError);
                        } else {
                            resolve(token);
                        }
                    }
                );
            });
            
            this.accessToken = token;
        } catch (error) {
            console.error('Token refresh failed:', error);
            throw new Error('Authentication expired - please refresh the page');
        }
    }

    // Update the metrics display with raw values from Google Sheets
    updateMetricsDisplay(revenue, burn, runway) {
        const revenueEl = document.getElementById('revenue');
        const burnEl = document.getElementById('burn');
        const runwayEl = document.getElementById('runway');
        
        if (revenueEl) revenueEl.textContent = revenue;
        if (burnEl) burnEl.textContent = burn;
        if (runwayEl) runwayEl.textContent = runway;
    }

    // UI state management
    setLoadingState(isLoading) {
        const body = document.body;
        if (body) {
            if (isLoading) {
                body.classList.add('loading');
            } else {
                body.classList.remove('loading');
            }
        }
    }

    showStatus(message, type) {
        const statusElement = document.getElementById('dataStatus');
        if (statusElement) {
            statusElement.textContent = message;
            statusElement.className = `status ${type}`;
            statusElement.style.display = 'block';
        }
    }

    hideStatus() {
        const statusElement = document.getElementById('dataStatus');
        if (statusElement) {
            statusElement.style.display = 'none';
        }
    }

    showSetupHint() {
        const hintElement = document.getElementById('setupHint');
        if (hintElement) {
            hintElement.textContent = 'Configure OAuth Client ID and Sheet ID in extension code - see README';
            hintElement.style.display = 'block';
            hintElement.style.opacity = '0.8';
        }
    }

    hideSetupHint() {
        const hintElement = document.getElementById('setupHint');
        if (hintElement) {
            hintElement.style.display = 'none';
        }
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
        const header = document.querySelector('.header');
        if (header) {
            const greetingElement = document.createElement('div');
            greetingElement.style.cssText = `
                font-size: 1.1rem;
                margin-bottom: 20px;
                opacity: 0;
                animation: fadeInUp 1s ease-out 0.9s both;
            `;
            greetingElement.textContent = greeting;
            header.insertBefore(greetingElement, header.firstChild);
        }
    }, 500);
}

// Add greeting when page loads
document.addEventListener('DOMContentLoaded', () => {
    addGreeting();
}); 