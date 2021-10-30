// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./DBlogPostContract.sol";
import '@openzeppelin/contracts/access/Ownable.sol';

contract DBlogContract is Ownable {
    
    string public blogName;
    uint public postCount;
    uint public tagCount;
    
    mapping(uint => DBlogPostContract) public postMap;
    mapping(uint => string) public tagNames;
    
    // required for ui to iterate through page names for given tag
    mapping(string => mapping(uint => address)) public tagPageMap;
    mapping(string => uint) public tagPageCounts;
    mapping(string => bool) public tagExistence;

    event PostCreated(DBlogPostContract indexed _postAddress);
    
    constructor(
        address _blogOwnerAddress,
        string memory _blogName) {
        transferOwnership(_blogOwnerAddress);

        blogName = _blogName;
        postCount = 0;
        tagCount = 0;
    }
    
    function publishBlogPost(string memory _postTitle, 
        string memory _postContent, 
        string[] memory _tags,
        bool _commentsEnabled) onlyOwner public returns(uint postNum)  {
        
        // TODO handle duplicate tags passed
        postCount++;
        postMap[postCount] = new DBlogPostContract(address(this), postCount, _postTitle, _postContent, _tags, _commentsEnabled);
        
        for(uint i = 0; i < _tags.length; i++) {
            string memory lowercaseTagName = _tags[i];
            
            if (!tagExistence[lowercaseTagName]) {
                tagExistence[lowercaseTagName] = true;
                tagNames[tagCount++] = lowercaseTagName;
                tagPageCounts[lowercaseTagName] = 1;
            }
            else {
                tagPageCounts[lowercaseTagName]++;
            }
            
            tagPageMap[lowercaseTagName][tagPageCounts[lowercaseTagName] - 1] = address(postMap[postCount]);
        }
        
        emit PostCreated(postMap[postCount]);
        return postCount;
    }

    function setBlogName(string memory _blogName) onlyOwner public {
        blogName = _blogName;
    }
}