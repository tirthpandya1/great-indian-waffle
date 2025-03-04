import React, { createContext, useState, useEffect, useContext } from 'react';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithCredential,
  PhoneAuthProvider,
  RecaptchaVerifier,
  getIdToken,
  signInAnonymously
} from 'firebase/auth';
import { auth } from '../config/firebase';

const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);

  // Enhanced logging function with more diagnostic information
  const logAuthState = (message, data = {}) => {
    console.group('🔐 AuthContext State');
    console.log(message, {
      currentUser: currentUser ? {
        uid: currentUser.uid,
        email: currentUser.email,
        emailVerified: currentUser.emailVerified
      } : null,
      loading,
      error: error ? {
        code: error.code,
        message: error.message
      } : null,
      ...data
    });
    console.groupEnd();
  };

  // Comprehensive token fetching with enhanced error handling
  const fetchUserToken = async (user) => {
    try {
      if (user) {
        const userToken = await getIdToken(user, true);
        setToken(userToken);
        logAuthState('🔑 User token fetched successfully', { 
          tokenLength: userToken.length,
          tokenFirstChars: userToken.substring(0, 10) + '...'
        });
      } else {
        setToken(null);
        console.warn('🚫 No user found for token fetching');
      }
    } catch (tokenError) {
      console.error('❌ Token Fetching Error:', {
        name: tokenError.name,
        message: tokenError.message,
        code: tokenError.code
      });
      setToken(null);
      setError(tokenError);
    }
  };

  // DEBUG: Enhanced anonymous sign-in with comprehensive error tracking
  async function debugSignIn() {
    console.group('🕵️ Debug Anonymous Sign-In');
    try {
      console.warn('Attempting DEBUG anonymous sign-in');
      const userCredential = await signInAnonymously(auth);
      
      // Comprehensive user credential logging
      console.log('Anonymous User Credentials:', {
        uid: userCredential.user.uid,
        isAnonymous: userCredential.user.isAnonymous,
        creationTime: userCredential.user.metadata.creationTime
      });

      await fetchUserToken(userCredential.user);
      
      logAuthState('✅ Debug anonymous login successful', { 
        userId: userCredential.user.uid 
      });
      
      console.groupEnd();
      return userCredential;
    } catch (signInError) {
      console.error('❌ Debug Sign-In Failed:', {
        name: signInError.name,
        code: signInError.code,
        message: signInError.message
      });
      
      setError(signInError);
      console.groupEnd();
      throw signInError;
    }
  }

  // Sign up with email and password
  async function signup(email, password) {
    try {
      logAuthState('Attempting signup', { email });
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await fetchUserToken(userCredential.user);
      logAuthState('Signup successful', { userId: userCredential.user.uid });
      return userCredential;
    } catch (signupError) {
      logAuthState('Signup failed', { errorMessage: signupError.message });
      setError(signupError);
      throw signupError;
    }
  }

  // Sign in with email and password
  async function login(email, password) {
    try {
      logAuthState('Attempting login', { email });
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      await fetchUserToken(userCredential.user);
      logAuthState('Login successful', { userId: userCredential.user.uid });
      return userCredential;
    } catch (loginError) {
      logAuthState('Login failed', { errorMessage: loginError.message });
      setError(loginError);
      throw loginError;
    }
  }

  // Sign in with Google
  async function loginWithGoogle() {
    try {
      logAuthState('Attempting Google login');
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      await fetchUserToken(result.user);
      logAuthState('Google login successful', { userId: result.user.uid });
      return result;
    } catch (googleLoginError) {
      logAuthState('Google login failed', { errorMessage: googleLoginError.message });
      setError(googleLoginError);
      throw googleLoginError;
    }
  }

  // Sign out
  async function logout() {
    try {
      logAuthState('Attempting logout');
      await signOut(auth);
      setCurrentUser(null);
      setToken(null);
      logAuthState('Logout successful');
    } catch (logoutError) {
      logAuthState('Logout failed', { errorMessage: logoutError.message });
      setError(logoutError);
      throw logoutError;
    }
  }

  useEffect(() => {
    console.group('🔄 Auth State Listener Setup');
    logAuthState('Setting up comprehensive auth state listener');
    
    const unsubscribe = onAuthStateChanged(auth, 
      async (user) => {
        console.group('🔐 Auth State Change');
        logAuthState('Auth state changed', { 
          userPresent: !!user,
          userId: user ? user.uid : null,
          email: user ? user.email : null
        });

        // Update user and fetch token
        setCurrentUser(user);
        await fetchUserToken(user);
        
        // Ensure loading state is updated
        setLoading(false);
        setError(null);

        // DEBUG: If no user, attempt anonymous sign-in with more context
        if (!user) {
          console.warn('🚨 No authenticated user found. Attempting debug sign-in.');
          try {
            await debugSignIn();
          } catch (debugError) {
            console.error('❌ Fallback Debug Sign-In Failed:', {
              name: debugError.name,
              code: debugError.code,
              message: debugError.message
            });
            setLoading(false);
          }
        }
        
        console.groupEnd();
      }, 
      (authError) => {
        console.group('❌ Auth State Error');
        console.error('Auth state change error:', {
          name: authError.name,
          code: authError.code,
          message: authError.message
        });
        
        logAuthState('Auth state error', { 
          errorName: authError.name,
          errorCode: authError.code 
        });
        
        setError(authError);
        setCurrentUser(null);
        setToken(null);
        setLoading(false);
        
        console.groupEnd();
      }
    );

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    token,
    signup,
    login,
    loginWithGoogle,
    logout,
    debugSignIn,
    loading,
    error
  };

  // Always render children, with error boundary logging
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
