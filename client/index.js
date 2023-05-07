const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

// const serverUrl = 'http://localhost:1225';
const serverUrl = 'https://merkle-tree-gift-list-seven.vercel.app/';

// create the merkle tree for the whole nice list
const merkleTree = new MerkleTree(niceList);

// find the proof that Sebastian Oscar Lopez is in the list 
const name = 'Sebastian Oscar Lopez';

async function main() {
  const index = niceList.findIndex(n => n === name);
  const proof = merkleTree.getProof(index);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    data: {
      proof: proof,
      name: name
    }
  });

  console.log({ gift });
}

main();