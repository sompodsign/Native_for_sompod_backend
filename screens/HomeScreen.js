/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, Button } from 'react-native';
import Header from '../components/Header';
// import Card from '../components/Card'


const HomeScreen = ({navigation}) => {
    return (
        <View>
            <Text>HomeScreen</Text>
            <Button title='todoscreen' onPress={() => navigation.navigate('Todo')} />
            {/* <Card /> */}
        </View>
    );
};

export default HomeScreen;
