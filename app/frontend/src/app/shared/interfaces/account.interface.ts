import { User } from "../../auth/interfaces/auth.interface";
import { Res, Timestamps } from "./res.interface";

export enum State {
    Active='active',
    Closed='closed',
    Frozen='frozen'
}

export interface AccountType extends Timestamps {
    id:             string;
    name:           string;
    description:    string;
    opening_amount: string;
    currency:       Currency;
}

export interface Currency extends Timestamps {
    id:        string;
    name:      string;
}

export interface AccountTypesRes extends Res {
    account_types: AccountType[];
}

export interface ExchangeRate extends Timestamps{
    id:         string;
    rate:       number;
    currency:   Currency;
}

export interface ExchangeRateRes extends Res {
    exchange_rates: ExchangeRate[];
}

export interface Account extends Timestamps {
    id:                 string;
    user?:              User;
    funds:              number;
    state:              State;
    notifyme:           boolean;
    account_number:     string;
    current_account:    boolean;
    account_address:    string;
    account_type:       AccountType;
}

export interface AccountRes extends Res {
    accounts: Account[]
}

export interface SingleAccount extends Res {
    account: Account;
}

export interface AccountCreate {
    funds:              number;
    notifyme:           boolean;
    account_type_id:       AccountType;
    user_id:            string;
}

export interface CloseAccount extends Timestamps {
    id:         string;
    reason:     string;
    account:    Account;
}

export interface CloseAccountRes extends Res {
    accounts:   CloseAccount[]
}