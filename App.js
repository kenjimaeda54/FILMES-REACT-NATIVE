import React, { Component } from "react";
import { StyleSheet, View, FlatList, ActivityIndicator } from "react-native";

import Api from "./services/Api/index"; //por ser Api prefererncia colocar o caminho correto da pasta
import Filme from "./src/Filme/";
export default class Ap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filmes: [],
      loading: true,
    };
  }

  async componentDidMount() {
    const response = await Api.get("r-api/?api=filmes");
    this.setState({
      filmes: response.data, // por trabalhar com axios para facilitar manipular
      //api. precisa colocar o .data
      loading: false,
    });
  }

  render() {
    if (this.state.loading === true) {
      return (
        <View
          style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
        >
          <ActivityIndicator color="#09A6FF" size={40} />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <FlatList
            data={this.state.filmes}
            keyExtractor={(item) => item.id.toString()}//ele recebe uma key string não number,então converter
            renderItem={({ item }) => <Filme data={item} />}
          />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
