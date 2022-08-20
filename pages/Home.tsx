import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Modal,
  TextInput,
  Image,
  Pressable,
} from 'react-native';
import CollectionThumbnails from '../components/CollectionThumbnail';
import {CollectionThumbnail} from '../types';
import {addNewCollection, deleteDB, getCollections} from '../storage';

const Home = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [collections, setCollections] = useState<Array<CollectionThumbnail>>();
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
      <Pressable
        style={styles.FAB}
        onPress={e => {
          setShowModal(true);
          e.preventDefault();
        }}>
        <Image source={require('../assets/plus-icons/icons8-plus-128.png')} />
      </Pressable>
      <View>
        {collections ? (
          <CollectionThumbnails collections={collections} />
        ) : null}
        <Modal
          transparent
          visible={showModal}
          animationType="slide"
          onDismiss={() => setShowModal(false)}>
          <View style={styles.centeredView}>
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
                onChangeText={value => setCollectionName(value)}
                value={collectionName}
                placeholder="Collection Name"
                style={styles.modalInput}
              />
              <Pressable
                onPress={() => collectionName && submit(collectionName)}>
                <Text style={styles.submit}>SUBMIT</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  FAB: {
    right: 50,
    bottom: 50,
    zIndex: 100,
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    marginTop: 22,
  },
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

export default Home;
