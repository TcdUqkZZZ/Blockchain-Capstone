const verifier = artifacts.require('Verifier');
const proof = require('../proof.json');
const fakeProof = {  
  
    "proof": {
      "a": [
        "0x2a988709c11835ca1aaeb6b916227fe1a9c3d341ba9c9ffd85aa704ada47df1b",
        "0x301d684d53f8744212d715d023000620c2463e5ff7190f293edbe37a684c09b6"
      ],
      "b": [
        [
          "0x0d59bc052c6878bf93dabcbf59c3eaed1c404e0def1e781c70ebf1ce2c456430",
          "0x0e7755709afb0fd69c0bc965a12d2fa62496c0f51c1d6c57a0371feabe58100c"
        ],
        [
          "0x03dc52e7eb59418381659399776d3a3d74b7e73867ed7803262f4bbca18cc3fa",
          "0x0d5ae1386379e669c3c7faf8762029656c4cd65749664ed2a9930b2d7c5511a1"
        ]
      ],
      "c": [
        "0x2c7ebcac53d27d1dc3d5f47f03977bfe64e1d54db1d957def445df006ea0ede1",
        "0x199866cc509e2df309f4763b74d5c6ce34fd04511d503239aa6fad9d38d5f2c9"
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