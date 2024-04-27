import { Express, Request, Response, Router } from 'express';
import { StartGameService } from './useCases/setMiniGame/startGame.service';
import { HandleLevel } from './useCases/setMiniGame/handleLevel.service';
import { HandleNewWord } from './useCases/setMiniGame/handleNewWord.service';

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
      const caraminhola = await new HandleLevel().execute(id)
      return res.status(200).json({ caraminhola });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }))

  app.use('/caraminhola', Router().post('/new-word', async (req: Request, res: Response) => {
    const { newWord, currentWordId  } = req.body
    try {
      const registrarCaraminhola = await new HandleNewWord().execute(newWord, currentWordId)
      if(!registrarCaraminhola) throw new Error("something went wrong");
      
      return res.status(200).json(registrarCaraminhola);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }))
}