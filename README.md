# air-notes

## back-end

[architecture](https://i.imgur.com/7qro8w0.png)

The entire backend is created using the serverless framework over AWS. We use the API Gateway + AWS Lambda to create, get and update anchors saved at DynamDB.

### Setup

Use `yarn install` to install node dependencies This is step is also required by the python fuction(s). Use virtualenv to load the pyton *requirements.txt* file. If you have the AWS keys as your environment variables, you can then run `serverless deploy` at *back-end/air-notes-api*.

### Events

* ```POST anchor/create```
    * *createAnchor/handler.js*
    * Adds a new anchor to the database with [this](createAnchor/schema.js) schema.

* ```POST anchor/get```
    * *getAnchor/handler.js*
    * Returns the anchor stored at the databased with the provided *anchor* attribute set at the request body.

* ```POST anchor/update```
    * *createAnchor/handler.js*
    * Updates the *notes* attribute set at the request body of the anchor with the provided *anchor* attribute set at the request body.