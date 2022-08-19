import axios from 'axios';
import {MMKV} from 'react-native-mmkv';
import {Word, WordData} from './types';

export const storage = new MMKV();

export const cleanResult = (res: WordData): Word | string => {
  const pron = res.phonetics.find(pronounce => {
    return (
      pronounce.text && pronounce.audio && pronounce.license.url.includes('us')
    );
  });

  if (pron) {
    const result = {
      word: res.word,
      pronounciation: {
        text: pron.text,
        audio: pron.audio,
      },
    };
    return result;
  } else return 'The word has not been found';
};

export const API_CALL = {
  getWordData: async (word: string): Promise<Word | string> => {
    let result;
    try {
      const res = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
      );
      console.log(...res.data);
      const results = [];
      for (const resData of res.data) {
        results.push(cleanResult(resData));
      }
      results.length > 0
        ? (result = results[0])
        : (result = 'The word is not found');
    } catch (e: any) {
      console.log({e});
      result = 'There is a problem with Dictionary API';
    }

    return result;
  },
};