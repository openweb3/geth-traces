// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Trace {
    uint256 public num;
    bytes32 public hashRes;

    function hash(
        string memory _text,
        uint _num,
        address _addr
    ) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(_text, _num, _addr));
    }

    function setNum(uint256 _num) public {
        num = _num;
    }

    function setHashRes(string memory _text,
        uint _num,
        address _addr) public {
        hashRes = hash(_text, _num, _addr);
    }
}