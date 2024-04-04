import { CaraminholaRelationModel } from "./caraminholaRelations";

export interface CaraminholaModel {
  id: string;
  type: string;
  label?: string;
  content: string;
  description?: string;

  Caraminhola_relation?: CaraminholaRelationModel[];
}

export class CaraminholaModelMutate {
  id: CaraminholaModel["id"];
  type: CaraminholaModel["type"];
  label?: CaraminholaModel["label"];
  content: CaraminholaModel["content"];
  description?: CaraminholaModel["description"];

  Caraminhola_relation?: CaraminholaModel["Caraminhola_relation"];

  constructor(contructorAttributes: CaraminholaModel) {
    this.id = contructorAttributes.id;
    this.type = contructorAttributes.type;
    this.label = contructorAttributes.label;
    this.content = contructorAttributes.content;
    this.description = contructorAttributes.description;

    this.Caraminhola_relation = contructorAttributes.Caraminhola_relation;
  }
}
