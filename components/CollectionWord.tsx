import {Banner, Button} from '@react-native-material/core';
import React from 'react';
import {View, Text, StyleSheet, Pressable, Image} from 'react-native';
import Sound from 'react-native-sound';
import {Word} from '../types';

// "https://api.dictionaryapi.dev/media/pronunciations/en/water-uk.mp3"

type Props = Word;

const CollectionWord = ({word, pronounciation}: Props) => {
  const audio = new Sound(pronounciation.audio, undefined, (error: any) => {
    console.log({error});
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.word}>{word}</Text>
        <Text style={styles.pronounciation}>{pronounciation.text}</Text>
      </View>
      <Pressable style={styles.playButton} onPress={() => audio.play()}>
        <Image
          style={{marginLeft: 8}}
          source={require('../assets/play-icons/icons8-play-64.png')}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    margin: 10,
    width: '95%',
    height: 100,
    borderColor: '#004BA8',
    borderWidth: 1.5,
    borderRadius: 20,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  playButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 68,
    height: 68,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: '#004BA8',
    padding: 15,
  },
  header: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    marginLeft: 20,
  },
  pronounciation: {
    fontSize: 16,
  },
  word: {
    fontSize: 25,
    fontWeight: 'bold',
  },
});

export default CollectionWord;
