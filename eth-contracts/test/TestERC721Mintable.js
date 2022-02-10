var casaToken = artifacts.require('casaToken');

contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await casaToken.new({from: account_one});

            await this.contract.mint(account_one, 1, {from: account_one})
            await this.contract.mint(account_one,2, {from: account_one})
            await this.contract.mint(account_one,3, {from: account_one})
            await this.contract.mint(account_one,4, {from: account_one})
            await this.contract.mint(account_one,5, {from: account_one})

        })

        it('should return total supply', async function () { 
            supply = await this.contract.totalSupply();
            assert.equal(supply, 5);
        })

        it('should get token balance', async function () { 
            
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            
        })

        it('should transfer token from one owner to another', async function () { 
            
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () { 
            
        })

        it('should return contract owner', async function () { 
            
        })

    });
})