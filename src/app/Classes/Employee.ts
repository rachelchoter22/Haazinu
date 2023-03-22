import { Jobs } from "./Jobs";
import { User } from "./User";

export class Employee {
    id?: number;
    idUser?: number;
    password?: string;
    jobId?: number;
    email?: string;
    verificationCode:string="";
    idUserNavigation?:User;
     job?:Jobs;
}

