const { expect } = require('chai'); // to use its asserting functions.
const { ethers } = require('hardhat');


describe("Joke Token Contract", () => {

    var JokeToken;
    var jokeToken;
    var owner;
    var addr1; // local account address - 1000 ethers
    var addr2; // local account address - 1000 ethers
    var addr3; // hardhat signers
    var addr4; // hardhat signers
    const provider = new ethers.providers.JsonRpcProvider();
    var addr1Signer;

    beforeEach(async() => {
        // Get the ContractFactories and Signers here.
        JokeToken = await ethers.getContractFactory("JokeToken");
        [owner, addr3, addr4] = await ethers.getSigners();
        jokeToken = await JokeToken.deploy();
        addr1 = '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266';
        addr2 = '0x70997970c51812dc3a010c7d01b50e0d17dc79c8';
        addr1Key = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';
        addr1Signer = new ethers.Wallet(addr1Key, provider);
        // addr2Key = '0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d';
    });

    // You can nest describe calls to create subsections.
    describe("Deployment", () => {

        // If the callback function is async, Mocha will `await` it.
        it("Should set JokeToken contract the right owner", async() => {
            expect(await jokeToken.owner()).to.equal(owner.address);
        });

        it("Initial token supply is 0", async() => {
            expect(await jokeToken.totalSupply()).to.equal(0);
        });

        it("Random user should have 0 token", async() => {
            var balance = await jokeToken.balanceOf(addr1);
            expect(balance).to.equal(0);
        })
    });

    describe ("Token Transactions", () => {
        
        it("Should fail to purchase token if minimum amount not met", async() => {
            await expect(
                jokeToken.buy(addr1, { value: ethers.utils.parseEther('0.00001') })
            ).to.be.revertedWith("Minimum purchase of 0.0001 JOT.");
        });

        it("Should be able to purchase token", async() => {
            await jokeToken.buy(addr1, { value: ethers.utils.parseEther('1.5') });
            var balance = await jokeToken.balanceOf(addr1);
            expect(balance).to.equal(ethers.utils.parseEther('1.5'));
            expect(await jokeToken.totalSupply()).to.equal(ethers.utils.parseEther('1.5'));
        });

        it("Should transfer tokens between accounts", async () => {    
            // Purchase 1.5 JOT first
            await jokeToken.buy(addr3.address, { value: ethers.utils.parseEther('1.5') });
            expect(await jokeToken.balanceOf(addr3.address)).to.equal(ethers.utils.parseEther('1.5'));

            // Transfer 1 JOT token from addr1 to addr2
            // We use .connect(signer) to send a transaction from another account
            await jokeToken.connect(addr3).transfer(addr4.address, ethers.utils.parseEther('1.0'));
            const addr3Balance = await jokeToken.balanceOf(addr3.address);
            const addr4Balance = await jokeToken.balanceOf(addr4.address);
            expect(addr3Balance).to.equal(ethers.utils.parseEther('0.5'));
            expect(addr4Balance).to.equal(ethers.utils.parseEther('1.0'));
        });

        it("Should fail if sender doesn’t have enough tokens", async() => {
            const initialBalance = await jokeToken.balanceOf(addr3.address);
            // Try to send 1 token from addr3 (0.5 tokens) to addr4.
            // `require` will evaluate false and revert the transaction.
            await expect(
                jokeToken.connect(addr3).transfer(addr4.address, 1)
            ).to.be.revertedWith("ERC20: transfer amount exceeds balance");
            
            // Owner's balance shouldn't have changed.
            expect(await jokeToken.balanceOf(addr3.address)).to.equal(initialBalance);
        });

        it("Should fail to sell token if minimum amount not met", async() => {
            await expect(
                jokeToken.sell(addr1, ethers.utils.parseEther('0.00001') )
            ).to.be.revertedWith("Minimum sales of 0.0001 JOT.");
        });

        it("Should fail to sell token if exceed balance", async() => {
            await expect(
                jokeToken.sell(addr1, ethers.utils.parseEther('1') )
            ).to.be.revertedWith("Insufficient tokens in wallet.");
        });

        it("Should be able to sell token", async() => {
            // Purchase 1.5 JOT for addr3
            await jokeToken.buy(addr3.address, { value: ethers.utils.parseEther('1.5') });
            expect(await jokeToken.balanceOf(addr3.address)).to.equal(ethers.utils.parseEther('1.5'));
            
            // Purchase 2 JOT for addr4
            await jokeToken.buy(addr4.address, { value: ethers.utils.parseEther('2') });
            expect(await jokeToken.balanceOf(addr4.address)).to.equal(ethers.utils.parseEther('2'));
            expect(await jokeToken.totalSupply()).to.equal(ethers.utils.parseEther('3.5'));
            
            // Sell 1.2 JOT for addr3
            await jokeToken.sell(addr3.address, ethers.utils.parseEther('1.2'));
            expect(await jokeToken.balanceOf(addr3.address)).to.equal(ethers.utils.parseEther('0.3'));
            
            // Sell 1.1 JOT for addr4
            await jokeToken.sell(addr4.address, ethers.utils.parseEther('1.1'));
            expect(await jokeToken.balanceOf(addr4.address)).to.equal(ethers.utils.parseEther('0.9'));
            expect(await jokeToken.totalSupply()).to.equal(ethers.utils.parseEther('1.2'));
        });

    });

});

