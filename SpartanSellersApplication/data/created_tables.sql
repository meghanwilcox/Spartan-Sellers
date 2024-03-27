CREATE TABLE Users (
	userID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE CHECK (userID GLOB '[0-9]*'),
	dateCreated Date NOT NULL,
	firstName varchar(20) NOT NULL,
	lastName varchar(20) NOT NULL,
	email varchar(50) NOT NULL,
	password varchar(30) NOT NULL,
	userType varchar(15) NOT NULL CHECK (userType IN ('admin', 'shopper'))
);

CREATE TABLE Categories (
	categoryID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE,
	categoryName varchar(20) NOT NULL UNIQUE CHECK(categoryName IN('Tea', 'Coffee', 'Accessories')),
	categoryOrder INTEGER NOT NULL UNIQUE CHECK(categoryOrder BETWEEN 1 AND 3)
);

CREATE TABLE Products (
	userID INTEGER NOT NULL,
	productID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE CHECK (productID GLOB '[0-9]*'),
	name varchar(50) NOT NULL,
	description varchar(200) NOT NULL,
	imageURL varchar(100) NOT NULL,
	price numeric(7,2) NOT NULL,
	quantity INTEGER NOT NULL, 
	category varchar(20) NOT NULL,
	isFeatured BOOL NOT NULL,
	FOREIGN KEY(userID) references User(userID),
	FOREIGN KEY(category) references Category(categoryName)
);

CREATE TABLE Carts (
	userID INTEGER NOT NULL,
	cartID INTEGER PRIMARY KEY NOT NULL UNIQUE CHECK(cartID GLOB '[0-9]*'),
	status varchar(20) NOT NULL CHECK(status IN('new', 'abandoned', 'purchased')),
	createdDate Date NOT NULL,
	FOREIGN KEY(userID) references User(userID)
);

CREATE TABLE CartProducts (
	userID INTEGER NOT NULL,
  	cartID INTEGER NOT NULL,
  	productID INTEGER NOT NULL,
  	quantity INTEGER NOT NULL,
  	PRIMARY KEY(userID, cartID, productID),
  	FOREIGN KEY(userID) references User(userID),
  	FOREIGN KEY(cartID) references Cart(cartID),
  	FOREIGN KEY(productID) references Product(productID)
);
