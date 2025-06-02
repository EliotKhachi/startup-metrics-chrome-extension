// Configuration file for your startup metrics
// Replace the values below with your own Google Sheets data

const CONFIG = {
    // Your Google Sheet ID (from the URL: docs.google.com/spreadsheets/d/[SHEET_ID]/edit)
    SHEET_ID: '17qKlzuprqhmsPrNqdBEUTpcXH3NgvhJG7QC460UYODM',
    
    // Your OAuth 2.0 Client ID (from Google Cloud Console)
    // Note: This should also be added to manifest.json
    OAUTH_CLIENT_ID: '304726963595-ur5bvskdm1qqv1vsth8g1han9bafvl6i.apps.googleusercontent.com'
};

// Save configuration to Chrome storage when the file loads
if (typeof chrome !== 'undefined' && chrome.storage) {
    chrome.storage.local.set({
        sheetId: CONFIG.SHEET_ID,
        oauthClientId: CONFIG.OAUTH_CLIENT_ID
    });
} 