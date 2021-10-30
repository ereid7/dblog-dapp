// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./DBlogPostContract.sol";
import '@openzeppelin/contracts/access/Ownable.sol';

contract DBlogContract is Ownable {
    
    string public blogName;
    uint public postCount;
    
    mapping(uint => DBlogPostContract) public postMap;

    event PostCreated(DBlogPostContract indexed _postAddress);
    
    constructor(
        address _blogOwnerAddress,
        string memory _blogName) {
        transferOwnership(_blogOwnerAddress);

        blogName = _blogName;
        postCount = 0;
    }
    
    function publishBlogPost(string memory _postTitle, 
        string memory _postContent) onlyOwner public returns(uint postNum)  {
        
        postCount++;
        postMap[postCount] = new DBlogPostContract(address(this), postCount, _postTitle, _postContent);
        
        emit PostCreated(postMap[postCount]);
        return postCount;
    }

    function setBlogName(string memory _blogName) onlyOwner public {
        blogName = _blogName;
    }
}