import { caraminholaRepository } from "../../repositories/caraminhola.repository";
import { caraminholaRelationReposirory } from "../../repositories/caraminholaRelation.repository";
import prisma from "../../utils/prismaConfig";

export class HandleNewWord {
  private readonly caraminholaRepository = new caraminholaRepository();
  private readonly caraminholaRelationReposirory =
    new caraminholaRelationReposirory();

  async validate(newWord: string, currentWordId: string) {
    if (!newWord) throw new Error("newWord is required");
    if (!currentWordId) throw new Error("currentWordId is required");

    if (newWord.length < 3)
      throw new Error("newWord must have at least 3 characters");
    const isOneWord = /^\w+$/;
    if (!isOneWord.test(newWord.trim()))
      throw new Error("newWord must have only one word");

    const wordIsUsed = await this.caraminholaRepository.findFirst({
      where: {
        OR: [
          {
            content: {
              equals: newWord.trim(),
            },
          },
          {
            content: {
              equals: newWord.trim().toLocaleLowerCase(),
            },
          },
          {
            content: {
              equals: newWord.trim().toLocaleUpperCase(),
            },
          },
        ],
      },
      include: {
        Caraminhola_relation: true,
      },
    });

    if (wordIsUsed) return wordIsUsed;

    const AddNewWord = await this.caraminholaRepository.create({
      data: {
        content: newWord.trim().toLocaleLowerCase(),
        description: "",
        label: "",
        type: "palavra",
      },
    });

    const currentWord =
      await this.caraminholaRepository.getCaraminhola(currentWordId);

    if (!currentWord) throw new Error("currentWord not found");

    const transaction = await prisma.$transaction([
      this.caraminholaRelationReposirory.create({
        data: {
          caraminhola_id: currentWord.id,
          caraminhola_id_relation: AddNewWord.id,
        },
      }),
      this.caraminholaRelationReposirory.create({
        data: {
          caraminhola_id: AddNewWord.id,
          caraminhola_id_relation: currentWord.id,
        },
      }),
      ...currentWord.Caraminhola_relation.map((relation) =>
        this.caraminholaRelationReposirory.create({
          data: {
            caraminhola_id: relation.caraminhola_id,
            caraminhola_id_relation: AddNewWord.id,
          },
        })
      ),
    ]);

    console.log(transaction);
    if (!transaction[3]) throw new Error("transaction failed");

    return await this.caraminholaRepository.getCaraminhola(AddNewWord.id);
  }

  async execute(newWord: string, currentWordId: string) {
    return await this.validate(newWord, currentWordId);
  }
}
