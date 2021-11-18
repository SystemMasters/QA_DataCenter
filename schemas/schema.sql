DROP DATABASE IF EXISTS QA_Data;

CREATE DATABASE QA_Data;

DROP TABLE IF EXISTS Questions;
DROP TABLE IF EXISTS Answers;
DROP TABLE IF EXISTS Photos;


CREATE TABLE Questions (
  question_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  question_body TEXT NOT NULL,
  question_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  asker_name VARCHAR(255) NOT NULL,
  question_helpfulness SMALLINT DEFAULT 0 NOT NULL,
  reported BOOLEAN DEFAULT false NOT NULL,
  product_id INT NOT NULL
  /*should product_id be a foreign key? if so, another table for product?*/
);

CREATE TABLE Answers (
  answer_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  body TEXT NOT NULL,
  date DATETIME DEFAULT CURRENT_TIMESTAMP,
  answerer_name VARCHAR(255) NOT NULL,
  helpfulness SMALLINT DEFAULT 0 NOT NULL,
  questionID FOREIGN KEY REFERENCES Questions(question_id)
);


CREATE TABLE Photos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  url VARCHAR(255),
  answerID FOREIGN KEY REFERENCES Answers(answer_id)
);

/* one photo can only refer to one answer */
/* one answer can only refer to one question */
/* one question can only refer to one product

look at smallInt for url
asker/answerer might be the same person (might wanna store the email, )
*/
