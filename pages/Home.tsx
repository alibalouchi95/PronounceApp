import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Modal,
  TextInput,
  Button,
} from 'react-native';
import {FAB} from '@react-native-material/core';
import CollectionThumbnails from '../components/CollectionThumbnail';
import {Collection} from '../types';
import {addNewCollection, deleteDB, getCollections} from '../storage';

const Home = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [collections, setCollections] =
    useState<Array<{name: string; wordsLength: number}>>();
  const [collectionName, setCollectionName] = useState<string>();

  useEffect(() => {
    const collections = getCollections();
    setCollections(collections);
    // deleteDB();
  }, []);

  const submit = (collectionName: string) => {
    if (collectionName) {
      addNewCollection(collectionName);
      setCollections(getCollections());
      setShowModal(false);
    }
  };

  return (
    <View>
      {collections ? <CollectionThumbnails collections={collections} /> : null}
      <FAB
        style={styles.FAB}
        icon={<Text>+</Text>}
        onPress={e => {
          setShowModal(true);
          e.preventDefault();
        }}
      />
      <Modal
        transparent
        visible={showModal}
        animationType="slide"
        onDismiss={() => setShowModal(false)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              onChangeText={value => setCollectionName(value)}
              value={collectionName}
              placeholder="Collection Name"
            />
            <Button
              onPress={() => collectionName && submit(collectionName)}
              title="Submit"
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  FAB: {
    width: Dimensions.get('screen').width / 9,
    height: Dimensions.get('screen').width / 9,
    left: Dimensions.get('screen').width - 70,
    bottom: -Dimensions.get('screen').height + 300,
    position: 'absolute',
  },
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

export default Home;
