// const { expect } = require('chai'); // to use its asserting functions.
// const { BigNumber } = require("@ethersproject/bignumber");

// // JokeToken is the actual JOT token contract
// // Joker is the casino contract where players can exchange tokens

// describe("Joker Contract", () => {

//     var JokeToken;
//     var jokeToken;
//     var Joker;
//     var joker;
//     var owner;
//     var addr1;
//     var addr2;
//     var addrs;
//     const decimals = BigNumber.from('1000000000000000000'); // 10**18

//     beforeEach(async() => {
//         // Get the ContractFactories and Signers here.
//         JokeToken = await ethers.getContractFactory("JokeToken");
//         Joker = await ethers.getContractFactory("Joker");
//         [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
//         jokeToken = await JokeToken.deploy();
//         joker = await Joker.deploy();
//     });

//     // You can nest describe calls to create subsections.
//     describe("Deployment", () => {

//         // If the callback function is async, Mocha will `await` it.
//         it("Should set JokeToken contract the right owner", async() => {
//             expect(await jokeToken.owner()).to.equal(owner.address);
//         });

//         it("Should set Joker contract the right owner", async() => {
//             expect(await joker.owner()).to.equal(owner.address);
//         });

//         it("Should assign the total supply of tokens to the owner", async() => {
//             const ownerBalance = await jokeToken.balanceOf(owner.address);
//             expect(await jokeToken.totalSupply()).to.equal(ownerBalance);
//         });

//         it("Owner's token should = 1000 * (10**18)", async() => {
//             const supply = decimals.mul(1000);
//             expect(await jokeToken.totalSupply()).to.equal(supply);
//         });
//     });

//     describe ("Token Transactions", () => {
//         it("Should transfer tokens between accounts", async () => {
//             // Transfer 50 tokens from owner to addr1
//             await jokeToken.transfer(addr1.address, decimals.mul(1000));
//             const addr1Balance = await jokeToken.balanceOf(addr1.address);
//             expect(addr1Balance).to.equal(decimals.mul(1000));
    
//             // Transfer 50 tokens from addr1 to addr2
//             // We use .connect(signer) to send a transaction from another account
//             await jokeToken.connect(addr1).transfer(addr2.address, decimals.mul(1000));
//             const addr2Balance = await jokeToken.balanceOf(addr2.address);
//             expect(addr2Balance).to.equal(decimals.mul(1000));
//         });

//         it("Should fail if sender doesn’t have enough tokens", async() => {
//             const initialOwnerBalance = await jokeToken.balanceOf(owner.address);

//             // Try to send 1 token from addr1 (0 tokens) to owner (1000000 tokens).
//             // `require` will evaluate false and revert the transaction.
//             await expect(
//                 jokeToken.connect(addr1).transfer(owner.address, 1)
//             ).to.be.revertedWith("ERC20: transfer amount exceeds balance");
            
//             // Owner's balance shouldn't have changed.
//             expect(await jokeToken.balanceOf(owner.address)).to.equal(initialOwnerBalance);
//         });

//         it("Should update balances after transfers", async() => {
//             const initialOwnerBalance = await jokeToken.balanceOf(owner.address);

//             // Transfer 100 tokens from owner to addr1.
//             await jokeToken.transfer(addr1.address, decimals.mul(100));

//             // Transfer another 50 tokens from owner to addr2.
//             await jokeToken.transfer(addr2.address, decimals.mul(50));

//             // Check balance
//             const addr1Balance = await jokeToken.balanceOf(addr1.address);
//             expect(addr1Balance).to.equal(decimals.mul(100));
            
//             const addr2Balance = await jokeToken.balanceOf(addr2.address);
//             expect(addr2Balance).to.equal(decimals.mul(50));

//             const ownerBalance = await jokeToken.balanceOf(owner.address);
//             expect(ownerBalance).to.equal(BigNumber.from(initialOwnerBalance).sub(decimals.mul(150)));
//             // ^ initialOwnerBalance - (150 * (10**18))
//         });
//     });

//     describe("Token Interactions", () => {
//         it("Should fail to fund if minimum JOT not met", async() => {
//             const initialAddr1Balance = addr1.address.balance;
//             console.log(initialAddr1Balance);
            
            
//             // Try to fund 10 Wei
//             await expect(joker.connect(addr1).fund(10)).to.be.revertedWith("Minimum spend of 0.0001 ETH.");
//             // Balance shouldn't have changed.
//             expect(await addr1.balance).to.equal(initialAddr1Balance);
//             expect(await jokeToken.balanceOf(addr1)).to.equal(0);
//         });

//         it("Should be able to fund contract", async() => {
//             const initialJokerBalance = joker.owner().balance;
//             const initialAddr1Balance = addr1.address.balance;
            
//             // Try to fund 0.1 eth
//             await joker.connect(addr1).fund(decimals.mul(0.1));

//             // Check eth balance
//             expect(await addr1.address.balance).to.equal(BigNumber.from(initialAddr1Balance).sub(decimals.mul(0.1)));
//             expect(await joker.owner().balance).to.equal(BigNumber.from(initialJokerBalance).add(decimals.mul(0.1)));

//             // Check JOT balance
//             expect(await jokeToken.balanceOf(addr1)).to.equal(decimals.mul(0.1));
//             expect(await jokeToken.balanceOf(joker.owner())).to.equal(BigNumber.from(initialJokerBalance).sub(decimals.mul(0.1)));
//         });

//         it("Should fail to withdraw if insufficient JOT", async() => {
//             const initialJokerBalance = joker.owner().balance;
//             const initialAddr1Balance = addr1.address.balance;
//             const initialJokeToken = jokeToken.balanceOf(joker.owner());
//             const initialAddr1JokeToken = jokeToken.balanceOf(addr1);

//             // Try to withdraw with 0.2 jot, currently have 0.1 jot
//             await expect(jokeToken.connect(addr1).withdraw(decimals.sub(0.2)))
//             .to.be.revertedWith("ERC20: transfer amount exceeds balance");

//             // Balance shouldn't have changed.
//             expect(await addr1.balance).to.equal(initialAddr1Balance);
//             expect(await joker.owner().balance).to.equal(initialJokerBalance);
//             expect(await jokeToken.balanceOf(joker.owner())).to.equal(initialJokeToken);
//             expect(await jokeToken.balanceOf(addr1)).to.equal(initialAddr1JokeToken);
//         });

//         it("Should be able to withdraw if sufficient JOT", async() => {
//             const initialJokerBalance = joker.owner().balance;
//             const initialAddr1Balance = addr1.address.balance;
//             const initialJokeToken = jokeToken.balanceOf(joker.owner());
//             const initialAddr1JokeToken = jokeToken.balanceOf(addr1);

//             // Try to withdraw with 0.1 jot
//             await jokeToken.connect(addr1).withdraw(decimals.sub(0.1));

//             // Balance should reflect changes.
//             expect(await addr1.balance).to.equal(BigNumber.from(initialAddr1Balance).add(decimals.mul(0.1)));
//             expect(await jokeToken.balanceOf(addr1)).to.equal(BigNumber.from(initialAddr1JokeToken).sub(decimals.mul(0.1)));
//             expect(await joker.owner().balance).to.equal(BigNumber.from(initialJokerBalance).add(decimals.mul(0.1)));
//             expect(await jokeToken.balanceOf(joker.owner())).to.equal(BigNumber.from(initialJokeToken).sub(decimals.mul(0.1)));
//             expect(await jokeToken.totalSupply()).to.equal(jokeToken.balanceOf(joker.owner()));
//         });

//     });

// });

