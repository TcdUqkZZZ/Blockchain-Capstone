
const solNSquareVerifier = artifacts.require('SolnSquareVerifier');
const proof = require('../proof.json')

module.exports = async function(callback){

    const verif = await solNSquareVerifier.deployed()
    console.log("wewe")

    await verif.mintWithProof("0xf56ccf224bb372d2e46b00c82016a6af89ee79ee", 6, proof.proof, proof.inputs);
    console.log(`minted token 6`)


callback();
}