import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repository/log.repository.impl";
import { CronService } from "./cron/cron-service";

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource()
);

export class Server {
  public static start() {
    console.log("Server started...");

    // Mandar email

    // CronService.createJob("*/5 * * * * *", () => {
    //   const url = "https://google.com";

    //   const checkService = new CheckService(
    //     fileSystemLogRepository,
    //     () => console.log(`${url} is OK`),
    //     console.log
    //   );

    //   checkService.execute(url);
    // });
  }
}
