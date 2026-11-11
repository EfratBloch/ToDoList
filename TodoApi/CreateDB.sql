-- PostgreSQL script that creates the Items table (run it in the Neon SQL Editor)
CREATE TABLE IF NOT EXISTS "Items" (
    "Id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "Name" VARCHAR(100),
    "IsComplete" BOOLEAN
);
