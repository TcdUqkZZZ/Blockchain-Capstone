const verifier = artifacts.require('Verifier');
const proof = require('../proof.json');
const fakeProof = {
    "proof": {
      "a": [
        "0x27999b38e46eab0871ecb4200babe1a92a22c376555c8418c838f18112345678",
        "0x099416bd7e2fc2609a1c4e15a9970d1f0d7b65661114e5869eb7c30612345678"
      ],
      "b": [
        [
          "0x04585a07a6aa925ab550ddde214232eb00cc298cf007b1db11fbe305baf28926",
          "0x06a7c9ce7e200bbad6459ac366edea740f1c069498ad878dd58bcbde24ae481b"
        ],
        [
          "0x23f1cc8435bf1da4c4c7b5656d2458e34e7730560546cec34bab7a528558193e",
          "0x162b21a47714784dcf8fdea17b926d7c6b78a0fbf83e0b431cfb195c4aa28119"
        ]
      ],
      "c": [
        "0x0f5250236d96b45f1eb13244d057ede553c421cae34bd06f00bdb8e42b1dad29",
        "0x1553454736e9e4a7454a2293e970531f6d2e7b4d280557e9d955b910b99bdb07"
      ]
    },
    "inputs": [
      "0x0000000000000000000000000000000000000000000000000000000000000008",
      "0x0000000000000000000000000000000000000000000000000000000000000001"
    ]
  }
    

contract('verifier', accounts =>{
    const account = accounts[0];

    describe ('test verification', () => {
        beforeEach(async () => {
            this.contract = await verifier.new({from:account});
        })

        it('works with correct proof', async () => {
            let res = await this.contract.verifyTx.call(proof.proof, proof.inputs);

            assert.equal(res, true);
        })

        it('doesnt work with wrong proof', async () => {
            let res = await this.contract.verifyTx.call(fakeProof.proof, fakeProof.inputs);
            assert.equal(res, false);

        })
    })
})