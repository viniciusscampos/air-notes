# air-notes

## description

**AiR Notes** is a project for adding virtual notes in real environments using augmented reality. The ideia consists of using anchors (QR codes) in the real world as an origin point for a virtual environment. Each anchor, supposedly always in the same position, creates a persistent reference in the real world that allows a virtual environment to be rendered in a consistent way around it.

You can [watch the demo video](https://www.youtube.com/watch?v=mjiqurlNFDs) and read the remaining of this readme for more informations.

## front-end

A React Native app made for iOS using the [react-native-arkit](https://github.com/react-native-ar/react-native-arkit) binding for ARKit.

## back-end

![architecture](https://i.imgur.com/7qro8w0.png)

The entire backend is created using the serverless framework over AWS. We use the API Gateway + AWS Lambda to create, get and update anchors saved at DynamoDB.

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
    * *updateAnchor/handler.js*
    * Updates the *notes* attribute set at the request body of the anchor with the provided *anchor* attribute set at the request body.
