async function main(supply, tokenName, symbol, decimals) {
  await createToken(supply, tokenName, symbol, decimals)
}

main(supply, tokenName, symbol, decimals)
 .then(() => process.exit(0))
 .catch(error => {
   console.error(error);
   process.exit(1);
 });

async function createToken(supply, tokenName, symbol, decimals)
{
const HelloWorld = await ethers.getContractFactory("token");
// console.log("part1")

// Start deployment, returning a promise that resolves to a contract object
const hello_world = await HelloWorld.deploy(supply, tokenName, symbol, decimals);
console.log("Contract deployed to address:", hello_world.address);
}