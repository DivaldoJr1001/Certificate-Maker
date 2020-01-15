import { Injectable } from '@angular/core';
import PersonList from '../../assets/Lista de Participantes.json';
import WorksList from '../../assets/Lista de Trabalhos.json';

export interface PersonObject {
  Nome: string;
  Email: string;
  Trabalhos: WorkObject[];
  Enviado: boolean;
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

  personList: PersonObject[] = PersonList;

  worksList: WorkObject[] = WorksList;

  currentCode: string = null;

  certificadosPath: string = null;

  constructor() {}

  doesEmailExist(email: string): boolean {
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
    for (const object of this.worksList) {
      if (object.Numero === code) {
        exists = true;
      }
    }
    return exists;
  }

  findProjectName(code: string): string {
    let projectName = '';
    for (const object of this.worksList) {
      if (object.Numero === code) {
        projectName = object.Titulo;
      }
    }
    return projectName;
  }

  findProjectCode(email: string): string[] {
    const codeList = [];
    for (const person of this.personList) {
      if (person.Email === email) {
        for (const work of person.Trabalhos) {
          codeList.push(work.Numero);
        }
        break;
      }
    }
    return codeList;
  }

  getProject(code: string): WorkObject {
    for (const work of this.worksList) {
      if (work.Numero === code) {
        return work;
      }
    }
    return null;
  }

  findUsername(email: string): string {
    let username: string;
    for (const person of this.personList) {
      if (person.Email === email) {
        username = person.Nome;
      }
    }
    return username;
  }

  findAuthorsList(code: string): PersonObject[] {
    const authorsList: PersonObject[] = [];
    for (const person of this.personList) {
      if (this.isAuthor(person, code)) {
        authorsList.push(person);
      }
    }
    return authorsList;
  }

  isAuthor(person: PersonObject, code: string) {
    for (const work of person.Trabalhos) {
      if (work.Numero === code) {
        return true;
      }
    }

    return false;
  }
}
