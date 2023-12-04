import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Button } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

export default function Perfil({ navigation }) {
  const logout = (navigation) => {
    AsyncStorage.setItem("TOKEN", "")
      .then(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: "Login" }],
        });
      })
      .catch((error) => {
        console.log(error);
        Alert.alert("Erro ao sair");
      });
  };

  return (
    <View style={styles.container}>
      <Button
        icon={<Icon name="user" size={15} color="white" />}
        title=" Conta"
        buttonStyle={styles.button}
        //onPress={}
      />

      <Button
        icon={<Icon name="pencil" size={15} color="white" />}
        title=" Editar Perfil"
        buttonStyle={styles.button}
        //onPress={}
      />

      <Button
        icon={<Icon name="gear" size={15} color="white" />}
        title=" Configurações"
        buttonStyle={styles.button}
        //onPress={}
      />

      <Button
        icon={<Icon name="file" size={15} color="white" />}
        title=" Termos e Serviços"
        buttonStyle={styles.button}
        //onPress={}
      />

      <Button
        icon={<Icon name="info-circle" size={15} color="white" />}
        title=" Sobre"
        buttonStyle={styles.button}
        //onPress={}
      />

      <Button
        icon={<Icon name="shield" size={15} color="white" />}
        title=" Política de Privacidade"
        buttonStyle={styles.button}
        //onPress={}
      />


      <Button
        icon={<Icon name="sign-out" size={15} color="white" />}
        title=" Sair"
        buttonStyle={styles.button}
        onPress={() => logout(navigation)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginTop: 10,
    paddingHorizontal: 20, // Ajuste o tamanho conforme necessário
    paddingVertical: 10,
    width: 300, // Defina o tamanho desejado
    backgroundColor:"#f02637",  //"#02307c"
    borderRadius: 5,
  },
});

