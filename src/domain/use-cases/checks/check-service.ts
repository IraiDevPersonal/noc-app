interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = (errorMEssage: string) => void;

export class CheckService implements CheckServiceUseCase {
  constructor(
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback
  ) {}

  public async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url);

      if (!req.ok) {
        throw new Error(`Error al checkear servicio: ${url}`);
      }

      this.successCallback();
      return true;
    } catch (error) {
      const errorMessage = `${error}`;
      console.log(errorMessage);
      this.errorCallback(errorMessage);
      return false;
    }
  }
}
