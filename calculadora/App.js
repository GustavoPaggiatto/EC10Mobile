import { useState } from 'react';
import { TouchableOpacity, View, Text, TextInput, Alert } from 'react-native';
import styles from './styles';

export default function App() {
  const [numberOne, setNumberOne] = useState(0);
  const [numberTwo, setNumberTwo] = useState(0);
  const [result, setResult] = useState(0);

  function doArithmetic(operationType) {
    if (operationType === 1) {
      setResult(numberOne + numberTwo);
    }
    else if (operationType === 2) {
      setResult(numberOne - numberTwo);
    }
    else if (operationType === 3) {
      setResult(numberOne * numberTwo);
    }
    else if (operationType === 4) {
      setResult(numberOne / numberTwo);
    }
    else {
      setResult(numberOne ** numberTwo);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Primeiro Número</Text>
      
      <TextInput
        onChangeText={(number) => setNumberOne(Number.parseFloat(number.replace(",",".")))}
        keyboardType='numeric'
        style={styles.textInput}/>

      <Text style={styles.label}>Segundo Número</Text>
      
      <TextInput
        onChangeText={(number) => setNumberTwo(Number.parseFloat(number.replace(",",".")))}
        keyboardType='numeric'
        style={styles.textInput}/>

      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => doArithmetic(1)}>
          <Text style={styles.buttonLabel}>Soma</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => doArithmetic(2)}>
          <Text style={styles.buttonLabel}>Subtração</Text>
        </TouchableOpacity>          
        <TouchableOpacity 
          style={styles.button}
          onPress={() => doArithmetic(3)}>
          <Text style={styles.buttonLabel}>Multiplicação</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => doArithmetic(4)}>
          <Text style={styles.buttonLabel}>Divisão</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => doArithmetic(5)}>
          <Text style={styles.buttonLabel}>Exponênciação</Text>
        </TouchableOpacity>
      </View>      
      
      <Text style={styles.label}>Resultado: {result.toFixed(2)}</Text>
    </View>
  );
}