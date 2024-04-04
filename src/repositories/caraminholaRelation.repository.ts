import prisma from "../utils/prismaConfig";

export class caraminholaRelationReposirory {
  public findFirst = prisma.caraminhola_Relation.findFirst;
}