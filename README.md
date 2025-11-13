# News Finder App

## Overview

A simple and responsive news finder application built with React, React Router, Context API, [News API](https://newsapi.org/), [Material UI](https://mui.com/), and localStorage.

## Features

- Log in to the application using a set of fake credentials.
- Search for news articles
- "Load more" results at the end of search results
- Save articles to favorites
- Clear all saved favorites
- Open articles in a new tab

## Running the Demo

1. Install dependencies and start the frontend:

    ```bash
    cd news-app
    npm install
    npm start
    ```

> The app runs on [http://localhost:3000](http://localhost:3000) by default.

### News API Setup

This app fetches news articles from the News API.

1. [Register for a free account](https://newsapi.org/register) (choose 'I am an individual') to get your API key.
2. Create a `.env` file in your project's root directory
3. Add your News API key in `.env` as follows:
   
    ```bash
    REACT_APP_API_KEY=<your API key>
    ```
> ⚠️ Make sure to add `.env` to your `.gitignore` file to avoid committing your API keys.

### Current Fake Login 

- Username: Safa 
- Password: password 
> You may change these in src\components\Login.js