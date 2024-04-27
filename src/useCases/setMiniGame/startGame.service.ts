import { LifeRule } from "../setRules/life.rule";
import { ScoreRule } from "../setRules/score.rule";
import { SelectWordRule } from "../setRules/selectWord.rule";
import { TimeRule } from "../setRules/time.rule";

export class StartGameService {
  private readonly lifeRule = new LifeRule();
  private readonly ScoreRule = new ScoreRule();
  private readonly SelectWordRule = new SelectWordRule();
  private readonly TimeRule = new TimeRule();

   private async startGame(): Promise<ILevelResponse> {
    return {
      life: this.lifeRule.getStartLife(),
      score: this.ScoreRule.startScoreValue(),
      word: await this.SelectWordRule.selectFirstWord(),
      alreadySelectedWords: [],
    };
  }

  private async playLevel(levelProps: IStartLevel): Promise<ILevelResponse> {
    if (
      levelProps.remainLife === undefined ||
      levelProps.score === undefined ||
      levelProps.remainTime === undefined
    )
      throw new Error("propertys required || LOG: playLevel");
    let life = levelProps.remainLife;
    let score = levelProps.score;
    let remainTime = levelProps.remainTime;

    const verifySelectWordRule = this.SelectWordRule.handleSelectedWord({
      alreadySelectedWordsIncome: levelProps.alreadySelectedWordsIncome,
      selectedWordNow: levelProps.selectedWordNow,
    });
    const verifyTimeRule = this.TimeRule.validate(remainTime);
    if (verifySelectWordRule.isWordSelectedBefore || !verifyTimeRule) {
      life = this.lifeRule.removeLife(life);
    }
    if (!verifySelectWordRule.isWordSelectedBefore) {
      score = this.ScoreRule.handlerScore({
        score: levelProps.score,
        typeOfScore: "normal",
      });
    }
    return {
      life: life,
      score: score,
      alreadySelectedWords: verifySelectWordRule.alreadySelectedWords,
      word: undefined
    };
  }

  public async execute(gameProps: IStartLevel): Promise<ILevelResponse> {
    if (
      !gameProps.remainLife &&
      !gameProps.score &&
      !gameProps.selectedWordNow &&
      !gameProps.remainTime
    ) {
      return await this.startGame();
    }

    return {
      ... await this.playLevel(gameProps),
    };
  }
}

interface IStartLevel {
  remainLife: number | undefined;
  score: number | undefined;
  alreadySelectedWordsIncome: string[];
  selectedWordNow: string;
  remainTime: number;
}

interface ILevelResponse {
  life: number;
  score: number;
  alreadySelectedWords: string[];
  word: any
}
