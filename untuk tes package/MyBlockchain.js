rantaiblok = require('./Blockchain.js');
Block = require('./Block.js');
var blockchain = new rantaiblok.Blockchain(4);
var block1 = blockchain.newBlock("Second Block");
blockchain.addBlock(block1);
var block2 = blockchain.newBlock("Third Block");
blockchain.addBlock(block2);
var block3 = blockchain.newBlock("Fourth Block");
blockchain.addBlock(block3);

console.log("Blockchain Validity: " + blockchain.isBlockchainValid());

console.log(blockchain.display());

var block4 = new Block.Block(12, "falseHash", Date.now(), "Block Invalid");
blockchain.addBlock(block4);

console.log("Blockchain Validity: " + blockchain.isBlockchainValid());

console.log(blockchain.display());