
This app is an interactive contact list with CRUD functionality. The API was built using Rails and the front end was built using React.

To run the application the front end and back end server need to be initialized.  To start the back end run "rails s" in your terminal. To start the front end run "yarn start" or "npm start".

The database was created using Postgres SQL and seeded using Faker.

The app has one model, "contact.rb" and one controller "api/v1/contacts_controller.rb".

The backend tests are located in the "spec" folder and test the Model and Controller.  The test can be run my typing "rspec" in the terminal.  The front end tests are located in "client/src/_tests_" folder and test whether front end components load correctly. The test can be run in the client folder by typing "npm run test".
