[![Build Status](https://travis-ci.org/IAMOTZ/Ievents.svg?branch=develop)](https://travis-ci.org/IAMOTZ/Ievents)
[![Coverage Status](https://coveralls.io/repos/github/IAMOTZ/Ievents/badge.svg?branch=develop)](https://coveralls.io/github/IAMOTZ/Ievents?branch=develop)  
# Ievents
This is a web application to help you manage an event center.  
Given you manage an events center, this app will help you accept applications to use your center / facilities, and will either decline events when the proposed day is already taken, or suggest an available day.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

#### Prerequisite
>- Node
>- Git

#### Installation
Presently the application is in template development stage, so by installing this project you can only check out the template meant for the front end development.
>- Clone the repository `$ git clone https://github.com/IAMOTZ/Ievents.git`
>- Change into the directory 
>- Use `$ npm install` to install all required dependencies packages.
>- Start app with `$ npm server:dev` 
>- The app should start on prot 3000 of your local host


## Features
* Users can create an account
* Users can add event(same as booking a center)
* Users can modify their events
* Users can delete their events
* Users can view all the centers in the application 
* Users can view the details of a center
* Admin user can add a center
* Admin user can modify a center

## API

`POST api/v1/users` to sign up users  
`POST api/v1/users/login` to sign in users  
`GET api/v1/centers` to get all centers  
`GET api/v1/centers/<centerId>` to get a particulare center  
`POST api/v1/events` to allow an authenticated user to create events  
`PUT api/v1/events/<eventId>` to allow an authenticated user to modify an event   
`DELETE api/v1/events<eventId>` to allow an authenticated user to delete event  
`POST api/v1/centers` to allow an authenticated and authorized user to create centers  
`PUT api/vi/centers/<centerId>` to allow an authenticated and authorized user to modify a center  


## Technologies and Services
>- Node
>- Express
>- Postgres


## Contributing
To contribute to this project:
>- Fork the repository.
>- Make your commits
>- Raise a pull request.


## Author

* **Ogunniyi Tunmise** 

## Acknowledgments

>- **Andela** 
>- **Andela21**
>- **Oluwagbenga Joloko**