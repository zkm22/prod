import { DBClient } from "database";

export class DBService {

  private dbClient = new DBClient();

  public async signup(username: string, password: string) {
    return await this.dbClient.db.user.signup(username, password);
  }

  public async login(username: string, password: string) {
    return await this.dbClient.db.user.login(username, password);
  }

  public async getUsers() {
    return await this.dbClient.db.user.findMany();
  }

}