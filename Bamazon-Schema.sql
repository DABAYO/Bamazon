DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
  item_id INTEGER AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(75) NOT NULL,
  department_name VARCHAR(50) NOT NULL,
  price INTEGER(10) DEFAULT 0,
  stock_quantity INTEGER(10) DEFAULT 0,
  PRIMARY KEY(item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("Rocking Chair","Furniture", 40, 19);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("Drone","Toys", 29, 56);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("Bluetooth Speaker","Electronics", 100, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("Wireless Headphones","Electronics", 99, 18);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("Toaster","Kitchen", 14, 31);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("Washing Machine","Aplliances", 360, 18);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("Table Lamp","Furniture", 40, 103);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("Dog Bed","Pet Supplies", 20, 14);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("Soup Bowls, Set of 4","Kitchen", 16, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("Bath Towel","Linens", 8, 34);

