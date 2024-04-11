export interface IGameScore {
  score?: number;
  newPoints?: number;
  typeOfScore?: string;
}

export interface ISelectWord {
  alreadySelectedWordsIncome?: string[];
  selectedWordNow?: string;
}