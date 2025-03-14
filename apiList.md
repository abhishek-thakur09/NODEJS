<!-- Tech Tinder APIs -->


        <!-- :-> authrouter -->
-POST /signup
-POST /login
-POST /logout




    <!-- profileRouter -->
-GET /profile/view
-PATCH /profile/edit
-PATCH /profile/password



        <!-- connectionRequestRouter -->
-POST /request/send/intersted/:userId
-POST /request/send/ignored/:userId
-POST /request/review/accepted/:requestId
-POST /request/review/rejected/:requestId


         <!-- UserRouter -->
-GET /user/connections
-GET /user/requests/received
-GET /user/feed - Gets you the profile of other user of the platform



status: ignore, intersted , Accepted or rejected




