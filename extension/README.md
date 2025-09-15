# Sign Language Translator Browser Extension

This browser extension translates American Sign Language (ASL) to text in real-time on video conferencing platforms. This is a prototype and currently only supports a few letters and is optimized for Google Meet.

## How to Install and Test

To test this extension, you need to load it as an "unpacked extension" in a Chromium-based browser like Google Chrome or Microsoft Edge.

1.  **Open the Extensions Page:**
    *   In your browser, navigate to `chrome://extensions`.

2.  **Enable Developer Mode:**
    *   In the top right corner of the Extensions page, toggle the "Developer mode" switch to the "on" position.

3.  **Load the Extension:**
    *   Click the "Load unpacked" button that appears on the left side of the page.
    *   In the file dialog that opens, select the `extension` directory from this repository.
    *   The "Sign Language Translator" extension should now appear in your list of extensions.

## How to Use

### 1. Testing on the Test Page

To verify that the extension is working correctly with your webcam, you can use the included test page.

1.  Open the `test.html` file (located in the `extension` directory) in your browser.
2.  Allow the page to access your webcam when prompted.
3.  You should see your webcam feed on the page.
4.  If the extension is working, you will see a black box with the text "No hands detected." or "Detected sign: ..." overlaid on the page.

### 2. Testing on Google Meet

This extension is specifically configured to work on Google Meet.

1.  Make sure the extension is enabled on the `chrome://extensions` page.
2.  Join a Google Meet call.
3.  Make sure your camera is on.
4.  The translation overlay should appear over your video feed.

**Note:** This is a prototype. The sign recognition is very basic, and the UI is simple. The selector for the video element on Google Meet might need to be adjusted if Google changes their website's code.
