import React, { useState } from 'react';
import { Appbar, Menu } from 'react-native-paper';

const date = new Date().getDate(); //To get the Current Date
// const month = new Date().getMonth() + 1; //To get the Current Month
// const year = new Date().getFullYear(); //To get the Current Year

function CustomNavigationBar({ navigation, previous }) {
    const [visible, setVisible] = React.useState(false);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false)
    return (
        <Appbar.Header>
            {previous ? <Appbar.BackAction onPress={() => navigation.goBack()} /> : null}
            <Appbar.Content title={navigation.getParam('title', `Todos  ${date}`)} />
            {/* {!previous ? ( */}
                <Menu
                    visible={visible}
                    onDismiss={closeMenu}
                    anchor={
                        <Appbar.Action icon="menu" color="white" onPress={openMenu} />
                    }>
                    <Menu.Item onPress={() => {
                        navigation.navigate('Main', {title: `Todos  ${date}`})
                        closeMenu()
                    }} title="Todos" />
                    <Menu.Item onPress={() => {
                        navigation.navigate('Notes', {title: "Notes"})
                        closeMenu()
                    }} title="Notes" />
                    <Menu.Item onPress={() => {
                        navigation.navigate('Books', {title: "Books"})
                        closeMenu()
                    }} title="Books" />

                    <Menu.Item onPress={() => { console.log('Option 3 was pressed') }} title="Option 3" disabled />
                </Menu>
            {/* ) : null} */}
        </Appbar.Header>
    );
}


export default CustomNavigationBar;