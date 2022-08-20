import React, {useEffect, useState} from 'react';
import {RouteProp} from '@react-navigation/native';
import {View, Modal, StyleSheet, Dimensions} from 'react-native';
import CollectionWord from '../components/CollectionWord';
import {Button} from '@react-native-material/core';
import NewWord from '../components/NewWord';
import {Word} from '../types';
import {addNewWordToCollection, getCollection} from '../storage';

const Collection = ({
  route,
}: {
  route: RouteProp<{params: {id: string}}, 'params'>;
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [newData, setNewData] = useState<Word>();
  const [collectionWords, setCollectionWords] = useState<Array<Word>>([]);
  const id = route.params.id;

  useEffect(() => {
    const words = getCollection(id);
    if (words && typeof words !== 'string') setCollectionWords(words);
  }, []);

  useEffect(() => {
    if (newData) {
      addNewWordToCollection(id, newData);
      const collection = getCollection(id);
      if (collection) setCollectionWords(collection);
    }
  }, [newData]);

  console.log({collectionWords});

  return (
    <View>
      <Button title="Create new" onPress={() => setShowModal(true)} />
      {collectionWords
        ? collectionWords.map(word => (
            <CollectionWord
              key={word.word}
              word={word.word}
              pronounciation={word.pronounciation}
            />
          ))
        : null}
      <Modal visible={showModal} onDismiss={() => setShowModal(false)}>
        {showModal ? (
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <NewWord
                setData={setNewData}
                closeModal={() => setShowModal(false)}
              />
            </View>
          </View>
        ) : null}
      </Modal>
    </View>
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
});

export default Collection;
