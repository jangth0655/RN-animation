import {Animated, PanResponder, Platform, StyleSheet, View} from 'react-native';
import styled from 'styled-components/native';
import PizzaIcon from 'react-native-vector-icons/Ionicons';
import {useRef} from 'react';

function App() {
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, {dx, dy}) => {
        position.setValue(dx);
      },
      onPanResponderGrant: () => onPressIn(),
      onPanResponderRelease: () => {
        Animated.parallel([
          onPressOut,
          Animated.spring(position, {toValue: 0, useNativeDriver: true}),
        ]).start();
      },
    }),
  ).current;

  const scale = useRef(new Animated.Value(1)).current;
  const position = useRef(new Animated.Value(0)).current;

  const onPressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = Animated.spring(scale, {
    toValue: 1,
    useNativeDriver: true,
  });

  return (
    <Container>
      <Card
        {...panResponder.panHandlers}
        style={[
          styles.animateCard,
          {transform: [{scale}, {translateX: position}]},
        ]}>
        <PizzaIcon name="pizza" color="#192a56" size={98} />
      </Card>
    </Container>
  );
}

export default App;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #00a8ff;
`;

const Card = styled(Animated.createAnimatedComponent(View))`
  width: 300px;
  height: 300px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  background-color: #fff;
`;

const styles = StyleSheet.create({
  animateCard: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
