import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Button,
} from "react-native";
import { AntDesign } from "@expo/vector-icons"; // You can import icons from your preferred icon library
import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";
import GetData from "../utils/getData";
import Modal from "../components/Modal";
import { Linking } from "react-native";

// import AppBar from "../components/AppBar";
// import "../../global.css";

const openGoogleMaps = (latitude, longitude) => {
  const url = `https://www.google.com/maps?q=${latitude},${longitude}`;

  Linking.canOpenURL(url)
    .then((supported) => {
      if (!supported) {
        console.error("Can't handle url: " + url);
      } else {
        return Linking.openURL(url);
      }
    })
    .catch((err) => console.error("An error occurred", err));
};

const HomeScreen = ({ navigation }) => {
  const [devices, setDevices] = useState([]);

  const navigateToMap = () => {
    // Navigate to the map screen with latitude and longitude
    navigation.navigate("MapScreen", { latitude, longitude });
  };

  const fetchData = async () => {
    setDevices([]);
    let currentPos;
    let currentStatus;

    for (let id = 1; id < 13; id++) {
      await GetData("Position", id, true)
        .then((data) => {
          if (Array.isArray(data) && data[data.length - 1].latitude) {
            currentPos = {
              latitude: data[data.length - 1].latitude,
              longitude: data[data.length - 1].longitude,
              type: data[data.length - 1].type == 1 ? "En movimiento" : "OK",
            };
          }
          // console.log(data);
        })
        .catch((e) => {
          console.log(e);
        });

      await GetData("Status", id, true)
        .then((data) => {
          if (Array.isArray(data) && data[data.length - 1].info) {
            currentStatus = {
              info: data[data.length - 1].info,
              type: data[data.length - 1].type,
            };
          }

        })
        .catch((e) => {
          console.log(e);
        });

      if (!currentPos || !currentStatus) {
        continue;
      }
      setDevices((prev) => [
        ...prev,
        { id: id, location: currentPos, status: currentStatus },
      ]);
      // console.log(devices);
      // console.log(currentPos);
    }
  };

    useEffect(() => {
    setTimeout(()=> fetchData(), 1000) 
  }, []);

  return (
    <>
      <View style={styles.container}>
        {(devices.length > 0 && (
          <ArduinoList devices={devices} navigation={navigation} />
        )) || (
          <View style={{ flex: 1 }}>
            <Text style={styles.subtitle}> Actualizar para obtener datos </Text>
            <AntDesign
              name="reload1"
              size={40}
              style={{
                color: "#ccc",
                alignSelf: "center",
                marginTop: 20,
              }}
            />
          </View>
        )}
      </View>

      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 20, // Adjust the position as needed
          right: 20, // Adjust the position as needed
          backgroundColor: "#247ba0",
          padding: 10,
          borderRadius: 10,
          zIndex: 1, // Ensures the button is on top
        }}
        onPress={() => {
          fetchData();
        }}
      >
        <AntDesign
          name="reload1"
          size={30}
          style={{
            color: "white",
            alignSelf: "center",
          }}
        />
      </TouchableOpacity>
    </>
  );
};

const ArduinoList = ({ devices, navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  

  const renderItem = ({ item }) => {

    return(
    <>
      <View
        style={{
          backgroundColor: "#fff",
          borderRadius: 10,
          borderWidth: 1,
          borderColor: "#ccc",
          flex: 1,
          flexDirection: "row",
          marginTop: 10,
        }}
      >
        <TouchableOpacity
          style={{
            alignContent: "center",
            alignItems: "center",
            flex: 1,
            flexDirection: "row",
            width: 80,
            maxWidth: "30%",
            borderBottomLeftRadius: 10,
            borderTopLeftRadius: 10,
            backgroundColor:
              item.location.type == 1 || item.status.type == 1
                ? "red"
                : "#247ba0",
            padding: 10,
          }}
          onPress={() => navigation.navigate("StadisticsList", { id: item.id })}
        >
          <AntDesign
            name="calculator"
            size={30}
            style={{
              color: "white",
              alignSelf: "center",
              marginRight: 5,
            }}
          />
          <Text
            style={{
              color: "white",
              fontSize: 20,
              textAlignVertical: "center",
              textAlign: "center",
            }}
          >
            ID: {item.id}
          </Text>
        </TouchableOpacity>

        <View
          style={{
            flex: 1,
            flexDirection: "column",
            alignItems: "flex-start",
            width: "95%",
            padding: 10,
          }}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              flexDirection: "row",
              marginVertical: "auto",
              marginHorizontal: 10,
              alignContent: "center",
            }}
            onPress={() =>
              navigation.navigate("StatusPage", { id: item.id })
            }
          >
            <AntDesign
              name="exclamationcircleo"
              size={30}
              style={{
                color: item.status.type == 1 ? "red" : "green",
                alignSelf: "center",
              }}
            />

            <View
              style={{
                flex: 1,
                flexDirection: "column",
                alignItems: "flex-start",
                marginLeft: 10,
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  textAlign: "left",
                  alignSelf: "flex-start",
                }}
              >
                Estado
              </Text>
              <Text style={{ textAlign: "left", alignSelf: "flex-start" }}>
                {item.status.info}
              </Text>
            </View>
          </TouchableOpacity>

          <View
            style={{
              backgroundColor: "#ccc",
              marginHorizontal: 10, // Adjust the margin as needed
              width: "90%",
              height: 1,
              marginVertical: 5,
            }}
          ></View>

          <TouchableOpacity
            style={{
              flex: 1,
              flexDirection: "row",
              marginVertical: "auto",
              marginHorizontal: 10,
              alignItems: "flex-start",
            }}
            onPress={() => setModalVisible(item.id)}
          >
            <AntDesign
              name="enviroment"
              size={30}
              style={{
                color: item.location.type == 1 ? "red" : "green",
                alignSelf: "center",
              }}
            />

            <View
              style={{
                flex: 1,
                flexDirection: "column",
                alignItems: "flex-start",
                marginLeft: 10,
              }}
            >
              <Text style={{ fontWeight: "bold", textAlign: "left" }}>
                Ubicacion
              </Text>
              <Text style={{ textAlign: "left" }}>
                [{item.location.latitude}, {item.location.longitude}]
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {modalVisible == item.id && (
        <Modal
          style={{ width: 0 }}
          modalVisible={modalVisible == item.id }
          setModalVisible={setModalVisible}
          tittle={"¿Abrir en el mapa?"}
          onOk={() =>
            openGoogleMaps(item.location.latitude, item.location.longitude)
          }
        />
      )}
    </>
  )
  };

  return (
    <FlatList
      data={devices}
      renderItem={renderItem}
      keyExtractor={(item) => item?.id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    width: "100%",
    textAlign: "center",
    marginVertical: 5,
    fontSize: 22,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 24,
    textAlign: "center",
    color: "#ccc",
    marginHorizontal: 10,
    marginTop: 30,
  },
  h1: {
    fontSize: 48,
    fontWeight: "bold",
  },
  h2: {
    fontSize: 36,
    fontWeight: "bold",
  },
  h3: {
    fontSize: 24,
    fontWeight: "bold",
    alignSelf: "center",
    width: "100%",
  },
  h4: {
    fontSize: 18,
    fontWeight: "bold",
  },
  h5: {
    fontSize: 14,
    fontWeight: "bold",
  },
  bold: {
    fontWeight: "bold",
  },
  card: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25, // 0-1
    shadowRadius: 4, // iOS
    elevation: 5, // Android
  },
});

export default HomeScreen;
