import { ethers } from 'ethers';

// $FACTS token contract on Base
const FACTS_TOKEN_ADDRESS = '0x97fad6f41377eb5a530e9652818a3deb31d12b07';
const ERC20_ABI = [
  'function balanceOf(address owner) view returns (uint256)',
  'function decimals() view returns (uint8)'
];

// You can use a public Base RPC or your own
const BASE_RPC = 'https://mainnet.base.org';

export async function getFactsBalance(address: string): Promise<string> {
  const provider = new ethers.JsonRpcProvider(BASE_RPC);
  const contract = new ethers.Contract(FACTS_TOKEN_ADDRESS, ERC20_ABI, provider);
  const [raw, decimals] = await Promise.all([
    contract.balanceOf(address),
    contract.decimals()
  ]);
  return ethers.formatUnits(raw, decimals);
}
