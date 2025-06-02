# Startup Metrics Dashboard Chrome Extension

A powerful Chrome extension that displays your startup's key metrics (Monthly Revenue, Monthly Burn, and Runway) from Google Sheets directly on every new tab.

## Features

- 📊 **Real-time Startup Metrics** from Google Sheets
  - Monthly Revenue (cell B1)
  - Monthly Burn (cell B2) 
  - Runway in months (cell B3)
- ⏰ **Live Clock** with current time and date
- 🎨 **Beautiful Dashboard** with glassmorphism design
- 🔒 **Secure Configuration** stored locally in your browser
- 🔄 **Auto-refresh** and manual refresh capabilities
- ✨ **Smooth Animations** and modern UI

## Prerequisites

1. **Google Sheet** with your startup metrics
2. **Google Cloud Console API Key** with Sheets API enabled
3. **Chrome Browser** for installation

## Setup Instructions

### Step 1: Prepare Your Google Sheet

1. Create a Google Sheet with your startup metrics:
   - **Cell B1**: Monthly Revenue (e.g., 50000)
   - **Cell B2**: Monthly Burn (e.g., 30000)
   - **Cell B3**: Runway in months (e.g., 12.5)

2. **Publish your sheet**:
   - Go to `File` → `Share` → `Publish to web`
   - Click `Publish` (this makes it publicly readable)

3. **Get the Sheet ID**:
   - Copy the ID from your sheet URL: `https://docs.google.com/spreadsheets/d/[SHEET_ID]/edit`

### Step 2: Get Google Sheets API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the **Google Sheets API**:
   - Go to `APIs & Services` → `Library`
   - Search for "Google Sheets API" and enable it
4. Create an API Key:
   - Go to `APIs & Services` → `Credentials`
   - Click `Create Credentials` → `API Key`
   - Copy the generated API key

### Step 3: Install the Extension

1. **Load in Chrome**:
   - Open `chrome://extensions/`
   - Enable `Developer mode`
   - Click `Load unpacked`
   - Select this extension folder

2. **Configure the Extension**:
   - Open a new tab
   - Enter your **Sheet ID** and **API Key** in the configuration panel
   - Click **Save & Load Data**

## Files Structure

```
startup-metrics-chrome-extension/
├── manifest.json      # Extension configuration
├── newtab.html       # Dashboard interface
├── newtab.js         # Core functionality & Google Sheets integration
└── README.md         # This file
```

## Usage

Once configured, every new tab will show:
- 💰 **Monthly Revenue** in green
- 🔥 **Monthly Burn** in red  
- 🛣️ **Runway** in yellow (months remaining)
- 🕐 **Current time** and date

### Data Format Examples

Your Google Sheet should contain:

| A | B |
|---|---|
| Revenue | 75000 |
| Burn | 45000 |
| Runway | 18.2 |

The extension will automatically format:
- Revenue/Burn as currency: `$75,000`
- Runway as decimal: `18.2` months

## Troubleshooting

### Common Issues:

1. **"HTTP error! status: 403"**
   - Check that your Google Sheet is published to web
   - Verify your API key is correct and has Sheets API enabled

2. **"Sheet does not contain data"**
   - Ensure cells B1, B2, B3 contain your metrics
   - Check that the data is in the first sheet (tab)

3. **"Please configure your Sheet ID and API Key first"**
   - Enter both values in the configuration panel
   - Click "Save & Load Data"

### Security Notes

- Your API key and Sheet ID are stored locally in your browser only
- The Google Sheet must be public for the API to access it
- Consider using a dedicated sheet with only the metrics you want to display

## Customization

You can modify:
- **Metrics**: Change which cells are fetched in `newtab.js`
- **Styling**: Update CSS in `newtab.html`
- **Refresh Rate**: Add auto-refresh functionality
- **Additional Data**: Expand to read more cells/sheets

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

Built with the [Google Sheets API v4](https://developers.google.com/sheets/api/guides/concepts) for reliable data access. 