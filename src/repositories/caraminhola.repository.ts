import prisma from "../utils/prismaConfig";

export class caraminholaRepository {
  public findFirst = prisma.caraminhola.findFirst;
}