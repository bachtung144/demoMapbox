import React, {useState} from 'react';
import ImageOverlay from './src/ImageOverlay';
import Custom from './src/Custom';
import {Button, View} from 'react-native';

export default function App() {
  const [input, setInput] = useState(null);

  if (input === null) {
    return (
      <View style={{flex: 1, alignContent: 'center', justifyContent: 'center'}}>
        <Button title={'Weather'} onPress={() => setInput('Weather')} />
        <Button title={'HoGuom'} onPress={() => setInput('HoGuom')} />
      </View>
    );
  } else {
    return input === 'Weather' ? <ImageOverlay /> : <Custom />;
  }
}
