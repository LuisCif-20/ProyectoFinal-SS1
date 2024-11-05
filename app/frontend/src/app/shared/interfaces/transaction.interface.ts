import { Account } from "./account.interface";
import { Res, Timestamps } from "./res.interface";

export enum Type {
    Debit='debit',
    Credit='credit'
}

export interface Transaction extends Timestamps {
    id:         string;
    type:       Type;
    amount:     number;
    account:    Account;
}

export interface TotalByType {
    type:   Type,
    total:  number
}

export interface TransactionRes extends Res {
    transactions:   Transaction[],
    totalByType:    TotalByType[]
}

export interface AllTran extends Res {
    transactions:   Transaction[];
}