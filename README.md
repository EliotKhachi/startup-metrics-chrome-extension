# Startup Metrics Dashboard Chrome Extension

A minimalist Chrome extension that displays your startup's key metrics (Revenue, Burn, Runway) from **private** Google Sheets on every new tab.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-green.svg)

## Features

- 📊 **Real-time metrics** from private Google Sheets (Revenue, Burn, Runway)
- 🔒 **Private sheet access** - no need to publish sheets publicly  
- ⏰ **Live clock** with current time and date
- 🖤 **Clean black interface** with smooth animations
- 🔄 **Auto-refresh** every 5 minutes

## Quick Start

### 1. Clone and Install Extension

```bash
git clone https://github.com/EliotKhachi/startup-metrics-chrome-extension.git
cd startup-metrics-chrome-extension
```

1. Open Chrome and go to `chrome://extensions/`
2. Enable **Developer mode** (top-right toggle)
3. Click **Load unpacked** and select the cloned folder
4. **Copy the Extension ID** from the extension card (you'll need this for OAuth setup)

### 2. Set Up Google Cloud OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. **Enable Google Sheets API:**
   - Go to **APIs & Services** → **Library**
   - Search "Google Sheets API" → Click **Enable**
4. **Create OAuth Client:**
   - Go to **Credentials** → **Create Credentials** → **OAuth client ID**
   - Choose **Chrome Extension**
   - Enter your extension ID from Step 1
   - Copy the generated **Client ID**

### 3. Configure Your Google Sheet

1. **Create a Google Sheet** with your metrics in cells B1, B2, B3:
   ```
   B1: Revenue (e.g., 50000)
   B2: Burn (e.g., 30000)  
   B3: Runway in months (e.g., 16.7)
   ```
2. **Get Sheet ID** from the URL: `https://docs.google.com/spreadsheets/d/[SHEET_ID]/edit`
3. **Keep it private** - don't publish to web, just ensure you have access

### 4. Update Extension Configuration

Edit `config.js` with your details:

```javascript
const CONFIG = {
    SHEET_ID: 'your-google-sheet-id-here',
    OAUTH_CLIENT_ID: 'your-oauth-client-id.apps.googleusercontent.com'
};
```

Also update `manifest.json` oauth2 section:

```json
"oauth2": {
    "client_id": "your-oauth-client-id.apps.googleusercontent.com",
    "scopes": ["https://www.googleapis.com/auth/spreadsheets.readonly"]
}
```

### 5. Test the Extension

1. **Reload the extension:** Go to `chrome://extensions/` → Click refresh button
2. **Open new tab** → Extension will prompt for Google login
3. **Grant permissions** → Your metrics should load automatically!

## Expected Display Format

Your extension will show:
- **REVENUE**: : $50,000/mo
- **BURN**: : $30,000/mo  
- **RUNWAY**: : 16.7 months

## Privacy & Security

✅ **Your sheet stays private** - respects Google Drive permissions  
✅ **Read-only access** - extension cannot modify your data  
✅ **OAuth 2.0 secure authentication** - no API keys exposed  
✅ **Local storage only** - no external servers involved  

## Troubleshooting

**"Authentication failed"**
- Check OAuth Client ID is correct in both `config.js` and `manifest.json`
- Verify extension ID is added to OAuth client settings in Google Cloud

**"API Error 403"**  
- Enable Google Sheets API in Google Cloud Console
- Ensure you have access to the Google Sheet
- Verify Sheet ID is correct

**"No data found"**
- Check cells B1, B2, B3 contain numeric values
- Ensure data is in the first sheet tab

**Extension not loading after changes**
- Reload extension at `chrome://extensions/`
- Clear browser cache if needed

## Development

To modify the extension:
1. Make your changes
2. Go to `chrome://extensions/` → Click refresh on your extension
3. Open new tab to test changes

## File Structure

```
startup-metrics-chrome-extension/
├── manifest.json      # Extension configuration & OAuth settings
├── newtab.html       # Dashboard interface  
├── newtab.js         # Core functionality & authentication
├── config.js         # Your configuration (Sheet ID & Client ID)
└── README.md         # Setup instructions
```

## Browser Support

Works with Chrome, Edge, Brave, and other Chromium-based browsers.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with [Google Sheets API v4](https://developers.google.com/workspace/sheets/api/guides/concepts) and [Chrome Identity API](https://developer.chrome.com/docs/extensions/reference/identity/) for secure access to private Google Sheets. 