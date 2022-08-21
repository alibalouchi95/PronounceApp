import {Badge, Button} from '@react-native-material/core';
import Toast from 'react-native-simple-toast';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {Word} from '../types';
import {API_CALL} from '../utils';
import {addNewWordToCollection, getCollection} from '../storage';

type Props = {
  closeModal: () => void;
  setShowModal: (inp: boolean) => void;
  collectionName: string;
};

const NewWord = ({closeModal, setShowModal, collectionName}: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [newWord, setNewWord] = useState<string>();

  const getData = async () => {
    if (newWord) {
      setLoading(true);
      try {
        const res = await API_CALL.getWordData(newWord);
        if (typeof res !== 'string') {
          addNewWordToCollection(collectionName, res);
        }
        setLoading(false);
      } catch (e) {
        setLoading(false);
      }
    }
  };

  const submitWord = async () => {
    await getData();
    closeModal();
  };

  return (
    <View style={styles.modalView}>
      <Pressable
        onPress={() => setShowModal(false)}
        style={{
          width: '100%',
          height: 20,
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
      <TextInput
        placeholder="Insert Word"
        onChangeText={text => setNewWord(text)}
        style={styles.modalInput}
      />
      <Pressable disabled={loading} onPress={() => submitWord()}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Text style={styles.submit}>Submit</Text>
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    height: Dimensions.get('screen').height / 2,
    width: Dimensions.get('screen').width,
  },
  submit: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 20,
    paddingHorizontal: 40,
    paddingVertical: 20,
    borderColor: '#004BA8',
    borderWidth: 2,
    borderRadius: 20,
  },
  modalInput: {
    margin: 25,
    fontSize: 17,
    width: '90%',
    borderWidth: 1,
    borderColor: '#4A525A',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderStyle: 'dotted',
  },
});

export default NewWord;
