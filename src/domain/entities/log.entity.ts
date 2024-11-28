export enum LogSeverityLevel {
  low = "low",
  medium = "medium",
  high = "high",
}

export interface LogEntityOptions {
  origin: string;
  message: string;
  createdAt?: Date;
  level: LogSeverityLevel;
}

export class LogEntity {
  public origin: string;
  public message: string;
  public createdAt: Date;
  public level: LogSeverityLevel;

  constructor({
    level,
    origin,
    message,
    createdAt = new Date(),
  }: LogEntityOptions) {
    this.level = level;
    this.origin = origin;
    this.message = message;
    this.createdAt = createdAt;
  }

  static fromJson(jsonData: string): LogEntity {
    jsonData = jsonData || "{}";
    const {
      message,
      level,
      createdAt = new Date(),
      origin,
    } = JSON.parse(jsonData);
    const log = new LogEntity({
      level,
      origin,
      message,
      createdAt,
    });

    return log;
  }

  static fromObject(object: { [key: string]: any }): LogEntity {
    const { message, level, origin, createdAt } = object;
    const log = new LogEntity({
      level,
      origin,
      message,
      createdAt,
    });

    return log;
  }
}
