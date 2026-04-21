/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient, StickerCategory } = require("@prisma/client");

const prisma = new PrismaClient();

// i'll let this here because i can need later, but for now, it's easier to just have a list of selections and generate the stickers from it
// const groupedTeams = [
//   // Grupo A
//   { grupo: "A", time: "México" },
//   { grupo: "A", time: "Coreia do Sul" },
//   { grupo: "A", time: "África do Sul" },
//   { grupo: "A", time: "República Tcheca" },
  
//   // Grupo B
//   { grupo: "B", time: "Canadá" },
//   { grupo: "B", time: "Bósnia e Herzegovina" },
//   { grupo: "B", time: "Catar" },
//   { grupo: "B", time: "Suíça" },
  
//   // Grupo C
//   { grupo: "C", time: "Brasil" },
//   { grupo: "C", time: "Marrocos" },
//   { grupo: "C", time: "Escócia" },
//   { grupo: "C", time: "Haiti" },
  
//   // Grupo D
//   { grupo: "D", time: "Estados Unidos" },
//   { grupo: "D", time: "Paraguai" },
//   { grupo: "D", time: "Austrália" },
//   { grupo: "D", time: "Turquia" },
  
//   // Grupo E
//   { grupo: "E", time: "Alemanha" },
//   { grupo: "E", time: "Costa do Marfim" },
//   { grupo: "E", time: "Equador" },
//   { grupo: "E", time: "Curaçao" },
  
//   // Grupo F
//   { grupo: "F", time: "Holanda" },
//   { grupo: "F", time: "Japão" },
//   { grupo: "F", time: "Suécia" },
//   { grupo: "F", time: "Tunísia" },
  
//   // Grupo G
//   { grupo: "G", time: "Bélgica" },
//   { grupo: "G", time: "Irã" },
//   { grupo: "G", time: "Egito" },
//   { grupo: "G", time: "Nova Zelândia" },
  
//   // Grupo H
//   { grupo: "H", time: "Espanha" },
//   { grupo: "H", time: "Uruguai" },
//   { grupo: "H", time: "Arábia Saudita" },
//   { grupo: "H", time: "Cabo Verde" },
  
//   // Grupo I
//   { grupo: "I", time: "França" },
//   { grupo: "I", time: "Senegal" },
//   { grupo: "I", time: "Noruega" },
//   { grupo: "I", time: "Iraque" },
  
//   // Grupo J
//   { grupo: "J", time: "Argentina" },
//   { grupo: "J", time: "Argélia" },
//   { grupo: "J", time: "Áustria" },
//   { grupo: "J", time: "Jordânia" },
  
//   // Grupo K
//   { grupo: "K", time: "Portugal" },
//   { grupo: "K", time: "Colômbia" },
//   { grupo: "K", time: "República Democrática do Congo" },
//   { grupo: "K", time: "Uzbequistão" },
  
//   // Grupo L
//   { grupo: "L", time: "Inglaterra" },
//   { grupo: "L", time: "Croácia" },
//   { grupo: "L", time: "Panamá" },
//   { grupo: "L", time: "Gana" }
// ];

const selections = [
  "México",
  "Coreia do Sul",
  "África do Sul",
  "República Tcheca",
  "Canadá",
  "Bósnia e Herzegovina",
  "Catar",
  "Suíça",
  "Brasil",
  "Marrocos",
  "Escócia",
  "Haiti",
  "Estados Unidos",
  "Paraguai",
  "Austrália",
  "Turquia",
  "Alemanha",
  "Costa do Marfim",
  "Equador",
  "Curaçao",
  "Holanda",
  "Japão",
  "Suécia",
  "Tunísia",
  "Bélgica",
  "Irã",
  "Egito",
  "Nova Zelândia",
  "Espanha",
  "Uruguai",
  "Arábia Saudita",
  "Cabo Verde",
  "França",
  "Senegal",
  "Noruega",
  "Iraque",
  "Argentina",
  "Argélia",
  "Áustria",
  "Jordânia",
  "Portugal",
  "Colômbia",
  "República Democrática do Congo",
  "Uzbequistão",
  "Inglaterra",
  "Croácia",
  "Panamá",
  "Gana",
];

function createStickerCatalog() {
  let sequence = 1;
  const stickers = [];

  selections.forEach((selectionName, selectionOrder) => {
    for (
      let stickerInSelection = 1;
      stickerInSelection <= 20;
      stickerInSelection += 1
    ) {
      stickers.push({
        code: String(sequence).padStart(3, "0"),
        sequence,
        label: `${selectionName} ${String(stickerInSelection).padStart(2, "0")}`,
        category: StickerCategory.TEAM,
        selectionName,
        selectionOrder: selectionOrder + 1,
        stickerInSelection,
      });
      sequence += 1;
    }
  });

  for (let specialIndex = 1; specialIndex <= 20; specialIndex += 1) {
    stickers.push({
      code: String(sequence).padStart(3, "0"),
      sequence,
      label: `Especial ${String(specialIndex).padStart(2, "0")}`,
      category: StickerCategory.SPECIAL,
      selectionName: null,
      selectionOrder: null,
      stickerInSelection: specialIndex,
    });
    sequence += 1;
  }

  return stickers;
}

async function main() {
  await prisma.sticker.createMany({
    data: createStickerCatalog(),
    skipDuplicates: true,
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
