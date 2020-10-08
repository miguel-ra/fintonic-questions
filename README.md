# Fintonic questions - code challenge

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Requirements

- Use React
- Replicate [https://opentdb.com/browse.php](https://opentdb.com/browse.php), using this API [https://opentdb.com/api_config.php](https://opentdb.com/api_config.php)
- The menu should not have any logic, just be layout.
- **Extra**: Create question filtering

## Demo

You can try it [here](https://miguel-ra.github.io/fintonic-questions/).

## Installation

Use the package manager [npm](https://www.npmjs.com/get-npm) in the folder of the project to install dependencies.

```bash
npm install
```

## Available Scripts

In the project directory, you can run:

```bash
npm start
```

```bash
npm test
```

```bash
npm build
```

## TODOs

Because the purpose of this challenge was to make it simple and without spending much time, I would like to comment on some interesting improvements.

### Create API client:

Only one endpoint it's being used, so I decided to call it from where it was required.

I would define a network layer, where all the endpoints are defined.

### Check all re-renders and see if it can be optimized

Now I'm only using useMemo in one place (where the options for the filter are generated), I would like to check in details if another optimitation can be done. But in the end when there is a render it is because the information has changed and the ui needs to be updated.

### Improve responsive design

One option would be to use a grid and reposition items based on screen size.

### Add text filter

Create a new filter using a text input.

### Add keyboard events to table headers

What I would do is add the role, tabindex and control the necessary events.
