DROP DATABASE IF EXISTS QA_Data;

CREATE DATABASE QA_Data;

USE QA_Data;

DROP TABLE IF EXISTS Questions;
DROP TABLE IF EXISTS Answers;
DROP TABLE IF EXISTS Photos;
DROP TABLE IF EXISTS Users;

CREATE TABLE Users (
  userId INT PRIMARY KEY,
  email VARCHAR(50) NOT NULL UNIQUE,
  name VARCHAR(50) NOT NULL
);


CREATE TABLE Questions (
  question_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  productId INT NOT NULL,
  questionBody TEXT NOT NULL,
  questionDate BIGINT,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  reported BOOLEAN DEFAULT 0 NOT NULL,
  question_helpfulness SMALLINT DEFAULT 0 NOT NULL
);

CREATE TABLE Answers (
  answer_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  questionID INT,
  body TEXT NOT NULL,
  date BIGINT,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  reported BOOLEAN DEFAULT 0 NOT NULL,
  helpfulness SMALLINT DEFAULT 0 NOT NULL,
  FOREIGN KEY(questionID) REFERENCES Questions(question_id)
);


CREATE TABLE Photos (
  photoId INT PRIMARY KEY AUTO_INCREMENT,
  answerID INT,
  url VARCHAR(500),
  FOREIGN KEY(answerID) REFERENCES Answers(answer_id)
);

/*----------------Terminal Command to import csv file into mySQL database--------------------*/
--LOAD DATA LOCAL INFILE '/Users/junma/Desktop/SDC/questions.csv'INTO TABLE Questions FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 ROWS;
--LOAD DATA LOCAL INFILE '/Users/junma/Desktop/SDC/answers.csv'INTO TABLE Answers FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 ROWS;
--LOAD DATA LOCAL INFILE '/Users/junma/Desktop/SDC/answers_photos.csv'INTO TABLE Photos FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 ROWS;


/* one photo can only refer to one answer */
/* one answer can only refer to one question */
/* one question can only refer to one product

look at smallInt for url
asker/answerer might be the same person (might wanna store the email, )
*/


/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *    mysql -u root < schemas/schema.sql
 *  to create the database and the tables.*/