import GetData from "../utils/getData";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Button,
} from "react-native";

const StatusPage = (props) => {
  const [status, setStatus] = useState("");
  const id = props.route.params.id;

  const fetchStatus = async () => {
    await GetData("Status", id, true).then((data) => {
      if (!Array.isArray(data)) {
        return;
      }
      setStatus(data[0]);
      console.log("Status", status);
    });
  };

  useEffect(() => {
    console.log("id", id);
    fetchStatus();
  }, []);
  // 0 bueno 1 malo
  const type = status.type === 0 ? "Bien" : "Mal";

  return (
    <View>
      <View style={styles.card}>
        <Text style={styles.h1}>Fecha: <Text style={styles.h2}> {status.date} </Text> </Text>
        <Text style={styles.h1}>Estado: <Text style={styles.h2}>{status.info} </Text> </Text>
        <Text style={styles.h1}>Tipo: <Text style={styles.h2}>{type}</Text></Text>
      </View>
    </View>
  );
};

export default StatusPage;

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
    textAlign: "left",
    fontSize: 20,
    color: "#49545e",
    fontWeight: "bold"
  },
  h2: {
    fontSize: 14,
    fontWeight: "normal",
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
    flexDirection: "column",
    alignItems: "flex-start",
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
