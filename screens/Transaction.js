import React, { Component } from "react";

import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  ImageBackground,
  Image
} from "react-native";
import * as Permissions from "expo-permissions";
import { BarCodeScanner } from "expo-barcode-scanner";

const bgImage = require("../assets/background2.png");

export default class TransactionScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookId: "",
      studentId: "",
      domState: "normal",
      hasCameraPermissions: null,
      scanned: false
    };
  }
  getCameraPermissions = async domState => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);

    this.setState({
      /*status === "granted" é verdadeiro quando o usuário concedeu permissão
          status === "granted" é false quando o usuário não concedeu permissão
        */
      hasCameraPermissions: status === "granted",
      domState: domState,
      scanned: false
    });
  };

  handleBarCodeScanned = async ({ type, data }) => {
    const { domState } = this.state;

    if (domState === "bookId") {
      this.setState({
        bookId: data,
        domState: "normal",
        scanned: true
      });
    } else if (domState === "studentId") {
      this.setState({
        studentId: data,
        domState: "normal",
        scanned: true
      });
    } 
  };
  render() {
     const { bookId, studentId, domState, scanned } = this.state;
    if (domState !== "normal") {
      return (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      );
    }
    
    return (
      <View style={styles.container}>
        <ImageBackground source={bgImage} style={styles.bgImage}>
          <View style={styles.lowerContainer}>
            <View style={styles.textinputContainer}>
              <TextInput
                style={styles.textinput}
                placeholder={"Id Livro"}
                placeholderTextColor={"#FFFFFF"}
                value={bookId}
              />
              <TouchableOpacity
                style={styles.scanbutton}
                onPress={() => this.getCameraPermissions("bookId")}
              >
                <Text style={styles.scanbuttonText}>Digitalizar</Text>
              </TouchableOpacity>
            </View>

          <View style={styles.lowerContainer}>
            <View style={styles.textinputContainer}>
              <TextInput
                style={styles.textinput}
                placeholder={"Id Aluno"}
                placeholderTextColor={"#FFFFFF"}
                value={studentId}
              />
              <TouchableOpacity
                style={styles.scanbutton}
                onPress={() => this.getCameraPermissions("studentId")}
              >
                <Text style={styles.scanbuttonText}>Digitalizar</Text>
              </TouchableOpacity>              
            </View>
          </View>
            
          </View>
</ImageBackground>
      </View>
    );
  }
}


  const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: "#FFFFFF"
 },
 lowerContainer: {
   flex: 0.5,
   alignItems: "center"
 },
 textinputContainer: {
   borderWidth: 2,
   borderRadius: 10,
   flexDirection: "row",
   backgroundColor: "#9DFD24",
   borderColor: "#FFFFFF"
 },
 textinput: {
   width: "57%",
   height: 50,
   padding: 10,
   borderColor: "#FFFFFF",
   borderRadius: 10,
   borderWidth: 3,
   fontSize: 18,
   backgroundColor: "#5653D4",
   color: "#FFFFFF"
 },
 scanbutton: {
   width: 100,
   height: 50,
   backgroundColor: "#9DFD24",
   borderTopRightRadius: 10,
   borderBottomRightRadius: 10,
   justifyContent: "center",
   alignItems: "center"
 },
 scanbuttonText: {
   fontSize: 20,
   color: "#0A0101",
 },
 bgImage: {
  flex:1,
  resizeMode: "cover",
  justifyContent: "center",
 }
  
});
