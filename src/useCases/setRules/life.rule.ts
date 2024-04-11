import { NextFunction, Request, Response } from "express";

export class LifeRule {
  private startLife: number = 3;

  public validate(remainLife: number): boolean {
    if (remainLife === 0) {      
      return false; // GAME OVER
    }
    return true
  }

  public getStartLife = (): number => {
    return this.startLife;  
  }

  public removeLife(remainLife: number): number {
    return remainLife - 1;
  }

  public addLife(remainLife: number): number {
    return remainLife + 1;
  }
}