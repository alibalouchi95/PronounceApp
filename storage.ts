import {MMKV} from 'react-native-mmkv';
import {CollectionThumbnail, Word} from './types';

export const storage = new MMKV();

export const deleteDB = () => {
  storage.clearAll();
};

export const addNewCollection = (collectionName: string) => {
  const keys = storage.getAllKeys();
  if (!keys.includes(`collection_${collectionName}`)) {
    const collectionWords: Array<Word> = [];
    const collectionDate = new Date();
    storage.set(
      `collection_${collectionName}`,
      JSON.stringify({words: collectionWords, date: collectionDate}),
    );
  }
};

export const addNewWordToCollection = (
  collectionName: string,
  newWord: Word,
) => {
  const collection = storage.getString(collectionName);
  if (collection) {
    const store = JSON.parse(collection);
    if (store && store.words) {
      store.words.push(newWord);
    }
    storage.set(collectionName, JSON.stringify(store));
  }
};

export const removeWordFromCollection = (
  collectionName: string,
  word: string,
) => {
  const collection = storage.getString(collectionName);
  if (collection) {
    const store = JSON.parse(collection);
    if (store && store.words) {
      const words = store.words.filter((_word: Word) => _word.word !== word);
      storage.set(collectionName, JSON.stringify({...store, words}));
    }
  }
};

export const getCollections = () => {
  const keys = storage.getAllKeys();
  const result: Array<CollectionThumbnail> = [];
  if (keys)
    for (const key of keys) {
      const collection = storage.getString(key);
      const _collection = collection ? JSON.parse(collection) : null;
      if (_collection && _collection.words && _collection.date)
        result.push({
          name: key,
          wordsLength: _collection.words.length,
          date: _collection.date,
        });
    }
  return result;
};

export const getCollection = (collectionName: string) => {
  const collection = storage.getString(collectionName);
  if (collection)
    return {
      words: JSON.parse(collection).words,
      date: JSON.parse(collection).date,
    };
};
