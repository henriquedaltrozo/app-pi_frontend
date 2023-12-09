import * as React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
//import graficos
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import MultiLineChart from "../components/MultiLineChart";
//import card
import InfoCard from "../components/InfoCard";

export default function Home() {
  //select list
  const [selected, setSelected] = React.useState("");
  const data = [
    { key: "1", value: "Santa Rosa" }, //disabled:true
    { key: "2", value: "Ijuí", disabled: true },
    //{ key: "3", value: "Panambi", disabled: true },
  ];

  //infos
  const [temp, setTemp] = useState([]);
  const [humidity, setHumidity] = useState([]);
  const [wind, setWind] = useState([]);
  const [solarRadiation, setSolarRadiation] = useState([]);

  //graficos 30min
  const [temperatureDataAtt, setTemperatureDataAtt] = useState([]);
  const [humidityDataAtt, setHumidityDataAtt] = useState([]);
  const [atmPresDataAtt, setAtmPresDataAtt] = useState([]);
  const [solarRadiationDataAtt, setSolarRadiationDataAtt] = useState([]);
  const [gustWindSpeedDataAtt, setGustWindSpeedDataAtt] = useState([]);
  const [uvDataAtt, setUvDataAtt] = useState([]);

  useEffect(() => {
    fetchTemperature();
    fetchHumidity();
    fetchWindSpeed();
    fetchSolarRadiation();
    fetchTemperatureDataAtt();
    fetchHumidityDataAtt();
    fetchAtmPresDataAtt();
    fetchSolarRadiationDataAtt();
    fetchGustWindSpeedDataAtt();
    fetchUvDataAtt();
  }, []);

  //dados cards
  const fetchTemperature = async () => {
    try {
      const response = await fetch("http://192.168.2.115:3001/getTemperature");
      const data = await response.json();

      // Transform the data to the desired format
      const formattedData = {
        temp: [
          {
            data: data.map((item) => item.emw_temperature),
            labels: data.map((item, index) => (index + 1).toString()),
          },
          // You can add more datasets as needed
        ],
      };
      setTemp(formattedData.temp);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const fetchHumidity = async () => {
    try {
      const response = await fetch("http://192.168.2.115:3001/getHumidity");
      const data = await response.json();

      const formattedData = {
        humidity: [
          {
            data: data.map((item) => item.emw_humidity),
            labels: data.map((item, index) => (index + 1).toString()),
          },
        ],
      };

      setHumidity(formattedData.humidity);
    } catch (error) {
      console.error("Error fetching humidity data", error);
    }
  };

  const fetchWindSpeed = async () => {
    try {
      const response = await fetch("http://192.168.2.115:3001/getWindSpeed");
      const data = await response.json();

      const formattedData = {
        wind: [
          {
            data: data.map((item) => item.emw_gust_wind_speed),
            labels: data.map((item, index) => (index + 1).toString()),
          },
        ],
      };

      setWind(formattedData.wind);
    } catch (error) {
      console.error("Error fetching gust wind speed", error);
    }
  };

  const fetchSolarRadiation = async () => {
    try {
      const response = await fetch(
        "http://192.168.2.115:3001/getSolarRadiation"
      );
      const data = await response.json();

      const formattedData = {
        solarRadiation: [
          {
            data: data.map((item) => item.emw_solar_radiation),
            labels: data.map((item, index) => (index + 1).toString()),
          },
        ],
      };

      setSolarRadiation(formattedData.solarRadiation);
    } catch (error) {
      console.error("Error fetching solar radiation data", error);
    }
  };

  //grafico att
  const fetchTemperatureDataAtt = async () => {
    try {
      const response = await fetch(
        "http://192.168.2.115:3001/getTemperatureDataAtt"
      );
      const data = await response.json();

      // Transform the data to the desired format
      const formattedData = {
        temperatureDataAtt: [
          {
            data: data.map((item) => item.emw_temperature),
            labels: data.map((item, index) => (index + 1).toString()),
          },
          // You can add more datasets as needed
        ],
      };

      setTemperatureDataAtt(formattedData.temperatureDataAtt);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const fetchHumidityDataAtt = async () => {
    try {
      const response = await fetch(
        "http://192.168.2.115:3001/getHumidityDataAtt"
      );
      const data = await response.json();

      const formattedData = {
        humidityDataAtt: [
          {
            data: data.map((item) => item.emw_humidity),
            labels: data.map((item, index) => (index + 1).toString()),
          },
        ],
      };

      setHumidityDataAtt(formattedData.humidityDataAtt);
    } catch (error) {
      console.error("Error fetching humidity data", error);
    }
  };

  const fetchAtmPresDataAtt = async () => {
    try {
      const response = await fetch(
        "http://192.168.2.115:3001/getAtmPresDataAtt"
      );
      const data = await response.json();

      const formattedData = {
        atmPresDataAtt: [
          {
            data: data.map((item) => item.emw_atm_pres),
            labels: data.map((item, index) => (index + 1).toString()),
          },
        ],
      };

      setAtmPresDataAtt(formattedData.atmPresDataAtt);
    } catch (error) {
      console.error("Error fetching atm pres data", error);
    }
  };

  const fetchSolarRadiationDataAtt = async () => {
    try {
      const response = await fetch(
        "http://192.168.2.115:3001/getSolarRadiationDataAtt"
      );
      const data = await response.json();

      const formattedData = {
        solarRadiationDataAtt: [
          {
            data: data.map((item) => item.emw_solar_radiation),
            labels: data.map((item, index) => (index + 1).toString()),
          },
        ],
      };

      setSolarRadiationDataAtt(formattedData.solarRadiationDataAtt);
    } catch (error) {
      console.error("Error fetching solar radiation data", error);
    }
  };

  const fetchGustWindSpeedDataAtt = async () => {
    try {
      const response = await fetch(
        "http://192.168.2.115:3001/getGustWindSpeedDataAtt"
      );
      const data = await response.json();

      const formattedData = {
        gustWindSpeedDataAtt: [
          {
            data: data.map((item) => item.emw_gust_wind_speed),
            labels: data.map((item, index) => (index + 1).toString()),
          },
        ],
      };

      setGustWindSpeedDataAtt(formattedData.gustWindSpeedDataAtt);
    } catch (error) {
      console.error("Error fetching gust wind speed", error);
    }
  };

  const fetchUvDataAtt = async () => {
    try {
      const response = await fetch("http://192.168.2.115:3001/getUvDataAtt");
      const data = await response.json();

      const formattedData = {
        uvDataAtt: [
          {
            data: data.map((item) => item.emw_uv),
            labels: data.map((item, index) => (index + 1).toString()),
          },
        ],
      };

      setUvDataAtt(formattedData.uvDataAtt);
    } catch (error) {
      console.error("Error fetching gust wind speed", error);
    }
  };

  //menu
  const [content1Visible, setContent1Visible] = useState(false);
  const [content2Visible, setContent2Visible] = useState(false);
  const [content3Visible, setContent3Visible] = useState(false);
  const [content4Visible, setContent4Visible] = useState(false);
  const [content5Visible, setContent5Visible] = useState(false);
  const [content6Visible, setContent6Visible] = useState(false);

  const toggleContentVisibility = (buttonNumber) => {
    switch (buttonNumber) {
      case 1:
        setContent1Visible(!content1Visible);
        break;
      case 2:
        setContent2Visible(!content2Visible);
        break;
      case 3:
        setContent3Visible(!content3Visible);
        break;
      case 4:
        setContent4Visible(!content4Visible);
        break;
      case 5:
        setContent5Visible(!content5Visible);
        break;
      case 6:
        setContent6Visible(!content6Visible);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#000947" }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Text style={styles.titulo}> Bem Vindo ao Sensor Flow! </Text>

          <SelectList
            setSelected={(val) => setSelected(val)}
            data={data}
            save="value"
            //onSelect={() => alert(selected)}
            //search={false}
            boxStyles={{
              borderRadius: 6,
              backgroundColor: "#fff",
              marginTop: 20,
              marginBottom: 25,
              marginLeft: 28,
              marginRight: 28,
            }}
            inputStyles={{ borderRadius: 6, color: "#000" }}
            dropdownStyles={{
              borderRadius: 6,
              backgroundColor: "#fff",
              marginTop: 0,
              marginBottom: 20,
              marginLeft: 28,
              marginRight: 28,
            }}
            dropdownItemStyles={{}}
            dropdownTextStyles={{ borderRadius: 6, color: "#000" }}
            disabledItemStyles={{ backgroundColor: "#fff" }}
            disabledTextStyles={{ color: "#999" }}
            defaultOption={{ key: "1", value: "Santa Rosa" }}
            //defaultOption={{ key: "0", value: "Selecione uma opção" }}
            searchPlaceholder="Procure uma cidade"
          />

          <View style={styles.info}>
            <View style={styles.addtionalInfo}>
              <InfoCard
                title={"Temperatura"}
                variable={
                  temp.length > 0 ? temp[0].data[0] + " °C" : "Carregando..."
                }
              ></InfoCard>
              <InfoCard
                title={"Umidade"}
                variable={
                  humidity.length > 0
                    ? humidity[0].data[0] + " %"
                    : "Carregando..."
                }
              ></InfoCard>
              <InfoCard
                title={"Vento"}
                variable={
                  wind.length > 0 ? wind[0].data[0] + " km/h" : "Carregando..."
                }
              ></InfoCard>
              <InfoCard
                title={"Radiação Solar"}
                variable={
                  solarRadiation.length > 0
                    ? solarRadiation[0].data[0] + " W/m²"
                    : "Carregando..."
                }
              ></InfoCard>
            </View>
          </View>

          <View style={styles.container}>
            <TouchableOpacity onPress={() => toggleContentVisibility(1)}>
              <Text style={styles.button}>Temperatura</Text>
            </TouchableOpacity>
            {content1Visible && (
              <View style={{ flex: 1 }}>
                <Text style={styles.textoConteudo}>Conteúdo do Botão 1</Text>
                <MultiLineChart chartDataList={temperatureDataAtt} />
              </View>
            )}

            <TouchableOpacity onPress={() => toggleContentVisibility(2)}>
              <Text style={styles.button}>Umidade</Text>
            </TouchableOpacity>
            {content2Visible && (
              <View style={{ flex: 1 }}>
                <Text style={styles.textoConteudo}>Conteúdo do Botão 2</Text>
                <MultiLineChart chartDataList={humidityDataAtt} />
              </View>
            )}

            <TouchableOpacity onPress={() => toggleContentVisibility(3)}>
              <Text style={styles.button}>Pressão</Text>
            </TouchableOpacity>
            {content3Visible && (
              <View style={{ flex: 1 }}>
                <Text style={styles.textoConteudo}>Conteúdo do Botão 3</Text>
                <MultiLineChart chartDataList={atmPresDataAtt} />
              </View>
            )}

            <TouchableOpacity onPress={() => toggleContentVisibility(4)}>
              <Text style={styles.button}>Radiação Solar</Text>
            </TouchableOpacity>
            {content4Visible && (
              <View style={{ flex: 1 }}>
                <Text style={styles.textoConteudo}>Conteúdo do Botão 4</Text>
                <MultiLineChart chartDataList={solarRadiationDataAtt} />
              </View>
            )}

            <TouchableOpacity onPress={() => toggleContentVisibility(5)}>
              <Text style={styles.button}>Velocidade do Vento</Text>
            </TouchableOpacity>
            {content5Visible && (
              <View style={{ flex: 1 }}>
                <Text style={styles.textoConteudo}>Conteúdo do Botão 5</Text>
                <MultiLineChart chartDataList={gustWindSpeedDataAtt} />
              </View>
            )}

            <TouchableOpacity onPress={() => toggleContentVisibility(6)}>
              <Text style={styles.button}>Radiação Ultravioleta</Text>
            </TouchableOpacity>
            {content6Visible && (
              <View style={{ flex: 1 }}>
                <Text style={styles.textoConteudo}>Conteúdo do Botão 6</Text>
                <MultiLineChart chartDataList={uvDataAtt} />
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  titulo: {
    fontSize: 20,
    marginTop: 30,
    marginBottom: 10,
    textAlign: "center",
    color: "#fff",
  },
  info: {
    alignItems: "center",
    borderRadius: 20,
    width: 350,
    height: 190,
    backgroundColor: "#393e54",
    marginTop: 5,
    marginBottom: 30,
    marginLeft: 30,
    marginRight: 30,
  },
  infoText: {
    color: "#fff",
    margin: 15,
    fontSize: 20,
    fontWeight: "bold",
  },
  addtionalInfo: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  button: {
    backgroundColor: "#393e54",
    color: "#fff",
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    fontSize: 16,
    textAlign: "center",
    marginLeft: 30,
    marginRight: 30,
  },
  textoConteudo: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    marginTop: 15,
  },
});
