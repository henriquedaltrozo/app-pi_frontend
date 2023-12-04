import * as React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { Feather } from "@expo/vector-icons";
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
    { key: "1", value: "Ijuí" }, //disabled:true
    { key: "2", value: "Santa Rosa", disabled: true },
    { key: "3", value: "Panambi", disabled: true },
  ];

  //infos
  const [wind, setWind] = useState("65");
  const [humidity, setHumidity] = useState("90");
  const [tempMin, setTempMin] = useState("23");
  const [tempMax, setTempMax] = useState("30");

  //graficos
  const [dataSets, setDataSets] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://192.168.2.115:3001/getData");
      const data = await response.json();

      // Transform the data to the desired format
      const formattedData = {
        dataSets: [
          {
            data: data.map((item) => item.emw_temperature),
            labels: data.map((item, index) => (index + 1).toString()),
          },
          // You can add more datasets as needed
        ],
      };

      setDataSets(formattedData.dataSets);
      console.log(dataSets);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  //menu
  const [content1Visible, setContent1Visible] = useState(false);
  const [content2Visible, setContent2Visible] = useState(false);
  const [content3Visible, setContent3Visible] = useState(false);
  const [content4Visible, setContent4Visible] = useState(false);
  const [content5Visible, setContent5Visible] = useState(false);

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
      default:
        break;
    }
  };

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Text style={styles.titulo}> Bem Vindo ao Sensor Flow! </Text>

          <SelectList
            setSelected={(val) => setSelected(val)}
            data={data}
            save="value"
            //onSelect={() => alert(selected)}
            //search={false}
            boxStyles={{ borderRadius: 6, backgroundColor: "#fff", margin: 28 }}
            inputStyles={{ borderRadius: 6, color: "#000" }}
            dropdownStyles={{
              borderRadius: 6,
              backgroundColor: "#fff",
              margin: 10,
            }}
            dropdownItemStyles={{}}
            dropdownTextStyles={{ borderRadius: 6, color: "#000" }}
            disabledItemStyles={{ backgroundColor: "#fff" }}
            disabledTextStyles={{ color: "#999" }}
            //defaultOption={{ key: "1", value: "Ijuí" }}
            defaultOption={{ key: "0", value: "Selecione uma opção" }}
            searchPlaceholder="Procure uma cidade"
          />

          <View style={styles.info}>
            <Text style={styles.infoText}>Informações adicionais:</Text>
            <View style={styles.addtionalInfo}>
              <View style={styles.addtionalInfo}>
                <InfoCard title={"Vento"} variable={wind + " km/h"}></InfoCard>
                <InfoCard
                  title={"Umidade"}
                  variable={humidity + " %"}
                ></InfoCard>
                <InfoCard
                  title={"Temp. Min"}
                  variable={tempMin + " °C"}
                ></InfoCard>
                <InfoCard
                  title={"Temp. Max"}
                  variable={tempMax + " °C"}
                ></InfoCard>
              </View>
            </View>
          </View>

          <View style={styles.container}>
            <TouchableOpacity onPress={() => toggleContentVisibility(1)}>
              <Text style={styles.button}>Temperatura</Text>
            </TouchableOpacity>
            {content1Visible && (
              <View style={{ flex: 1 }}>
                <Text style={styles.textoConteudo}>Conteúdo do Botão 1</Text>
                <MultiLineChart chartDataList={dataSets} />
              </View>
            )}

            <TouchableOpacity onPress={() => toggleContentVisibility(2)}>
              <Text style={styles.button}>Umidade</Text>
            </TouchableOpacity>
            {content2Visible && (
              <Text style={styles.textoConteudo}>Conteúdo do Botão 2</Text>
            )}

            <TouchableOpacity onPress={() => toggleContentVisibility(3)}>
              <Text style={styles.button}>Pressão</Text>
            </TouchableOpacity>
            {content3Visible && (
              <Text style={styles.textoConteudo}>Conteúdo do Botão 3</Text>
            )}

            <TouchableOpacity onPress={() => toggleContentVisibility(4)}>
              <Text style={styles.button}>Radiação Solar</Text>
            </TouchableOpacity>
            {content4Visible && (
              <Text style={styles.textoConteudo}>Conteúdo do Botão 4</Text>
            )}

            <TouchableOpacity onPress={() => toggleContentVisibility(5)}>
              <Text style={styles.button}>Velocidade do Vento</Text>
            </TouchableOpacity>
            {content5Visible && (
              <Text style={styles.textoConteudo}>Conteúdo do Botão 5</Text>
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
    height: 240,
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
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 30,
    marginRight: 30,
  },
  textoConteudo: {
    color: "white",
  },
});

//<View style={styles.addtionalInfo}>
//<InfoCard title={"Vento"} variable={wind}></InfoCard>
//<InfoCard title={"Umidade"} variable={humidity}></InfoCard>
//<InfoCard title={"Temp. Min"} variable={temperatureMin}></InfoCard>
//<InfoCard title={"Temp. Max"} variable={temperatureMax}></InfoCard>
//</View>

//<View style={{ flex: 1 }}>
//<MultiLineChart chartDataList={dataSets} />
//</View>

//<View
//style={{
//flex: 1,
//justifyContent: "center",
//alignItems: "center",
// marginTop: 5,
//}}
// >
//<Feather name="sun" size={24} color="white" />
//</View>
