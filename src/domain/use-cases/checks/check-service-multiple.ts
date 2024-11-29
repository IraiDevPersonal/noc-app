import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceMultipleUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = (errorMEssage: string) => void;

export class CheckServiceMultiple implements CheckServiceMultipleUseCase {
  constructor(
    private readonly logRepository: LogRepository[],
    private readonly successCallback?: SuccessCallback,
    private readonly errorCallback?: ErrorCallback
  ) {}

  private callLogs(log: LogEntity) {
    this.logRepository.forEach((logRepository) => {
      logRepository.saveLog(log);
    });
  }

  public async execute(url: string): Promise<boolean> {
    const origin = "check-service.ts";
    try {
      const req = await fetch(url);

      if (!req.ok) {
        throw new Error(`Error al checkear servicio: ${url}`);
      }

      const log = new LogEntity({
        origin,
        level: LogSeverityLevel.low,
        message: `Service ${url} working`,
      });
      this.callLogs(log);
      this.successCallback?.();
      return true;
    } catch (error) {
      const errorMessage = `${url} is NOT OK ${error}`;
      const log = new LogEntity({
        origin,
        message: errorMessage,
        level: LogSeverityLevel.high,
      });
      this.callLogs(log);
      this.errorCallback?.(errorMessage);
      return false;
    }
  }
}
