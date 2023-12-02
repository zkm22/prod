import { DBService } from "./db.service";

export class Service {
  
  private _dbService: DBService;

  public get dbService() {
    if (!this._dbService) {
      this._dbService = new DBService();
    }
    return this._dbService;
  }

}

export const DefaultService = new Service();
