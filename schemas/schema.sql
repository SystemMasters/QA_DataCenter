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
  question_body TEXT NOT NULL,
  question_date DATETIME,
  asker_name VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  reported BOOLEAN DEFAULT 0 NOT NULL,
  question_helpfulness SMALLINT DEFAULT 0 NOT NULL
);

CREATE TABLE Answers (
  answer_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  questionID INT,
  body TEXT NOT NULL,
  date DATETIME,
  answerer_name VARCHAR(50) NOT NULL,
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



 /*----------------LOAD LOCAL CSV FILE & PREPROCESS INPUT--------------------*/

  -- LOAD DATA LOCAL INFILE '/Users/junma/Desktop/SDC/questions.csv'INTO TABLE Questions
  -- FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS
  -- (question_id, productId, question_body, @question_date, asker_name, email, reported, question_helpfulness)
  -- SET question_date = FROM_UNIXTIME(@question_date/1000, "%Y-%m-%dT00:00:00Z");

  -- LOAD DATA LOCAL INFILE '/Users/junma/Desktop/SDC/answers.csv'INTO TABLE Answers FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS
  -- (answer_id, questionID, body, @date, answerer_name, email, reported, helpfulness)
  -- SET date = FROM_UNIXTIME(@date/1000, "%Y-%m-%d T00:00:00Z");

 --LOAD DATA LOCAL INFILE '/Users/junma/Desktop/SDC/answers_photos.csv'INTO TABLE Photos FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS;


 /*----------------CREATE INDEX--------------------*/
 --CREATE INDEX idx_productId ON questions (productId)
 --CREATE INDEX idx_questionID ON answers (questionID)
 --CREATE INDEX idx_answerID ON photos (answerID)


 /*  Execute this file from the command line by typing:
  *    mysql -u root < schemas/schema.sql
  *  to create the database and the tables.*/

