# Startup Metrics Dashboard Chrome Extension

A sleek, minimalist Chrome extension that displays your startup's key metrics (Revenue, Burn, and Runway) from Google Sheets on every new tab with a clean black interface.

## Features

- 📊 **Real-time Startup Metrics** from Google Sheets
  - Revenue (cell B1) - displayed as ": $X/mo"
  - Burn (cell B2) - displayed as ": $X/mo" 
  - Runway (cell B3) - displayed as ": X.X months"
- ⏰ **Live Clock** with current time and date
- 🖤 **Minimalist Black Design** with large, white text
- 🔄 **Auto-refresh** every 5 minutes
- ✨ **Smooth Animations** and modern UI

## Prerequisites

1. **Google Sheet** with your startup metrics
2. **Google Cloud Console API Key** with Sheets API enabled
3. **Chrome Browser** for installation

## Quick Setup Instructions

### Step 1: Get Google Sheets API Key

1. **Go to [Google Cloud Console](https://console.developers.google.com/)**
2. **Create a new project** or select existing one
3. **Enable the Google Sheets API:**
   - Click **+ Enable APIs and Services**
   - Search for "Google Sheets API" and select it
   - Click **Enable**
4. **Create API Key:**
   - Go to **Credentials** in the left sidebar
   - Click **+ Create Credentials** → **API Key**
   - Copy the generated key
   - Click **Restrict Key** → Choose **Google Sheets API** → **Save**

### Step 2: Prepare Your Google Sheet

1. **Create a Google Sheet** with your startup metrics:
   - **Cell B1**: Revenue amount (e.g., 50000)
   - **Cell B2**: Burn amount (e.g., 30000)
   - **Cell B3**: Runway in months (e.g., 16.7)

2. **Publish your sheet**:
   - Go to `File` → `Share` → `Publish to web`
   - Click `Publish` (makes it publicly readable)

3. **Get the Sheet ID**:
   - Copy the ID from your sheet URL: `https://docs.google.com/spreadsheets/d/[SHEET_ID]/edit`

### Step 3: Configure the Extension

1. **Edit the config file**:
   - Open `config.js` in a text editor
   - Replace `YOUR_SHEET_ID_HERE` with your actual Sheet ID
   - Replace `YOUR_API_KEY_HERE` with your actual API key
   - Save the file

2. **Install in Chrome**:
   - Open `chrome://extensions/`
   - Enable `Developer mode`
   - Click `Load unpacked`
   - Select this extension folder

## Example Configuration

Your `config.js` should look like this:

```javascript
const CONFIG = {
    SHEET_ID: '1ABC123def456GHI789jkl012MNO345pqr678STU',
    API_KEY: 'AIzaSyABC123def456GHI789jkl012MNO345pqr678'
};
```

Your Google Sheet should contain:

| A | B |
|---|---|
| Label | 75000 |
| Label | 45000 |
| Label | 18.2 |

The extension will display:
- **Revenue**: : $75,000/mo
- **Burn**: : $45,000/mo  
- **Runway**: : 18.2 months

## Files Structure

```
startup-metrics-chrome-extension/
├── manifest.json      # Extension configuration
├── newtab.html       # Dashboard interface
├── newtab.js         # Core functionality & Google Sheets integration
├── config.js         # Your configuration (Sheet ID & API key)
└── README.md         # This file
```

## Usage

Once configured, every new tab will show:
- 💚 **Revenue** in bright green
- 🔴 **Burn** in red  
- 🟡 **Runway** in amber
- 🕐 **Current time** and date

Data refreshes automatically every 5 minutes.

## Troubleshooting

### Common Issues:

1. **"API Error 403"**
   - Check that your Google Sheet is published to web
   - Verify your API key is correct and has Sheets API enabled

2. **"No data found in cells B1, B2, B3"**
   - Ensure cells B1, B2, B3 contain your metrics (numbers only)
   - Check that the data is in the first sheet (tab)

3. **"Configuration missing"**
   - Edit `config.js` with your actual Sheet ID and API key
   - Reload the extension in `chrome://extensions/`

### Security Notes

- Your API key and Sheet ID are stored locally in your browser only
- The Google Sheet must be public for the API to access it
- Consider using a dedicated sheet with only the metrics you want to display

## Development

To modify the extension:

1. Make changes to the files
2. Go to `chrome://extensions/`
3. Click the refresh button on your extension card
4. Open a new tab to see changes

## Browser Compatibility

This extension works with:
- ✅ Google Chrome
- ✅ Microsoft Edge
- ✅ Brave Browser
- ✅ Other Chromium-based browsers

## Privacy

- No data is sent to external servers except Google Sheets API
- Configuration is stored locally in your browser
- No tracking or analytics included

## License

This project is open source and available under the [MIT License](LICENSE).

---

Built with the [Google Sheets API v4](https://developers.google.com/workspace/sheets/api/guides/concepts) for reliable data access. 