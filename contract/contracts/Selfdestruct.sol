// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Selfdestruct {

    function attack() public payable {
        address payable addr = payable(address(0x0));
        selfdestruct(addr);
    }
}