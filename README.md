# ievents [![Build Status](https://travis-ci.org/IAMOTZ/Ievents.svg?branch=develop)](https://travis-ci.org/IAMOTZ/Ievents) [![Coverage Status](https://coveralls.io/repos/github/IAMOTZ/Ievents/badge.svg?branch=develop)](https://coveralls.io/github/IAMOTZ/Ievents)

This is a web application to help manage event centers - https://ievents-otz.herokuapp.com/   
Given you manage event centers, this app will help you accept applications to use your center/facilities, and will either decline events when the proposed day is already taken, or suggest an available day.

## Hosted Application
The Application is hosted on heroku here: https://ievents-otz.herokuapp.com/

## API Documentation
The API for this application is documented here: https://ievents-otz.herokuapp.com/api-docs

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

#### Prerequisites
- Git
- Node
- Postgres Database
- A Cloudinary Account

#### Installation
- Clone the repository `$ git clone https://github.com/IAMOTZ/Ievents.git`
- Change into the directory of the project
- Use `$ npm install` to install all the dependency packages.
- Create a `.env` file in the root folder to provide all the needed environment variables as specified in `.env.example`
- Use `$ npm start` to run the app in production
- Use `$ npm run dev:server` to start the server for develpment
- Use `$ npm run dev:client` to start `webpack-dev-server` for client development(make sure to start the server first)
- Use `$ npm run dev:template` to start gulp and browserSync for template development

#### Testing
The applicaiton uses:
- `Mocha` and `Chai` for the server side testing
- `Jest` for client side testing
- `Nightwatch` for End to End testing  

Run the following to execute the tests
- Use `$ npm run test:server` to run the server tests
- Use `$ npm run test:client` to run the client tests
- Use `$ npm run e2e:setup` to set up the End to End test and then `$ npm run e2e:test` to run the End to End tests


## Features

### Every user can do the following:
- Users can create account(signup/signin/signout)
- Users can view all the centers in the application 
- Users can add events(same as booking a center)
- Users can see all events they added
- Users can modify their events
- Users can delete their events
- Users can change their password
- Users can delete their account 
- Users would get email notification if their events is canceled 

### Admin user can do everything a normal user can do with the following:
- Admin users can add a center
- Admin users can modify a center
- Admin users can see all transactions(Bookings for different centers)
- Admin users can delete a transaciton(Cancel an event)

### There is a super admin that is created as soon as the app is instantiated:
- Super Admin can add more admins
## Technologies and Services

### Development
- Node
- Express
- Postgres
- React
- Cloudinary
### CI Tools
- Travis
- Coveralls
- Code Climate

## Contributing

To contribute to this project:
- Fork the repository
- Create a new branch for your contribution
- Commits your changes with detailed commit messages
- Raise a pull request against the develop branch  

You can check the project [Wiki](https://github.com/IAMOTZ/Ievents/wiki) for coding styles and conventions. 

#### Any other form of contribution is also allowed, as long as it makes this project get better.

## Author

**Ogunniyi Tunmise** 

## License 
This project is licensed under the [MIT License](https://opensource.org/licenses/MIT)
