import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

class UsuarioService {
  async cadastrar(data) {
    //console.log(data); //teste
    return axios({
      url: "http://192.168.2.115:3000/usuario/cadastrar",
      method: "POST",
      timeout: 5000,
      data: data,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        return Promise.resolve(response);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }

  async login(data) {
    //console.log(data); //teste
    return axios({
      url: "http://192.168.2.115:3000/usuario/login",
      method: "POST",
      timeout: 5000,
      data: data,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        AsyncStorage.setItem("TOKEN", response.data.access_token);
        return Promise.resolve(response);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }

  async loginComToken(data) {
    console.log(data); //teste
    return axios({
      url: "http://192.168.2.115:3000/usuario/login-token",
      method: "POST",
      timeout: 5000,
      data: data,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.data.access_token) {
          AsyncStorage.setItem("TOKEN", response.data.access_token);
          return Promise.resolve(response);
        } else {
          return Promise.reject(response);
        }
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }
}

const usuarioService = new UsuarioService();
export default usuarioService;
