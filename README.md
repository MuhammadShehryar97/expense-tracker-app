# Expense Tracker App

The Expense Tracker App is a mobile application that empowers users to manage their expenses efficiently. With manual expense logging, location tagging, map display, and budget alerts, it provides a comprehensive solution for tracking and controlling personal spending.
This App utilizes Redux Persist to ensure seamless data persistence across app sessions. This feature allows users to retain their expense data even when the app is closed or the device is restarted.

## Key Features

### 1. Manual Expense Logging with Location Tagging

- Users can manually log their expenses, entering details such as amount, name, and description.
- Automatic GPS location tagging is enabled using the `react-native-community/geolocation` library, providing insights into where each expense occurred.
- This feature enhances the app by associating each expense entry with the user's current geographical location.

### 2. Basic Map Display

- The app features a simple map display using `react-native-maps`, showing pins representing locations where expenses were logged.
- Each pin on the map displays the total amount spent at that location, offering a visual representation of spending patterns.
- The map interface enhances the user experience by adding a visual layer to their financial data.

### 3. Simple Budget Alerts

- Users can set a general budget limit for specific areas (e.g., shopping malls or restaurant districts).
- The app sends notifications when spending in a designated area exceeds a predefined threshold, helping users stay within their budget.

## Setup Instructions

### Prerequisites

- Node.js: Ensure you have Node.js installed.
- Geolocation Permissions: For location tagging, ensure that the app has permission to access the device's location services.

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/MuhammadShehryar97/expense-tracker-app.git
    ```

2. Navigate to the project directory:

    ```bash
    cd expense-tracker-app
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Start the app:

    ```bash
    npx react-native run-ios/run-android
    
    ```
## Development Decisions

- **React Native:** The app is developed using React Native for cross-platform compatibility.
- **Geolocation:** The react-native-community/geolocation library is chosen for GPS location tagging. Offers a standardized and easy-to-use API for obtaining the device's current location and tracking its changes over time.
- **Maps Integration:** The react-native-maps library is selected for map integration. It offers a seamless map display with various customization options and supports features such as adding markers (pins) and displaying the user's current location.
- **Redux Persist:** using Redux Persist to ensure seamless data persistence across app sessions. This feature allows users to retain their expense data even when the app is closed or the device is restarted.
- Now, with Redux Persist, users can enjoy a continuous and uninterrupted experience, with their expense data persistently stored between app sessions.

## Contributing

We welcome contributions! Feel free to open issues or pull requests to enhance the app

Happy Expense Tracking!
