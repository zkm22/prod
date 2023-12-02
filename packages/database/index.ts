import { PrismaClient } from '@prisma/client';
import * as Crypto from 'crypto-js';

export * from '@prisma/client';

export class DBClient {

  private _key?: string = '222';

  get key() {
    if (!this._key) {
      throw('have no key');
    }
    return this._key;
  }

  encrypt(str: string) {
    return Crypto.AES.encrypt(str, this.key);
  }

  decrypt(str: string) {
    return Crypto.AES.decrypt(str, this.key);
  }

  public db = new PrismaClient().$extends({
    model: {
      'user': {
        signup: async (username: string, password: string) => {
          const _username = Crypto.AES.encrypt(username, password).toString();
          const _password = Crypto.AES.encrypt(password, username).toString();
          return await this.db.user.create({
            'data': {
              'name': _username,
              'password': _password,
            }
          });
        },
        login: async (username: string, password: string) => {
          const _username = Crypto.AES.encrypt(username, password).toString();
          const _password = Crypto.AES.encrypt(password, username).toString();
          const user = await this.db.user.findFirst({
            'where': {
              'name': _username,
              'password': _password,
            }
          });
          this._key = password;
          return user;
        }
      }
    },
    query: {
      'user': {
        findMany: async ({model, operation, args, query}) => {
          const res = await query(args);
          return res.map(e => {
            e.password = this.decrypt(e.password ?? '').toString(Crypto.enc.Utf8);
            e.name = this.decrypt(e.name ?? '').toString(Crypto.enc.Utf8);
            return e;
          });
        }
      },
      'git': {
        create: async ({model, operation, args, query}) => {
          args.data.url = this.encrypt(args.data.url).toString();
          args.data.name = this.encrypt(args.data.name).toString();
          args.data.token = this.encrypt(args.data.token).toString();
          return await query(args);
        },
        findMany: async ({model, operation, args, query}) => {
          const res = await query(args);
          return res.map(e => {
            e.url = this.decrypt(e.url ?? '').toString(Crypto.enc.Utf8);
            e.token = this.decrypt(e.token ?? '').toString(Crypto.enc.Utf8);
            e.name = this.decrypt(e.name ?? '').toString(Crypto.enc.Utf8);
            return e;
          });
        }
      }
    }
  })
}
