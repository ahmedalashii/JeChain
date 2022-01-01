<div align="center">
	<br/>
	<img src="./assets/extended-logo.png"/>
	<br/>
	<div><b>A simple, educational-purpose blockchain</b></div>
	<br/>
	<a href="https://github.com/nguyenphuminh/JeChain/blob/master/LICENSE.md"><img src="https://img.shields.io/badge/license-MIT-blue.svg"/></a>
	<a href="https://github.com/nguyenphuminh/JeChain/releases"><img src="https://img.shields.io/github/package-json/v/nguyenphuminh/JeChain?label=stable"></a>
	<a href="https://snyk.io/test/github/nguyenphuminh/JeChain"><img src="https://snyk.io/test/github/nguyenphuminh/JeChain/badge.svg"/></a>
</div>

## What is JeChain?
JeChain is a proof-of-work blockchain created using Javascript, originally used in [this series on dev.to](https://dev.to/freakcdev297/series/15322). If you are here for that, consider checking out [this repo](https://github.com/nguyenphuminh/blockchain-tutorial/tree/main/Creating%20a%20blockchain%20in%2060%20lines%20of%20Javascript).

To know how this code work properly, you can check out the tutorial series on dev.to:
* [Part 1: Creating a blockchain in 60 lines of Javascript](https://dev.to/freakcdev297/creating-a-blockchain-in-60-lines-of-javascript-5fka)
* [Part 2: Creating a cryptocurrency - Creating transactions, mining rewards, mint and gas fee ](https://dev.to/freakcdev297/creating-transactions-mining-rewards-mint-and-gas-fee-5hhf)
* [Part 3: Build a p2p network and release your cryptocurrency](https://dev.to/freakcdev297/build-a-p2p-network-and-release-your-cryptocurrency-clf)

## Why JeChain?
JeChain was created for educational purposes, also as an attempt trying to create a full-blown blockchain network.

## Setup and use
First, be sure to have Nodejs installed on your machine.

Next, install all the needed packages:
```
npm install
```

If you haven't had your keys, goto `./utils` and type `node keygen`, it will generate a key pair for you. 

Then, if you want to start a node, open the terminal, configure it first:
```sh
# PORT
PORT=Insert your port here
# Peers to connect when startup
PEERS=Address 1, address 2, address 3
# Set your address
MY_ADDRESS=ws://your.ip.and:port
# Set your private key
PRIVATE_KEY=your key

# Start the node
node jecoin
```

The equivalent of this on Windows is `set PORT=Insert your port here`

You can mine a block like this:
```js
mine();
```

You can broadcast a transaction like this:
```js
sendTransaction(yourTransaction);
```

You can request for a chain and chain's info like this: 
```js
requestChain("An address you trust");
```

You can manually connect to a node like this:
```js
connect("address");
```

### Initial coin release?
Check `jechain.js`, have a look at the genesis block, change the receiver address to your public address (because you should be the one who holds all the coins initally). Change the amount of coins if you want, it is set to `100000000` by default.

You shouldn't care about the minting address though, it can be anything you want.

### Using it publicly
Just forward port, drop your public IP + the port you forwarded in and you are set!

### Host your own cryptocurrency using JeChain
Just host a bootstrap node and a node that mines continously, and then ask people to connect to the bootstrap node, and you have technically had a cryptocurrency!

## Should you use JeChain?
No, it's more of a proof-of-concept, not a production-ready chain, so no.

I'm still improving it, please wait until it hits 1.0! 

## Upcoming features
* Improved security and performance.
* Smart contracts.

## Using this code
You can use the code in this project to build a chain on your own, but please mention me in the credit, thanks.

## Support the project/tutorial series
If you love the project or [my tutorial series on dev.to](https://dev.to/freakcdev297/build-a-p2p-network-and-release-your-cryptocurrency-clf), you can support me by:
* Leaving a star in this repo.
* Buying me a cup of latte through sending me some cryptos to:
  * My Bitcoin address: `bc1qk329eh7ggwrx34qnkzkgsm50jjv3x7haydfzk6`.
  * My Ethereum/BSC/Aurora address: `0x029B93211e7793759534452BDB1A74b58De22C9c`.
  * My Near address: `freakdev095.near`
  * My Solana address: `3tpbc8EXnUVqU3nkTSF3wm7NQsmJ2AW7syJGArFdJ9Yd`.

Thanks a lot for your help, I really appreciate it!

## Copyrights and License
Copyrights (c) 2021 Nguyen Phu Minh.

This project is licensed under the MIT License.
