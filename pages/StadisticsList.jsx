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
import { AntDesign } from "@expo/vector-icons"; // You can import icons from your preferred icon library

// for file
import * as XLSX from "xlsx";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

const StadisticsList = (cosas) => {
  const [stadistics, setStadistics] = useState([]);
  const id = cosas.route.params.id;
  useEffect(() => {
    GetData("Stadistics", id, false).then((data) => {
      if (!Array.isArray(data)) {
        return;
      }
      
      const sortedArray = data.sort((a, b) => {
        // Convert the date strings to Date objects for comparison
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);

        // Compare the dates (latest to oldest)
        return dateB - dateA;
      });

      setStadistics(sortedArray);
      // console.log(data);
    });
  }, []);

  console.log("stats", stadistics);

  const generateExcel = async () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(
      stadistics.map((stat) => {
        delete stat._id;

        return { ...stat };
      })
    );

    XLSX.utils.book_append_sheet(wb, ws, "Stadistics");
    const wbout = XLSX.write(wb, { type: "base64", bookType: "xlsx" });

    const uri = `content://com.android.externalstorage.documents/tree/home%3A`;
    const fileName =
      "Stadisticas_" + stadistics[stadistics.length - 1].date.replace(":", "_");

    await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync(
      uri
    )
      .then(async (permission) => {
        await FileSystem.StorageAccessFramework.createFileAsync(
          permission.directoryUri,
          fileName,
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        )
          .then(async (filedir) => {
            await FileSystem.StorageAccessFramework.writeAsStringAsync(
              filedir,
              wbout,
              {
                encoding: FileSystem.EncodingType.Base64,
              }
            )
              .then(() => {
                console.log("Archivo creado", filedir);
              })
              .catch((e) => {
                console.log("Error en escribir", e);
              });
          })
          .catch((e) => {
            console.log("Error en Crear archivo", e);
          });
      })
      .catch((e) => {
        console.log("Error permisos", e);
      });

    await Sharing.shareAsync(uri)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const ViewItem = ({ item }) => {
    const formatDate = (date) => {
      return new Date(date).toLocaleDateString("es-ES", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    };

    const iconRender = (type) => {
      if (type == 1) {
        return (
          <AntDesign
            name="checkcircleo"
            size={30}
            style={{ marginRight: 20, marginLeft: 10 }}
          />
        );
      } else {
        return (
          <AntDesign
            name="eyeo"
            size={30}
            style={{ marginRight: 20, marginLeft: 10 }}
          />
        );
      }
    };

    return (
      <View style={styles.card}>
        <TouchableOpacity style={styles.containerRow} onPress={() => {}}>
          {iconRender(item.type)}
          <View>
            <Text>
              {formatDate(item.date)} {"->"}{" "}
              {item.type ? "Boton" : "Acercamiento"}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const List = () => {
    return (
      <FlatList
        data={stadistics.map((dat) => {
          return { ...dat, key: dat._id };
        })}
        itemSeparatorComponent={() => <Text> </Text>}
        renderItem={({ item }) => <ViewItem key={item.date} item={item} />}
      />
    );
  };

  return (
    <View style={styles.container}>
      <List />
      <Button title="Exportar CSV" onPress={generateExcel} />
    </View>
  );
};

export default StadisticsList;

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
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
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
