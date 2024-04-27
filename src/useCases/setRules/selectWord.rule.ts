import prisma from "../../utils/prismaConfig";

export class SelectWordRule {
  private alreadySelectedWords: string[] = [];

  selectFirstWord() {
    const firstWord = prisma.caraminhola.findFirst({
      where: {
        content: 'Caraminhola'
      },
      select: {
        id: true,
        content: true,
        description: true,
        label: true,
        type: true,
        Caraminhola_relation: true,
      }
    });

    return firstWord;
    
  }

  private validate({ selectedWordNow }: ISelectWord): boolean {
    if (!selectedWordNow) throw new Error("selectedWordNow is required");
    const isWordSelected = this.alreadySelectedWords.includes(selectedWordNow);
    if (isWordSelected) {
      return true;
    }
    return false;
  }

  private insertSelectedWords({
    alreadySelectedWordsIncome,
  }: ISelectWord): void {
    if (alreadySelectedWordsIncome)
      alreadySelectedWordsIncome.forEach((word) => {
        this.alreadySelectedWords.push(word);
      });
  }

  public resetInsertSelectedWords(): void {
    this.alreadySelectedWords = [];
  }

  public handleSelectedWord({
    alreadySelectedWordsIncome,
    selectedWordNow,
  }: ISelectWord): ISelectWordResponse {
    if (alreadySelectedWordsIncome?.length !== 0)
      this.insertSelectedWords({ alreadySelectedWordsIncome });
    if (!selectedWordNow) throw new Error("selectedWordNow is required");

    const isWordSelectedBefore = this.validate({ selectedWordNow });

    if(!isWordSelectedBefore) {
      this.alreadySelectedWords.push(selectedWordNow)
      return { isWordSelectedBefore, alreadySelectedWords: this.alreadySelectedWords };
    };

    return {
      isWordSelectedBefore,
      alreadySelectedWords: this.alreadySelectedWords,    
    };
  }
}

// TODO: Criar lib de interface para o ISelectWord
interface ISelectWord {
  alreadySelectedWordsIncome?: string[];
  selectedWordNow?: string;
  isWordSelectedBefore?: boolean
}

interface ISelectWordResponse {
  isWordSelectedBefore: boolean;
  alreadySelectedWords: string[];
}