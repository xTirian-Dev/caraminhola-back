import { CaraminholaModel } from "./caraminhola.model";

export interface CaraminholaRelationModel {
  id: string;
  id_caraminhola: CaraminholaModel["id"];
  id_caraminhola_retalion: CaraminholaModel["id"];
}

export class CaraminholaRelationModelMutate {
  id: CaraminholaRelationModel["id"];
  id_caraminhola: CaraminholaRelationModel["id_caraminhola"];
  id_caraminhola_retalion: CaraminholaRelationModel["id_caraminhola_retalion"];

  constructor(contructorAttributes: CaraminholaRelationModel) {
    this.id = contructorAttributes.id;
    this.id_caraminhola = contructorAttributes.id_caraminhola;
    this.id_caraminhola_retalion = contructorAttributes.id_caraminhola_retalion;
  }
}
