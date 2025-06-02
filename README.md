# Hello World Chrome Extension

A simple Chrome extension that displays "Hello World" with a beautiful interface whenever you open a new tab.

## Features

- 🌅 Displays a time-based greeting (Good Morning/Afternoon/Evening)
- ⏰ Shows current time and date updated in real-time
- 🎨 Beautiful gradient background with glassmorphism design
- ✨ Smooth animations and modern UI

## Installation

### Method 1: Load Unpacked Extension (Development)

1. Open Google Chrome
2. Navigate to `chrome://extensions/`
3. Enable "Developer mode" by clicking the toggle in the top right corner
4. Click "Load unpacked" button
5. Select the folder containing this extension (the folder with `manifest.json`)
6. The extension should now be installed and active

### Method 2: Direct Installation

1. Download or clone this repository
2. Follow the steps in Method 1 above

## Files Structure

```
startup-metrics-chrome-extension/
├── manifest.json      # Extension configuration
├── newtab.html       # New tab page HTML
├── newtab.js         # JavaScript functionality
└── README.md         # This file
```

## Usage

Once installed, every time you open a new tab in Chrome, you'll see the "Hello World" page with:
- A personalized greeting based on the time of day
- Current time that updates every second
- Current date
- Beautiful animated interface

## Development

To modify the extension:

1. Make changes to the files
2. Go to `chrome://extensions/`
3. Click the refresh button on your extension card
4. Open a new tab to see your changes

## Customization

You can easily customize:
- **Colors**: Modify the CSS gradient in `newtab.html`
- **Messages**: Change the greeting logic in `newtab.js`
- **Styling**: Update the CSS styles in `newtab.html`
- **Functionality**: Add more features in `newtab.js`

## Browser Compatibility

This extension is designed for Google Chrome and other Chromium-based browsers that support Manifest V3.

## License

This project is open source and available under the [MIT License](LICENSE). 