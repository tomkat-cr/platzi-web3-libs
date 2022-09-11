# Platzi Web3 Exercise

## Goal

Create a DApp that allows people to vote on a (binary) proposal. Each ethereum address should be allowed to vote only once and the vote should cost 0.01 ETH.

When a user opens the page, it should see the result so far (number of positive votes vs. number of negative votes). Real-time updating is a bonus, but not required.

The app should consist only of a frontend. It should work in Görli and with MetaMask.

The contract is already deployed at `0xacfc7725527ba2ee4311574f65e5d76f9f9585e9`. You can see it [here](https://goerli.etherscan.io/address/0xacfc7725527ba2ee4311574f65e5d76f9f9585e9#code).


## Stack and tools

The only two requirements are:
1. Use React for the frontend
2. Use [web3.js](https://web3js.readthedocs.io/) and [ethers.js](https://docs.ethers.io/). The user should be able to switch between the two libraries and everything should work the same.

Everything else is up to you. We recommend using [web3-react](https://github.com/NoahZinsmeister/web3-react), but it's not required.

You can get Görli ether [here](https://faucet.paradigm.xyz/).

.....

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
