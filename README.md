# node_wc

Two inital users are created each time the server gets restarted: user1@gmail.com and user2@gmail.com.

The password for user1@gmail.com is 123123 and for the user user2@gmail.com is 321321 (you cannot see that in the seed file for the user because I encrypted them).

Secrets needed to be set up locally in the root folder in the file .env.
The following secrets are:

DATABASE_URL='mongodb://mongo:27017/backend'    <--- you need to write it like this beacuse the database
ACCESS_TOKEN_SECRET=...                              gets mapped from docker (except you can change 'backend' to whatever you like)
REFRESH_TOKEN_SECRET=...

For the token secrets you need to generate them. You can generate them via node with following steps:
1. type node in console and press enter.
2. type in console  require('crypto').randomBytes(64).toString('hex')  and press enter
3. repeat step 2. to create another secret key so the keys in access and refresh token are different.

After that, you are ready to go and run the app via docker(build app via docker compose build and then run it with docker compose up).

The database for mongo resets each time the server resets so you can easily try out the request (that is why i am also doing the list CRUD operation over email, not over id because it chages).

Also, to make it a bit easier for you I made some request in postman that I exported that you can use to test the routes.
