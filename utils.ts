import axios from 'axios';
import {Word, WordData} from './types';

export const cleanResult = (res: WordData): Word | string => {
  console.log({res: res.phonetics[1].license});
  const pron = res.phonetics.find(pronounce => {
    return (
      pronounce.text &&
      pronounce.audio &&
      (pronounce.license.name.includes('BY-SA') ||
        (pronounce.license.name.includes('BY') &&
          pronounce.license.name.includes('US'))) &&
      pronounce.license.name.includes('3.0')
    );
  });

  console.log({pron});

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

export const cleanDate = (date: Date | string) => {
  if (typeof date === 'string') date = new Date(date);
  const year = date.getUTCFullYear();
  const month = date.getMonth();
  const day = date.getDay();

  return `${year}/${month + 1}/${day}`;
};
