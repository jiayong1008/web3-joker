// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./JokeToken.sol";
import "./Roulette.sol";


contract Joker {

    JokeToken public jokeToken;
    address public owner;
    //mapping to store which address deposited how much ETH
    mapping(address => uint256) public addressToAmountFunded;
    address[] rouletteContracts;

    event Bought(address buyer, uint256 amount);
    event Sold(address seller, uint256 amount);

    // ========  Contract Initialization  ========
    constructor() {
        owner = msg.sender;
        jokeToken = new JokeToken();
    }

    function buy() public payable {
        uint256 amount = msg.value;
        uint256 jokerBalance = jokeToken.balanceOf(address(this));
        require(amount >= 0.0001 * (10**18), "Minimum spend of 0.0001 ETH.");
        require(jokerBalance >= amount, "Insufficient token in the reserve.");
        jokeToken.transfer(msg.sender, amount);
        emit Bought(msg.sender, amount);
    }

    function sell(uint256 amount) public payable {
        require(amount >= 0.0001 * (10**18), "You need to sell at least 0.0001 JOT.");

        jokeToken.approve(address(this), amount); // should be approved by caller, not this contract
        uint256 allowance = jokeToken.allowance(msg.sender, address(this));
        require(allowance >= amount, "Check the token allowance.");
        jokeToken.transferFrom(msg.sender, address(this), amount);
        payable(msg.sender).transfer(amount);

        emit Sold(msg.sender, amount);
    }

    function getContractAddress() public view returns (address) {
        return address(this);
    }

    function getJokeToken() public view returns (JokeToken) {
        return jokeToken;
    }

    function balanceOf(address account) public view returns (uint256) {
        return jokeToken.balanceOf(account);
    }

    function newRoulette(address can1, uint256 amount) public {
        Roulette roulette = new Roulette(jokeToken, can1, amount);
        rouletteContracts.push(address(roulette));
    }

    // function withdraw() public payable {
    //     require(msg.sender == owner, "You are not owner.");
    //     payable(msg.sender).transfer(address(this).balance);
    // }
}