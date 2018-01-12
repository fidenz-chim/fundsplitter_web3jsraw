# fundsplitter_web3jsraw
Sample DApp to illustrate how to use web3js-raw package to interact with a Smart Contract. 

#### Primary Infrastructrure Setup ####
+ Install and setup Browserify 
   + http://browserify.org/

+ Create accounts and get ether
   + https://metamask.io/
   + Create few accounts and identify one account as the primary account (Acc: PRIMARY_ACC, Private Key:PRIMARY_ACC_PVTKEY)
   + Use Ether faucet https://faucet.metamask.io/ to get Ether for the PRIMARY_ACC
   + Assign the PRIMARY_ACC to CONTRACT_OWNER in _fund_splitter_dapp.js_
   + Assign the PRIMARY_ACC_PVTKEY to PVT_KEY in _fund_splitter_dapp.js_   
   
+ Setup application from source
  ```
  git clone https://github.com/fidenz-chim/fundsplitter_web3jsraw.git
  npm install
  ```
+ Create an account in infura.io 
  + Obtain the token ans assign that to INFURAIO_TOKEN in _fund_splitter_dapp.js_

+ Bundle all Javascript so you could run this app locally from browser (withot a web server)
  + ```browserify fund_splitter_dapp.js -o main.js```

+ Open index.html project folder
