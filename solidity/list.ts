import { ethers } from "ethers";
const gorli = '0x6Ce570d02D73d4c384b46135E87f8C592A8c86dA'
const Pool = require("@uniswap/v3-sdk")
const Token = require("@uniswap/sdk-core")
const abi = require("@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json")
const provider = new ethers.providers.JsonRpcProvider("https://goerli.infura.io/v3/ebf2e918d9e94094ba8f2a73f82174ee");
const poolAddress = "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6";

const poolContract = new ethers.Contract(poolAddress, abi, provider);
interface Immutables {
    factory: string
    token0: string
    token1: string
    fee: number
    tickSpacing: number
    maxLiquidityPerTick: ethers.BigNumber
  }
  
  interface State {
    liquidity: ethers.BigNumber
    sqrtPriceX96: ethers.BigNumber
    tick: number
    observationIndex: number
    observationCardinality: number
    observationCardinalityNext: number
    feeProtocol: number
    unlocked: boolean
  }
  
  async function getPoolImmutables() {
    const [factory, token0, token1, fee, tickSpacing, maxLiquidityPerTick] = await Promise.all([
      poolContract.factory(),
      poolContract.token0(),
      poolContract.token1(),
      poolContract.fee(),
      poolContract.tickSpacing(),
      poolContract.maxLiquidityPerTick(),
    ])
  
    const immutables: Immutables = {
      factory,
      token0,
      token1,
      fee,
      tickSpacing,
      maxLiquidityPerTick,
    }
    return immutables
  }
  
  async function getPoolState() {
    const [liquidity, slot] = await Promise.all([poolContract.liquidity(), poolContract.slot0()])
  
    const PoolState: State = {
      liquidity,
      sqrtPriceX96: slot[0],
      tick: slot[1],
      observationIndex: slot[2],
      observationCardinality: slot[3],
      observationCardinalityNext: slot[4],
      feeProtocol: slot[5],
      unlocked: slot[6],
    }
  
    return PoolState
  }
  
  async function main() {
    const [immutables, state] = await Promise.all([getPoolImmutables(), getPoolState()])
  
    const TokenA = new Token(3, immutables.token0, 6, 'USDC', 'USD Coin')
  
    const TokenB = new Token(3, immutables.token1, 18, 'WETH', 'Wrapped Ether')
  
    const poolExample = new Pool(
      TokenA,
      TokenB,
      immutables.fee,
      state.sqrtPriceX96.toString(),
      state.liquidity.toString(),
      state.tick
    )
    console.log(poolExample)
  }
  
  main()