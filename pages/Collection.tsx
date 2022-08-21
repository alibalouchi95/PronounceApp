import React, {useEffect, useState} from 'react';
import {RouteProp} from '@react-navigation/native';
import {
  View,
  Modal,
  StyleSheet,
  Dimensions,
  Pressable,
  ScrollView,
} from 'react-native';
import CollectionWord from '../components/CollectionWord';
import {Text} from '@react-native-material/core';
import NewWord from '../components/NewWord';
import {Word} from '../types';
import {
  addNewWordToCollection,
  getCollection,
  removeWordFromCollection,
} from '../storage';

const Collection = ({
  route,
}: {
  route: RouteProp<{params: {id: string}}, 'params'>;
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [newData, setNewData] = useState<Word>();
  const [collectionWords, setCollectionWords] = useState<Array<Word>>([]);
  const [date, setDate] = useState<Date>();
  const id = route.params.id;

  useEffect(() => {
    const collection = getCollection(id);
    if (collection) {
      const {words, date} = collection;
      if (words && typeof words !== 'string') setCollectionWords(words);
      if (date) setDate(date);
    }
  }, [showModal]);

  useEffect(() => {
    if (newData) {
      const collectionWordNames = collectionWords.map(col => col.word);
      if (!collectionWordNames.includes(newData.word)) {
      }
      setNewData(undefined);
    }
  }, [newData]);

  const removeWord = (word: string) => {
    removeWordFromCollection(id, word);
    const collection = getCollection(id);
    if (collection) {
      const {words, date} = collection;
      if (words && typeof words !== 'string') setCollectionWords(words);
      if (date) setDate(date);
    }
  };

  return (
    <ScrollView>
      {collectionWords
        ? collectionWords.map(word => (
            <CollectionWord
              key={word.word}
              word={word}
              removeWord={removeWord}
            />
          ))
        : null}
      <Pressable
        style={styles.createNewWord}
        onPress={() => setShowModal(true)}>
        <Text style={styles.createNewWordText}>Create new</Text>
      </Pressable>
      <Modal
        visible={showModal}
        onDismiss={() => setShowModal(false)}
        animationType="slide"
        transparent>
        {showModal ? (
          <View style={styles.centeredView}>
            <NewWord
              setShowModal={setShowModal}
              collectionName={id}
              closeModal={() => setShowModal(false)}
            />
          </View>
        ) : null}
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    marginTop: 22,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    height: Dimensions.get('screen').height / 2,
    width: Dimensions.get('screen').width,
  },
  createNewWord: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    margin: 10,
    width: '95%',
    height: 100,
    borderColor: '#004BA8',
    borderStyle: 'dashed',
    borderWidth: 1.2,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createNewWordText: {
    color: '#24272B',
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Collection;
