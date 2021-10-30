// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./DBlogContract.sol";
import '@openzeppelin/contracts/access/Ownable.sol';

contract DBlogPostContract is Ownable {
    DBlogContract public blog;
    uint public postNum;
    string public title;
    string public contentIpfsCid;
    uint public likeCount;
    mapping(address => bool) public likers;
    bool public isDeleted;

    constructor(
        address _blogAddress,
        uint _postNum,
        string memory _postTitle,
        string memory _postContentIpfsCid) {
            
        transferOwnership(_blogAddress);
            
        blog = DBlogContract(_blogAddress);
        postNum = _postNum;
        title = _postTitle;
        contentIpfsCid = _postContentIpfsCid;
        likeCount = 0;
    }
     
    function likePost() notOwner public {
        require(likers[msg.sender] == false, "Caller address has already liked this post.");
       
        likeCount++;
        likers[msg.sender] = true;
    }
    
    function setDeleted(bool _isDeleted) onlyOwner public {
        isDeleted = _isDeleted;
    }
    
    /**
     * @dev Throws if called by the owner.
     */
    modifier notOwner() {
        require(owner() != _msgSender(), "Caller is the owner. Cannot be called by owner");
        _;
    }
}