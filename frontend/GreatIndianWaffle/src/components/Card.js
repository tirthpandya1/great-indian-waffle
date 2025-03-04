import React from 'react';
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';

/**
 * Card component for displaying content in a card-like container
 * @param {node} children - Card content
 * @param {function} onPress - Function to call on press (optional)
 * @param {object} style - Additional style for the card
 * @param {boolean} elevated - Whether to show elevation shadow
 */
export default function Card({ 
  children, 
  onPress, 
  style = {}, 
  elevated = true 
}) {
  const CardComponent = onPress ? TouchableOpacity : View;
  
  return (
    <CardComponent 
      style={[
        styles.card, 
        elevated && styles.elevated,
        style
      ]}
      onPress={onPress}
      activeOpacity={onPress ? 0.8 : 1}
    >
      {children}
    </CardComponent>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 0,
  },
  elevated: Platform.select({
    web: {
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    default: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
  }),
});
