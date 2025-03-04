import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  connectAuthEmulator,
  onAuthStateChanged 
} from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getAnalytics, logEvent } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDXNzbsLjNfrKsrRjPnkUK3f2Kdjm1xKn4",
  authDomain: "greatindianwaffleapp.firebaseapp.com",
  projectId: "greatindianwaffleapp",
  storageBucket: "greatindianwaffleapp.firebasestorage.app",
  messagingSenderId: "1070642461468",
  appId: "1:1070642461468:web:cebf7518299fc3412098d9",
  measurementId: "G-66DE6QV4Y0"
};

// Enhanced Firebase initialization logging
console.group('🔥 Firebase Configuration');
console.log('Initializing Firebase with config:', {
  projectId: firebaseConfig.projectId,
  authDomain: firebaseConfig.authDomain,
  messagingSenderId: firebaseConfig.messagingSenderId
});

// Initialize Firebase
let app, auth, firestore, analytics;

try {
  // Validate configuration
  if (!firebaseConfig.apiKey) {
    throw new Error('Firebase API Key is missing');
  }

  app = initializeApp(firebaseConfig);
  
  // Initialize services
  auth = getAuth(app);
  firestore = getFirestore(app);
  
  // Only initialize analytics in production
  if (process.env.NODE_ENV !== 'development') {
    analytics = getAnalytics(app);
  }

  // Development environment emulator setup with enhanced error handling
  if (process.env.NODE_ENV === 'development') {
    console.warn('⚠️ Setting up Firebase emulators for development');
    
    try {
      // Connect to local emulators
      connectAuthEmulator(auth, 'http://localhost:9099');
      connectFirestoreEmulator(firestore, 'localhost', 8080);
      
      console.log('✅ Successfully connected to Firebase emulators', {
        authEmulator: 'http://localhost:9099',
        firestoreEmulator: 'http://localhost:8080'
      });
    } catch (emulatorError) {
      console.error('❌ Failed to connect to Firebase emulators:', {
        message: emulatorError.message,
        name: emulatorError.name
      });
    }
  }

  // Comprehensive Firebase service validation
  console.log('✅ Firebase services initialized successfully', {
    authStatus: !!auth,
    firestoreStatus: !!firestore,
    analyticsStatus: !!analytics
  });

  // Detailed auth state change logging
  onAuthStateChanged(auth, 
    (user) => {
      console.group('🔐 Firebase Auth State');
      console.log('Auth State Change:', {
        userPresent: !!user,
        userId: user ? user.uid : 'No User',
        email: user ? user.email : 'N/A'
      });
      console.groupEnd();
    }, 
    (error) => {
      console.error('❌ Firebase Auth State Error:', error);
    }
  );

  console.groupEnd();

} catch (initError) {
  console.group('❌ Firebase Initialization Error');
  console.error('Failed to initialize Firebase:', initError);
  console.log('Configuration Details:', {
    apiKeyPresent: !!firebaseConfig.apiKey,
    authDomain: firebaseConfig.authDomain
  });
  console.groupEnd();
  
  // Rethrow to ensure app knows about initialization failure
  throw initError;
}

export { app, auth, firestore, analytics };
