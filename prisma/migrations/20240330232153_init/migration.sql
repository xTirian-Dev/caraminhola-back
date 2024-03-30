-- CreateTable
CREATE TABLE "Caraminhola" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "label" TEXT,
    "content" TEXT NOT NULL,
    "description" TEXT
);

-- CreateTable
CREATE TABLE "Caraminhola_Relation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "caraminhola_id" TEXT NOT NULL,
    "caraminhola_id_relation" TEXT NOT NULL,
    CONSTRAINT "Caraminhola_Relation_caraminhola_id_relation_fkey" FOREIGN KEY ("caraminhola_id_relation") REFERENCES "Caraminhola" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
