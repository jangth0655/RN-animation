import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import BaseAnimation from './screens/baseAnimation';
import DragAnimation from './screens/dragAnimation';

type TabParamList = {
  base: undefined;
  drag: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarIcon: () => null,
          tabBarLabelStyle: {marginBottom: 13, fontSize: 20},
        }}>
        <Tab.Screen name="base" component={BaseAnimation} options={{}} />
        <Tab.Screen name="drag" component={DragAnimation} options={{}} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
