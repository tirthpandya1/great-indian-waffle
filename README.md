# Great Indian Waffle - Restaurant Management App

## Project Overview
Great Indian Waffle is a cross-platform web and mobile application designed to revolutionize the restaurant ordering and customer engagement experience. The app provides a seamless interface for customers to browse menus, place orders, earn loyalty points, and receive personalized promotions. Our mission is to blend authentic Indian flavors with modern waffle recipes, creating a unique culinary experience backed by cutting-edge technology.

## Features
- 📱 **Cross-platform support** (Web, iOS, Android)
- 🔐 **Multiple Authentication Methods**:
  - Email/Password
  - Google Sign-in
  - Phone OTP Verification
- 🍽️ **Interactive Menu Display** with categories, search, and filtering
- 🛒 **Comprehensive Order Management** with cart, checkout, and payment options
- 👥 **Customer Profiling** with order history and preferences
- 🏆 **Loyalty Program** with points, rewards, and tier-based benefits
- 📣 **Promotional Campaigns** with targeted offers and seasonal specials
- 📊 **Analytics Dashboard** (for restaurant owners)
- 🌐 **Multi-location Support** for franchise management
- 📱 **Push Notifications** for order updates and promotions

## Tech Stack

### Frontend
- **Framework**: React Native
- **State Management**: Redux with Redux Toolkit
- **Navigation**: React Navigation
- **Authentication**: Firebase Authentication
- **UI Components**: React Native Paper

### Backend
- **Framework**: Python (FastAPI)
- **Database**: Firebase Firestore
- **Authentication**: Firebase Authentication
- **API Documentation**: Swagger UI (via FastAPI)

### Deployment
- **Web**: Firebase Hosting
- **Mobile**: App Store (iOS), Google Play Store (Android)
- **Backend**: Cloud Run or similar containerized service

## Project Structure

```
great-indian-waffle/
├── frontend/                # React Native application
│   ├── GreatIndianWaffle/   # React Native project
│   │   ├── src/
│   │   │   ├── assets/      # Static assets
│   │   │   ├── components/  # Reusable UI components
│   │   │   ├── config/      # Configuration files
│   │   │   ├── contexts/    # React contexts
│   │   │   ├── navigation/  # Navigation configuration
│   │   │   ├── redux/       # Redux store and slices
│   │   │   └── screens/     # App screens
│   │   ├── App.js           # Entry point
│   │   └── index.js         # Register application
├── backend/                 # FastAPI backend
│   ├── main.py              # Entry point
│   ├── routes/              # API routes
│   └── requirements.txt     # Python dependencies
└── assets/                  # Shared assets
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- Python 3.8+
- React Native CLI
- Firebase account

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend/GreatIndianWaffle
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Firebase:
   - Create a Firebase project
   - Enable Authentication (Email/Password, Google, Phone)
   - Create a Firestore database
   - Add your Firebase configuration to `src/config/firebase.js`

4. Run the application:
   - For iOS: `npx react-native run-ios`
   - For Android: `npx react-native run-android`
   - For Web: `npm run web`

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Configure Firebase Admin SDK:
   - Generate a service account key from Firebase
   - Save it as `firebase-credentials.json`

5. Run the server:
   ```bash
   uvicorn main:app --reload
   ```

## Authentication Flow

The app supports three authentication methods:

1. **Email/Password**: Traditional sign-up and sign-in
2. **Google Sign-in**: One-click authentication using Google
3. **Phone OTP**: Two-step verification using phone number and OTP

## State Management

The app uses Redux Toolkit for state management with the following slices:

- **userSlice**: Manages user authentication and profile
- **menuSlice**: Handles menu items and categories
- **orderSlice**: Manages cart and order history
- **loyaltySlice**: Tracks loyalty points and rewards

## API Endpoints

- **Auth**: `/auth/*` - Authentication endpoints
- **Menu**: `/menu/*` - Menu-related endpoints
- **Orders**: `/orders/*` - Order management
- **Users**: `/users/*` - User profile management
- **Loyalty**: `/loyalty/*` - Loyalty program endpoints

## Contributing
Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## Screenshots

*Coming soon*

## Roadmap

- [ ] Implement real-time order tracking
- [ ] Add support for multiple languages
- [ ] Integrate with third-party delivery services
- [ ] Add table reservation system
- [ ] Implement feedback and rating system
- [ ] Add social media sharing capabilities

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgements

- [React Native](https://reactnative.dev/)
- [FastAPI](https://fastapi.tiangolo.com/)
- [Firebase](https://firebase.google.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [React Navigation](https://reactnavigation.org/)
