import { caraminholaRepository } from "../../repositories/caraminhola.repository";
import { caraminholaRelationReposirory } from "../../repositories/caraminholaRelation.repository";

export class HandleLevel {
  private readonly caraminholaRepository = new caraminholaRepository();
  private readonly caraminholaRelationReposirory = new caraminholaRelationReposirory()

  async getStartCaraminhoa(){
    return await this.caraminholaRepository.findFirst(
      { where: { content: "caraminhola" } }
    );
  } 

  shuffleArray(array: string[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  async getNewCaraminhola (id: string) {
    const caraminhola = await this.caraminholaRepository.getCaraminhola(id);
    if(!caraminhola) throw new Error("Caraminhola not found");

    const caraminholaRelation = caraminhola?.Caraminhola_relation.map((relation) => {
      return relation.caraminhola_id_relation
    });
    if(!caraminholaRelation?.length) throw new Error("Caraminhola Relation not found");

    const caraminholaRelationShuffle = this.shuffleArray(caraminholaRelation);

    const caraminholaRelationCardsSelect = this.caraminholaRepository.findMany({
      where: {
        id: {
          in: caraminholaRelationShuffle.slice(0, 3)
        }
      
      }
    })

    const caraminholaModel = {
      ...caraminhola,
      Caraminhola_relation: caraminholaRelationCardsSelect
    }

    return caraminholaModel


  }

  async execute(id?:string){
    if(!id){
      return await this.getStartCaraminhoa()
    }

    return await this.getNewCaraminhola(id)
  }
}