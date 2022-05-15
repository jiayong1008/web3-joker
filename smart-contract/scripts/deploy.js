const main = async() => {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
 
    const JokeToken = await hre.ethers.getContractFactory("JokeToken");
    const jokeToken = await JokeToken.deploy();
    await jokeToken.deployed();
    console.log("Token Contract Address: ", jokeToken.address);
}

const runMain = async() => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

runMain();