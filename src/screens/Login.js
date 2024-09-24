import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  Alert,
  StatusBar,
  StyleSheet,
  View,
  Image,
} from "react-native";
import { Button, Input, Text } from "react-native-elements";
import { ActivityIndicator } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import usuarioService from "../services/UsuarioService";

export default function Login({ navigation }) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [isLoadingToken, setLoadingToken] = useState(true);

  const entrar = () => {
    let data = {
      username: email,
      password: password,
    };

    usuarioService
      .login(data)
      .then((response) => {
        setLoading(false);
        navigation.reset({
          index: 0,
          routes: [{ name: "Principal" }],
        });
      })
      .catch((error) => {
        setLoading(false);
        Alert.alert("Usuário não existe");
      });
  };

  const logarComToken = (token) => {
    setLoadingToken(true);
    let data = {
      token: token,
    };

    usuarioService
      .loginComToken(data)
      .then((response) => {
        setLoadingToken(false);
        navigation.reset({
          index: 0,
          routes: [{ name: "Principal" }],
        });
      })
      .catch((error) => {
        setLoadingToken(false);
      });
  };

  const cadastrar = () => {
    navigation.navigate("Cadastro");
  };

  useEffect(() => {
    AsyncStorage.getItem("TOKEN").then((token) => {
      if (token) {
        console.log(token);
        logarComToken(token);
      } else {
        setLoadingToken(false);
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      {isLoadingToken && <Text>Aguarde....</Text>}

      {!isLoadingToken && (
        <>
          <StatusBar barStyle="default" />

          <Image
            style={styles.loginImage}
            source={require("../image/logo-sensorflow.jpeg")}
          />

          <Text style={styles.loginTitle}>Entre no Sensor Flow</Text>

          <Input
            placeholder="E-mail"
            leftIcon={{ type: "font-awesome", name: "envelope" }}
            onChangeText={(value) => setEmail(value)}
            autoCapitalize="none"
            keyboardType="email-address"
            inputStyle={{ color: "#fff" }}
          />

          <Input
            placeholder="Senha"
            leftIcon={{ type: "font-awesome", name: "lock" }}
            onChangeText={(value) => setPassword(value)}
            autoCapitalize="none"
            secureTextEntry={true}
            inputStyle={{ color: "#fff" }}
          />

          {isLoading && <ActivityIndicator />}

          {!isLoading && (
            <Button
              icon={<Icon name="check" size={15} color="white" />}
              title=" Entrar      "
              buttonStyle={styles.button}
              onPress={() => entrar()}
            />
          )}

          <Button
            icon={<Icon name="edit" size={15} color="white" />}
            title=" Cadastrar"
            buttonStyle={styles.button}
            onPress={() => cadastrar()}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000947",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginTop: 10,
    paddingHorizontal: 100,
    paddingVertical: 10,
  },
  loginTitle: {
    color: "#fff",
    fontSize: 21,
    padding: 10,
  },
  loginImage: {
    height: 190,
    width: 220,
    margin: 20,
  },
});
