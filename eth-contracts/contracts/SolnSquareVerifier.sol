pragma solidity >=0.8.0;

//  define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
import './Verifier.sol';
import './ERC721Mintable.sol';

//  define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class

contract SolnSquareVerifier is casaToken, Verifier {
    struct solutions {
        uint index;
        address addr;
    }

    solutions[] sols;

    mapping (bytes32 => solutions) subbedSols;

    event solutionAdded(solutions s);

    function getSolutions() public view returns(solutions[] memory){
        return sols;
    }

    function addSolution(bytes32 _hash, address _addr, uint256 _index ) public{
        solutions storage sol = subbedSols[_hash];
        sol.index = _index;
        sol.addr = _addr;
        sols.push(subbedSols[_hash]);
        emit solutionAdded(subbedSols[_hash]);
    }

    function getProofHash(address to, uint256 tokenId, Proof memory proof) public pure returns (bytes32){
        return keccak256(abi.encode(to,tokenId,proof));

    }

    function isSolutionUnique(bytes32 solHash) internal view returns (bool) {
        return(subbedSols[solHash].addr == address(0));
    }

    function mintWithProof(
        address to,
        uint256 
        tokenId,
        Proof memory proof,
        uint[2] memory input
    ) public {
        bytes32 solHash = getProofHash(to, tokenId, proof);
        require (isSolutionUnique(solHash));
        require(verifyTx(proof, input));

        addSolution(solHash, to, tokenId);
        mint(to, tokenId);
        
    }

}




























