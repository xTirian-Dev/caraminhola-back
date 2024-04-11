import { NextFunction, Request, Response } from "express";

export class TimeRule {
  private startTimer: number = 30;

  public startTimerCountdown = (): number => {
    const now = new Date();
    const finalCount = new Date(now.getTime() + this.startTimer * 60000);

    return finalCount.getTime();
  };

  public validate(remainTime: number): boolean {
    if (remainTime <= 0) return false;
    return true;
  }
}
