// Configuration file for your startup metrics
// Replace the values below with your own Google Sheets data

const CONFIG = {
    // Your Google Sheet ID (from the URL: docs.google.com/spreadsheets/d/[SHEET_ID]/edit)
    SHEET_ID: 'YOUR_SHEET_ID_HERE',
    
    // Your Google Sheets API key (from Google Cloud Console)
    API_KEY: 'YOUR_API_KEY_HERE'
};

// Save configuration to Chrome storage when the file loads
if (typeof chrome !== 'undefined' && chrome.storage) {
    chrome.storage.local.set({
        sheetId: CONFIG.SHEET_ID,
        apiKey: CONFIG.API_KEY
    });
} 