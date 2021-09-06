// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./DBlogContract.sol";
import '@openzeppelin/contracts/access/Ownable.sol';

contract DBlogPostContract is Ownable {
    DBlogContract public blog;
    uint public postNum;
    string public title;
    string public content;
    string[] public tags;
    uint public likeCount;
    mapping(address => bool) public likers;
    bool public isDeleted;
    
    bool public commentsEnabled;
    uint public commentCount;
    mapping(uint => Comment) comments;

    struct Comment {
        uint exists;
        string content;
        address writer;
    }
    
    // TODO owner of this is dblogcontract. Make owner the blog contract owner
    constructor(
        address _blogAddress,
        uint _postNum,
        string memory _postTitle,
        string memory _postContent,
        string[] memory _tags,
        bool _commentsEnabled) {
            
        transferOwnership(_blogAddress);
            
        blog = DBlogContract(_blogAddress);
        postNum = _postNum;
        title = _postTitle;
        content = _postContent;
        tags = _tags;
        likeCount = 0;
        commentCount = 0;
        commentsEnabled = _commentsEnabled;
    }
     
    function likePost() notOwner public {
        require(likers[msg.sender] == false, "Caller address has already liked this post.");
       
        likeCount++;
        likers[msg.sender] = true;
    }
    
    function addComment(string memory _content) public {
        comments[commentCount] = Comment(commentCount++, _content, msg.sender);
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