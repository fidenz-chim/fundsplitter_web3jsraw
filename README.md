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

#### How to use the app ####

+ To interact with already diployed contract
   + Members->Get Count => Number of members in the contract
   + Members->Get Member At => Return address of the member for the list index specified above
   + Members->Add New => Specify a new member address to add that member to list (only contract owner could do this) (increase the Members Count)
   
   + Funds->Get Count => Number of undistributed funds in the contract
   + Funds->Get Fund At => Return amount in Wei of the fund for the list index specified above
   + Funds->Add Funds => Add new funds entry to the contract (increase the Funds Count)
   
   + Disperse Funds => distribute funds eaqually to members in the list. Any remainder will be added to contract's balance
