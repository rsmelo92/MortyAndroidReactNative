/**
 * @flow
 */

import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  Button,
  ActivityIndicator
} from "react-native";
import { RNChipView } from "react-native-chip-view";
import { Card } from "react-native-material-cards";
import ActionBar from "react-native-action-bar";

export default class Example extends Component {
  state = {
    isLoading: true,
    char: {}
  };

  getChar = () => {
    const char = Math.floor(Math.random() * 493) + 1;
    fetch(`https://rickandmortyapi.com/api/character/${char}`)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          isLoading: false,
          char: responseJson
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  async componentDidMount() {
    await this.getChar();
  }
  render() {
    const { isLoading, char } = this.state;
    const { name, status, species, origin, image } = char;
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#4f3887" barStyle="light-content" />
        <ActionBar
          containerStyle={styles.bar}
          title={"Ricky and Morty Characters"}
          titleStyle={styles.barText}
          disableStatusBarHandling
          backgroundColor={"#654bb6"}
        />
        {isLoading ? (
          <View style={styles.activityIndicator}>
            <ActivityIndicator size="large" color="#654bb6" />
          </View>
        ) : (
          <Card style={styles.card}>
            <Text style={styles.titleName}>{name}</Text>
            <Image
              style={styles.image}
              source={{
                uri: image
              }}
            />
            <View style={styles.content}>
              <RNChipView
                avatar={false}
                title={`Status: ${status}`}
                titleStyle={styles.chip}
                backgroundColor="#bdc4e8"
              />
              <RNChipView
                avatar={false}
                title={`Species: ${species}`}
                titleStyle={styles.chip}
                backgroundColor="#bdc4e8"
              />
              <RNChipView
                avatar={false}
                title={`Origin: ${origin.name}`}
                titleStyle={styles.chip}
                backgroundColor="#bdc4e8"
              />
              <View style={styles.button}>
                <Button
                  title="I don't like this one"
                  onPress={() => this.getChar()}
                  color="#654bb6"
                />
              </View>
            </View>
          </Card>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bar: {
    height: 60
  },
  barText: {
    fontSize: 18
  },
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  activityIndicator: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },
  card: {
    margin: 16,
    alignItems: "center"
  },
  image: {
    width: 220,
    height: 220,
    borderRadius: 110,
    marginBottom: 20
  },
  button: {
    backgroundColor: "#654bb6"
  },
  content: {
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "nowrap",
    flex: 1
  },
  titleName: {
    fontSize: 20,
    alignSelf: "center",
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10
  },
  chip: {
    color: "#000",
    fontSize: 14,
    fontWeight: "normal",
    textAlign: "center"
  }
});
