import { logins } from './logins';
import { Person } from './Person';
import { Role } from './Role';

export class User {
  id: number;
  username: string;
  password: string;
  objPerson: Person;
  objRole: Role;
  logins: logins[];

  constructor() {
    this.objPerson = new Person();
    this.objRole = new Role();
  }
}
