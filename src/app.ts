import { PrismaClient } from "@prisma/client";
import { envs } from "./config/plugins/envs.plugin";
import { MongoDatabase } from "./data/mongo";
import { Server } from "./presentation/server";
import { LogSeverityLevel } from "./domain/entities/log.entity";

(() => {
  main();
})();

async function main() {
  await MongoDatabase.connect({
    dbName: envs.MONGO_BD_NAME,
    mongoUrl: envs.MONGO_URL,
  });

  Server.start();
}
