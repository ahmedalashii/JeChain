"use strict";

const crypto = require("crypto"), SHA256 = message => crypto.createHash("sha256").update(message).digest("hex");
const EC = require("elliptic").ec, ec = new EC("secp256k1");
const MINT_PRIVATE_ADDRESS = "0700a1ad28a20e5b2a517c00242d3e25a88d84bf54dce9e1733e6096e6d6495e";
const MINT_KEY_PAIR = ec.keyFromPrivate(MINT_PRIVATE_ADDRESS, "hex");
const MINT_PUBLIC_ADDRESS = MINT_KEY_PAIR.getPublic("hex");

class Block {
    constructor(timestamp, data) {
        this.timestamp = timestamp;
        this.data = data;
        this.prevHash = "";
        this.hash = Block.getHash(this);
        this.nonce = 0;
    }

    static getHash(block) {
        return SHA256(block.prevHash + block.timestamp + JSON.stringify(block.data) + block.nonce);
    }

    mine(difficulty) {
        while (!this.hash.startsWith(Array(difficulty + 1).join("0"))) {
            this.nonce++;
            this.hash = Block.getHash(this);
        }
    }

    static hasValidTransactions(block, chain) {
        let gas = 0, reward = 0;

        block.data.forEach(transaction => {
            if (transaction.from !== MINT_PUBLIC_ADDRESS) {
                gas += transaction.gas;
            } else {
                reward = transaction.amount;
            }
        });

        return (
            reward - gas === chain.reward &&
            block.data.every(transaction => Transaction.isValid(transaction, chain)) && 
            block.data.filter(transaction => transaction.from === MINT_PUBLIC_ADDRESS).length === 1
        );
    }
}

class Blockchain {
    constructor() {
        const initalCoinRelease = new Transaction(MINT_PUBLIC_ADDRESS, "04f91a1954d96068c26c860e5935c568c1a4ca757804e26716b27c95d152722c054e7a459bfd0b3ab22ef65a820cc93a9f316a9dd213d31fdf7a28621b43119b73", 100000000);
        this.transactions = [];
        this.chain = [new Block("", [initalCoinRelease])];
        this.difficulty = 1;
        this.blockTime = 30000;
        this.reward = 297;
        this.state = {
            "04f91a1954d96068c26c860e5935c568c1a4ca757804e26716b27c95d152722c054e7a459bfd0b3ab22ef65a820cc93a9f316a9dd213d31fdf7a28621b43119b73": {
                balance: 100000000
            }
        };
    }

    getLastBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(block) {
        block.prevHash = this.getLastBlock().hash;
        block.hash = Block.getHash(block);
        block.mine(this.difficulty);
        this.chain.push(Object.freeze(block));

        this.difficulty += Date.now() - parseInt(this.getLastBlock().timestamp) < this.blockTime ? 1 : -1;
    }

    addTransaction(transaction) {

        if (Transaction.isValid(transaction, this)) {
            this.transactions.push(transaction);
        }
    }

    mineTransactions(rewardAddress) {
        let gas = 0;

        this.transactions.forEach(transaction => {
            gas += transaction.gas;
        });

        const rewardTransaction = new Transaction(MINT_PUBLIC_ADDRESS, rewardAddress, this.reward + gas);
        rewardTransaction.sign(MINT_KEY_PAIR);

        const blockTransactions = [rewardTransaction, ...this.transactions];

        this.addBlock(new Block(Date.now().toString(), blockTransactions));

        this.transactions = [];
    }

    getBalance(address) {
        return this.state[address] ? this.state[address].balance : 0;
    }

    static isValid(blockchain) {
        for (let i = 1; i < blockchain.chain.length; i++) {
            const currentBlock = blockchain.chain[i];
            const prevBlock = blockchain.chain[i-1];

            if (
                currentBlock.hash !== Block.getHash(currentBlock) || 
                prevBlock.hash !== currentBlock.prevHash || 
                !Block.hasValidTransactions(currentBlock, blockchain)
            ) {
                return false;
            }
        }

        return true;
    }
}

class Transaction { 
    constructor(from, to, amount, gas = 0) { 
        this.from = from; 
        this.to = to; 
        this.amount = amount; 
        this.gas = gas; 
    } 
 
    sign(keyPair) { 
        if (keyPair.getPublic("hex") === this.from) { 
            this.signature = keyPair.sign(SHA256(this.from + this.to + this.amount + this.gas), "base64").toDER("hex"); 
        } 
    } 
 
    static isValid(tx, chain) {
        return ( 
            tx.from && 
            tx.to && 
            tx.amount >= 0 && 
            (chain.getBalance(tx.from) >= tx.amount + tx.gas || tx.from === MINT_PUBLIC_ADDRESS) && 
            ec.keyFromPublic(tx.from, "hex").verify(SHA256(tx.from + tx.to + tx.amount + tx.gas), tx.signature)
        )
    }
} 

const JeChain = new Blockchain();

module.exports = { Block, Transaction, Blockchain, JeChain };
