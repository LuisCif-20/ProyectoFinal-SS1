create database debit_bank;

use debit_bank;

create table roles (
	id char(36) primary key default (uuid()),
	role_name varchar(25) unique not null	 
);

create table users (
	id char(36) primary key default (uuid()),
	email varchar(50) unique not null,
	role_id varchar(36) not null,
	password varchar(60) not null,
	birthdate date not null,
	first_name varchar(25) not null,
	last_name varchar(25) not null,
	notifyme boolean default false,
);

create table bank_accounts (
	id char(36) primary key default (uuid()),
	user_id char(36) not null,
	account_type enum('basic', 'premium', 'plus') default 'basic',
	account_number varchar(10) unique not null,
	name varchar(100) not null,
	funds decimal(10, 2) not null,
	currency enum('GTQ', 'USD', 'EUR') default 'GTQ',
	state enum('active', 'closed', 'frozen') default 'active',
	creation_date date not null,
	unique(user_id, account_type),
	foreign key (user_id) references users(id)
);
