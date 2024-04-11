import { Express, Request, Response, Router } from 'express';
import { StartGameService } from './useCases/setMiniGame/startGame.service';
import { HandleLevel } from './useCases/setMiniGame/handleLevel.service';

export const routes = (app: Express): void => {
  app.use('/caraminhola', Router().post('/game', async (req: Request, res: Response) => {
    try {

      const start = await new StartGameService().execute({
        remainLife: req.body.remainLife,
        score: req.body.score,

        remainTime: req.body.remainTime,
        selectedWordNow: req.body.selectedWordNow,
        alreadySelectedWordsIncome: req.body.alreadySelectedWordsIncome,
      });   
      
      return res.status(200).json({...start});
    } catch (error: any) {
      return res.status(400).json({ error: error.message });

    }
  }));

  app.use('/caraminhola', Router().get('/new-level', (req: Request, res: Response) => res.status(200).json({ message: 'new level' })))

  app.use('/caraminhola', Router().post('/new-level', async (req: Request, res: Response) => {
    const { id } = req.body
    // TODO: SEMPRE COMEÇA COM A CARAMINHOLA   

    try {
      const caraminhoa = await new HandleLevel().execute(id)
      return res.status(200).json({ caraminhoa });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }


  }))
}