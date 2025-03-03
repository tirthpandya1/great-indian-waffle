import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';

/**
 * Custom Input component with label and error handling
 * @param {string} label - Input label
 * @param {string} value - Input value
 * @param {function} onChangeText - Function to call on text change
 * @param {string} placeholder - Input placeholder
 * @param {string} error - Error message to display
 * @param {boolean} secureTextEntry - Whether to hide text entry
 * @param {string} keyboardType - Keyboard type
 * @param {object} style - Additional style for the input container
 * @param {object} inputStyle - Additional style for the input field
 * @param {boolean} required - Whether the field is required
 */
export default function Input({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  secureTextEntry = false,
  keyboardType = 'default',
  style = {},
  inputStyle = {},
  required = false,
  ...props
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [isSecure, setIsSecure] = useState(secureTextEntry);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const toggleSecureEntry = () => setIsSecure(!isSecure);

  return (
    <View style={[styles.container, style]}>
      {label && (
        <Text style={styles.label}>
          {label} {required && <Text style={styles.required}>*</Text>}
        </Text>
      )}
      
      <View style={[
        styles.inputContainer,
        isFocused && styles.focusedInput,
        error && styles.errorInput
      ]}>
        <TextInput
          style={[styles.input, inputStyle]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={isSecure}
          keyboardType={keyboardType}
          onFocus={handleFocus}
          onBlur={handleBlur}
          autoCapitalize="none"
          {...props}
        />
        
        {secureTextEntry && (
          <TouchableOpacity onPress={toggleSecureEntry} style={styles.secureButton}>
            <Text style={styles.secureButtonText}>
              {isSecure ? 'Show' : 'Hide'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    color: '#333',
  },
  required: {
    color: '#E53935',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  input: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    color: '#333',
  },
  focusedInput: {
    borderColor: '#FF6B6B',
    borderWidth: 2,
  },
  errorInput: {
    borderColor: '#E53935',
  },
  errorText: {
    color: '#E53935',
    fontSize: 12,
    marginTop: 4,
  },
  secureButton: {
    paddingHorizontal: 12,
  },
  secureButtonText: {
    color: '#FF6B6B',
    fontSize: 14,
  },
});
