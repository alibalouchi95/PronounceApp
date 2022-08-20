import {MMKV} from 'react-native-mmkv';
import {Word} from './types';

export const storage = new MMKV();

export const deleteDB = () => {
  storage.clearAll();
};

export const addNewCollection = (collectionName: string) => {
  const keys = storage.getAllKeys();
  if (!keys.includes(`collection_${collectionName}`)) {
    const collectionWords: Array<Word> = [];
    storage.set(
      `collection_${collectionName}`,
      JSON.stringify(collectionWords),
    );
  }
};

export const addNewWordToCollection = (
  collectionName: string,
  newWord: Word,
) => {
  const collection = storage.getString(collectionName);
  if (collection) {
    const _words = JSON.parse(collection);
    _words.push(newWord);
    storage.set(collectionName, JSON.stringify(_words));
  }
};

export const removeWordFromCollection = (
  collectionName: string,
  word: Word,
) => {
  const collection = storage.getString(collectionName);
  if (collection) {
    const words = JSON.parse(collection).filter(
      (_word: Word) => _word !== word,
    );
    storage.set(`collection_${collectionName}`, words);
  }
};

export const getCollections = () => {
  const keys = storage.getAllKeys();
  const result: Array<{name: string; wordsLength: number}> = [];
  if (keys)
    for (const key of keys) {
      const collection = storage.getString(key);
      const _collection = collection ? JSON.parse(collection) : null;
      if (_collection)
        result.push({name: key, wordsLength: _collection.length});
    }
  return result;
};

export const getCollection = (collectionName: string) => {
  console.log({collectionName});
  const collection = storage.getString(collectionName);
  if (collection) return JSON.parse(collection);
};
