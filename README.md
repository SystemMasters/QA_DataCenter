# SystemMasters Questions & Answers API Service

> The goal of this project was to build a scalable RESTful API service for a retail web-portal and optimize to handle web-scale traffic. An ETL process was implemented to migrate legacy datasets of more than 20M+ records into a MySQL database. 

---

## Table of Contents

1. [Achievements and Optimizations](#Achievements-and-Optimizations)
2. [Load Testing](#Load-Testing)
3. [Installing Dependencies](#Installing-Dependencies)
4. [Tech Stack](#Tech-Stack)
5. [Routes](#Routes)

---

## Achievements-and-Optimizations

- Scaled microservice horizontally to handle 2100 requests per second by deploying four servers through the load balancer and implementing the least connection algorithm
- Reduced query time from 5800ms to 21ms by incorporating data partitioning, foreign keys, and indexes
- Stress tested by using k6 and loader.io to monitor improvements and identify performance bottleneck 

---

## Load-Testing
![Loader.io Final Result](https://user-images.githubusercontent.com/79078502/147036902-307dd92a-39fe-45de-9615-3270c19da1ea.jpg)

---

## Installing-Dependencies

### Navigate to the root directory and run the following in your terminal:

>*Install dependencies*
```
npm install
```
>*Start the server*
```
npm start
```
Open `http://localhost:8080`

---

## Tech-Stack

- [Node.js](https://nodejs.org)
- [Express](http://expressjs.com/)
- [MySQL](https://www.mysql.com/)
- [AWS (EC2)](https://aws.amazon.com/console/)
- [Loader.io](https://loader.io/)
- [K6](https://k6.io/)

---

## Routes

| Request Type | Endpoint                                 | Returns                                                               | Status |
|--------------|------------------------------------------|-----------------------------------------------------------------------|:--------:|
| GET          | /qa/questions/:product_id/:page/:count   | A list of questions for a particular product                          | 200    |
| GET          | /qa/questions/:question_id/answers       | All answers for a given question                                      | 200    |
| POST         | /qa/questions                            | Nothing is returned - adds an answer for the given question           | 201    |
| PUT          | /qa/questions/:question_id/helpful       | Nothing is returned - updates a question to show it was found helpful | 204    |

---
