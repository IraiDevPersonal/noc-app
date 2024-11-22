import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = (errorMEssage: string) => void;

export class CheckService implements CheckServiceUseCase {
  constructor(
    private readonly logRepository: LogRepository,
    private readonly successCallback?: SuccessCallback,
    private readonly errorCallback?: ErrorCallback
  ) {}

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
      this.logRepository.saveLog(log);
      this.successCallback?.();
      return true;
    } catch (error) {
      const errorMessage = `${url} is NOT OK ${error}`;
      const log = new LogEntity({
        origin,
        message: errorMessage,
        level: LogSeverityLevel.high,
      });
      this.logRepository.saveLog(log);
      this.errorCallback?.(errorMessage);
      return false;
    }
  }
}
