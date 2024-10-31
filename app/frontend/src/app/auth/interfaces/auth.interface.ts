import { Res, Timestamps } from "../../shared/interfaces/res.interface";

export enum AuthStatus {
    Checking='Checking',
    Authenticated='Authenticated',
    NotAuthenticated='NotAuthenticated'
};

export enum Gender {
    Male='male',
    Female='female',
    Other='other'
};

export interface LoginBody {
    email:  string;
    pin:    string;
};

export interface LoginRes extends Res {
    access_token:   string;
};

export interface Role extends Timestamps {
    id:     string;
    name:   string;
};

export interface User extends Timestamps {
    id:         string;
    email:      string;
    gender:     Gender;
    user_name:  string;
    last_name:  string;
    birthdate:  Date;
    first_name: string;
    role:       Role;
};

export interface MakeUser {
    pin:        string;
    email:      string;
    gender:     Gender;
    user_name:  string;
    last_name:  string;
    birthdate:  Date;
    first_name: string;
    type:       'admin' | 'client';
}

export interface UserRes extends Res {
    user:   User;
};