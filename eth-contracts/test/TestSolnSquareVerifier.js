// Test if a new solution can be added for contract - SolnSquareVerifier

// Test if an ERC721 token can be minted for contract - SolnSquareVerifier

const solNSquareVerifier = artifacts.require('SolnSquareVerifier');

const proof = require('../proof.json');


contract('TestSolnSquareVerifier', accounts => {
    const account = accounts[0];
    describe('Test solNSquareVerifier contract', () => {
        beforeEach(async () => {
            this.contract = await solNSquareVerifier.new({from: account});
        })

        it('can accept a new Solution', async () => {
            hash = await this.contract.getProofHash(account, 1, proof.proof);
            await this.contract.addSolution(hash, account, 1 );
            sol = await this.contract.getSolutions();
            assert.equal(sol[0].index, 1);
            assert.equal(sol[0].addr, account);
        })

        it('can mint a token', async () => {
            await this.contract.mintWithProof(account, 1, proof.proof, proof.inputs, {from: account});
            assert.equal(await this.contract.ownerOf(1), account);

        }) 
    })

})