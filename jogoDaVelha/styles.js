import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    iconeVelha: {
      width: 100,
      height: 100,
    },
    titulo: {
      fontSize: 30,
      marginBottom: 20,
    },
    botaoJogo: {
      width: 100,
      height: 100,
      borderRadius: 10,
      borderColor: '#000',
      borderWidth: 2,
      alignItems: 'center',
      justifyContent: 'center',
    },
    containerBotoes: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
      marginBottom: 10,
    },
    labelBotao: {
      fontSize: 50,
      fontWeight: 'bold',
    },
    lblResultadoJogo: {
      fontSize: 50,
      fontWeight: 'bold',
    },
    botaoNovoJogo: {
      width: '80%',
      height: 50,
      borderRadius: 10,
      borderColor: '##f2c035',
      borderWidth: 2,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fce092',
      marginTop: 20,
    },
    labelNovoJogo: {
      fontSize: 20,
      fontWeight: 'bold',
    },
  
    sombraBotao: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.30,
      shadowRadius: 4.65,
      elevation: 8,
    }
  });
  

  export default styles;