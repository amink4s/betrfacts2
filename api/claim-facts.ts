import type { VercelRequest, VercelResponse } from '@vercel/node';
import { ethers } from 'ethers';

const FACTS_TOKEN_ADDRESS = '0x97fad6f41377eb5a530e9652818a3deb31d12b07';
const ERC20_ABI = [
  'function transfer(address to, uint256 amount) public returns (bool)',
  'function decimals() view returns (uint8)'
];

const FACTS_FAUCET_PK = process.env.FACTS_FAUCET_PK!; // Set this in Vercel
const FACTS_FAUCET_ADDRESS = process.env.FACTS_FAUCET_ADDRESS!; // Set this in Vercel
const BASE_RPC = 'https://mainnet.base.org';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { address, contributions } = req.body;
  if (!address || !contributions) return res.status(400).json({ error: 'Missing address or contributions' });

  try {
    const provider = new ethers.JsonRpcProvider(BASE_RPC);
    const wallet = new ethers.Wallet(FACTS_FAUCET_PK, provider);
    const contract = new ethers.Contract(FACTS_TOKEN_ADDRESS, ERC20_ABI, wallet);
    const decimals = await contract.decimals();
    const amount = ethers.parseUnits((contributions * 1_000_000).toString(), decimals);
    const tx = await contract.transfer(address, amount);
    await tx.wait();
    res.status(200).json({ success: true, txHash: tx.hash });
  } catch (e) {
    res.status(500).json({ error: (e as Error).message });
  }
}
