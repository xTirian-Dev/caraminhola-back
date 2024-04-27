import prisma from "../utils/prismaConfig";

export class caraminholaRelationReposirory {
  public findFirst = prisma.caraminhola_Relation.findFirst;
  public findMany = prisma.caraminhola_Relation.findMany;
  public create = prisma.caraminhola_Relation.create;
}