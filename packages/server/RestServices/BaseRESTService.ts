export default abstract class BaseRESTService {
  abstract find?: (...args: any[]) => Promise<any>;
  abstract create?: (...args: any[]) => Promise<any>;
  abstract getAll?: (...args: any[]) => Promise<any>;
}
