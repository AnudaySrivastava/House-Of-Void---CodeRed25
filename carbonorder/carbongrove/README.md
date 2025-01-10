# Carbon Grove Mobile App

## Setup Instructions

1. Install Expo CLI globally:
```bash
npm install -g expo-cli
```

2. Clean npm cache and install dependencies:
```bash
npm cache clean --force
npm install
```

3. Run the project:
```bash
npm start
```

4. Scan the QR code with Expo Go app on your mobile device

## Features
- 🌿 Eco-friendly design with green color palette
- 🛒 Interactive product ordering system
- 📊 Order tracking with progress indicators
- 🏆 User points tracking
- 📦 Quantity selection for products
- 🚀 Responsive mobile UI

## Implemented UI Components
- Animated header with eco-themed icons
- Dynamic order cards with progress bars
- Product cards with quantity and cart functionality
- Bottom navigation with icon-based menu

## Troubleshooting
- If you encounter entry file issues, ensure:
  - `index.js` exists in the root directory
  - `main` field in `package.json` points to `index.js`
  - All dependencies are correctly installed

- Common fixes:
  ```bash
  npm cache clean --force
  rm -rf node_modules
  npm install
  ```

## Requirements
- Node.js 18+
- Expo Go app installed on mobile device
- Expo CLI installed globally

## Technologies
- React Native
- Expo SDK 52
- TypeScript
- Expo Vector Icons
