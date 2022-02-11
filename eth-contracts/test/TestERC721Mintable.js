var casaToken = artifacts.require('casaToken');

contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await casaToken.new({from: account_one});

            await this.contract.mint(account_two,1, {from: account_one})
            await this.contract.mint(account_two,2, {from: account_one})
            await this.contract.mint(account_two,3, {from: account_one})
            await this.contract.mint(account_two,4, {from: account_one})
            await this.contract.mint(account_two,5, {from: account_one})

        })

        it('should return total supply', async function () { 
            let supply = await this.contract.totalSupply();
            assert.equal(supply, 5);
        })

        it('should get token balance', async function () { 
            let balance = await this.contract.balanceOf(account_two);

            assert.equal(balance, 5);
            
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 

            let baseTokenURI ="https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/"
            let firstTokenURI = await this.contract.tokenURI(1);
            assert.equal(firstTokenURI, `${baseTokenURI}1`)
            
        })

        it('should transfer token from one owner to another', async function () { 
            await this.contract.transferFrom(account_two, account_one, 1, {from: account_two});
            let newTokenOwner = await this.contract.ownerOf(1);
            assert.equal(newTokenOwner, account_one);
            
            
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await casaToken.new({from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () { 
            let denied = false;
            try { await this.contract.mint(account_two,1, {from: account_two})}
            catch(e) {
                denied = true;
            }

            assert.equal(denied, true);

            
        })

        it('should return contract owner', async function () { 
            let owner = await this.contract.getOwner();
            assert.equal(account_one, owner);
        })

    });
})