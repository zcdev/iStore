CREATE DATABASE iStore;
USE iStore;

CREATE TABLE products (
	id INTEGER(10) AUTO_INCREMENT NOT NULL,
	name VARCHAR(40) NOT NULL,
	category VARCHAR(20) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	quantity INTEGER(10) NOT NULL,
	PRIMARY KEY (id)
);

INSERT INTO products (name, category, price, quantity)
VALUES  ('iPhone', 'Electronics', 1000.00, 400),
		('iPad', 'Electronics', 2000.00, 100),
		('iPod', 'Electronics', 200.00, 300),
		('iWatch', 'Electronics', 2000.00, 400),
		('iTV', 'Electronics', 4000.00, 100),
		('iSing', 'Electronics', 2000.00, 200),
		('iJuice', 'Food', 10.50, 1500),
		('iShoes', 'Appearals', 50.99, 200),
		('iMakeUp', 'Cosmetics', 40.25, 330),
		('iTalk', 'Electronics', 300.00, 555),
		('iCode', 'Electronics', 1000.50, 200),
		('iGarbage', 'Home', 5.00, 150),
        ('iBuprophen', 'Pharmacy', 5.50, 321),
		('iCook', 'Home', 8.00, 80),
		('iDye', 'Cosmetics', 5.55, 99),
		('iShirt', 'Appearals', 17.88, 250),
		('iCan', 'Food', 99.99, 1000),
		('iChow', 'Food', 13.50, 242),
		('iCe Cream', 'Food', 6.66, 666),
		('iSee', 'Electronics', 80.88, 444);