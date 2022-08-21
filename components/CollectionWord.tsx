import {Banner, Button} from '@react-native-material/core';
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Pressable, Image} from 'react-native';
import Sound from 'react-native-sound';
import Toast from 'react-native-simple-toast';
import {Word} from '../types';

// "https://api.dictionaryapi.dev/media/pronunciations/en/water-uk.mp3"

type Props = {word: Word; removeWord: (inp: string) => void};

const CollectionWord = ({word: {word, pronounciation}, removeWord}: Props) => {
  const [playing, setPlaying] = useState<boolean>(false);
  const audio = new Sound(pronounciation.audio, undefined, (error: any) => {
    if (error) {
      Toast.show('failed to load the sound', error);
      return;
    }
  });

  audio.setNumberOfLoops(1);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable
          onPress={() => removeWord(word)}
          style={{
            width: 5,
            height: 5,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <Image
            style={{width: 30, height: 30}}
            source={require('../assets/close-icons/icons8-close-67.png')}
          />
        </Pressable>
        <Text style={styles.word}>{word}</Text>
        <Text style={styles.pronounciation}>{pronounciation.text}</Text>
      </View>
      <Pressable
        onPress={() => {
          setPlaying(true);
          audio.play(() => {
            setPlaying(false);
          });
        }}>
        <Image
          style={{
            marginLeft: 8,
            tintColor: playing ? '#004BA8' : '#24272B',
          }}
          source={
            audio.isPlaying()
              ? require('../assets/play-icons/play-button-circled-50-blue.png')
              : require('../assets/play-icons/play-button-circled-50-black.png')
          }
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
