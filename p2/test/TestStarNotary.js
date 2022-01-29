const StarNotary = artifacts.require('StarNotary');

let instance;

var account1;
var account2;

let user1;
let user2;

contract('StarNotary', (accs) => {
  account1 = accs[0];
  account2 = accs[9];
});

before(async () => {
  instance = await StarNotary.deployed();
  user1 = account1;
  user2 = account2;
});

it('can Create a Star', async () => {
  // Arrange
  let tokenId = 1;
  await instance.createStar('Awesome Star!', tokenId, {
    from: account1,
  });
  assert.equal(await instance.tokenIdToStarInfo.call(tokenId), 'Awesome Star!');
});

it('lets user1 put up their star for sale', async () => {
  // Arrange
  let starId = 2;
  let starPrice = web3.utils.toWei('.01', 'ether');

  // Act
  await instance.createStar('awesome star', starId, { from: user1 });
  await instance.putStarUpForSale(starId, starPrice, { from: user1 });

  // Asser
  assert.equal(await instance.starsForSale.call(starId), starPrice);
});

it('lets user1 get the funds after the sale', async () => {
  // Arrange
  let starId = 3;
  let starPrice = web3.utils.toWei('.01', 'ether');
  let balance = web3.utils.toWei('.05', 'ether');

  // Act
  await instance.createStar('awesome star', starId, { from: user1 });
  await instance.putStarUpForSale(starId, starPrice, { from: user1 });
  let balanceOfUser1BeforeTransaction = await web3.eth.getBalance(user1);
  await instance.buyStar(starId, { from: user2, value: balance });
  let balanceOfUser1AfterTransaction = await web3.eth.getBalance(user1);
  let value1 = Number(balanceOfUser1BeforeTransaction) + Number(starPrice);
  let value2 = Number(balanceOfUser1AfterTransaction);

  // Assert
  assert.equal(value1, value2);
});

it('lets user2 buy a star, if it is put up for sale', async () => {
  // Arrange
  let starId = 4;
  let starPrice = web3.utils.toWei('.01', 'ether');
  let balance = web3.utils.toWei('.05', 'ether');

  // Act
  await instance.createStar('awesome star', starId, { from: user1 });
  await instance.putStarUpForSale(starId, starPrice, { from: user1 });
  await instance.buyStar(starId, { from: user2, value: balance });

  // Assert
  assert.equal(await instance.ownerOf.call(starId), user2);
});

it('lets user2 buy a star and decreases its balance in ether', async () => {
  // Arrange
  let starId = 5;
  let starPrice = web3.utils.toWei('.01', 'ether');
  let balance = web3.utils.toWei('.05', 'ether');

  // Act
  await instance.createStar('awesome star', starId, { from: user1 });
  await instance.putStarUpForSale(starId, starPrice, { from: user1 });
  const balanceOfUser2BeforeTransaction = await web3.eth.getBalance(user2);
  await instance.buyStar(starId, { from: user2, value: balance, gasPrice: 0 });
  const balanceAfterUser2BuysStar = await web3.eth.getBalance(user2);
  let value =
    Number(balanceOfUser2BeforeTransaction) - Number(balanceAfterUser2BuysStar);

  // Assert
  assert.equal(value, starPrice);
});

// Implement Task 2 Add supporting unit tests

it('can add the star name and star symbol properly', async () => {
  // Arrange
  let starId = 7;

  // Act
  // 1. create a Star with different tokenId
  await instance.createStar('Olli', starId, { from: user1 });
  //2. Call the name and symbol properties in your Smart Contract and compare with the name and symbol provided
  let name = await instance.name.call();
  let symbol = await instance.symbol.call();

  // Assert
  assert.equal(name, 'SuperStarToken');
  assert.equal(symbol, 'SST');
});

it('lets 2 users exchange stars', async () => {
  // Arrange
  const tokenId1 = 11;
  const tokenId2 = 12;

  // Act
  // 1. create 2 Stars with different tokenId
  await instance.createStar('Test 11 Star!', tokenId1, { from: user1 });
  await instance.createStar('Test 12 Star!', tokenId2, { from: user2 });
  // 2. Call the exchangeStars functions implemented in the Smart Contract
  await instance.exchangeStars(tokenId1, tokenId2, { from: user1 });

  // Assert
  // 3. Verify that the owners changed
  const starNewOwner1 = await instance.ownerOf.call(tokenId1);
  const starNewOwner2 = await instance.ownerOf.call(tokenId2);
  assert.isTrue(starNewOwner1 === user2 && starNewOwner2 === user1);
});

it('lets a user transfer a star', async () => {
  // Arrange
  // 1. create a Star with different tokenId
  const tokenId = 9;

  // Act
  await instance.createStar('Test 9 Star!', tokenId, { from: user1 });
  // 2. Call the exchangeStars functions implemented in the Smart Contract
  await instance.transferStar(user2, tokenId, { from: user1 });

  //Assert
  // 3. Verify that the owners changed
  assert.equal(await instance.ownerOf.call(tokenId), user2);
});

it('lookUptokenIdToStarInfo test', async () => {
  // Arrange
  let starId = 6;

  // Act
  // 1. create a Star with different tokenId
  await instance.createStar('Olli', starId, { from: user1 });

  // 2. Call your method lookUptokenIdToStarInfo
  let starName = await instance.lookUptokenIdToStarInfo(starId, {
    from: user1,
  });

  // Assert
  // 3. Verify if you Star name is the same
  assert.equal(starName, 'Olli');
});

it('it should have the right token name', async () => {
  // Arrange
  let tokenNameToBeExpected = 'SuperStarToken';

  //Act
  let tokenName = await instance.name.call();

  // Assert
  assert.equal(tokenName, tokenNameToBeExpected);
});

it('it should have the right token symbol', async () => {
  // Arrange
  let tokenSymbolToBeExpected = 'SST';

  // Act
  let tokenSymbol = await instance.symbol.call();

  // Assert
  assert.equal(tokenSymbol, tokenSymbolToBeExpected);
});
