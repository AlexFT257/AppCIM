import React, { useState } from "react";
import { Modal, StyleSheet, Text, Pressable, View } from "react-native";

const Modale = ({ modalVisible, setModalVisible, onOk, tittle }) => {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(-1);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.title}>{tittle}</Text>

            <View style={{ flexDirection: "row", gap: 12 }}>
              <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => setModalVisible(-1)}
              >
                <Text style={styles.textStyle}>Cancelar</Text>
              </Pressable>

              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => onOk()}
              >
                <Text style={styles.textStyle}>Aceptar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  title: {
    width: "100%",
    textAlign: "center",
    marginVertical: 5,
    fontSize: 18,
    marginBottom: 20,
    fontWeight: "bold",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 20,
    width: "50%",
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#FF0000",
  },
  buttonOpen: {
    backgroundColor: "#247ba0",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default Modale;
