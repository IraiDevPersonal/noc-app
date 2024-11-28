import { LogSeverityLevel } from "../domain/entities/log.entity";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { LogRepositoryImpl } from "../infrastructure/repository/log.repository.impl";
import { CronService } from "./cron/cron.service";
import { EmailService } from "./email/email.service";

const logRepository = new LogRepositoryImpl(
  // new FileSystemDatasource()
  new MongoLogDatasource()
);

const emailService = new EmailService();

export class Server {
  public static async start() {
    console.log("Server started...");

    // Mandar email
    // const sendEmailLogs = new SendEmailLogs(
    //   emailService,
    //   fileSystemLogRepository
    // );
    // const emailService = new EmailService();
    // emailService.sendEmail({
    //   to: "ignacio.arr01@gmail.com",
    //   subject: "Logs de sistema",
    //   htmlBody: `
    //     <h3>Logs de sistema NOC</h3>
    //     <p>las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.</p>
    //     <p>Ver logs adjuntos</p>
    //   `,
    // });
    // emailService.sendEmailWithFileSystemLogs([
    //   "ignacio.arr01@gmail.com",
    //   "psicologa.roxanaalvear@gmail.com",
    // ]);

    // CronService.createJob("*/5 * * * * *", () => {
    //   const url = "https://gooasdasdgle.com";

    //   new CheckService(
    //     logRepository,
    //     () => console.log(`${url} is OK`),
    //     console.log
    //   ).execute(url);
    // });

    const logs = await logRepository.getLogs(LogSeverityLevel.low);
    console.log(logs);
  }
}
