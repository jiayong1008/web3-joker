// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./JokeToken.sol";


contract Roulette {

    JokeToken public jokeToken;

    mapping(address => uint8) public candidateScores;
    address public candidate1;
    address public candidate2;
    uint256 public gambleAmount;
    uint8 public result1 = 100; // Candidate 1's result
    uint8 public result2 = 100; // Candidate 2's result

    constructor(JokeToken _jokeToken, address can1, uint256 amount) {
        jokeToken = _jokeToken;
        candidate1 = can1;
        gambleAmount = amount;
    }

    function hasCompetitor() public view returns (bool) {
        return (address(candidate2) != address(0));
    }

    function setCompetitor(address can2) public {
        require(!hasCompetitor(), "Competitor already exist.");
        candidate2 = can2;
    }

    // called by client side twice (1 for each candidate to fund tokens before game begins)
    function fundToken() public {
        // should be approved by caller, not this contract
        jokeToken.approve(address(this), gambleAmount);
        uint256 allowance = jokeToken.allowance(msg.sender, address(this));
        require(allowance >= gambleAmount, "Check the token allowance.");
        jokeToken.transferFrom(msg.sender, address(this), gambleAmount);
    }

    function play() public {
        candidateScores[msg.sender] = spinWheel();
    }

    function spinWheel() private pure returns (uint8) {
        // Get random number from chainlink VRF contract
        // return dummy value for now
        return 36;
    }

    function getWinner() public view returns (address) {
        require(result1 != 100, "Candidate 1 have not spun the wheel.");
        require(result2 != 100, "Candidate 2 have not spun the wheel.");
        uint8 val1 = (candidateScores[candidate1] == 0) ? 37 : candidateScores[candidate1];
        uint8 val2 = (candidateScores[candidate2] == 0) ? 37 : candidateScores[candidate2];

        if (val1 > val2)
            return candidate1; // Indicates candidate 1 won
        else if (val2 > val1)
            return candidate2; // Indicates candidate 2 won
        else
            return address(0); // Indicates a draw
    }

    function payWinner() public {
        address winner = getWinner();
        if (winner == address(0)) {
            // Its a draw - reset and allow the candidates to spin the wheel again
            result1 = 100;
            result2 = 100;
        } else {
            uint256 winAmount = gambleAmount * 2 * 95 / 100; // contract takes 5% interest
            jokeToken.approve(address(this), winAmount);
            uint256 allowance = jokeToken.allowance(msg.sender, address(this));
            require(allowance >= winAmount, "Check the token allowance.");
            jokeToken.transferFrom(address(this), winner, winAmount);
        }
    }
}