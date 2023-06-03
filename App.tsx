import {useState} from 'react';
import styled from 'styled-components/native';

function App() {
  const [y, setY] = useState(0);

  const moveUp = () => {
    setInterval(() => setY(prev => prev + 1), 500);
  };

  return (
    <Container>
      <Box
        onPress={moveUp}
        style={{
          transform: [{translateY: y}],
        }}
      />
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Box = styled.Pressable`
  background-color: tomato;
  width: 200px;
  height: 200px;
`;

export default App;
