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
  },
  {
    id: "tether",
    title: "Tether",
    shortDesc: "Widely used stablecoin pegged to the US Dollar.",
    fullDesc: "Tether (USDT) is a cryptocurrency stablecoin that is pegged to the U.S. dollar and backed '100% by Tether's reserves'. It is widely used to transfer funds between exchanges or hedge against crypto volatility.",
    price: 1.00,
    rating: 4.8,
    category: "Stablecoin",
    image: "/assets/coins/usdt.svg",
    change24h: 0.02,
    volume24h: "$55.1B",
    dateAdded: "2014-10-06"
  },
  {
    id: "bnb",
    title: "BNB",
    shortDesc: "The core gas and utility token of the BNB Chain ecosystem.",
    fullDesc: "BNB powers the BNB Chain ecosystem. It is the native token of the Binance Smart Chain and can be used for gas fees, staking, and participation in token launchpads.",
    price: 585.50,
    rating: 4.7,
    category: "L1",
    image: "/assets/coins/bnb.svg",
    change24h: 1.10,
    volume24h: "$1.8B",
    dateAdded: "2017-07-25"
  },
  {
    id: "xrp",
    title: "XRP",
    shortDesc: "Digital asset built for global real-time settlement payments.",
    fullDesc: "XRP is the native cryptocurrency of the XRP Ledger, an open-source, public blockchain designed to facilitate faster and cheaper global payments and remittances.",
    price: 2.45,
    rating: 4.5,
    category: "L1",
    image: "/assets/coins/xrp.svg",
    change24h: -1.95,
    volume24h: "$2.9B",
    dateAdded: "2012-06-02"
  },
  {
    id: "cardano",
    title: "Cardano",
    shortDesc: "Evidence-based blockchain platform designed for peer-reviewed code.",
    fullDesc: "Cardano is a decentralized public blockchain and cryptocurrency project. Its native token is ADA. Cardano is developing a smart contract platform which seeks to deliver more advanced features than any protocol previously developed.",
    price: 0.85,
    rating: 4.5,
    category: "L1",
    image: "/assets/coins/ada.svg",
    change24h: 0.75,
    volume24h: "$450M",
    dateAdded: "2017-09-29"
  },
  {
    id: "avalanche",
    title: "Avalanche",
    shortDesc: "Ultra-fast smart contracts platform with custom subnet builders.",
    fullDesc: "Avalanche is a smart contracts platform built to scale infinitely and finalize transactions in under a second. Its native token is AVAX, used for gas fees and securing the network.",
    price: 28.50,
    rating: 4.6,
    category: "L1",
    image: "/assets/coins/avax.svg",
    change24h: 3.12,
    volume24h: "$280M",
    dateAdded: "2020-09-21"
  },
  {
    id: "polkadot",
    title: "Polkadot",
    shortDesc: "Multi-chain network uniting specialized blockchains into one web.",
    fullDesc: "Polkadot is an open-source sharded multichain protocol that connects and secures a network of specialized blockchains, facilitating the cross-chain transfer of any data or asset types.",
    price: 5.80,
    rating: 4.4,
    category: "L1",
    image: "/assets/coins/dot.svg",
    change24h: -2.30,
    volume24h: "$180M",
    dateAdded: "2020-05-26"
  },
  {
    id: "dogecoin",
    title: "Dogecoin",
    shortDesc: "The leading meme-based cryptocurrency with active community.",
    fullDesc: "Dogecoin is an open-source peer-to-peer cryptocurrency. It is favored by Shiba Inus worldwide and is used widely for online tipping and micro-payments due to its extremely low fees.",
    price: 0.32,
    rating: 4.3,
    category: "Meme",
    image: "/assets/coins/doge.svg",
    change24h: 8.50,
    volume24h: "$1.4B",
    dateAdded: "2013-12-06"
  },
  {
    id: "shiba-inu",
    title: "Shiba Inu",
    shortDesc: "Decentralized meme token evolved into a vibrant ecosystem.",
    fullDesc: "Shiba Inu (SHIB) is a decentralized, community-led currency held by millions of users across the globe. Built on the Ethereum blockchain, it has evolved to support its own DEX (ShibaSwap) and Layer-2 scaling platform.",
    price: 0.000018,
    rating: 4.2,
    category: "Meme",
    image: "/assets/coins/shib.png",
    change24h: 4.25,
    volume24h: "$680M",
    dateAdded: "2020-08-01"
  },
  {
    id: "polygon",
    title: "Polygon",
    shortDesc: "Scalability portal providing framework for Ethereum networks.",
    fullDesc: "Polygon (formerly Matic Network) is the first well-structured, easy-to-use platform for Ethereum scaling and infrastructure development, powered by the MATIC utility token.",
    price: 0.52,
    rating: 4.5,
    category: "Layer 2",
    image: "/assets/coins/matic.svg",
    change24h: -0.45,
    volume24h: "$210M",
    dateAdded: "2017-10-22"
  },
  {
    id: "litecoin",
    title: "Litecoin",
    shortDesc: "Fast and low-cost digital cash based on Bitcoin code.",
    fullDesc: "Litecoin (LTC) is a peer-to-peer cryptocurrency created by Charlie Lee. It is structurally similar to Bitcoin but features a faster block generation time and a different hashing algorithm.",
    price: 94.50,
    rating: 4.4,
    category: "L1",
    image: "/assets/coins/ltc.svg",
    change24h: 1.80,
    volume24h: "$380M",
    dateAdded: "2011-10-13"
  },
  {
    id: "near",
    title: "NEAR Protocol",
    shortDesc: "Climate-neutral sharded network for decentralized apps.",
    fullDesc: "NEAR Protocol is a sharded, developer-friendly Layer-1 blockchain platform designed to run decentralized applications securely, efficiently, and with minimal environmental impact.",
    price: 4.85,
    rating: 4.6,
    category: "L1",
    image: "/assets/coins/near.png",
    change24h: 2.15,
    volume24h: "$190M",
    dateAdded: "2020-04-22"
  },
  {
    id: "cosmos",
    title: "Cosmos",
    shortDesc: "The internet of blockchains enabling interoperability.",
    fullDesc: "Cosmos (ATOM) is an ecosystem of independent, parallel blockchains that can scale and interoperate with each other, designed to solve usability, scalability, and sovereignty challenges.",
    price: 8.20,
    rating: 4.4,
    category: "L1",
    image: "/assets/coins/atom.svg",
    change24h: -0.90,
    volume24h: "$150M",
    dateAdded: "2019-03-14"
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
