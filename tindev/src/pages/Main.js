import React, {useState, useEffect}from 'react';
import {View,Text, SafeAreaView, Image,StyleSheet} from 'react-native';

import axios from '../services/api';
import Logo from '../assets/logo.png';
import dislike from '../assets/dislike.png';
import like from '../assets/like.png';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Main(){
    return(
        <SafeAreaView style={styles.container}>
            <Image style={styles.logo} source={Logo}/>
            <View style={styles.cardsContainer}>
                <View style={[styles.card, {zIndex: 3}] }>
                    <Image style={styles.avatar} source={{uri:'https://avatars3.githubusercontent.com/u/43018148?v=4'}}/>
                    <View style={styles.footer}>
                        <Text style={styles.name}>Andre</Text>
                        <Text style={styles.bio} numberOfLines={3}>Gamer</Text>
                    </View>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.buttom}>
                    <Image  source={like}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttom}>
                    <Image style={styles.dislike} source={dislike}/>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:'#f5f5f5',
        alignItems:'center',
        justifyContent:'space-between',
    },
    logo:{
        marginTop:30,
    },
    cardsContainer:{
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        maxHeight: 500,
    },
    card:{
        borderWidth:1,
        borderColor: '#DDD',
        borderRadius: 8,
        margin: 30,
        overflow: 'hidden',
        position:'absolute',
        top: 0,
        left:0,
        bottom:0,
        right:0,
    },
    avatar:{
        flex:1,
        height:300,
    },
    footer:{
        backgroundColor: '#fff',
        paddingHorizontal:20,
        paddingVertical: 15,
    },
    name:{
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    bio:{
        fontSize:14,
        color:'#999',
        marginTop:5,
        lineHeight:18,
    },
    buttonContainer:{
        flexDirection: 'row',
        marginBottom: 30,
    },
    buttom:{
        width:50,
        height:50,
        borderRadius:25,
        backgroundColor:'#FFF',
        justifyContent:'center',
        alignItems:'center',
        marginHorizontal:20,
        elevation:2,
        shadowColor: '#000',
        shadowOpacity:0.05,
        shadowRadius:2,
        shadowOffset: {
            width:0,
            height:2,
        },
    },
})