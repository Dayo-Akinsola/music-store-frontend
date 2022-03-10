# Albumphoria

Albumphoria is an app I made that gives the experience of an album ecommerce store. You can view browse, listen to and 'purchase' albums using the app and users who have an account have additional features such as, the ability to review an album, a wishlist, and friends.

**Link to project:** https://albumphoria.netlify.app/

**Link to backend repo:** https://github.com/Dayo-Akinsola/music-store-backend

<img src="https://i.imgur.com/JEoaWsQ.png" alt="shop-page"/>

## Features:

- View information about various albums and listen to 30 second previews for each album's tracks.
- Filter the album collection by genre and sort them by price.
- Both guest and authenticated users can add albums to their cart and make 'purchases'.
- User and guests carts persist through page reloads using the database for users and local storage for guests.
- Secure account creation with using json web tokens and bcrypt to store a password hash in the database.

### User Exclusive Features

- Write a review for an album which will be publically displayed on the album's page.
- Added an album to a wishlist that can be publically viewed.
- Send and accept friend requests from other users.
- Has access to an account page that contains previous orders, user wishlist, user reviews, user details, and friends.

## How It's Made:

**Frontend Tech:** React, React-router, HTML, Sass.
**Backend Tech:** Node.js, Express, MongoDB, Mongoose, node-cache, user authentication with jwt, Tested with jest and supertest.

On the frontend, the app was built with React and React-router to give it a dynamic user interface and the feeling of a multi-page app. Over 200 albums in the store which are retrived from the discogs api. More detailed track information and track previews are collected by cleaning the string for an album's title and finding a match using the spotify api. If no match is found then more detailed track information will be collected from the discogs api.The collection of albums is loaded from the backend into frontend so to avoid unnecessary calls to the apis I used node-cache to cache responses from the discogs and spotify apis. The cache is reset every hour.

The backend and database are mainly used to retrieve and store user information. When logged in user actions such as adding an album to a cart, or creating an album review are done by sending a request to the backend that saves or changes data in the backend and these changes are then sent to and reflected in the backend.

## Lessons Learned:

The importance of testing was probably the most pivitol lesson I learned from this project. When planning and implementing user features on the backend writing unit tests for each route helped me to properly think about what input and output I specifically wanted without having to think about how it would connect to the frontend or a UI. Moreover, it was great as a quick check to see if any changes I made had broken parts other parts of the app.

## Examples:

Take a look at some other projects on my github:

**Football Memory Card Game:** https://github.com/Dayo-Akinsola/football-memory-game

**Battleship:** https://github.com/Dayo-Akinsola/Battleship

**Parsing Calculator:** https://github.com/Dayo-Akinsola/Calculator
