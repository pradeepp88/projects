const CCNFT = artifacts.require("CCNFT");

module.exports = function (deployer) {
    deployer.deploy(CCNFT, "CharityCoin", "CC");
};