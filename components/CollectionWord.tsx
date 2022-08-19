import {Banner, Button} from '@react-native-material/core';
import React from 'react';
import {View, Text} from 'react-native';
import Sound from 'react-native-sound';
import {Word} from '../types';

// "https://api.dictionaryapi.dev/media/pronunciations/en/water-uk.mp3"

type Props = Word;

const CollectionWord = ({word, pronounciation}: Props) => {
  const audio = new Sound(pronounciation.audio, undefined, (error: any) => {
    console.log({error});
  });

  console.log({pronounciation});

  return (
    <Banner
      text={
        <View>
          <Text>{word}</Text>
        </View>
      }
      buttons={
        <Button title={pronounciation.text} onPress={() => audio.play()} />
      }
    />
  );
};

export default CollectionWord;
