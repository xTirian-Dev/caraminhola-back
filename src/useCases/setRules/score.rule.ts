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
  private addScore({ score, newPoints }: IGameScore): number {
    if (!score && !newPoints) return this.startScore;
    if(!score) return 0 + this.normalScore;
    if(!newPoints) return score + this.normalScore;    
    return score + newPoints;
  }

  public handlerScore(scoreProps: IGameScore): number {
    let newPoints = this.validate({ typeOfScore: scoreProps.typeOfScore });
    if (newPoints) {
      return this.addScore({ score: scoreProps.score, newPoints });
    }
    return this.addScore({ score: scoreProps.score, newPoints: 3 });
  }

  public startScoreValue(): number {
    return this.startScore;
  }
}

// TODO: Criar lib de interface para o // TODO: Criar lib de interface para o ISelectWord
interface IGameScore {
  score?: number;
  newPoints?: number;
  typeOfScore?: "normal" | "buffed";
}
