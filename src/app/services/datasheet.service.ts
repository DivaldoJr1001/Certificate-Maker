import { Injectable } from '@angular/core';
import DataJSON from '../../assets/EIC-2019 - trabalhos aceitos.json';

export interface PersonObject {
  Numero: string;
  Titulo: string;
  Nome: string;
  Email: string;
}

@Injectable({
  providedIn: 'root'
})
export class DatasheetService {

  data: PersonObject[] = DataJSON['Trabalhos Aceitos'];
  authorsList: PersonObject[] = [];
  code: string = null;
  repeatID: number;

  currentCode: string = null;
  currentRepeat: number = null;

  constructor() {
  }

  findCode(email: string): string {
    this.currentRepeat = 0;
    this.code = null;

    for (const object of this.data) {
      if (object.Numero === this.currentCode) {
        this.currentRepeat++;
      } else {
        this.currentRepeat = 0;
        this.currentCode = object.Numero;
      }
      if (object.Email.toLowerCase() === email.toLowerCase()) {
        this.code = object.Numero;
        this.repeatID = this.currentRepeat;
      }
    }
    if (this.code === null) {
      return null;
    }
    return this.code + this.repeatID;
  }

  getPersonObject(fullCode: string) {
    const code = fullCode.substring(0, fullCode.length - 1);
    const specificAuthor = parseInt(fullCode.substring(fullCode.length - 1, fullCode.length));

    for (const object of this.data) {
      if (object.Numero === code) {
        this.authorsList.push(object);
      }
    }
    return this.authorsList[specificAuthor];
  }
}
