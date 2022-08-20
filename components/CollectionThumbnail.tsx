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
import {CollectionThumbnail as CollectionThumbnailType} from '../types';
import {cleanDate} from '../utils';

type Props = {
  collections: Array<CollectionThumbnailType>;
};

const CollectionThumbnail = ({
  collection,
}: {
  collection: CollectionThumbnailType;
}) => {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => navigation.navigate('Collection', {id: collection.name})}
      style={styles.thumbnail}>
      <View>
        <Text style={styles.collectionTitle}>
          {collection.name.split('_')[1]}
        </Text>
        <Text style={styles.collectionWordsCount}>
          Includes: {collection.wordsLength} Words
        </Text>
        <Text style={styles.collectionDate}>{cleanDate(collection.date)}</Text>
      </View>
    </Pressable>
  );
};

const NewCollectionModal = ({collections}: Props) => {
  return (
    <ScrollView>
      <View style={styles.container}>
        {/* {rowMaker(collections).map(col => renderRows(col))} */}
        {collections.map(collection => (
          <CollectionThumbnail key={collection.name} collection={collection} />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  thumbnail: {
    backgroundColor: '#24272B',
    padding: 10,
    margin: 10,
    width: '95%',
    height: 100,
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
  collectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    padding: 3,
    marginHorizontal: 1,
    marginVertical: 3,
  },
  collectionWordsCount: {
    color: '#FFFFFF',
    fontSize: 15,
    padding: 2,
    margin: 1,
  },
  collectionDate: {
    color: '#FFFFFF',
    fontSize: 12,
    padding: 2,
    margin: 1,
  },
});

export default NewCollectionModal;
