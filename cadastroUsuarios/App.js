import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import uuid from 'react-native-uuid';
import { Ionicons, Entypo } from '@expo/vector-icons';

/*
  Para utilizar essa aplicação é necessário o pacote 'react-native-uuid', pois os IDs
  dos usuários são do tipo GUID.
 */

export default function App() {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passConfirmation, setPassConfirmation] = useState("");
  const [users, setUsers] = useState([{code: uuid.v4(), name: "", email: "", password: "", passConfirmation: ""}]);

  useEffect(
    () => {
      loadUsers();
      console.log('load data from AsyncStorage...');
    }, []);

  async function save() {
    var newRecord = false;

    if (code == "") {
      setCode(uuid.v4());
      newRecord = true;
    }

    if (!name) {
      Alert.alert("O nome é obrigarório...");
      return;
    }

    if (!email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
      Alert.alert("Email inválido...");
      return;
    }

    if (!password || !passConfirmation) {
      Alert.alert("A senha e a confirmação de senha devem ser informadas...");
      return;
    }

    if (!password.match(/(?=.*[A-Z])/)) {
      Alert.alert("A senha deve possuir ao menos um caractere maiúsculo...");
      return;
    }

    if (!password.match(/(?=.*[0-9])/)) {
      Alert.alert("A senha deve conter ao menos um número...");
      return;
    }

    if (!(password === passConfirmation)) {
      Alert.alert("A confirmação de senha e a senha devem ser iguais...");
      return;
    }

    let user = {
      code: code,
      name: name,
      email: email,
      password: password
    };

    console.log("inside save try/catch...");
    console.log("newRecord: " + newRecord);

    try {
      if (newRecord == true) {
        users.push(user);
        console.log("user added...");
      }
      else {
        let index = users.findIndex(c => c.code === code);

        if (index >= 0)
          users[index] = user;
      }

      const json = JSON.stringify(users);
      await AsyncStorage.setItem('@users', json);
      clearFields();
    }
    catch(e) {
      Alert.alert("Erro ao gravar os dados -> Detalhes: " + e.toString());
      console.log("Erro ao salvar -> Detalhes: " + e.toString());
    }
  }

  async function loadUsers() {
    try {
      const json = await AsyncStorage.getItem("@users");

      if (json) {
        setUsers(JSON.parse(json));
      }
      else
        setUsers([]);
    }
    catch (e) {
      Alert.alert("Erro ao carregar os usuários -> Detalhes: " + e.toString());
    }
  }

  function remove(code) {
    Alert.alert('Atenção', 'Confirma a remoção do usuário?',
    [
      {
        text: 'Sim',
        onPress: async () => {
          try {
            const user = users.filter(u => u.code !== code);
            const json = JSON.stringify(user);
            
            await AsyncStorage.setItem('@users', json);
            
            Alert.alert("Usuário apagado jovem!!!");

            clearFields();

            await loadUsers();
          }
          catch (e) {
            Alert.alert("Erro ao remover o usuário -> Detalhes: " + e.toString());
          }
        }
      },
      {
        text: 'Não',
        style: 'cancel',
      }
    ]);
  }

  function edit(code) {
    const user = users.find(u => u.code === code);

    if (user) {
      setCode(user.code);
      setName(user.name);
      setEmail(user.email);
      setPassword(user.password);
      setPassConfirmation(user.passConfirmation);
    }

    console.log(contato);
  }

  function clearFields() {
    setCode("");
    setName("");
    setEmail("");
    setPassword("");
    setPassConfirmation("");
  }

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 25, color: '#FFF', backgroundColor: 'blue', width: '100%', textAlign: 'center' }}>Repo. de Usuários - v1.0</Text>
      <View style={styles.areaDados}>
        <View style={styles.textoEntrada}>
          <Text>Nome</Text>
          <TextInput style={styles.caixaTexto}
            onChangeText={(texto) => setName(texto)}
            value={name} />
        </View>

        <View style={styles.textoEntrada}>
          <Text>Email</Text>
          <TextInput style={styles.caixaTexto}
            onChangeText={(texto) => setEmail(texto)}
            value={email} />
        </View>

        <View style={styles.textoEntrada}>
          <Text>Password</Text>
          <TextInput style={styles.caixaTexto}
            onChangeText={(texto) => setPassword(texto)}
            value={password}
            secureTextEntry={true} />
        </View>

        <View style={styles.textoEntrada}>
          <Text>Password Conf.</Text>
          <TextInput style={styles.caixaTexto}
            onChangeText={(texto) => setPassConfirmation(texto)}
            value={passConfirmation}
            secureTextEntry={true} />
        </View>
      </View>

      <View style={styles.areaBotoes}>
        <TouchableOpacity style={styles.botao} onPress={() => save()}>
          <Text style={styles.textoBotao}>Salvar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botao} onPress={() => clearFields()}>
          <Text style={styles.textoBotao}>Cancelar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.listaUsuarios}>
        {
          users.map((user, index) => (
            <View style={styles.usuario} key={index.toString()}>

              <Text style={styles.listaNome}> {user.name}</Text>
              <Text style={styles.listaEmail} >{user.email} </Text>

              <View style={styles.dadosBotoesAcao}>
                <TouchableOpacity onPress={() => remove(user.code)}>
                  <Ionicons name="md-remove-circle" size={32} color="red" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => edit(user.code)}>
                  <Entypo name="edit" size={32} color="black" />
                </TouchableOpacity>

              </View>
            </View>
          ))
        }
      </ScrollView>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 50,
  },
  caixaTexto: {
      borderColor: "#000",
      borderWidth: 2,
      height: 50,
      width: '100%',
      paddingHorizontal: 10,
      borderRadius: 10,
  },
  botao: {
      width: '30%',
      height: 50,
      borderColor: "#000",
      borderWidth: 2,
      borderRadius: 30,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#040d59',
  },
  areaDados: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
      flexWrap: 'wrap'
  },
  areaBotoes: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
      marginTop: 30,
  },
  textoBotao: {
      color: '#FFF',
  },
  textoEntrada: {
      width: '48%',
  },
  listaUsuarios: {
      width: '100%',
      height: '100%',
      backgroundColor: '#FFF',
      marginTop: 20,
  },
  usuario: {
      backgroundColor: '#ed8f1c',
      flexDirection: 'row',
      height: 80,
      alignItems: 'center',
      margin: 10,
      borderRadius: 5,
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
  },
  listaNome: {
      width: '50%',
      fontSize: 18,
      paddingRight: 10,
  },
  dadosBotoesAcao: {
      width: '10%',
  },
  listaEmail: {
      color: "#FFF",
      fontSize: 18,
  }
});
