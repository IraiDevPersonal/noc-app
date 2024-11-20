import { CheckService } from "./domain/use-cases/checks/check-service";
import { CronService } from "./presentation/cron/cron-service";
import { Server } from "./presentation/server";

(() => {
  main();
})();

function main() {
  Server.start();

  CronService.createJob("*/5 * * * * *", () => {
    const url = "https://google.com";
    const checkService = new CheckService(
      () => console.log(`${url} OK`),
      (errorMessage) => console.log(errorMessage)
    );
    checkService.execute(url);
    // checkService.execute("http://localhost:3000");
  });
}
