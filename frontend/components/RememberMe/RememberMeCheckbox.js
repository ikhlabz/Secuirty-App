import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const RememberMeCheckbox = () => {
  const [rememberMe, setRememberMe] = useState(false);

  const handleCheckboxToggle = () => {
    setRememberMe(!rememberMe);
  };

  return (
    <View style={styles.checkboxContainer}>
      <TouchableOpacity onPress={handleCheckboxToggle} style={styles.checkbox}>
        {rememberMe && <View style={styles.checked} />}
      </TouchableOpacity>
      <Text style={styles.label}>Remember Me</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  checked: {
    width: 14,
    height: 14,
    backgroundColor: 'black',
    borderRadius: 2,
  },
  label: {
    fontSize: 16,
  },
});

export default RememberMeCheckbox;
