import { Injectable } from '@angular/core';
import DataJSON from '../../assets/EIC-2019 - trabalhos aceitos.json';

export interface FullObject {
  Numero: string;
  Titulo: string;
  Centro: string;
  Nome: string;
  Email: string;
}

export interface PersonObject {
  Nome: string;
  Email: string;
  Trabalhos: string[];
}

export interface WorkObject {
  Numero: string;
  Titulo: string;
  Centro: string;
}

@Injectable({
  providedIn: 'root'
})
export class DatasheetService {

  data: FullObject[] = DataJSON['Trabalhos Aceitos'];

  personList: PersonObject[] = [];

  worksList: WorkObject[] = [];

  currentCode: string = null;
  currentRepeat: number = null;

  downloadPath: string = null;

  constructor() {
    this.data.sort((a, b) => (a.Nome.toLowerCase() > b.Nome.toLowerCase()) ? 1 : -1);

    this.personList.push(this.personConstructor(this.data[0].Nome, this.data[0].Email.toLowerCase(), [this.data[0].Numero]));

    for (const object of this.data) {
      if (object.Email !== this.personList[this.personList.length - 1].Email) {
        this.personList.push(this.personConstructor(object.Nome, object.Email.toLowerCase(), [object.Numero]));
      } else {
        this.personList[this.personList.length - 1].Trabalhos.push(object.Numero);
        this.personList[this.personList.length - 1].Trabalhos.sort((a, b) => (a > b) ? 1 : -1);
      }
    }

    this.personList[0].Trabalhos.pop();

    this.data.sort((a, b) => (a.Numero > b.Numero) ? 1 : -1);

    this.worksList.push(this.workConstructor(this.data[0].Numero, this.data[0].Titulo, this.data[0].Centro));

    for (const object of this.data) {
      if (object.Numero !== this.worksList[this.worksList.length - 1].Numero) {
        this.worksList.push(this.workConstructor(object.Numero, object.Titulo, object.Centro));
      }
    }

    console.log(this.personList);
    console.log(this.worksList);
  }

  personConstructor(nome: string = '', email: string = '', trabalhos: string[] = ['']): PersonObject {
    let person: PersonObject = {
      Nome: nome,
      Email: email,
      Trabalhos: trabalhos
    };

    return person;
  }

  workConstructor(numero: string = '', titulo: string = '', centro: string = ''): WorkObject {
    let work: WorkObject = {
      Numero: numero,
      Titulo: titulo,
      Centro: centro
    };

    return work;
  }

  doesItExist(email: string): boolean {
    let exists = false;
    for (const object of this.personList) {
      if (object.Email.toLowerCase() === email.toLowerCase()) {
        exists = true;
      }
    }
    return exists;
  }

  doesCodeExist(code: string): boolean {
    let exists = false;
    for (const object of this.data) {
      if (object.Numero === code) {
        exists = true;
      }
    }
    return exists;
  }

  findProjectName(code: string): string {
    let projectName = '';
    for (const object of this.data) {
      if (object.Numero === code) {
        projectName = object.Titulo;
      }
    }
    return projectName;
  }

  findProjectCode(email: string): string[] {
    let codeList = [];
    for (const object of this.data) {
      if (object.Email === email) {
        codeList.push(object.Numero);
      }
    }
    return codeList;
  }

  findUsername(email: string): string {
    let username: string;
    for (const object of this.data) {
      if (object.Email === email) {
        username = object.Nome;
      }
    }
    return username;
  }

  findAuthorsList(code: string): FullObject[] {
    let authorsList = [];
    for (const object of this.data) {
      if (object.Numero === code) {
        authorsList.push(object);
      }
    }
    return authorsList;
  }
}
