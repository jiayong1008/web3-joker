# JokeToken
An ERC20 token where users can buy, sell, or transfer through the [frontend interface](https://jiayong1008.github.io/web3-joker/).   
Current Token Network: `Ropsten` Test Net    
Token Contract Address: `0x0218812D96E61c5854aA75FE6900B0E4e8d4ec8A`

## Project Specifications
The project is mainly built using React JS (frontend) and Solidity.

## Implementation
1. Visit the token site.
2. Import JOT token in Metamask.
    - Click 'Import Token' located on bottom section of your Metamask.
    - Insert token contract address: `0x0218812D96E61c5854aA75FE6900B0E4e8d4ec8A`
    - Wait a few secs, you should see the name and symbol of token from Metamask.
    - Click Import.
    - You should see you have 0 JOT by default in your asset.
3. Purchase some JOT tokens from the website.
4. The tokens will show up in your Metamask account.
5. You can sell the tokens and get back your Eth as well.


## What does the Token do? 
For now, it's just a dummy token. But in the future, I might turn it into a token used by a web3 casino. Elaboration provided below. 👇

## Idea - Proposal on a Dapp for Casino 🎲
I have an idea of developing a web3 peer-to-peer casino where players can play against each other without the need of third parties. So, I decided to develop a brand new ERC20 token to serve as the casino's currency. More precisely, players will need their token to participate in the casino game. Here's the simplified version of how the casino would work:

1. Players would need to purchase tokens (we call it Joke Token (JOT)) to play against each other.
2. 1 Eth would be equivalent to 1 JOT token, in other words, 1:1 ratio.
3. There will be 2 players in each game, Player A and Player B.
4. Let's say player A proposed a game of 1 JOT.
5. Smart contract will search for another player who's willing to play a game worth of 1 JOT.
6. Smart contract starts game by requesting both players to pay 1 JOT each to the smart contract. (Remember: the smart contract is the middle men)
7. Both players spin the roulette wheel once. The smart contract will generate random number for both players. This will be implemented using [Chainlink VRF](https://docs.chain.link/docs/chainlink-vrf/).
8. Smart contract determines winner:
    - Wheel is numbered 0 to 36.
    - Player who has the higher number wins. (0 is considered the largest, more commonly known as Jackpot)
9. Smart contract pays winner in JOT, taking 2.5% as interest. (Interest is not finalized yet, but the smart contract would definitely take a small percentage)
    - Based on a game worth of 1 JOT, winner would be paid 1.95 JOT.
    - Smart contract would earn 0.05 JOT. (2.5% interest)
10. Players are allowed to burn their JOT anytime to withdraw their Eth.
    - 1 JOT = 1 Eth
    - Players need to be fully aware of the possibility of impermanent loss.

## Technical Requirements ⚙️
- We will need a smart contract written in Solidity to program the logics of the casino.
- We need a decent frontend.

## What We Currently Have
- Coded the token part of smart contract.
- Have a frontend where users can buy / sell JOT with their Eth.

## Collaboration 🤝
We are still very far from our end goal of developing a successful web3 casino. As there are not many successful web3 casinos out there (if there is any at all), I truly believe that the project is worth building. With all that said, it would be an honour if any fellow developers would like to join me in developing this Dapp. I believe this project will serve the community well, empowering players from all over the world to play against each other, without being restricted by geographical region, and without permission from any centralized authorities. Feel free to reach out to me if you are interested or have any ideas about this Dapp. Looking forward to it, cheers. 🍻    

📩 jiayong1008@gmail.com
