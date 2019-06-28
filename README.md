# water-my-plants-BE

Building a schedule around ensuring that all your plants are watered is actually pretty difficult. **Water My Plants** helps to solve those problems by providing and easy to use interface for creating a plant watering schedule that will remind users to water their plants on a regular basis.

## Table of contents

* [Deployed app](#deployed-app)
* [Contributors](#contributors)
* [Technologies used and dependencies](#built-with)
* [Installation](#installation)
* [Endpoints description](#endpoints-description)
* [Environmental variables](#environmental-variables)
* [License](#license)

## Deployed app

Check out the demo of our API here: [DEMO](https://water-my-plants-api.herokuapp.com/).


## Contributors

<table>
	<tr>
		<td align="center">
			<a href="https://github.com/ivanahuckova">
				<img src="https://raw.githubusercontent.com/TMSDNE/user-interface/master/public/assests/images/Ivana-Huckova.png" width="128px;" alt="Ivana Huckova"/>
				<br />
				<sub>
					<b>Ivana Huckova</b>
					<p>Backend Developer</p>
				</sub>
			</a>
		</td>
	</tr>
</table>

Contributions of any kind welcome!

## Built with

* JavaScript (ECMAScript 6+)
* Express.js
* Knex
* PostgreSQL DB
* jsonwebtoken
* Jest
* Supertest
* Twilio
* Circle CI

## Dependencies

* [bcryptjs 2.4.3](https://www.npmjs.com/package/bcryptjs)
* [cors 2.8.5](https://www.npmjs.com/package/cors)
* [dotenv 8.0.0](https://www.npmjs.com/package/dotenv)
* [express 4.17.1](https://www.npmjs.com/package/express)
* [helmet 3.18.0](https://www.npmjs.com/package/helmet)
* [jsonwebtoken 8.5.1](https://www.npmjs.com/package/jsonwebtoken)
* [knex 0.17.6](https://www.npmjs.com/package/knex)
* [pg 7.11.0](https://www.npmjs.com/package/pg)
* [sqlite3 4.0.9](https://www.npmjs.com/package/sqlite3)
* [twilio 3.32.0](https://www.npmjs.com/package/twilio)
* [uuid 3.3.2](https://www.npmjs.com/package/uuid)
* [jest 24.8.0](https://www.npmjs.com/package/jest)
* [nodemon 1.19.1](https://www.npmjs.com/package/nodemon)
* [supertest 4.0.2](https://www.npmjs.com/package/supertest)


## Installation

We recommend to set up this app on [Heroku](https://www.heroku.com).
1. Fork the repository.
2. Set up an account at Heroku.
3. Create new app.
4. Connect your Github account to Heroku.
5. Select the forked repository.
6. Add the appropriate plugins (Heroku Postgres and Scheduler).
7. Set up the environmental variables.
8. You are all set!

## Endpoints description

### Auth Routes

**user_id = unique id for each user generated on backend**

#### **POST : /api/auth/register**

**Overview**

Used to register a user and ensure that user information will be saved in the server

**Inputs**

Javascript object:

- username - **string, required**
- email - **string, required, unique**
- phone_number - **string, required, unique**
- password - **string, required**

      {
    	"email": "tony@stark.com",
    	"username": "Tony",
    	"phone_number": "+420004356783",
    	"password": "tony12345" 
      }

**Success Outputs**

Javascript object with success message.

    { message: "success message" } 

**Failure Outputs**

Javascript object with error.

    { error: "failure error" } 

#### **POST:  /api/auth/login**

**Overview**

Used to log in and get authentication for accessing the main functionalities of the React app.

**Inputs**

Javascript object:

- email  - **string, required**
- password - **string, required**

      {
    	"email": "tony@stark.com",
    	"password": "tony12345"
      }

**Success Outputs**

Javascript object with token used for accessing restricted endpoints.

    {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoiNGU4Y2E0OGItZmRiNS00ZmExLWFmNmUtOWFiZjY3YTBhZGE1IiwiZW1haWwiOiJpdmFuYUBpdmFuYS5jb20iLCJpYXQiOjE1NjE1Njc2NzYsImV4cCI6MTU2MTgyNjg3Nn0.ktnILuhbh5HD9LmolRxk125Eg3xyd15H2omWB-i_uC8"
    }

**Failure Outputs**

Javascript object with error.

    { error: "failure error" } 

### Plants Routes - only logged in users with token in header

**plant_id = unique id for each plant generated on backend and used to access each plant**

#### **POST : /api/plants**

**Overview**

Used to create new plant by user.

**Inputs**

Javascript object:

- name - **string**
- img_id - **string, required**
- height - **integer**
- plant_type - **string, required**
- watering_frequency - **integer, required**
- last_watered_at - **timestamp, required**

      {
    	"name": "John",
    	"img_id": "1",
    	"height": "3"
    	"plant_type": "Tulip",
    	"watering_frequency": "7",
    	"last_watered_at": "2016-01-13 17:38:42",
      }

**Success Outputs:**

Javascript object with plant_id of created plant.

    {
    "plant_id": "eyJhbGiJIUz-IsInR5cCI6IkpXV76-827u-u6"
    }

**Failure Outputs**

Javascript object with error.

    { error: "failure error" } 

#### GET **: /api/plants**

**Overview**

Used to get all plants that were created by the user

**Success Outputs:**

Javascript object with array of plants objects. 

    [
        {
            "table_id": 5,
            "plant_id": "496b9834-038e-4c4d-91ac-5d1f5fcaa211",
            "plant_type": "Suflower",
            "user_id": "01e2d860-37ef-45f7-a383-bfdc0dd2ae35",
            "name": "Greta",
            "img_id": "2",
            "last_watered_at": "2019-06-23T05:10:25.000Z",
            "next_watering_at": "2019-06-28T05:10:25.000Z",
            "height": 44,
            "watering_frequency": 5
        },
        {
            "table_id": 6,
            "plant_id": "f397fe2f-f2a0-44c2-bc92-0de9d3baa45d",
            "plant_type": "Tulip",
            "user_id": "01e2d860-37ef-45f7-a383-bfdc0dd2ae35",
            "name": "John",
            "img_id": "1",
            "last_watered_at": "2019-06-24T05:10:25.000Z",
            "next_watering_at": "2019-06-28T05:10:25.000Z",
            "height": 12,
            "watering_frequency": 4
        },
    ]

**Failure Outputs**

Javascript object with error.

    { error: "failure error" } 

#### GET **: /api/plants/:plant_id**

**Overview**

Used to get plant with specific id that was created by the user

**Success Outputs**

Javascript object with array of plant object. 

    {
        "table_id": 5,
        "plant_id": "496b9834-038e-4c4d-91ac-5d1f5fcaa211",
        "plant_type": "Suflower",
        "user_id": "01e2d860-37ef-45f7-a383-bfdc0dd2ae35",
        "name": "Greta",
        "img_id": "2",
        "last_watered_at": "2019-06-23T05:10:25.000Z",
        "next_watering_at": "2019-06-28T05:10:25.000Z",
        "height": 44,
        "watering_frequency": 5
    }

**Failure Outputs**

Javascript object with error.

    { error: "failure error" } 

#### GET **: /api/plants/:plant_id/height**

**Overview**

Used to get history of plants height

**Success Outputs**

Javascript object with array of plant object with height change. 

    [
        {
            "table_id": 4,
            "plant_id": "496b9834-038e-4c4d-91ac-5d1f5fcaa211",
            "user_id": "01e2d860-37ef-45f7-a383-bfdc0dd2ae35",
            "created_at": "2019-06-25T17:56:03.920Z",
            "height": "44"
        },
        {
            "table_id": 5,
            "plant_id": "496b9834-038e-4c4d-91ac-5d1f5fcaa211",
            "user_id": "01e2d860-37ef-45f7-a383-bfdc0dd2ae35",
            "created_at": "2019-06-26T17:56:03.920Z",
            "height": "45"
        }
    ]

**Failure Outputs**

Javascript object with error.

    { error: "failure error" } 

#### GET **: /api/plants/:plant_id/watered**

**Overview**

Used to get history of plants watering frequency

**Success Outputs:**

Javascript object with array of plant object with watering dates. 

Example:

    [
        {
            "table_id": 4,
            "plant_id": "496b9834-038e-4c4d-91ac-5d1f5fcaa211",
            "user_id": "01e2d860-37ef-45f7-a383-bfdc0dd2ae35",
            "last_watered_at": "2019-06-23T05:10:25.000Z"
        },
        {
            "table_id": 5,
            "plant_id": "496b9834-038e-4c4d-91ac-5d1f5fcaa211",
            "user_id": "01e2d860-37ef-45f7-a383-bfdc0dd2ae35",
            "last_watered_at": "2019-06-24T05:10:25.000Z"
        }
    ]

**Failure Outputs**

Javascript object with error.

    { error: "failure error" } 

#### PUT **: /api/plants/:plant_id**

**Overview**

Used to update plant with specific id that was created by the user

**Inputs**

Javascript object with optional items for update:

- name - **string**
- img_id - **string**
- height - **integer**
- plant_type - **string**
- watering_frequency - **integer**
- last_watered_at - **timestamp**

Example:

    	{
    		"watering_frequency": "7",
    		"height": "7"
    	}

**Success Outputs**

Javascript object with success message.

    { message: "success message" } 

**Failure Outputs**

Javascript object with error.

    { error: "failure error" } 

#### DELETE **: /api/plants/:plant_id**

**Overview**

Used to delete plant with specific id that was created by the user

**Success Outputs**

Javascript object with success message.

    { message: "success message" } 

**Failure Outputs**

Javascript object with error.

    { error: "failure error" } 

### User Routes - only logged in users with token in header

#### GET **: /api/profile**

**Overview**

Used to get data about user

**Success Outputs:**

Javascript object with array of plants objects. 

Example:

    {
        "user_id": 1,
        "username": "Sansa",
        "email": "sansa@stark.com",
        "phone_number": "123456789"
    }

**Failure Outputs**

Javascript object with error.

    { error: "failure error" } 

#### PUT **: /api/profile**

**Overview**

Used to update users profile

**Inputs:**

Javascript object with optional for update:

- username  - string
- password - string
- email  - string
- phone_number - string

Example:

    	{
        "phone_number": "+7868188181",
    	}

**Success Outputs**

Javascript object with success message.

    { message: "success message" } 

**Failure Outputs**

Javascript object with error.

    { error: "failure error" } 

#### DELETE **: /api/profile**

**Overview**

Used to delete user

**Failure Outputs**

Javascript object with error.

    { error: "failure error" } 

**Failure Outputs**

Javascript object with error.

    { error: "failure error" } 

**Failure Outputs**

Javascript object with error.

    { error: "failure error" }
    
## Environmental variables

Remember to set up the required environmental variables, especially when deploying on Heroku.

* `ENV` = production
* `SECRET_KEY` as a secret key of your choice
* `TWILLIO_TOKEN` 
* `TWILLIO_SID`
* `TWILIO_MESSAGING_SERVICE_SID`
* `DATABASE_URL`

## For more information

[Lambda School](https://lambdaschool.com)

## License

[MIT License](LICENSE)
