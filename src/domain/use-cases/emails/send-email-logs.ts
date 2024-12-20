import { EmailService } from "../../../presentation/email/email.service";
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface SendEmailLogsUseCase {
  execute(to: string | string[]): Promise<boolean>;
}

export class SendEmailLogs implements SendEmailLogsUseCase {
  constructor(
    private readonly emailService: EmailService,
    private readonly logRepository: LogRepository
  ) {}

  private readonly origin = "send-email.logs.ts";

  async execute(to: string | string[]): Promise<boolean> {
    try {
      const sent = await this.emailService.sendEmailWithFileSystemLogs(to);

      if (!sent) {
        throw new Error("Email log not set");
      }
      const log = new LogEntity({
        level: LogSeverityLevel.high,
        message: "log Email sent",
        origin: this.origin,
      });
      this.logRepository.saveLog(log);
      return true;
    } catch (error) {
      const log = new LogEntity({
        level: LogSeverityLevel.high,
        message: `${error}`,
        origin: this.origin,
      });
      this.logRepository.saveLog(log);
      return false;
    }
  }
}
