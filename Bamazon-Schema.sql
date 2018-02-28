drop database if exists bamazon_db;
create database bamazon_db;

use bamazon_db;

create table products(
  item_id integer auto_increment not null,
  product_name varchar(75) not null,
  department_name varchar(50) not null,
  price integer(10) default 0,
  stock_quantity integer(10) default 0,
  primary key(item_id)
);

select * from products;

