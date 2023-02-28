import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import iconVelha from './assets/velha.png';
import styles from './styles';

export default function App() {
  const [b1l1, setb1l1] = useState("");
  const [b2l1, setb2l1] = useState("");
  const [b3l1, setb3l1] = useState("");
  const [b1l2, setb1l2] = useState("");
  const [b2l2, setb2l2] = useState("");
  const [b3l2, setb3l2] = useState("");
  const [b1l3, setb1l3] = useState("");
  const [b2l3, setb2l3] = useState("");
  const [b3l3, setb3l3] = useState("");
  const [jogada, setJogada] = useState("X"); // começa com o X
  const [resultadoJogo, setResultadoJogo] = useState("");

  useEffect(() => {
    console.log('useeffect processado!');
    verificaGanhador();
  }, [b1l1, b2l1, b3l1, b1l2, b2l2, b3l2, b1l3, b2l3, b3l3])


  /* useEffect(() => {
     console.log('A variável b1l1 foi atualizada! valor: ' + b1l1);
 
   }, [b1l1])*/


  function verificaGanhador() {

    /*console.log('b1l1: ' + b1l1)
    console.log('b2l1: ' + b2l1)
    console.log('b3l1: ' + b3l1)*/

    if (compara(b1l1, b2l1) && compara(b1l1, b3l1))
      exibeVencedor();
    else if (compara(b1l2, b2l2) && compara(b1l2, b3l2))
      exibeVencedor();
    else if (compara(b1l3, b2l3) && compara(b1l3, b3l3))
      exibeVencedor();
    else if (compara(b1l1, b1l2) && compara(b1l1, b1l3))
      exibeVencedor();
    else if (compara(b2l1, b2l2) && compara(b2l1, b2l3))
      exibeVencedor();
    else if (compara(b3l1, b3l2) && compara(b3l1, b3l3))
      exibeVencedor();
    else if (compara(b1l1, b2l2) && compara(b1l1, b3l3))
      exibeVencedor();
    else if (compara(b3l1, b2l2) && compara(b3l1, b1l3))
      exibeVencedor();
    else if (
      preenchido(b1l1) && preenchido(b1l2) &&
      preenchido(b1l3) && preenchido(b2l1) &&
      preenchido(b2l2) && preenchido(b2l3) &&
      preenchido(b3l1) && preenchido(b3l2) && preenchido(b3l3))
      exibeVelha();
  }

  function preenchido(valor) {

    return valor.length > 0;
  }

  function exibeVencedor() {
    let vencedor = 'X';
    if (jogada == 'X')
      vencedor = 'O'

    setResultadoJogo("O [" + vencedor + "] Ganhou!");
  }


  function exibeVelha() {
    setResultadoJogo("Deu velha!");
  }


  function pressionaBotao(fncBotao, textoBotao) {

    if (textoBotao.length == 0 && resultadoJogo.length == 0) {
      fncBotao(jogada);

      if (jogada == "X")
        setJogada("O");
      else
        setJogada("X");


      // verificaGanhador();
    }
  }


  function compara(v1, v2) {
    if (preenchido(v1) && preenchido(v2))
      return (v1 == v2);
    else
      return false;
  }

  function novoJogo() {
    setb1l1('');
    setb2l1('');
    setb3l1('');
    setb1l2('');
    setb2l2('');
    setb3l2('');
    setb1l3('');
    setb2l3('');
    setb3l3('');
    setJogada('X');
    setResultadoJogo("");
  }


  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Joguinho da Velha</Text>
      <Image source={iconVelha} style={styles.iconeVelha}></Image>

      <View style={styles.containerBotoes}>
        <TouchableOpacity style={styles.botaoJogo}
          onPress={() => pressionaBotao(setb1l1, b1l1)}>
          <Text style={styles.labelBotao}  >{b1l1}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botaoJogo}
          onPress={() => pressionaBotao(setb2l1, b2l1)}>
          <Text style={styles.labelBotao}>{b2l1}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botaoJogo}
          onPress={() => pressionaBotao(setb3l1, b3l1)}>
          <Text style={styles.labelBotao}>{b3l1}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.containerBotoes}>
        <TouchableOpacity style={styles.botaoJogo}
          onPress={() => pressionaBotao(setb1l2, b1l2)}>
          <Text style={styles.labelBotao}>{b1l2}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botaoJogo}
          onPress={() => pressionaBotao(setb2l2, b2l2)}>
          <Text style={styles.labelBotao}>{b2l2}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botaoJogo}
          onPress={() => pressionaBotao(setb3l2, b3l2)}>
          <Text style={styles.labelBotao}>{b3l2}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.containerBotoes}>
        <TouchableOpacity style={styles.botaoJogo}
          onPress={() => pressionaBotao(setb1l3, b1l3)}>
          <Text style={styles.labelBotao}>{b1l3}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botaoJogo}
          onPress={() => pressionaBotao(setb2l3, b2l3)}>
          <Text style={styles.labelBotao}>{b2l3}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botaoJogo}
          onPress={() => pressionaBotao(setb3l3, b3l3)}>
          <Text style={styles.labelBotao}>{b3l3}</Text>
        </TouchableOpacity>
      </View>


      <Text style={styles.lblResultadoJogo}>{resultadoJogo}</Text>



      {/*https://reactjs.org/docs/conditional-rendering.html */
        resultadoJogo.length > 0 &&

        <TouchableOpacity style={[styles.botaoNovoJogo, styles.sombraBotao]}
          onPress={() => novoJogo()}>
          <Text style={styles.labelNovoJogo}>Novo Jogo</Text>
        </TouchableOpacity>
      }

      <StatusBar style="auto" />
    </View>
  );
}

