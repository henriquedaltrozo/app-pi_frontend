import React from "react";
import { StyleSheet, Text, View } from 'react-native'


const InfoCard = (props) => {
    return(
        <View style={styles.card}>
            <Text style={styles.text}>{props.title}</Text>
            <Text style={[styles.text, {color: '#adadad'}]}>{props.variable}</Text>
        </View>
    )
}
const styles = StyleSheet.create({   
    card:{
        alignItems: 'center',
        margin: 10,
        minWidth: 150,
      },
    text:{
        color: '#fff',
        margin: 5,
        marginLeft: 15,
        fontSize: 18,
      },
  });

export default InfoCard;