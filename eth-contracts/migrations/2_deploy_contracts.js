// migrating the appropriate contracts
var SquareVerifier = artifacts.require("Verifier");
var SolnSquareVerifier = artifacts.require("./SolnSquareVerifier.sol");
var ERC721Mintable = artifacts.require("casaToken");

module.exports = function(deployer) {
  deployer.deploy(SquareVerifier).then( () => {
    return deployer.deploy(SolnSquareVerifier, SquareVerifier.address);
  })
};
