import Home from './src/screens/Home';
import Description from './src/screens/Description';
import List from './src/screens/List';
import { createStackNavigator, createAppContainer } from 'react-navigation';

const App = createStackNavigator({
  Home: { screen: Home },
  List: { screen: List },
  Description: { screen: Description }
});

export default createAppContainer(App);
