const DBlogPostContract = artifacts.require('DBlogPostContract')
const DBlogContract = artifacts.require('DBlogContract')

module.exports = async function(deployer, network, accounts) {
    // Deploy Mock DBlogContract
    await deployer.deploy(DBlogContract, "Mock Blog")
    const blog = await DBlogContract.deployed()

    // Deploy Mock DBlogPostContract
    await blog.publishBlogPost("Mock Post", "Mock Post Content", ["mockTag1", "mockTag2"], true)
    await blog.publishBlogPost("Mock Post Two", "More Mock Content", ["mockTag1", "mockTag2", "mockTag3"], true)

    // await deployer.deploy(DBlogPostContract, blog.address, 0, "Mock Post", "Mock Post Content", ["mockTag1", "mockTag2"], true)
}