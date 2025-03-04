import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../contexts/AuthContext';

// Import screens
import HomeScreen from '../screens/HomeScreen';
import MenuScreen from '../screens/MenuScreen';
import OrderScreen from '../screens/OrderScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LoyaltyScreen from '../screens/LoyaltyScreen';

// Import Auth Navigator
import AuthNavigator from './AuthNavigator';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Menu" component={MenuScreen} />
      <Tab.Screen name="Order" component={OrderScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Loyalty" component={LoyaltyScreen} />
    </Tab.Navigator>
  );
}

function DebugInfoScreen({ authInfo }) {
  return (
    <View style={styles.debugContainer}>
      <Text style={styles.debugTitle}>Authentication Debug Info</Text>
      <Text>Current User: {authInfo.currentUser ? 'Logged In' : 'Not Logged In'}</Text>
      <Text>Loading State: {authInfo.loading ? 'Loading' : 'Loaded'}</Text>
      <Text>User Details: {JSON.stringify(authInfo.currentUser, null, 2)}</Text>
    </View>
  );
}

export default function AppNavigator() {
  const authContext = useAuth();
  const { currentUser, loading, error } = authContext;
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [debugMode, setDebugMode] = useState(false);

  console.log('AppNavigator Auth Context:', {
    currentUser: !!currentUser,
    loading,
    error,
  });

  useEffect(() => {
    // Ensure authentication state is updated after loading completes
    if (!loading) {
      setIsAuthenticated(!!currentUser);
      // Automatically enter debug mode if there are authentication issues
      if (!currentUser && !loading) {
        setDebugMode(true);
        console.warn('Entering debug mode due to authentication state');
      }
    }
  }, [currentUser, loading]);

  // If in debug mode, show debug information
  if (debugMode) {
    return <DebugInfoScreen authInfo={authContext} />;
  }

  // If still loading, show a loading indicator
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticated ? (
          <Stack.Screen 
            name="Main" 
            component={MainTabNavigator} 
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen 
            name="Auth" 
            component={AuthNavigator} 
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  debugContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#FFEEEE',
  },
  debugTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
});
