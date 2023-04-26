# Forkify App

This repository contains the code for the Forkify App built using pure vanilla JavaScript with the Model-View-Controller (MVC) architecture pattern. This app allows users to search for recipes, save them to their favorites, and even create and upload (local storage) their own custom recipes.
Built for self learning purposes.

<br />

## Getting started

To get started with the Forkify App, you'll need to have the following installed on your local machine:

- node js
- git
- npm

To clone the repository, run the following command:

```
git clone https://github.com/theBigBengi/forkify.git
```

Next, navigate to the project directory

```
cd forkify
```

And install the necessary dependencies

```
npm install
```

<br />

## Usage

To run the app, use the following command:

```
npm start
```

This will start a local server on `http://localhost:1234/`. You can access the app by opening this URL in your web browser.

To build the app for production, use the following command:

```
npm run build
```

This will create a dist directory containing the compiled and minified files for the app.

Alternatively, you can visit the deployed version of the app at https://forkify-bengi.netlify.app/.

<br />

## API

The Forkify Recipe App uses the Forkify API v2 to retrieve recipe data. To use the app with this API, you'll need to get API key on their website: https://forkify-api.herokuapp.com/v2.

Once you have an API key, change the
`src/js/config.js`
file in the project directory and edit the following line:

```
KEY=<your_api_key>
```

Replace <your_api_key> with your actual API key.

<br />

## Acknowledgments

- The Complete JavaScript Course by Jonas Schmedtmann
