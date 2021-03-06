import React from 'react'
import {StyleSheet, View, Text, TextInput} from 'react-native'

export default class InputTextField extends React.Component{

    render(){
        return(
           <View style={this.props.style}>
               <Text style={styles.inputTitle}>
                   {this.props.title}
               </Text>
               <TextInput placeholder={this.props.placeholderText} ref={this.props.clear_input}  onChangeText={this.props.valueText}secureTextEntry={this.props.isSecure} style={StyleSheet.input}>
               </TextInput>
                <View style={{borderBottomWidth: 1, borderBottomColor:"#D8D8D8"}}></View>

           </View>
        )

    }
}   


const styles= StyleSheet.create({
    inputTitle :{
        color:"#ABB4BD",
        fontSize: 14
    },
    input :{
        paddingVertical :12,
        color: "#1D2029",
        fontSize: 14
    }
})









// import React from "react";
// import { StyleSheet, View, Text, TextInput } from "react-native";

// export default class InputTextField extends React.Component {
//     render() {
//         return (
//             <View style={this.props.style}>
//                 <Text style={styles.inputTitle}>{this.props.title}</Text>
//                 <TextInput
//                     placeholder={this.props.placeholderText}
//                     secureTextEntry={this.props.isSecure}
//                     style={styles.input}
//                 />
//                 <View style={{ borderBottomColor: "#D8D8D8", borderBottomWidth: 1 }} />
//             </View>
//         );
//     }
// }

// const styles = StyleSheet.create({
//     inputTitle: {
//         color: "#ABB4BD",
//         fontSize: 14
//     },
//     input: {
//         paddingVertical: 12,
//         color: "#1D2029",
//         fontSize: 14,
//         fontFamily: "Avenir Next"
//     }
// });