<!-- Tech Tinder APIs -->


        <!--  authrouter -->

-POST /signup
-POST /login
-POST /logout




    <!-- profileRouter -->

-GET /profile/view
-PATCH /profile/edit
-PATCH /profile/password



        <!-- connectionRequestRouter -->
ep-12
-POST /request/send/intersted/:userId
-POST /request/send/ignored/:userId

-POST /request/send/:status/:userId


ep-13
-POST /request/review/accepted/:requestId
-POST /request/review/rejected/:requestId

-POST /request/review/:status/:requestId

         <!-- UserRouter -->
         
-GET /user/requests/received
-GET /user/connections
-GET /user/feed - Gets you the profile of other user of the platform



STATUS: ignore, intersted , Accepted or rejected




