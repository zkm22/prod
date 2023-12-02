class GlobalStates {

  private _password?: string;

  get password() {
    if (this._password === undefined || this._password === null) {
      throw('no password');
    }
    return this._password;
  }

  set password(p: string) {
    this._password = p;
  }

}

export const globalStates = new GlobalStates;
