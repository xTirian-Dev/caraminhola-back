import prisma from "../utils/prismaConfig";

export class caraminholaRepository {
  public findFirst = prisma.caraminhola.findFirst;
  public findMany = prisma.caraminhola.findMany;
  public async getCaraminhola(id: string) {
    return await prisma.caraminhola.findUnique({
      where: { id },
      select:{
        id: true,
        content: true,
        description: true,
        label: true,
        type: true,
        Caraminhola_relation: true,
      },
    });
  }
}
