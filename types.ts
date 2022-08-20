export type Collection = {
  name: string;
  words: Array<Word>;
};

export type RootStackScreens = {
  Home: {};
  Collection: {id: string};
};

export type Word = {
  word: string;
  pronounciation: {
    text: string;
    audio: string;
  };
};

export type WordData = {
  word: string;
  phonetic: string;
  phonetics: Array<{
    text: string;
    audio: string;
    sourceUrl: string;
    license: {
      name: string;
      url: string;
    };
  }>;
  meanings: [
    {
      partOfSpeech: string;
      definitions: Array<{
        definition: string;
        synonyms: Array<any>;
        antonyms: Array<any>;
        example: string;
      }>;
      synonyms: Array<any>;
      antonyms: Array<string>;
    },
  ];
  license: {
    name: string;
    url: string;
  };
  sourceUrls: Array<string>;
};

export type CollectionThumbnail = {
  name: string;
  wordsLength: number;
  date: Date;
};
