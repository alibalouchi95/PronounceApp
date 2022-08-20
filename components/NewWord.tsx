import {Badge, Button} from '@react-native-material/core';
import Toast from 'react-native-simple-toast';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {Word} from '../types';
import {API_CALL} from '../utils';

type Props = {
  setData: (word: Word) => void;
  closeModal: () => void;
};

const NewWord = ({setData, closeModal}: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [newWord, setNewWord] = useState<string>();

  const getData = async (word: string) => {
    setLoading(true);
    try {
      const res = await API_CALL.getWordData(word);
      if (typeof res !== 'string') {
        setData(res);
        Toast.show('The word has been added');
      } else Toast.show(res);
      setLoading(false);
    } catch (e) {
      Toast.show('The word does not found');
      setLoading(false);
    }
  };

  const submitWord = async () => {
    if (newWord) {
      getData(newWord)
        .then(() => closeModal())
        .catch(err => Toast.show(err));
    }
  };

  return (
    <View style={styles.modal}>
      <TextInput
        placeholder="Insert Word"
        onChangeText={text => setNewWord(text)}
        style={styles.input}
      />
      <Button
        disabled={loading}
        title={loading ? <ActivityIndicator /> : 'Submit'}
        onPress={() => submitWord()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    marginTop: 100,
    width: Dimensions.get('screen').width - 50,
    height: 30,
    borderWidth: 1,
    borderColor: 'black',
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NewWord;
