import {Animated, PanResponder, StyleSheet, View} from 'react-native';
import styled from 'styled-components/native';
import FoodIcon from 'react-native-vector-icons/Ionicons';
import ButtonIcon from 'react-native-vector-icons/Ionicons';
import {useRef, useState} from 'react';
import {icons} from '../icons';

export default function BaseAnimation() {
  const scale = useRef(new Animated.Value(1)).current;
  const position = useRef(new Animated.Value(0)).current;
  const rotation = position.interpolate({
    inputRange: [-250, 250],
    outputRange: ['-15deg', '15deg'],
    extrapolate: 'clamp',
  });

  const secondScale = position.interpolate({
    inputRange: [-280, 0, 280],
    outputRange: [1, 0.7, 1],
    extrapolate: 'clamp',
  });

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, {dx}) => {
        position.setValue(dx);
      },
      onPanResponderGrant: () => onPressIn(),
      onPanResponderRelease: (_, {dx}) => {
        if (dx < -250) {
          goLeft.start();
        } else if (dx > 250) {
          goRight.start();
        } else {
          Animated.parallel([onPressOut, goCenter]).start();
        }
      },
    }),
  ).current;

  const goLeft = Animated.spring(position, {
    toValue: -500,
    tension: 5,
    useNativeDriver: true,
  });

  const goRight = Animated.spring(position, {
    toValue: 500,
    tension: 5,
    useNativeDriver: true,
  });

  const goCenter = Animated.spring(position, {
    toValue: 0,
    useNativeDriver: true,
  });

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

  const closePress = () => {
    goLeft.start(onDismiss);
  };

  const checkPress = () => {
    goRight.start(onDismiss);
  };

  const [index, setIndex] = useState(0);

  const onDismiss = () => {
    scale.setValue(1);
    position.setValue(0);
    setIndex(prev => prev + 1);
  };

  return (
    <Container>
      <CardContainer>
        <Card style={[styles.animateCard, {transform: [{scale: secondScale}]}]}>
          <FoodIcon name={icons[index + 1]} color="#192a56" size={98} />
        </Card>
        <Card
          {...panResponder.panHandlers}
          style={[
            styles.animateCard,
            {transform: [{scale}, {translateX: position}, {rotateZ: rotation}]},
          ]}>
          <FoodIcon name={icons[index]} color="#192a56" size={98} />
        </Card>
      </CardContainer>
      <ButtonContainer>
        <Button onPress={closePress}>
          <ButtonIcon name="close-circle" color={'#fff'} size={46} />
        </Button>
        <Button onPress={checkPress}>
          <ButtonIcon name="checkmark-circle" color={'#fff'} size={46} />
        </Button>
      </ButtonContainer>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #00a8ff;
`;

const CardContainer = styled.View`
  flex: 3;
  justify-content: center;
  align-items: center;
`;

const Card = styled(Animated.createAnimatedComponent(View))`
  width: 150px;
  height: 150px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  background-color: #fff;
  margin-bottom: 20px;
  position: absolute;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  flex: 1;
`;

const Button = styled.Pressable`
  margin: 0px 10px;
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
