# CS3219-Assignment-B

## Task B1: Implement a simple Javascript backend and REST API to GET, POST, PUT, DELETE

### Required Applications
* [NodeJs](https://nodejs.org/en/download/)
* [MongoDb](https://www.mongodb.com/try/download/community)
* [PostMan](https://www.postman.com/)

### Instructions to run the API locally and access the deployed API:
1. Clone the code from [github repository](https://github.com/CranstonYeo/CS3219-Assignment-B.git).

1. After cloning, change directory to the application folder by **cd CS3219-Assignment-B**.

1. Install the relevant node modules via command prompt using **npm install** and **npm install -g nodemon**.

1. Run the Mongodb database by typing **nodemon index** into the command prompt.

1. Afterwards, use PostMan to interact with the database.

1. In PostMan, interact with the database via the following url:

- http://localhost:8080/api/contacts

1. Get all contacts:

     1. Input the url address.
     1. Change to **Get** request.
     1. Press the **Send** button.
     1. You should get all contacts in the body of the reply below.

  1. Create new contact:
     1. Input the url address.
     1. Change to **Post** request.
     1. Select the Body tab (beside Headers).
     1. Under the x-www-form-urlencoded tab, fill in the respective key value pair:

        | Key    | Value |
        | ------ | ----- |
        | name   | value |
        | email  | value |
        | phone  | value |
        | gender | value |

     1. Press the **Send** button.

- http://localhost:8080/api/contacts/{contact_id}

  1. Get the details of the individual contact:

     1. Input the url address.
     1. Change to **Get** request.
     1. Press the **Send** button.
     1. You should get the contact details in the body of the reply below.

  1. Update the details of the individual contact:

     1. Input the url address.
     1. Change to **Put** request.
     1. Select the Body tab (beside Headers).
     1. Under the x-www-form-urlencoded tab, fill in the respective key value pair:

        | Key    | Value |
        | ------ | ----- |
        | name   | value |
        | email  | value |
        | phone  | value |
        | gender | value |

     1. Press the **Send** button.
     1. The contact is updated with the values you keyed in.

  1. Delete the individual contact from the database:
     1. Input the url address.
     1. Change to **Delete** request.
     1. Press the **Send** button.
     1. The contact should be deleted from the database.

## Task B2: Write simple test cases for API and use a CI tool (Travis, etc) to automate testing.

### Required Application

* Required application for B1
* [Mocha](https://mochajs.org/#installation)
* [Chai](https://www.npmjs.com/package/chai)

### Instructions to test locally:
1. Do step 1-4 for B1.

1. Run **npm run test** in terminal to run all mocha test cases.

### Instructions to test with travis:
1. Go to [travis website](https://travis-ci.com/).

1. Go to setting, under **Respositories** tab, click on Manage respositories on Github.

1. Login to github.

1. Under the respository access, go to 'Only select repositories' and select **CS3219-Assignment-B**.

1. Afterward, ensure there is a **.travis.yml** file uploaded at the root directory.

1. If not create a new **.travis.yml** with the following code and push it to the root directory:

   ```language: node_js
   node_js:
   - "12.8"
   services:
   - mongodb
   cache:
   directories:
      - node_modules
   before_script:
   - npm install
   script:
   - npm run test
   dist: trusty

1. Push a new change to github and travis will run the test cases automatically.

## Task B3: Use CD tool for automated deployment to a serverless service.

### Instructions:
1. Communicate with the deployed API in AWS lambda via PostMan.

1. The instructions to communicate with AWS lambda via Postman are the same as [Task B1](#Task-B1:-Implement-a-simple-Javascript-backend-and-REST-API-to-GET,-POST,-PUT,-DELETE).

1. Instead of using localhost as the url address, you are required to use the following:

- https://1m1p4vj02c.execute-api.ap-southeast-1.amazonaws.com/dev/api/contacts instead of http://localhost:8080/api/contacts.

- https://1m1p4vj02c.execute-api.ap-southeast-1.amazonaws.com/dev/api/contacts/{contact_id} instead of http://localhost:8080/api/contacts/{contact_id}.

## Task B4: Build a frontend SPA using Vue or any other framework.

### Instructions

1. Run the command **nodemon index** in the project root directory to start the backend.

1. 2. Open a new command terminal and change directory to the frontend folder by **cd frontend** from the project root directory.

1. Next, run **npm install** to install the necessary components.

1. Afterwards, run **npm run serve** to start the website.

1. Access the website from any web browser using the url http://localhost:8081/.

1. You can interact with the API via the website:

   1. Get all contacts:

      1. Upon loading the web page, all contacts will automatically be fetched from the backend and be displayed in the table "List of Contacts".

   1. Create new contact:

      1. Fill in the name, email, phone and gender.
      1. Press the **Submit** button.
      1. The list of contacts should be automatically updated in the table.

   1. Update contact:

      1. Find the contact you want to update in the list of contacts table.
      1. Click the **Update** button beside the contact under actions.
      1. Fill in the data you want to replace for the contact.
      1. Press the **Update** button.
      1. The list of contacts should be updated.

   1. Delete contact:

      1. Find the contact you want to delete in the list of contacts table.
      1. Click the **Delete** button beside the contact under actions.
      1. The contact should be remove from the list of contacts.
