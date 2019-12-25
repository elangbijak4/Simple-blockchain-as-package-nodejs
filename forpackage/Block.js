hashok= require('./sha256.min.js');
class Block {
 constructor(index, previousHash, timestamp, data) {
   this.index = index;
   this.previousHash = previousHash;
   this.timestamp = timestamp;
   this.data = data;
   this.nonce = 0;
   this.hash = this.calculateHash(this); // defined later
 }
}

Block.prototype.calculateHash = function(block) {
  return hashok.sha256(block.index + block.previousHash + 
         block.timestamp + block.data + 
         block.nonce);
}

Block.prototype.mineBlock = function(difficulty) {
    this.nonce = 0;
    var zeros = "0".repeat(difficulty);
   
    while (this.hash.substring(0, difficulty) != zeros) {
      this.nonce++;
      this.hash = this.calculateHash(this);
    }
}

exports.Block = Block;