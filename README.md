[![Build Status](https://travis-ci.org/IAMOTZ/Ievents.svg?branch=develop)](https://travis-ci.org/IAMOTZ/Ievents)
[![Coverage Status](https://coveralls.io/repos/github/IAMOTZ/Ievents/badge.svg?branch=develop)](https://coveralls.io/github/IAMOTZ/Ievents)  
# [Ievents](https://ievents-otz.herokuapp.com)
This is a web application to help manage event centers.  
Given you manage event centers, this app will help you accept applications to use your center/facilities, and will either decline events when the proposed day is already taken, or suggest an available day.  

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

#### Prerequisite
>- Git
>- Node
>- Postgres Database
>- A Cloudinary Account

#### Installation
>- Clone the repository `$ git clone https://github.com/IAMOTZ/Ievents.git`
>- Change into the directory 
>- Use `$ npm install` to install all the dependency packages.
> - Create a `.env` file in the root folder to provide all the needed enviroment variables 
> - - `DB_USERNAME=database-user-name`
> - - `DB_PASSWORD=database-password`
> - - `DB_DEV_NAME=development-database-name`
> - - `DB_TEST_NAME=testing-database-name`
> - - `DB_HOST=database-host`
> - - `DB_PORT=database-port`
> - - `SUPER_ADMIN_NAME=the-default-admin-name`
> - - `SUPER_ADMIN_EMAIL=the-default-admin-email`
> - - `SUPER_ADMIN_PASSWORD=the-default-admin-password`
> - - `CLOUDINARY_CLOUD_NAME=your-cloud-name`
> - - `CLOUDINARY_API_KEY=yor-api-key`
> - - `CLOUDINARY_API_SERCRET=your-api-secret`
> - - `CLOUDINARY_CLOUD_FOLDER=folder-name` (optional)
> - - `JSON_WEB_TOKEN_SECRETE=any-set-of-characters-you-like`
> - Use `$ npm start` to run the app in production
> - Use `$ npm run server:dev` to start the server for develpment
> - Use `$ npm run react:dev` to start webpack-dev-server for react development(make sure to start the server first)
> - Use `$ npm run template:dev` to start gulp and broswerSync for template development
> - Use `$ npm test` to run the server integration test


## Features
> - Users can create account(signup/signin/signout)
> - Users can add events(same as booking a center)
> - Users can modify their events
> - Users can delete their events
> - Users can see the status of their events(allowed, canceled or done)
> - Users can view all the centers in the application 
> - Users can view the details of a center
> - Admin user can add a center
> - Admin user can modify a particular center
> - Admin user can see all the events booked for different centers
> - Admin user can cancel an event
> - Admin user can add more admin

## Technologies and Services

### Development
> - Node
> - Express
> - Postgres
> - React
> - Cloudinary
### CI Tools
> - Travis
> - Coveralls
> - Code Climate
### Hosting
> - Heroku

## Useful links

> - Hosted App: https://ievents-otz.herokuapp.com
> - Hosted API: https://ievents-otz.herokuapp.com/api/v1/\<endpoint>


## Contributing

To contribute to this project:
>- Fork the repository.
>- Make your commits
>- Raise a pull request.  

#### Any other form of contribution is also allowed, as long as it makes this project get better.

## Author

**Ogunniyi Tunmise** 

## Acknowledgments

>- **Andela** 
