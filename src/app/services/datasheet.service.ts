import { Injectable } from "@angular/core";
import DataJSON from "../../assets/EIC-2019 - trabalhos aceitos.json";

export interface PersonObject {
  Numero: string;
  Titulo: string;
  Centro: string;
  Nome: string;
  Email: string;
}

@Injectable({
  providedIn: "root"
})
export class DatasheetService {

  data: PersonObject[] = DataJSON["Trabalhos Aceitos"];

  currentCode: string = null;
  currentRepeat: number = null;

  constructor() {}

  doesItExist(email: string): boolean {
    let exists = false;
    for (const object of this.data) {
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

  findAuthorsList(code: string): PersonObject[] {
    let authorsList = [];
    for (const object of this.data) {
      if (object.Numero === code) {
        authorsList.push(object);
      }
    }
    return authorsList;
  }
}
