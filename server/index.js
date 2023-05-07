const express = require('express');
const verifyProof = require('../utils/verifyProof');

const port = 1225;

const app = express();
app.use(express.json());

// TODO: hardcode a merkle root here representing the whole nice list
// paste the hex string in here, without the 0x prefix
const MERKLE_ROOT = 'd4b1ab6b1e11f55e25bacef4e97fd486b89be8b94bfefba0d23b1b1f30b1a460';

app.post('/gift', (req, res) => {
  // disable CORS
  res.set('Access-Control-Allow-Origin', '*');

  // grab the parameters from the front-end here
  const body = req.body;
  console.log({body})

  // TODO: prove that a name is in the list 
  const { data: { proof, name } } = body;
  const isInTheList = verifyProof(proof, name, MERKLE_ROOT);

  if(isInTheList) {
    res.send("You got a toy robot!");
  }
  else {
    res.send("You are not on the list :(");
  }
});

app.get('/', (req, res) => {
  res.send(`
    <h1>Demo Project: Merkle Trees</h1>
    <p>This is a demo project for week 2 of the course at Alchemy University. The purpose of this project is to illustrate how Merkle Trees work on both the prover (client) and verifier (server) sides.</p>
    <p>Here you can found the code for the client and server, as well as a few utilities to help you get started. More code at <a href="https://github.com/sebastianoscarlopez/GiftList">https://github.com/sebastianoscarlopez/GiftList</a></p>
    <p>The goal of this project is to prove that a name is in a Merkle Tree. If the name is in the tree, then we can send a gift to that person.</p>
    <p>The verifier (server) side running here <a href="https://merkle-tree-gift-list-seven.vercel.app/">Merkle Tree (https://merkle-tree-gift-list-seven.vercel.app/)</a></p>
    <br/>
    <h3>How to use this demo. There are two ways</h3>
    <ul>
      <li>Try the client on the repository <a href="https://github.com/sebastianoscarlopez/GiftList">https://github.com/sebastianoscarlopez/GiftList</a></li>
      <br/>
      <li>Try this fetch, which will return a toy if the name is on the list.</li>
    </ul>
    <pre>
      <code style="font-family: Courier, monospace; background-color: #252525; padding: 10px; display: block;color:#f5f5f5;width:70%;margin-left:48px;overflow-x: auto;">
        fetch("https://merkle-tree-gift-list-seven.vercel.app/gift", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: {
              proof: [
                {
                  data: "04c1fae6490063d388a90d7735e9cfc20d18640a8d8c68d256cf5bd793164877",
                  left: false,
                },
                {
                  data: "9032f207204ccba39b580ff8728f60832101f40b9969ef34c03e6719b7fd52da",
                  left: false,
                },
                {
                  data: "3abaeb50267196c3affef95970b00ebe188f792d92a906f0aaf090725a7850c5",
                  left: false,
                },
                {
                  data: "7de75d7d1eb1a0aa83f4ea6a17d8ce68dafaae4745fd713de10e707af67f105b",
                  left: false,
                },
                {
                  data: "77b2f1e93aa2879de94bce9918102b356180b8dd5a90cbde2820149edaf654f1",
                  left: false,
                },
                {
                  data: "b4677b7835f06a664aecd16cdc3bf94db260f3203316355d83a2a0a7d074634a",
                  left: false,
                },
                {
                  data: "618fdf0309636143ea8fd303708bbcd9c9bda3ea7dc3e4fd86681650d24eb017",
                  left: false,
                },
                {
                  data: "9ed49e93290117f2091abe6947f156e6c208c43397ece74efb412458e643b67d",
                  left: false,
                },
                {
                  data: "25d45b676ca301c3e8d0aa2b2dbf3ad0ca075aed9ed64bf44b09efe88a0f00c9",
                  left: false,
                },
                {
                  data: "534efe51c2e94f788bd3f80034b525a4c0acebfa487607536aa66ace4bdc98ec",
                  left: false,
                },
              ],
              name: "Sebastian Oscar Lopez",
            },
          }),
        });
      </code>
    </pre>
    `
  );
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

module.exports = app;