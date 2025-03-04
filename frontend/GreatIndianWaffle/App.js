import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { View, Text, StyleSheet } from 'react-native';

// Import store and persistor
import { store, persistor } from './src/store/store';

// Import context providers
import { AuthProvider } from './src/contexts/AuthContext';
import { ThemeProvider } from './src/contexts/ThemeContext';

// Import main navigator
import AppNavigator from './src/navigation/AppNavigator';

// Fallback Component for debugging
const DebugFallback = () => (
  <View style={styles.fallback}>
    <Text style={styles.fallbackText}>Great Indian Waffle App</Text>
    <Text style={styles.fallbackSubtext}>Initializing...</Text>
  </View>
);

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate 
        loading={<DebugFallback />} 
        persistor={persistor}
      >
        <SafeAreaProvider>
          <ThemeProvider>
            <AuthProvider>
              <View style={styles.container}>
                <AppNavigator />
              </View>
            </AuthProvider>
          </ThemeProvider>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  fallback: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  fallbackText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  fallbackSubtext: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
  },
});
