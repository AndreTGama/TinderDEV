import React, {useState, useEffect}from 'react';
import {View,Text, SafeAreaView, Image,StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';

import api from '../services/api';

import Logo from '../assets/logo.png';
import dislike from '../assets/dislike.png';
import like from '../assets/like.png';

export default function Main({navigation}){
    const id = navigation.getParam('user')
    const[user, setUsers] = useState([]);
    
    useEffect(() => {
        async function loadUsers() {
            const response = await api.get('/devs',{
                headers:{
                    user: id,
                }
            })
            setUsers(response.data)
        }

        loadUsers();
    }, [id]);

    async function handlerLike(){
        const [user, ...rest] = users;
        await api.post(`/devs/${user._id}/likes`, null,{
            headers: {user : id},
        })
        setUsers(rest);
    }
    async function handlerDislike(id){
        const [user, ...rest] = users;
        await api.post(`/devs/${user._id}/dislikes`, null, {
            headers: {user: id},
        })
        setUsers(rest);
    }
    async function handleLogount(){
        await AsyncStorage.clear();

        navigation.navigate('Login');
    }

    return(
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={handleLogount}>
                <Image style={styles.logo} source={Logo}/>
            </TouchableOpacity>
            <View style={styles.cardsContainer}>
                {user.length === 0
                    ?<Text style={styles.empty}>Acabou :( </Text>
                    :(user.map((user, index) => (
                        <View Key={user._id} style={[styles.card, {zIndex: users.length - index}] }>
                            <Image style={styles.avatar} source={{uri: user.Avatar }}/>
                            <View style={styles.footer}>
                                <Text style={styles.name}>{user.name}</Text>
                                <Text style={styles.bio} numberOfLines={3}>{user.bio}</Text>
                            </View>
                        </View>
                    ))
                )}
            </View>
            {user.length > 0 && (
                <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.buttom} onPress={handlerLike}>
                    <Image  source={like}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttom} onPress={handlerDislike}>
                    <Image style={styles.dislike} source={dislike}/>
                </TouchableOpacity>
            </View>
            )}
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
    empty:{
        alignSelf: 'center',
        color: '#999',
        fontSize:24,
        fontWeight: 'bold' 
    },
})