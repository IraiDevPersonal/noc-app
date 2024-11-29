import { PrismaClient, SeverityLevel } from "@prisma/client";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

const prisma = new PrismaClient();

export class PostgresLogDatasource implements LogDatasource {
  private readonly parseLevel: Record<LogSeverityLevel, SeverityLevel> = {
    high: SeverityLevel.HIGH,
    low: SeverityLevel.LOW,
    medium: SeverityLevel.MEDIUM,
  };

  async saveLog({ level, ...log }: LogEntity): Promise<void> {
    const newLog = await prisma.logModel.create({
      data: {
        ...log,
        level: this.parseLevel[level],
      },
    });
    console.log("New log created!!", { newLog });
  }
  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    const logs = await prisma.logModel.findMany({
      where: {
        level: this.parseLevel[severityLevel],
      },
    });

    return logs.map(LogEntity.fromObject);
  }
}
