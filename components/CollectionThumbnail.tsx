import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Collection} from '../types';

type Props = {
  collections: Array<Collection>;
};

const CollectionThumbnail = ({collection}: {collection: Collection}) => {
  const navigation = useNavigation();

  console.log({collection});

  return (
    <Pressable
      onPress={() => navigation.navigate('Collection', {id: collection.name})}
      style={styles.thumbnail}>
      <Text>{collection.name}</Text>
      <Text>
        Includes: {collection.words ? collection.words.length : 0} Words
      </Text>
    </Pressable>
  );
};

const rowMaker = (collections: Array<Collection>) => {
  const result = [];
  let res = [];
  let counter = 0;
  if (collections.length > 3)
    while (counter < collections.length) {
      while (counter % 3 !== 0) {
        res.push(collections[counter]);
        counter++;
      }
      result.push(res);
      res = [];
    }
  else result.push(collections);
  return result;
};

const renderRows = (collectionRow: Array<Collection>) => {
  return (
    <View style={styles.rowContainer}>
      {collectionRow.map(col => (
        <CollectionThumbnail key={col.name} collection={col} />
      ))}
    </View>
  );
};

const NewCollectionModal = ({collections}: Props) => {
  return (
    <ScrollView>
      <View style={styles.container}>
        {rowMaker(collections).map(col => renderRows(col))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  thumbnail: {
    backgroundColor: 'white',
    padding: 10,
    margin: 10,
    width: Dimensions.get('screen').width / 3 - 20,
    height: Dimensions.get('screen').width / 3 - 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  container: {
    flex: 1,
  },
});

export default NewCollectionModal;
