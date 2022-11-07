### Despre noi

Team CrackIT
Hackathon SmartHack 2022 https://smarthack.asmi.ro/

### Idee

Un scratch pentru solidity pentru automatizarea de smart contracts. Exemplul aplicat si cel mai folosit din industrie este un smart contract pentru un ICO. Astefel aplicatia automatizeaza crearea de tokeni si alocarea lor catre utilizatori. 

### Build

#### Build backend

Add .env file in backend
`API_URL`  = "" // from https://dashboard.alchemy.com/

`PRIVATE_KEY` = "" // from generator wallet

	$ cd backend
	$ npm install
	$ npx hardhat compile



#### Build frontend

	$ cd frontend
	$ npm install
	$ npm start
