Block = require('./Block.js');
class Blockchain {
    constructor(difficulty) {
       this.difficulty = difficulty;
       this.blocks = [];
       // Add Genesis Block
       var genesisBlock = new Block.Block(0, null, Date.now(), "Genesis block");
       genesisBlock.mineBlock(this.difficulty);
       this.blocks.push(genesisBlock);
    }
   }
   
   Blockchain.prototype.newBlock = function (data) {
    var latestBlock = this.blocks[this.blocks.length - 1];
    return new Block.Block(latestBlock.index + 1, latestBlock.hash, 
                      Date.now(), data);
   }
   
   Blockchain.prototype.addBlock = function(block) {
    block.mineBlock(this.difficulty);
    this.blocks.push(block);
   }
   
   Blockchain.prototype.isFirstBlockValid = function() {
    var firstBlock = this.blocks[0];
    
    if (firstBlock.index != 0)
      return false;
      
    if (firstBlock.previousHash != null)
      return false;
      
    if (firstBlock.hash == null ||
        firstBlock.calculateHash(firstBlock) != firstBlock.hash)
       return false;
       
    return true; 
   }
   
   Blockchain.prototype.isValidBlock = function (block, previousBlock) {
    if (previousBlock.index + 1 != block.index)
       return false;
       
    if (block.previousHash == null  ||
           block.previousHash != previousBlock.hash)
       return false;
       
    if (block.hash == null ||
        block.calculateHash(block) != block.hash)
       return false;
       
    return true;
   }
   
   Blockchain.prototype.isBlockchainValid = function() {
    if (!this.isFirstBlockValid())
       return false;
       
    for (var i = 1; i < this.blocks.length; i++) {
       var block = this.blocks[i];
       var previousBlock = this.blocks[i - 1];
       
       if (!this.isValidBlock(block, previousBlock))
          return false;
    }
    
    return true;
   }
   
   Blockchain.prototype.display = function() {
    for (var i = 0; i < this.blocks.length; i++) {
       var block = this.blocks[i];
       var str = "Block #" + block.index + " [" +
                 "previousHash: " + block.previousHash + ", " +
                 "timestamp: " + block.timestamp + ", " +
                 "data: " + block.data + ", " +
                 "hash: " + block.hash + "]";
       //console.log(str);
       return str;
    }
   }
   exports.Blockchain = Blockchain;