pragma solidity >=0.8.0;

// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
import './Verifier.sol';
import './ERC721Mintable.sol';

contract myVerifier is Verifier{}
// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class

contract SolnSquareVerifier is casaToken {
    struct solutions {
        uint index;
        address addr;
    }

    solutions[] sols;

    mapping (bytes32 => solutions) subbedSols;

    event solutionAdded(solutions s);

    function addSolution(bytes32 _hash, address _addr, uint256 _index ) internal{
        subbedSols[_hash].index = _index;
        subbedSols[_hash].addr = _addr;
        sols.push(subbedSols[_hash]);
        emit solutionAdded(subbedSols[_hash]);
    }

    function isSolutionUnique(bytes32 solHash) internal view returns (bool) {
        return(subbedSols[solHash].addr != address(0));
    }

    function mint(
        address to,
        uint256 tokenId,
        myVerifier.Proof memory proof

    ) public{
        bytes32 solHash = keccak256(abi.encode(to,tokenId,proof));
        require (isSolutionUnique(solHash));

        addSolution(solHash, to, tokenId);

        super.mint(to, tokenId);
        

    }

}




























