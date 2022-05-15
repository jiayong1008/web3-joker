// Solidity files have to start with this pragma.
// It will be used by the Solidity compiler to validate its version.

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

// This is the main building block for smart contracts.
contract Token {

    // ========  Variable initializations  ========
    string public name = "Joke Token";
    string public symbol = "JOT";
    uint256 public totalSupply = 1000000; // unsigned int
    address public owner;
    // A mapping is a key/value map. Here we store each account balance.
    mapping (address => uint256) balances;


    // ========  Contract initialization  ========
    // The `constructor` is executed only once when the contract is created.
    constructor() {
        // The totalSupply is assigned to transaction sender, which 
        // is the account that is deploying the contract.
        balances[msg.sender] = totalSupply;
        owner = msg.sender;
    }

    /*
        A function to transfer tokens. The `external` modifier makes a 
        function *only* callable from outside the contract.
    */
    function transfer(address to, uint256 amount) external {
        // Need to import 'hardhat/console.sol' to use this feature
        console.log("Sender balance is %s tokens", balances[msg.sender]);
        console.log("Trying to send %s tokens to %s", amount, to);
        
        // Check if the transaction sender has enough tokens.
        // If `require`'s first argument evaluates to `false` then the
        // transaction will revert.
        require (balances[msg.sender] >= amount, "Not enough tokens");

        // Transfer the amount
        balances[msg.sender] -= amount;
        balances[to] += amount;
    }

    /*
        Read only function to retrieve the token balance of a given account.
        The `view` modifier indicates that it doesn't modify the contract's
        state, which allows us to call it without executing a transaction.
    */
    function balanceOf(address account) external view returns (uint256) {
        return balances[account];
    }

    // Next step is to compile - `npx hardhat compile`
}