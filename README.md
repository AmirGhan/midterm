# Drag Rank

**An easy-to-use poll building tool.**
Make a poll, send it to whoever you want to vote, then receive the results.

![Homepage](https://github.com/nebdil/midterm/blob/user-auth/docs/Home%20page.png?raw=true)
![Admin page - closed poll](https://github.com/nebdil/midterm/blob/user-auth/docs/Admin%20page%20-%20Closed%20polls.png?raw=true)
![New poll](https://github.com/nebdil/midterm/blob/user-auth/docs/New%20poll.png?raw=true)
![Vote](https://github.com/nebdil/midterm/blob/user-auth/docs/Vote.png?raw=true)
![Admin page - active poll](https://github.com/nebdil/midterm/blob/user-auth/docs/Admin%20page-Active%20polls.png?raw=true)

## Project Setup

1. Create your own empty repo on GitHub
2. Clone this repository (do not fork)
  - Suggestion: When cloning, specify a different folder name that is relevant to your project
3. Remove the git remote: `git remote rm origin`
4. Add a remote for your origin: `git remote add origin <your github repo URL>`
5. Push to the new origin: `git push -u origin master`
6. Verify that the skeleton code now shows up in your repo on GitHub

## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Run migrations: `npm run knex migrate:latest`
  - Check the migrations folder to see what gets created in the DB
6. Run the seed: `npm run knex seed:run`
  - Check the seeds file to see what gets seeded in the DB
7. Run the server: `npm run local`
8. Visit `http://localhost:8080/`
*Optional (if you don't want to use Mailgun, comment out Mailgun related code):*
9. Register for Mailgun API key (you'll include your key in routes/admins.js and routes/polls.js)
10. Include your email address in the Mailgun triggered routes

## Using the App

1. Log in as one of the available users (see Knex seed file)
2. Navigate to CREATE A NEW POLL
3. Create new poll
4. Send poll to your friends
5. Benefit

## Dependencies

- Node 5.10.x or above
- NPM 3.8.x or above
- Body Parser 1.15.2 or above
- Dotenv 2.0.0 or above
- Ejs 2.4.1 or above
- Express 4.13.4 or above
- Knex 0.11.7 or above
- Knex-logger 0.1.0 or above
- Mailcomposer 4.0.2 or above
- Mailgun-js 0.13.1 or above
- Morgan 1.7.0 or above
- Node-sass-middleware 0.9.8 or above
- Postgres 6.0.2 or above

