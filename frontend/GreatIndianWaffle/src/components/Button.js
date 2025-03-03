import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';

/**
 * Custom Button component with loading state
 * @param {string} title - Button text
 * @param {function} onPress - Function to call on press
 * @param {boolean} loading - Whether to show loading indicator
 * @param {string} type - Button type (primary, secondary, danger)
 * @param {boolean} disabled - Whether button is disabled
 * @param {object} style - Additional style for the button
 */
export default function Button({ 
  title, 
  onPress, 
  loading = false, 
  type = 'primary', 
  disabled = false,
  style = {} 
}) {
  // Determine button style based on type
  const buttonStyle = {
    primary: styles.primaryButton,
    secondary: styles.secondaryButton,
    danger: styles.dangerButton,
  }[type];

  // Determine text style based on type
  const textStyle = {
    primary: styles.primaryText,
    secondary: styles.secondaryText,
    danger: styles.dangerText,
  }[type];

  return (
    <TouchableOpacity
      style={[styles.button, buttonStyle, disabled && styles.disabledButton, style]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color={type === 'secondary' ? '#FF6B6B' : '#fff'} />
      ) : (
        <Text style={[styles.text, textStyle, disabled && styles.disabledText]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  primaryButton: {
    backgroundColor: '#FF6B6B',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#FF6B6B',
  },
  dangerButton: {
    backgroundColor: '#E53935',
  },
  disabledButton: {
    backgroundColor: '#CCCCCC',
    borderColor: '#CCCCCC',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  primaryText: {
    color: '#FFFFFF',
  },
  secondaryText: {
    color: '#FF6B6B',
  },
  dangerText: {
    color: '#FFFFFF',
  },
  disabledText: {
    color: '#999999',
  },
});
