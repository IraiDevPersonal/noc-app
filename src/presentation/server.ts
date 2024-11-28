import { SendEmailLogs } from "../domain/use-cases/emails/send-email-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repository/log.repository.impl";
import { EmailService } from "./email/email.service";

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource()
);
const emailService = new EmailService();

export class Server {
  public static start() {
    console.log("Server started...");

    // Mandar email
    const sendEmailLogs = new SendEmailLogs(
      emailService,
      fileSystemLogRepository
    );
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
