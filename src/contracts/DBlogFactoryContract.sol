// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./DBlogContract.sol";
import '@openzeppelin/contracts/access/Ownable.sol';

// struct DBlogUser {
// 	bool exists;
// 	uint postCount;
// }

contract DBlogFactoryContract is Ownable {
	uint public blogCount;

	mapping(address => mapping(uint => DBlogContract)) public addressBlogMap;
	mapping(address => uint) public addressBlogCounts;

	constructor() {
		blogCount = 0;
	}

	function createBlog(string memory _blogName) public {
		blogCount++;
		addressBlogMap[msg.sender][addressBlogCounts[msg.sender]++] = new DBlogContract(msg.sender, _blogName);
	}
}                                   