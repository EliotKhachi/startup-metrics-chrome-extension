# Startup Metrics Dashboard Chrome Extension

A sleek, minimalist Chrome extension that displays your startup's key metrics (Revenue, Burn, and Runway) from **private** Google Sheets on every new tab with a clean black interface.

## Features

- 📊 **Real-time Startup Metrics** from **private** Google Sheets
  - Revenue (cell B1) - displayed as ": $X/mo"
  - Burn (cell B2) - displayed as ": $X/mo" 
  - Runway (cell B3) - displayed as ": X.X months"
- 🔒 **Private Sheet Access** - respects your Google Drive sharing permissions
- ⏰ **Live Clock** with current time and date
- 🖤 **Minimalist Black Design** with large, white text
- 🔄 **Auto-refresh** every 5 minutes with secure authentication
- ✨ **Smooth Animations** and modern UI

## Prerequisites

1. **Private Google Sheet** with your startup metrics
2. **Google Cloud Console OAuth 2.0 Client ID** with Sheets API enabled
3. **Chrome Browser** for installation

## Security Benefits

✅ **Your sheet stays private** - only accessible to people you've shared it with  
✅ **No "publish to web" required** - maintains Google Drive privacy settings  
✅ **OAuth 2.0 authentication** - secure, user-consent based access  
✅ **Read-only permissions** - extension can only view, not modify your data

## Setup Instructions

### Step 1: Set Up OAuth 2.0 in Google Cloud Console

1. **Go to [Google Cloud Console](https://console.developers.google.com/)**
2. **Create a new project** or select existing one
3. **Enable the Google Sheets API:**
   - Click **+ Enable APIs and Services**
   - Search for "Google Sheets API" and select it
   - Click **Enable**

4. **Create OAuth 2.0 Client ID:**
   - Go to **Credentials** in the left sidebar
   - Click **+ Create Credentials** → **OAuth client ID**
   - Choose **Chrome Extension** as application type
   - Add your extension ID (you'll get this after loading the extension)
   - Copy the generated Client ID

5. **Configure OAuth consent screen** (if prompted):
   - Add your email as a test user
   - Set scopes to include Google Sheets API read access

### Step 2: Prepare Your Private Google Sheet

1. **Create a Google Sheet** with your startup metrics:
   - **Cell B1**: Revenue amount (e.g., 50000)
   - **Cell B2**: Burn amount (e.g., 30000)
   - **Cell B3**: Runway in months (e.g., 16.7)

2. **Keep your sheet private**:
   - **DO NOT** publish to web
   - Share only with people who should have access
   - The extension will access it using your Google account permissions

3. **Get the Sheet ID**:
   - Copy the ID from your sheet URL: `https://docs.google.com/spreadsheets/d/[SHEET_ID]/edit`

### Step 3: Configure the Extension

1. **Edit the config files**:
   
   **config.js:**
   ```javascript
   const CONFIG = {
       SHEET_ID: 'your-actual-sheet-id-here',
       OAUTH_CLIENT_ID: 'your-client-id.apps.googleusercontent.com'
   };
   ```
   
   **manifest.json:** (update the oauth2 section)
   ```json
   "oauth2": {
       "client_id": "your-client-id.apps.googleusercontent.com",
       "scopes": ["https://www.googleapis.com/auth/spreadsheets.readonly"]
   }
   ```

2. **Install in Chrome**:
   - Open `chrome://extensions/`
   - Enable `Developer mode`
   - Click `Load unpacked`
   - Select this extension folder
   - Copy the **Extension ID** from the card

3. **Update OAuth settings**:
   - Go back to Google Cloud Console → Credentials
   - Edit your OAuth client ID
   - Add the Extension ID you just copied
   - Save changes

### Step 4: First Use

1. **Open a new tab** - the extension will prompt for authentication
2. **Grant permissions** when prompted by Google
3. **Your metrics will load automatically** from your private sheet

## Example Configuration

Your Google Sheet should contain:

| A | B |
|---|---|
| Revenue Label | 75000 |
| Burn Label | 45000 |
| Runway Label | 18.2 |

The extension will display:
- **Revenue**: : $75,000/mo
- **Burn**: : $45,000/mo  
- **Runway**: : 18.2 months

## Files Structure

```
startup-metrics-chrome-extension/
├── manifest.json      # Extension configuration with OAuth settings
├── newtab.html       # Dashboard interface
├── newtab.js         # Core functionality & OAuth authentication
├── config.js         # Your configuration (Sheet ID & OAuth Client ID)
└── README.md         # This file
```

## Privacy & Security

### What the Extension Can Access:
- ✅ **Read access only** to your specified Google Sheet
- ✅ **Your Google account identity** for authentication
- ✅ **Local browser storage** for configuration

### What the Extension CANNOT Do:
- ❌ **Cannot modify** your Google Sheets
- ❌ **Cannot access other files** in your Google Drive
- ❌ **Cannot share your data** with external services
- ❌ **Cannot access your sheet** without your explicit consent

### Data Security:
- **OAuth tokens stored locally** in your browser only
- **No data sent to external servers** except Google's APIs
- **Respects your Google Drive sharing permissions**
- **Authentication expires automatically** for security

## Troubleshooting

### Common Issues:

1. **"Authentication failed"**
   - Check that your OAuth Client ID is correct in both config.js and manifest.json
   - Verify the extension ID is added to your OAuth client settings
   - Make sure Google Sheets API is enabled

2. **"API Error 403"**
   - Ensure you have access to the Google Sheet
   - Check that the Sheet ID is correct
   - Verify OAuth consent screen is configured

3. **"No data found in cells B1, B2, B3"**
   - Ensure cells B1, B2, B3 contain your metrics (numbers only)
   - Check that the data is in the first sheet (tab)

4. **Extension ID not working**
   - The extension ID changes if you reload from a different folder
   - Update the OAuth client settings with the new extension ID

## Development

To modify the extension:

1. Make changes to the files
2. Go to `chrome://extensions/`
3. Click the refresh button on your extension card
4. Open a new tab to see changes
5. Re-authenticate if you changed OAuth settings

## Browser Compatibility

This extension works with:
- ✅ Google Chrome
- ✅ Microsoft Edge  
- ✅ Brave Browser
- ✅ Other Chromium-based browsers with identity API support

## License

This project is open source and available under the [MIT License](LICENSE).

---

Built with [Google Sheets API v4](https://developers.google.com/workspace/sheets/api/guides/concepts) and [Chrome Identity API](https://developer.chrome.com/docs/extensions/reference/identity/) for secure, private data access. 