import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import CustomNavigationBar from './components/CustomNavigationBar'
import BooksScreen from './screens/BooksScreen';
// import HomeScreen from './screens/HomeScreen'
import NotesScreen from './screens/NotesScreen';
import TodoScreen from './screens/TodoScreen';



const navigator = createStackNavigator(
  {
    Main: TodoScreen,
    Notes: NotesScreen,
    Books: BooksScreen,
  },
  {
    initialRouteName: 'Main',
    defaultNavigationOptions: {
      header: (props) => <CustomNavigationBar {...props} />,
  
    },
  }
);

export default createAppContainer(navigator);