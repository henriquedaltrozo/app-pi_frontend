import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
  Platform,
  Alert,
} from "react-native";
import { Button, CheckBox, Input, Text } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { validateEmail } from "../functions/validateFunctions";
import { TextInputMask } from "react-native-masked-text";
import usuarioService from "../services/UsuarioService";

export default function Cadastro({ navigation }) {
  const [email, setEmail] = useState(null);
  const [nome, setNome] = useState(null);
  const [cpf, setCpf] = useState(null);
  const [senha, setSenha] = useState(null);
  const [telefone, setTelefone] = useState(null);
  const [isSelected, setSelected] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorNome, setErrorNome] = useState(null);
  const [errorCpf, setErrorCpf] = useState(null);
  const [errorTelefone, setErrorTelefone] = useState(null);
  const [errorSenha, setErrorSenha] = useState(null);
  const [isLoading, setLoading] = useState(false);

  let cpfField = null;
  let telefoneField = null;

  const validar = () => {
    let error = false;
    setErrorEmail(null);
    setErrorNome(null);
    setErrorCpf(null);
    setErrorTelefone(null);
    setErrorSenha(null);
    if (!validateEmail.test(String(email).toLowerCase())) {
      setErrorEmail("Preencha seu email corretamente.");
      error = true;
    }
    if (nome == null) {
      setErrorNome("Preencha seu nome completo corretamente.");
      error = true;
    }
    if (!cpfField.isValid()) {
      setErrorCpf("Preencha seu CPF corretamente.");
      error = true;
    }
    if (telefone == null) {
      setErrorTelefone("Preencha seu telefone corretamente.");
      error = true;
    }
    if (senha == null) {
      setErrorSenha("Preencha a senha.");
      error = true;
    }
    return !error;
  };

  const salvar = () => {
    if (validar()) {
      setLoading(true);

      let data = {
        email: email,
        cpf: cpf,
        nome: nome,
        telefone: telefone,
        senha: senha,
      };

      usuarioService
        .cadastrar(data)
        .then((response) => {
          setLoading(false);
          const titulo = response.data.status ? "Sucesso!" : "Erro!";
          console.log(response.data);
          Alert.alert(titulo, response.data.mensagem);
        })
        .catch((error) => {
          setLoading(false);
          const titulo = error.response.data.status ? "Sucesso" : "Erro";
          console.log(error.response.data);
          Alert.alert(titulo, error.response.data.mensagem);
        });
    }
  };

  const voltarParaLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.container}
      //keyboardVerticalOffset={100}
    >
      <ScrollView style={styles.scrollStyle}>
        <Text style={styles.texto}> Crie sua conta no SensorFlow: </Text>

        <Input
          placeholder="Digite seu e-mail"
          onChangeText={(value) => {
            setEmail(value);
            setErrorEmail(null);
          }}
          autoCapitalize="none"
          keyboardType="email-address"
          errorMessage={errorEmail}
          inputStyle={{ color: "#fff" }}
        />

        <Input
          placeholder="Digite seu nome completo"
          onChangeText={(value) => setNome(value)}
          autoCapitalize="none"
          errorMessage={errorNome}
          inputStyle={{ color: "#fff" }}
        />

        <View style={styles.containerMask}>
          <TextInputMask
            placeholder="Digite seu CPF"
            placeholderTextColor="#8A98A6"
            type="cpf"
            value={cpf}
            onChangeText={(value) => {
              setCpf(value), setErrorCpf(null);
            }}
            keyboardType="number-pad"
            returnKeyType="done"
            style={[styles.maskedInput, { color: "#fff" }]}
            ref={(ref) => (cpfField = ref)}
          />
        </View>
        <Text style={styles.errorMessage}>{errorCpf}</Text>

        <View style={styles.containerMask}>
          <TextInputMask
            placeholder="Digite seu telefone"
            placeholderTextColor="#8A98A6"
            type={"cel-phone"}
            options={{
              maskType: "BRL",
              withDDD: true,
              dddMask: "(99) ",
            }}
            value={telefone}
            onChangeText={(value) => {
              setTelefone(value), setErrorTelefone(null);
            }}
            keyboardType="phone-pad"
            returnKeyType="done"
            style={[styles.maskedInput, { color: "#fff" }]}
            ref={(ref) => (telefoneField = ref)}
          />
        </View>
        <Text style={styles.errorMessage}>{errorTelefone}</Text>

        <Input
          placeholder="Digite sua senha"
          onChangeText={(value) => setSenha(value)}
          errorMessage={errorSenha}
          autoCapitalize="none"
          secureTextEntry={true}
          inputStyle={{ color: "#fff" }}
        />

        <CheckBox
          title="Eu aceito os termos de uso."
          checkedIcon="check"
          uncheckedIcon="square-o"
          checkedColor="green"
          uncheckedColor="red"
          checked={isSelected}
          onPress={() => setSelected(!isSelected)}
          textStyle={{ color: "#8A98A6" }}
          containerStyle={{
            backgroundColor: "transparent",
            alignItems: "center",
            borderColor: "#8A98A6",
          }}
        />

        {isLoading && <Text>Carregando...</Text>}

        {!isLoading && (
          <>
            <Button
              icon={<Icon name="save" size={15} color="white" />}
              title=" Salvar"
              //titleStyle={{color: "#8A98A6"}}
              buttonStyle={styles.button}
              onPress={() => salvar()}
            />
            <Button
             icon={<Icon name="arrow-circle-left" size={15} color="white" />}
              title=" Voltar"
              buttonStyle={styles.button}
              onPress={() => voltarParaLogin()}
            />
          </>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000947", //"#F1F0F0"
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  button: {
    marginTop: 10,
    paddingHorizontal: 100,
    paddingVertical: 10,
  },
  maskedInput: {
    flexGrow: 1,
    height: 40,
    fontSize: 18,
    borderBottomColor: "#8A98A6",
    borderBottomWidth: 1,
    borderStyle: "solid",
    alignSelf: "flex-start",
  },
  containerMask: {
    flexDirection: "row",
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  errorMessage: {
    alignSelf: "flex-start",
    marginLeft: 15,
    color: "#f00",
    fontSize: 12,
  },
  scrollStyle: {
    width: "90%",
    marginTop: 10,
  },
  texto: {
    fontSize: 24,
    marginTop: 30,
    marginBottom: 15,
    paddingLeft: 4,
    textAlign: "center",
    color: "#fff",
  },
});

