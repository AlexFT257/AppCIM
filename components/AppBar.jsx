import React from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { Link } from "react-router-native";
// import { useLocation } from "react-router-native";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignSelf: "center",
    padding: 5,
  },
  separator: {
    height: 10,
  },
  item: {
    padding: 10,
  },
  itemActive: {
    padding: 10,
  },
  title: {
    width: "100%",
    textAlign: "center",
    marginVertical: 5,
    fontSize: 22,
    fontWeight: "bold",
  },
});

const AppBarTab = ({ children, to }) => {
//   const { pathname } = useLocation();
  const active = false;
  return (
    <Link to={to}>
      <Text style={active ? styles.itemActive : styles.item}>{children}</Text>
    </Link>
  );
};

const AppBar = () => {
//   const { pathname } = useLocation();
  return (
    <View style={styles.container}>
        <AppBarTab to="/">
            <Text style={styles.title}>Home Screen</Text>
        </AppBarTab>
    </View>
  );
};

export default AppBar;
