## Dev Tinder Apis

## authRouter

- POST - /signUp
- POST - /login
- POST - /logout

## profileRouter

- GET - /profile/view
- PATCH - /profile/edit
- PATCH - /profile/password

## connectionRequestRouter

- POST - /request/send/interested/:userId
- POST - /request/send/ignored/:userId
- POST - /request/review/accepted/:requestedId
- POST - /request/review/rejected/:requestedId

## userRouter

- GET - /user/request
- GET - /user/connections
- GET - /user/feed
