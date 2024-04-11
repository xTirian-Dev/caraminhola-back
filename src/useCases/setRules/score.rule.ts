export class ScoreRule {
  private startScore: number = 0;
  private normalScore: number = 3;
  private buffedScore: number = 5;
  private validate({ typeOfScore }: IGameScore): number {
    switch (typeOfScore) {      
      case "buffed":
        return this.buffedScore;
      default:
        return this.normalScore;
    }
  }
  private addScore({score, newPoints}: IGameScore): number {
    if(!score && !newPoints || !score) return this.startScore;
    if(!newPoints) return score;
    return score + newPoints;
  }

  public handlerScore(scoreProps: IGameScore): number {
    const newPoints = this.validate({ typeOfScore: scoreProps.typeOfScore});
    return this.addScore({score: scoreProps.score, newPoints});
  }
  
  public startScoreValue(): number {
    return this.startScore;
  }
}

// TODO: Criar lib de interface para o // TODO: Criar lib de interface para o ISelectWord
interface IGameScore {
  score?: number;
  newPoints?: number;
  typeOfScore?: 'normal' | 'buffed';
}
