const DBlogPostContract = artifacts.require('DBlogPostContract')
const DBlogContract = artifacts.require('DBlogContract')
const DBlogFactoryContract = artifacts.require('DBlogFactoryContract')

module.exports = async function(deployer, network, accounts) {
    // Deploy DBlogFactoryContract
    await deployer.deploy(DBlogFactoryContract)
    const factory = await DBlogFactoryContract.deployed()

    // Deploy Mock DBlogContract
    await factory.createBlog("Mock Blog")
    const blog = await DBlogContract.deployed()
    console.log(blog)

    // Deploy Mock DBlogPostContract
    await blog.publishBlogPost("Mock Post", "Mock Post Content", ["mockTag1", "mockTag2"], true)
    await blog.publishBlogPost("Mock Post Two", "More Mock Content", ["mockTag1", "mockTag2", "mockTag3"], true)

    // await deployer.deploy(DBlogPostContract, blog.address, 0, "Mock Post", "Mock Post Content", ["mockTag1", "mockTag2"], true)
} // 0xfdA78D12580008741FF99EB1Dd213C74DA6E78aC