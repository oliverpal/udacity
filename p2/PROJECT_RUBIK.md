ask 1
Your Project is to Modify the StarNotary version 2 contract code to achieve the following:

- Add a name and a symbol for your starNotary tokens. (CHECK)
- Add a function lookUptokenIdToStarInfo, that looks up the stars using the Token ID, and then returns the name of the star. (CHECK)

- Add a function called exchangeStars, so 2 users can exchange their star tokens...Do not worry about the price, just write code to exchange stars between users. (CHECK)

- Write a function to Transfer a Star. The function should transfer a star from the address of the caller. The function should accept 2 arguments, the address to transfer the star to, and the token ID of the star. (CHECK)

Task 2
Add supporting unit tests, to test the following:
The token name and token symbol are added properly.

- 2 users can exchange their stars. (CHECK)

- Stars Tokens can be transferred from one address to another. (CHECK)

Task 3

- Deploy your Contract to Rinkeby (CHECK)
- Edit the truffle.config file to add settings to deploy your contract to the Rinkeby Public Network. (CHECK)
  Helper Points:
  Command used to deploy to Rinkeby truffle migrate --reset --network rinkeby

You will need to have your Metamask’s seed and Infura setup.

This was shown to you in detail in the lesson on Solidity, while creating ERC-20 tokens on Rinkeby.

Task 4

- Modify the front end of the DAPP to achieve the following:
  \*Lookup a star by ID using tokenIdToStarInfo() (you will have to add code for this in your index.html and index.js files) (CHECK)
  Project Submission Instructions:
  Inside your project folder, create a Readme.md file. The readme.md file should include the following:

Specify the Truffle version and OpenZeppelin version used in the project.

Truffle version: 5.4.6
OpenZeppelin version: 2.5.1
Your ERC-721 Token Name: SuperStarToken
Your ERC-721 Token Symbol: SST
Your “Token Address” on the Rinkeby Network: [0x30bbd452cfbde9746ed5ed585ac1d3465fa0f75c](https://rinkeby.etherscan.io/address/0x30bbd452cfbde9746ed5ed585ac1d3465fa0f75c)
Upload your folder to GitHub. (CHECK)

Submit your GitHub Repository Link. (CHECK)
https://github.com/oliverpal/udacity
