import { LogEntity, LogSeverityLevel } from "../entities/log.entity";

// el abstract es para que no se pueda crear una instancia de esta
export abstract class LogDatasource {
  abstract saveLog(log: LogEntity): Promise<void>;
  abstract getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]>;
}
