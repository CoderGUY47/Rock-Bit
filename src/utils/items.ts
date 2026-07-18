export interface CryptoItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  price: number;
  rating: number;
  category: string;
  image: string;
  change24h: number;
  volume24h: string;
  dateAdded: string;
  isCustom?: boolean;
}

const DEFAULT_ITEMS: CryptoItem[] = [
  {
    id: "bitcoin",
    title: "Bitcoin",
    shortDesc: "The original cryptocurrency operating on a peer-to-peer network.",
    fullDesc: "Bitcoin (BTC) is a decentralized digital currency, without a central bank or single administrator, that can be sent from user to user on the peer-to-peer bitcoin network without the need for intermediaries.",
    price: 92450.00,
    rating: 4.9,
    category: "L1",
    image: "/assets/coins/btc.svg",
    change24h: 3.42,
    volume24h: "$35.2B",
    dateAdded: "2009-01-03"
  },
  {
    id: "ethereum",
    title: "Ethereum",
    shortDesc: "Decentralized open-source blockchain system featuring smart contracts.",
    fullDesc: "Ethereum is a decentralized, open-source blockchain with smart contract functionality. Ether (ETH) is the native cryptocurrency of the platform. Among cryptocurrencies, Ether is second only to Bitcoin in market capitalization.",
    price: 3420.50,
    rating: 4.8,
    category: "L1",
    image: "/assets/coins/eth.svg",
    change24h: 1.85,
    volume24h: "$18.7B",
    dateAdded: "2015-07-30"
  },
  {
    id: "solana",
    title: "Solana",
    shortDesc: "High-performance blockchain supporting builders globally.",
    fullDesc: "Solana is a blockchain platform which uses a proof-of-stake mechanism to provide smart contract functionality. Its native cryptocurrency is SOL. It aims to achieve high transaction speeds at low costs.",
    price: 212.80,
    rating: 4.7,
    category: "L1",
    image: "/assets/coins/sol.svg",
    change24h: 5.12,
    volume24h: "$4.1B",
    dateAdded: "2020-03-16"
  },
  {
    id: "uniswap",
    title: "Uniswap",
    shortDesc: "Decentralized trading protocol facilitating automated liquidity.",
    fullDesc: "Uniswap is a decentralized finance protocol that is used to exchange cryptocurrencies. Uniswap is also the name of the company that initially built the Uniswap protocol. The protocol facilitates automated transactions between cryptocurrency tokens on the Ethereum blockchain through the use of smart contracts.",
    price: 11.25,
    rating: 4.5,
    category: "DeFi",
    image: "/assets/coins/uni.svg",
    change24h: -1.24,
    volume24h: "$850M",
    dateAdded: "2018-11-02"
  },
  {
    id: "aave",
    title: "Aave",
    shortDesc: "Open-source liquidity protocol to earn interest on deposits.",
    fullDesc: "Aave is a decentralized finance protocol that allows people to lend and borrow crypto. Lenders earn interest by depositing digital assets into specially created liquidity pools. Borrowers can then use their crypto as collateral to take out a flash loan using this liquidity.",
    price: 185.40,
    rating: 4.6,
    category: "DeFi",
    image: "/assets/coins/aave.svg",
    change24h: 2.15,
    volume24h: "$340M",
    dateAdded: "2020-10-02"
  },
  {
    id: "arbitrum",
    title: "Arbitrum",
    shortDesc: "Optimistic rollup Layer 2 network for Ethereum scalability.",
    fullDesc: "Arbitrum is an optimistic rollup network built on top of Ethereum, designed to improve scalability, speed, and cost efficiency while maintaining Ethereum's security benefits.",
    price: 1.15,
    rating: 4.4,
    category: "Layer 2",
    image: "/assets/coins/arb.png",
    change24h: -3.10,
    volume24h: "$510M",
    dateAdded: "2021-08-31"
  },
  {
    id: "optimism",
    title: "Optimism",
    shortDesc: "Fast, stable, and scalable L2 blockchain built by Ethereum developers.",
    fullDesc: "Optimism is a fast, stable, and scalable L2 blockchain built by Ethereum developers, for Ethereum developers. Built as a minimal extension to existing Ethereum software, Optimism's EVM-equivalent architecture scales your Ethereum apps without surprises.",
    price: 2.35,
    rating: 4.3,
    category: "Layer 2",
    image: "/assets/coins/op.png",
    change24h: 0.45,
    volume24h: "$220M",
    dateAdded: "2022-05-31"
  },
  {
    id: "chainlink",
    title: "Chainlink",
    shortDesc: "Decentralized oracle network connecting smart contracts with real-world data.",
    fullDesc: "Chainlink is a decentralized oracle network that provides real-world data to smart contracts on the blockchain. Smart contracts are self-executing agreements on the blockchain, but they need access to outside data in order to function properly.",
    price: 18.20,
    rating: 4.6,
    category: "Oracle",
    image: "/assets/coins/link.svg",
    change24h: 4.10,
    volume24h: "$640M",
    dateAdded: "2017-09-19"
  }
];

export const getItems = (): CryptoItem[] => {
  if (typeof window === "undefined") return DEFAULT_ITEMS;
  const customStr = localStorage.getItem("custom_crypto_items");
  if (!customStr) return DEFAULT_ITEMS;
  try {
    const customItems: CryptoItem[] = JSON.parse(customStr);
    return [...DEFAULT_ITEMS, ...customItems];
  } catch (e) {
    return DEFAULT_ITEMS;
  }
};

export const getItemById = (id: string): CryptoItem | undefined => {
  const all = getItems();
  return all.find(item => item.id === id);
};

export const addCustomItem = (item: Omit<CryptoItem, "id" | "isCustom" | "dateAdded" | "change24h" | "volume24h">): CryptoItem => {
  const newItem: CryptoItem = {
    ...item,
    id: "custom-" + Math.random().toString(36).substring(2, 9),
    isCustom: true,
    dateAdded: new Date().toISOString().split("T")[0],
    change24h: parseFloat((Math.random() * 10 - 5).toFixed(2)),
    volume24h: "$" + (Math.random() * 10 + 1).toFixed(1) + "M"
  };

  const all = typeof window !== "undefined" ? localStorage.getItem("custom_crypto_items") : null;
  const customList: CryptoItem[] = all ? JSON.parse(all) : [];
  customList.push(newItem);
  if (typeof window !== "undefined") {
    localStorage.setItem("custom_crypto_items", JSON.stringify(customList));
  }
  return newItem;
};

export const deleteCustomItem = (id: string): boolean => {
  const all = typeof window !== "undefined" ? localStorage.getItem("custom_crypto_items") : null;
  if (!all) return false;
  try {
    const customList: CryptoItem[] = JSON.parse(all);
    const updated = customList.filter(item => item.id !== id);
    if (typeof window !== "undefined") {
      localStorage.setItem("custom_crypto_items", JSON.stringify(updated));
    }
    return true;
  } catch (e) {
    return false;
  }
};
