// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract JokeToken is ERC20, ERC20Burnable, Ownable {
    uint256 private _tokensMinted;

    constructor() ERC20("JokeToken", "JOT") {}

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function buy(address recipient) public payable {
        require(msg.value >= 0.0001 ether, "Minimum purchase of 0.0001 JOT.");
        _mint(recipient, msg.value); // 1:1 ratio of eth:jot
        _tokensMinted += msg.value;
    }

    function sell(address recipient, uint256 amount) public {
        require(amount >= 0.0001 ether, "Minimum sales of 0.0001 JOT.");
        require(balanceOf(recipient) >= amount, "Insufficient tokens in wallet.");
        require (_tokensMinted >= amount, "Insufficient funds in the reserve.");
        _burn(recipient, amount);
        _tokensMinted -= amount;
        payable(recipient).transfer(amount);
    }

    function tokensMinted() public view returns (uint256) {
        return _tokensMinted; // value in Wei
    }
}
