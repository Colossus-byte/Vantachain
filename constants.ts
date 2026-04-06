import { Topic, Difficulty, DidYouKnow, Achievement, Language, Guild, Proposal, Peer } from './types';

export interface CredentialDef {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  icon: string;
  colorClass: string;
  bgClass: string;
  borderClass: string;
  glowClass: string;
  tier: 'level' | 'bonus';
  requirementText: string;
  levelTopicId?: string;
}

export const CREDENTIAL_DEFS: CredentialDef[] = [
  {
    id: 'crypto-foundations',
    slug: 'crypto-foundations',
    name: 'Crypto Foundations',
    subtitle: 'Level 1 Certificate',
    description: 'Demonstrates foundational knowledge of cryptocurrency, blockchain mechanics, and wallet security.',
    icon: 'fa-seedling',
    colorClass: 'text-cyan-400',
    bgClass: 'from-cyan-600 via-cyan-500 to-blue-400',
    borderClass: 'border-cyan-500/40',
    glowClass: '0 0 40px rgba(0,212,255,0.35)',
    tier: 'level',
    requirementText: 'Complete Module 1: Crypto Foundations',
    levelTopicId: 'b1',
  },
  {
    id: 'market-navigator',
    slug: 'market-navigator',
    name: 'Market Navigator',
    subtitle: 'Level 2 Certificate',
    description: 'Certified understanding of DeFi fundamentals, trading analysis, and market dynamics.',
    icon: 'fa-compass',
    colorClass: 'text-emerald-400',
    bgClass: 'from-emerald-600 via-emerald-500 to-green-400',
    borderClass: 'border-emerald-500/40',
    glowClass: '0 0 40px rgba(16,185,129,0.35)',
    tier: 'level',
    requirementText: 'Complete Module 4: DeFi Fundamentals',
    levelTopicId: 'f1',
  },
  {
    id: 'defi-practitioner',
    slug: 'defi-practitioner',
    name: 'DeFi Practitioner',
    subtitle: 'Level 3 Certificate',
    description: 'Advanced proficiency in Web3 ecosystems, Layer 2 scaling, and on-chain operations.',
    icon: 'fa-code-branch',
    colorClass: 'text-violet-400',
    bgClass: 'from-violet-600 via-purple-500 to-fuchsia-400',
    borderClass: 'border-violet-500/40',
    glowClass: '0 0 40px rgba(124,58,237,0.35)',
    tier: 'level',
    requirementText: 'Complete Module 7: Web3 and NFTs',
    levelTopicId: 'm1',
  },
  {
    id: 'protocol-architect',
    slug: 'protocol-architect',
    name: 'Protocol Architect',
    subtitle: 'Level 4 Certificate',
    description: 'Expert-level mastery of portfolio strategy, advanced DeFi, and on-chain analysis.',
    icon: 'fa-crown',
    colorClass: 'text-amber-400',
    bgClass: 'from-amber-500 via-yellow-400 to-orange-400',
    borderClass: 'border-amber-400/40',
    glowClass: '0 0 40px rgba(245,158,11,0.35)',
    tier: 'level',
    requirementText: 'Complete Module 9: Portfolio Strategy',
    levelTopicId: 'p1',
  },
  {
    id: 'streak-7',
    slug: 'streak-7',
    name: '7-Day Streak',
    subtitle: 'Consistency Award',
    description: 'Awarded for maintaining a 7-day consecutive learning streak on Clarix Protocol.',
    icon: 'fa-fire',
    colorClass: 'text-orange-400',
    bgClass: 'from-orange-600 via-orange-500 to-red-400',
    borderClass: 'border-orange-500/40',
    glowClass: '0 0 40px rgba(249,115,22,0.35)',
    tier: 'bonus',
    requirementText: 'Maintain a 7-day learning streak',
  },
  {
    id: 'streak-30',
    slug: 'streak-30',
    name: '30-Day Streak',
    subtitle: 'Dedication Award',
    description: 'Exceptional dedication: 30 consecutive days of learning on Clarix Protocol.',
    icon: 'fa-calendar-check',
    colorClass: 'text-rose-400',
    bgClass: 'from-rose-600 via-rose-500 to-pink-400',
    borderClass: 'border-rose-500/40',
    glowClass: '0 0 40px rgba(244,63,94,0.35)',
    tier: 'bonus',
    requirementText: 'Maintain a 30-day learning streak',
  },
  {
    id: 'portfolio-analyst',
    slug: 'portfolio-analyst',
    name: 'Portfolio Analyst',
    subtitle: 'Achievement Award',
    description: 'Used the AI Portfolio Advisor to analyze a real connected wallet.',
    icon: 'fa-chart-pie',
    colorClass: 'text-blue-400',
    bgClass: 'from-blue-600 via-blue-500 to-indigo-400',
    borderClass: 'border-blue-500/40',
    glowClass: '0 0 40px rgba(59,130,246,0.35)',
    tier: 'bonus',
    requirementText: 'Run a portfolio analysis with a connected wallet',
  },
  {
    id: 'governance-pioneer',
    slug: 'governance-pioneer',
    name: 'Governance Pioneer',
    subtitle: 'Participation Award',
    description: 'Cast your first governance vote on a Clarix Protocol proposal.',
    icon: 'fa-landmark',
    colorClass: 'text-purple-400',
    bgClass: 'from-purple-600 via-purple-500 to-violet-400',
    borderClass: 'border-purple-500/40',
    glowClass: '0 0 40px rgba(168,85,247,0.35)',
    tier: 'bonus',
    requirementText: 'Cast a governance vote',
  },
];

export const DEFAULT_AVATARS: string[] = [
  "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=Clarix",
  "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=Vortex",
  "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=Nexus",
  "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=Atlas",
  "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=Cipher",
  "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=Neon",
  "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=Cypher",
  "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=Echo",
];

export const PEERS: Peer[] = [
  { id: 'peer1', address: '0xClarix_Alpha', guild: Guild.ARCHITECTS, status: 'online', latency: 42 },
  { id: 'peer2', address: '0xClarix_Vortex', guild: Guild.SENTINELS, status: 'online', latency: 12 },
  { id: 'peer3', address: '0xClarix_Catalyst', guild: Guild.LIQUIDATORS, status: 'online', latency: 88 },
  { id: 'peer4', address: '0xClarix_Ghost', guild: Guild.SENTINELS, status: 'away', latency: 156 },
  { id: 'peer5', address: '0xClarix_Solace', guild: Guild.ARCHITECTS, status: 'online', latency: 31 },
];

export const PROPOSALS: Proposal[] = [
  { id: 'prop1', title: 'Expand ZK-Proof Curriculum', description: 'Allocate 5M $PATH to develop advanced Zero-Knowledge circuit training.', votesFor: 12400, votesAgainst: 1200, status: 'active', pathCost: 100 },
  { id: 'prop2', title: 'Protocol Hackathon Q3', description: 'Incentivize Audit Lab bug bounties with a 50k $PATH prize pool.', votesFor: 8900, votesAgainst: 450, status: 'active', pathCost: 200 },
  { id: 'prop3', title: 'Multi-Chain Node Expansion', description: 'Enable support for Solana and Cosmos SDK modules.', votesFor: 15600, votesAgainst: 8400, status: 'passed', pathCost: 150 }
];

export const GUILD_DATA: Record<Guild, any> = {
  [Guild.SENTINELS]: { name: 'Clarix Sentinels', color: 'rose', icon: 'fa-user-shield', desc: 'Guardians of the protocol layer. Experts in exploits and auditing.' },
  [Guild.ARCHITECTS]: { name: 'Clarix Architects', color: 'indigo', icon: 'fa-compass-drafting', desc: 'Builders of the new world. Masters of Solidity and modular stacks.' },
  [Guild.LIQUIDATORS]: { name: 'Clarix Liquidators', color: 'emerald', icon: 'fa-chart-mixed', desc: 'Masters of capital efficiency. Specialists in AMMs and rebase mechanics.' },
  [Guild.NONE]: { name: 'Independent', color: 'slate', icon: 'fa-user', desc: 'Unallied node.' }
};

export const UI_TRANSLATIONS: Record<Language, any> = {
  [Language.EN]: {
    academy: 'Knowledge Atlas', certification: 'Clarix Credentials', institutional: 'Protocol Org',
    guilds: 'Guild Network', peers: 'P2P Nexus', governance: 'Governance DAO', profile: 'Profile',
    scan_modules: 'Search modules...', knowledge_sync: 'Cognitive Sync', intel_logs: 'Activity Feed',
    collectibles: 'Artifacts', access_level: 'Protocol Access', genesis_pool: 'Genesis Pool',
    active: 'Online', mainnet_sync: 'Chain Sync', allocation: 'Staking', next_node: 'Next Lesson',
    final_validation: 'Take Quiz', generating_block: 'Loading...', search_restricted: 'Switch to Academy to browse modules', level: 'Level',
  },
  [Language.ES]: {
    academy: 'Atlas de Conocimiento', certification: 'Credenciales Clarix', institutional: 'Org del Protocolo',
    guilds: 'Red de Gremios', peers: 'Nexus P2P', governance: 'DAO de Gobernanza', profile: 'Perfil',
    scan_modules: 'Buscar módulos...', knowledge_sync: 'Sinc Cognitiva', intel_logs: 'Feed de Actividad',
    collectibles: 'Artefactos', access_level: 'Nivel de Acceso', genesis_pool: 'Piscina Génesis',
    active: 'En línea', mainnet_sync: 'Sinc Mainnet', allocation: 'Staking', next_node: 'Siguiente Lección',
    final_validation: 'Hacer Quiz', generating_block: 'Cargando...', search_restricted: 'Cambia a Academia para explorar módulos', level: 'Nivel',
  },
  [Language.FR]: {
    academy: 'Atlas de Connaissance', certification: 'Certificats Clarix', institutional: 'Org du Protocole',
    guilds: 'Réseau de Guildes', peers: 'Nexus P2P', governance: 'DAO de Gouvernance', profile: 'Profil',
    scan_modules: 'Rechercher des modules...', knowledge_sync: 'Sync Cognitive', intel_logs: "Fil d'activité",
    collectibles: 'Artefacts', access_level: "Niveau d'Accès", genesis_pool: 'Bassin Genèse',
    active: 'En ligne', mainnet_sync: 'Sinc Mainnet', allocation: 'Staking', next_node: 'Leçon suivante',
    final_validation: 'Faire le quiz', generating_block: 'Chargement...', search_restricted: 'Passe à Académie pour parcourir les modules', level: 'Niveau',
  },
  [Language.ZH]: {
    academy: '知识地图', certification: 'Clarix 凭证', institutional: '协议组织',
    guilds: '公会网络', peers: 'P2P 枢纽', governance: '治理 DAO', profile: '个人资料',
    scan_modules: '搜索模块...', knowledge_sync: '认知同步', intel_logs: '活动动态',
    collectibles: '文物', access_level: '协议访问层级', genesis_pool: '创世池',
    active: '在线', mainnet_sync: '主网同步', allocation: '质押', next_node: '下一课',
    final_validation: '参加测验', generating_block: '加载中...', search_restricted: '切换到学院浏览模块', level: '级别',
  },
};

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'genesis', title: 'First Step', description: 'Completed your first lesson on Clarix.', icon: 'fa-seedling', rarity: 'common' },
  { id: 'auditor', title: 'Scam Shield', description: 'Completed the How to Spot Crypto Scams lesson.', icon: 'fa-shield-halved', rarity: 'rare' },
  { id: 'math_wizard', title: 'Chart Reader', description: 'Completed the Reading Crypto Charts lesson.', icon: 'fa-chart-line', rarity: 'rare' },
  { id: 'mev_master', title: 'DeFi Explorer', description: 'Completed DeFi Basics.', icon: 'fa-coins', rarity: 'epic' },
  { id: 'whale', title: 'Crypto Graduate', description: 'Completed the full Knowledge Atlas curriculum.', icon: 'fa-graduation-cap', rarity: 'legendary' },
];

const wrapNote = (content: string, takeaway: string, tip: string) =>
  `${content}\n\n**Key Takeaway**\n${takeaway}\n\n**Pro Tip**\n${tip}`;

// ─────────────────────────────────────────────────────────────────────────────
// 10-MODULE CURRICULUM
// ─────────────────────────────────────────────────────────────────────────────

export const TOPICS: Topic[] = [

  // ── MODULE 1: CRYPTO FOUNDATIONS (BASIC) ─────────────────────────────────
  {
    id: 'b1',
    title: 'Crypto Foundations',
    description: 'What crypto is, how Bitcoin works, wallets, and why it matters globally.',
    difficulty: Difficulty.BASIC,
    category: 'Foundations',
    estimatedMinutes: 14,
    rewardTokens: 10,
    subtopics: [
      {
        id: 'b1_s1',
        title: 'What Is Cryptocurrency and Why It Exists',
        content: wrapNote(
          `Cryptocurrency is digital money that exists on a decentralized network rather than in a bank. You can send it directly to anyone in the world without going through a financial institution, and the transaction settles in minutes rather than days.

This matters because the existing financial system excludes roughly 1.4 billion adults worldwide. These are people who cannot open a bank account due to lack of documentation, geographic remoteness, or prohibitively expensive minimum balances. Crypto only requires a smartphone and an internet connection.

There is also the cost angle. Sending money internationally through traditional services like Western Union costs between 8 and 12 percent in fees. A Bitcoin or USDT transfer to the same destination typically costs less than one dollar, regardless of the amount being sent. For families relying on remittances, this difference is substantial.

Finally, there is currency stability. In countries experiencing high inflation or currency controls, people have found that holding a portion of their savings in Bitcoin or dollar-pegged stablecoins provides meaningful protection. This is not speculation for them. It is a practical financial tool.`,
          "Crypto is not only an investment. For hundreds of millions of people, it is a practical tool for cheaper transfers, stable savings, and access to global markets.",
          "Follow reputable crypto education sources such as Binance Academy, CoinGecko Learn, or Ethereum.org. These are free, regularly updated, and written without bias toward specific projects."
        )
      },
      {
        id: 'b1_s2',
        title: 'How Bitcoin Works',
        content: wrapNote(
          `Bitcoin was created in 2009 by an anonymous entity known as Satoshi Nakamoto. It was designed to be a form of digital money that no single person or institution could control, censor, or inflate.

At its core, Bitcoin is a shared ledger maintained by thousands of computers worldwide. This ledger, called the blockchain, records every transaction ever made. When you send Bitcoin, your transaction is broadcast to the network. Computers called miners verify it and bundle it with others into a block. Once the block is added to the chain, the transaction is permanent and cannot be altered.

The total supply of Bitcoin is capped at 21 million coins. This is enforced by the software itself. No government, company, or person can create more. As of 2024, roughly 19.5 million have already been mined, leaving less than 1.5 million still to be issued. This fixed supply is why many investors compare Bitcoin to a digital form of gold.

You do not need to understand the technical details to use Bitcoin, just as you do not need to know how TCP/IP works to send an email. But understanding the basics helps you appreciate why it has value and why it behaves differently from ordinary currencies.`,
          "Bitcoin is the first scarce, permissionless, globally transferable digital asset. Its value derives from its fixed supply, security, and decentralized control.",
          "Do not confuse Bitcoin (BTC) with Bitcoin Cash (BCH) or Bitcoin SV (BSV). These are separate coins that resulted from disagreements about the original protocol. The original is always referred to as BTC."
        )
      },
      {
        id: 'b1_s3',
        title: 'Wallets and Private Keys',
        content: wrapNote(
          `A crypto wallet does not store coins the way a physical wallet holds cash. Your coins live on the blockchain. What the wallet stores is your private key, which is a cryptographic secret that proves you own those coins and authorizes you to move them.

Think of it this way: your blockchain address is like a transparent mailbox that anyone can see. Your private key is the only key that opens it. Whoever holds the private key controls the funds.

There are two main types of wallets. Custodial wallets, such as those provided by exchanges like Binance or Coinbase, hold your keys on your behalf. This is convenient but means the exchange can freeze your account, get hacked, or, as happened with FTX in 2022, go bankrupt. Self-custody wallets such as MetaMask, Trust Wallet, or hardware devices like Ledger or Trezor give you direct control. Your keys never leave your device.

Every self-custody wallet gives you a seed phrase, typically 12 or 24 words in a specific order. This phrase is the master key to your wallet. It can restore access on any device, anywhere in the world. Anyone who obtains your seed phrase can access your funds immediately.

Write it on paper. Store that paper somewhere physically secure. Never photograph it, type it into any website, or store it in cloud notes.`,
          "Your seed phrase is your wallet. Protecting it is the single most important security practice in crypto.",
          "For long-term holdings, hardware wallets offer the best protection. For everyday transactions, a well-regarded software wallet like MetaMask or Trust Wallet is practical. Avoid keeping large amounts on exchanges."
        )
      },
      {
        id: 'b1_s4',
        title: 'Ethereum and Smart Contracts',
        content: wrapNote(
          `Ethereum, launched in 2015, introduced a fundamental extension to what blockchain can do. Rather than just recording transactions, Ethereum can run programs, called smart contracts, directly on the blockchain.

A smart contract is code that executes automatically when predefined conditions are met, without any middleman. For example, a smart contract for a loan might automatically release funds when collateral is deposited, and automatically liquidate that collateral if the price drops below a threshold. No bank required. No approval process. No counterparty risk beyond the code itself.

This capability is what makes decentralized finance (DeFi) possible. It is also what underpins NFTs, decentralized exchanges, prediction markets, and thousands of other applications. Ethereum effectively turned blockchain from a payment network into a programmable platform.

Ethereum runs on a currency called Ether (ETH), which is used to pay transaction fees (called gas) for executing smart contracts. Unlike Bitcoin, Ethereum switched from an energy-intensive Proof of Work consensus to a more efficient Proof of Stake model in September 2022, an event called The Merge.`,
          "Ethereum added programmability to blockchain, enabling a global layer of financial and non-financial applications that run without centralized intermediaries.",
          "When evaluating any DeFi protocol or token, check whether it is deployed on Ethereum or a reputable compatible chain. The underlying platform matters as much as the application itself."
        )
      },
      {
        id: 'b1_s5',
        title: 'Stablecoins Explained',
        content: wrapNote(
          `A stablecoin is a cryptocurrency designed to maintain a constant value, most commonly pegged 1:1 to the US dollar. The two largest are USDT (Tether) and USDC (USD Coin).

Stablecoins combine the programmability and transferability of crypto with the price stability of a fiat currency. This makes them extremely useful for everyday transactions, savings in regions with unstable local currencies, and as a base layer for DeFi operations.

There are three main types. Centralized stablecoins (USDT, USDC) are backed by cash and short-term assets held by a company. Crypto-backed stablecoins (DAI) are over-collateralized with other cryptocurrencies and governed by smart contracts. Algorithmic stablecoins attempt to maintain a peg through software-controlled supply mechanisms. The collapse of Terra's UST in May 2022 wiped out approximately 40 billion dollars in value and demonstrated clearly that algorithmic designs carry substantial systemic risk.

For practical use, USDC is generally considered the more transparent option. Its issuer, Circle, publishes monthly attestations of its reserves. USDT has a larger market and more liquidity but has historically been less transparent about its reserves.`,
          "Stablecoins let you hold the dollar equivalent in a self-custody wallet without a bank account. USDC is the most transparent major option.",
          "Always verify which blockchain network a stablecoin is on before sending. USDT on BNB Chain is a different asset from USDT on Ethereum. Sending to the wrong network can result in permanent loss of funds."
        )
      },
      {
        id: 'b1_s6',
        title: 'Understanding Market Cap and Price',
        content: wrapNote(
          `One of the most common mistakes new investors make is evaluating a coin by its price alone. A coin trading at $0.001 is not necessarily cheap, and a coin at $60,000 is not necessarily expensive. Market capitalization is the correct measure.

Market cap equals the current price multiplied by the total circulating supply. Bitcoin at $60,000 with 19.5 million coins in circulation has a market cap of approximately $1.17 trillion. A coin at $0.001 with 10 trillion tokens in supply has a market cap of $10 billion. The second coin is far larger relative to its price.

Trading volume indicates how much of a coin changed hands over a given period, usually 24 hours. High volume during a price increase suggests genuine buying interest. Low volume during a price move means few participants are involved, making the move less reliable.

Market dominance refers to Bitcoin's share of the total crypto market cap. When Bitcoin dominance is rising, capital is flowing into Bitcoin relative to altcoins. When it falls, altcoins are gaining ground. This ratio is a useful indicator of broader market sentiment.

For any serious research, CoinGecko and CoinMarketCap provide market cap, volume, supply data, and historical charts for every significant cryptocurrency, free of charge.`,
          "Always evaluate coins by market cap, not price. A low token price means nothing without knowing the total supply in circulation.",
          "Check CoinGecko's fully diluted valuation (FDV) alongside market cap. If FDV is many times the market cap, significant new supply is scheduled to be released, which creates long-term selling pressure."
        )
      },
      {
        id: 'b1_s7',
        title: 'How Crypto Transactions Work',
        content: wrapNote(
          `When you send cryptocurrency, the process involves several steps that happen automatically in the background.

You initiate a transaction by specifying a recipient address, an amount, and a network fee. Your wallet software uses your private key to sign the transaction cryptographically. This signature proves to the network that you authorized the transfer without revealing your private key itself.

The signed transaction is broadcast to the network where nodes (participating computers) receive it and add it to a queue called the mempool, short for memory pool. Miners or validators then select transactions from the mempool to include in the next block. In general, transactions with higher fees are prioritized.

Once included in a block and that block is added to the chain, your transaction has one confirmation. Additional blocks add more confirmations. For small amounts, one or two confirmations may be sufficient. For large transfers, exchanges and services typically wait for six or more confirmations before crediting funds, because this makes transaction reversal computationally infeasible.

Network fees vary significantly between blockchains. Ethereum fees (gas) can range from under a dollar to tens of dollars depending on network congestion. Bitcoin fees vary similarly. Layer 2 networks like Polygon or Arbitrum can process the same transactions for fractions of a cent.`,
          "Understanding transaction confirmation helps you set appropriate fees and know when to expect your transfer to complete.",
          "During periods of high network congestion, your transaction may sit in the mempool for hours if the fee is too low. Most wallets have a speed boost option to increase the fee after the fact."
        )
      },
      {
        id: 'b1_s8',
        title: 'Crypto vs. Traditional Finance',
        content: wrapNote(
          `Comparing crypto to traditional finance reveals both the genuine advantages of decentralized systems and the practical limitations that still exist.

Traditional finance operates through licensed intermediaries: banks, brokerages, clearing houses, and payment networks. These institutions provide important services including fraud protection, dispute resolution, and regulatory compliance. They also introduce friction, cost, geographic restrictions, and points of failure or censorship.

Crypto removes intermediaries from the transaction layer. You can send value globally in minutes, hold assets that no one can freeze, and access financial services without permission or identity verification (in many cases). The tradeoff is that there is no recourse if you make a mistake. Sent funds to the wrong address cannot be recovered. A lost seed phrase means permanently lost access to funds.

Crypto also introduces volatility that traditional savings accounts do not have. Bitcoin has declined more than 70 percent from its peak multiple times in its history, while also reaching new all-time highs each cycle. This volatility reflects the asset class's immaturity relative to more established markets.

The most productive view is not to see crypto and traditional finance as mutually exclusive. For most people, a combination of both provides better outcomes than either alone, with traditional banking for stability and day-to-day needs, and crypto for borderless transfers, portfolio diversification, and access to yield opportunities.`,
          "Crypto removes friction and intermediaries from finance at the cost of irreversibility and volatility. Understanding both sides helps you allocate appropriately.",
          "Never keep your entire net worth in crypto, especially early on. Building familiarity with a position you can afford to hold through a 70 percent decline is essential before committing significant capital."
        )
      },
    ]
  },

  // ── MODULE 2: BLOCKCHAIN MECHANICS (BASIC) ───────────────────────────────
  {
    id: 'b2',
    title: 'Blockchain Mechanics',
    description: 'How consensus works, what nodes do, and why blockchains are secure.',
    difficulty: Difficulty.BASIC,
    category: 'Technology',
    estimatedMinutes: 16,
    rewardTokens: 10,
    subtopics: [
      {
        id: 'b2_s1',
        title: 'What Is a Blockchain, Precisely',
        content: wrapNote(
          `A blockchain is a linked list of data blocks, where each block contains a batch of transactions and a reference to the previous block. This reference is called a hash, and it is generated by running the previous block's data through a mathematical function that produces a unique fixed-length output.

Changing any data in a previous block would produce a different hash. That different hash would invalidate the next block's reference, which would cascade to invalidate every subsequent block. An attacker would need to recalculate all following blocks faster than the entire honest network adds new ones, which is computationally prohibitive in a sufficiently large network.

This structure is what gives a blockchain its tamper resistance. It is not magic, it is mathematics. The longer the chain, the more secure historical transactions become, because rewriting them requires more computation.

Public blockchains like Bitcoin and Ethereum are additionally transparent. Anyone can run a node, download the entire transaction history, and verify that every transaction ever made was valid. This auditability is a feature that no traditional financial system offers.`,
          "A blockchain is tamper-resistant because altering any past record requires recalculating the entire subsequent chain, which requires more computation than the whole network provides.",
          "You can explore every Bitcoin and Ethereum transaction yourself using free block explorers such as Blockstream.info (Bitcoin) or Etherscan.io (Ethereum)."
        )
      },
      {
        id: 'b2_s2',
        title: 'Proof of Work vs. Proof of Stake',
        content: wrapNote(
          `Consensus mechanisms are the rules by which distributed network participants agree on the valid state of the ledger. Two mechanisms dominate: Proof of Work and Proof of Stake.

In Proof of Work (PoW), used by Bitcoin, miners compete to solve a computationally intensive puzzle. The first to solve it adds the next block and earns the block reward. The difficulty of the puzzle adjusts automatically so that, regardless of how much computing power joins the network, blocks are added approximately every ten minutes. The energy expenditure is the cost of security: an attacker must control more than half the network's computing power to manipulate the chain, which is extraordinarily expensive.

In Proof of Stake (PoS), used by Ethereum after The Merge, validators put up (stake) cryptocurrency as collateral. They are selected to propose and attest to new blocks roughly in proportion to their stake. If a validator behaves dishonestly, their staked funds are partially destroyed in a process called slashing. The energy consumption of PoS is roughly 99.9 percent lower than PoW, though critics argue this comes with different security tradeoffs.

Both mechanisms have been battle-tested. Bitcoin's PoW has never been successfully attacked since 2009. Ethereum's PoS transition was completed without incident in September 2022.`,
          "PoW secures the chain through energy expenditure. PoS secures it through financial stakes. Both have proven effective in their respective implementations.",
          "When researching a new blockchain project, always check which consensus mechanism it uses, how long it has been running, and whether it has faced any major security incidents."
        )
      },
      {
        id: 'b2_s3',
        title: 'Nodes, Miners, and Validators',
        content: wrapNote(
          `The Bitcoin and Ethereum networks consist of thousands of computers worldwide, each playing a specific role in maintaining the system.

Full nodes are computers that download and verify the entire transaction history from the genesis block to the present. They enforce the protocol rules. If a miner produces a block that violates the rules, such as awarding themselves too many coins, full nodes will reject it. Running a full node does not earn rewards but contributes to network decentralization.

Miners (in PoW networks) are nodes that additionally compete to add new blocks. They invest in specialized hardware and electricity. Their reward is newly minted coins plus transaction fees from transactions included in their block. As more miners join, the difficulty increases, preserving the target block time.

Validators (in PoS networks) stake cryptocurrency as collateral to participate in block production. Ethereum requires a minimum stake of 32 ETH to become a solo validator. Smaller holders can participate through staking pools such as Lido or Rocket Pool. Validators earn staking rewards, currently around 3 to 4 percent annually on Ethereum.

The geographic distribution of nodes across many countries and jurisdictions is what makes these networks resistant to government shutdown. Banning crypto in one country simply shifts node operation to others.`,
          "Nodes enforce the rules, miners and validators create new blocks and earn rewards. The more distributed the network, the more resilient it is.",
          "You can check the global distribution of Bitcoin and Ethereum nodes using tools like Bitnodes.io (Bitcoin) and Nodewatch.io (Ethereum). Geographic diversity is a key indicator of network health."
        )
      },
      {
        id: 'b2_s4',
        title: 'Public Keys, Private Keys, and Addresses',
        content: wrapNote(
          `Blockchain security is built on public key cryptography, a mathematical relationship between two linked numbers: a private key and a public key.

Your private key is a randomly generated number, typically 256 bits long. It is essentially the master password to your funds. Your public key is mathematically derived from your private key in a one-way process: knowing the public key, it is computationally infeasible to determine the private key.

Your blockchain address is derived from your public key through an additional hashing step. This is what you share with others when you want to receive funds. When you authorize a transaction, your wallet uses your private key to produce a digital signature. The network can verify this signature using your public key, confirming you authorized the transaction, without ever seeing your private key.

This system is elegant because it allows public verification without revealing secrets. Anyone can check that a transaction is valid. Nobody but the key holder can create the signature.

The security of your funds therefore reduces entirely to the security of your private key or seed phrase. No central server stores your password. If it is lost, access is irretrievably gone.`,
          "Your private key is the mathematical foundation of crypto ownership. Everything else, your address, your balance, your transaction authority, derives from it.",
          "Hardware wallets (Ledger, Trezor) generate and store your private key inside a secure chip that never exposes it to a connected computer. This protects against malware even on compromised devices."
        )
      },
      {
        id: 'b2_s5',
        title: 'Transaction Lifecycle on the Blockchain',
        content: wrapNote(
          `Understanding how a transaction moves from initiation to final confirmation helps you use the network more effectively.

When you click Send in your wallet, the software constructs a transaction object containing the sender address, recipient address, amount, fee, and a digital signature created with your private key. This transaction is broadcast to the network via peer-to-peer connections.

Nodes that receive the transaction verify its validity: does the signature match the sender address, and does the sender have sufficient balance? Valid transactions enter the mempool, a waiting area maintained by each node where unconfirmed transactions sit until they are picked up.

Miners or validators assemble transactions from the mempool into blocks. They generally prioritize transactions offering higher fees, since fees go to the block producer. Once a block containing your transaction is added to the chain, it has one confirmation. Each subsequent block adds another.

The number of confirmations needed for a transaction to be considered final varies by use case. Bitcoin exchanges typically require three to six confirmations, which takes thirty to sixty minutes. For large transfers, more is safer.`,
          "A transaction becomes progressively more secure with each additional block confirmation. Most everyday transfers are effectively irreversible after three to six confirmations.",
          "If your transaction is stuck in the mempool due to a low fee, most wallets allow you to replace it with a higher fee (Replace By Fee or RBF on Bitcoin) or to add additional fees (EIP-1559 speed-up on Ethereum)."
        )
      },
      {
        id: 'b2_s6',
        title: 'Hard Forks and Soft Forks',
        content: wrapNote(
          `Because blockchains are decentralized, protocol upgrades require community coordination. When the network updates its rules, the process is called a fork. There are two types.

A soft fork is a backward-compatible upgrade. Nodes that have not upgraded still consider the new blocks valid. It tightens or adds rules without breaking existing behavior. Bitcoin's SegWit upgrade in 2017 was a soft fork.

A hard fork is a backward-incompatible change. Nodes that do not upgrade and nodes that do upgrade will disagree on which blocks are valid, causing the chain to split permanently. Every node and user must choose which version to follow.

Bitcoin Cash (BCH) resulted from a hard fork of Bitcoin in 2017, driven by disagreement over block size. Bitcoin Gold and Bitcoin SV resulted from subsequent hard forks. These forks created separate coins, not upgrades to the original Bitcoin.

Ethereum underwent a planned hard fork in 2016 after the DAO hack to recover stolen funds. This was controversial. A minority refused to follow the new chain and continued on the original, which became Ethereum Classic (ETC). The main chain retained the Ethereum name and ticker (ETH).`,
          "Hard forks can create new coins from existing ones, but they also reflect community disagreement. The market ultimately decides which fork retains value.",
          "When a hard fork distributes free coins to existing holders, be cautious. Claiming fork coins can sometimes require exposing your private key to potentially malicious software. Research the process thoroughly before acting."
        )
      },
      {
        id: 'b2_s7',
        title: 'Why Decentralization Matters',
        content: wrapNote(
          `Decentralization is the property that makes public blockchains fundamentally different from all previous financial infrastructure, and it is worth understanding specifically why it matters rather than accepting it as a buzzword.

A centralized system has a single point of control. A government can compel a bank to freeze an account. A payment processor can decide not to serve certain customers or countries. A company can go bankrupt, taking customer funds with it. These failures are not theoretical. They have happened repeatedly in financial history.

A sufficiently decentralized blockchain has no single point of control. No entity can freeze your wallet. No entity can prevent a valid transaction. No entity can alter the transaction history. These properties are not absolute, they depend on the network remaining sufficiently distributed, but they represent a qualitative shift from all previous monetary systems.

The tradeoff is efficiency. Decentralized consensus is slower and more expensive than a centralized database. A bank can process thousands of transactions per second. Bitcoin manages around seven. This is why Layer 2 solutions and scaling technology matter so much: they attempt to preserve decentralization at the base layer while enabling much higher throughput above it.`,
          "Decentralization removes single points of control and failure from financial infrastructure. Its value is most evident in situations where centralized institutions fail or act adversarially.",
          "The degree of decentralization varies significantly between blockchains. Research how many independent validators or miners a network has, and whether the development team can unilaterally change the protocol."
        )
      },
      {
        id: 'b2_s8',
        title: 'Module Summary: Blockchain Mechanics',
        content: wrapNote(
          `This module covered the technical foundations of how blockchains operate. Let us consolidate the key concepts before moving on.

A blockchain is a linked chain of blocks, each containing transactions and referencing the previous block via a cryptographic hash. This makes historical records tamper-resistant. The Bitcoin blockchain has operated continuously since January 2009 without a successful attack on its transaction history.

Consensus mechanisms determine how distributed nodes agree on the valid chain. Proof of Work uses energy expenditure as a security cost. Proof of Stake uses financial collateral. Both have been proven in production environments.

Your ownership of crypto assets is secured by private key cryptography. Your private key generates a signature that authorizes transactions. Your address is publicly visible. Your private key must remain secret.

Transactions pass through the mempool before inclusion in a block. Each subsequent block adds a confirmation. More confirmations equal greater finality.

Understanding these mechanics gives you a foundation for evaluating any new blockchain project: how does it achieve consensus, how decentralized is it, what is the track record, and what are the known tradeoffs?`,
          "Blockchain security is mathematical and economic, not trust-based. The system works because manipulating it costs more than it could ever return.",
          "When evaluating new blockchains, ask: how many nodes, who controls the validators, how long has it been running without incident, and what is the total value secured? These metrics are more informative than whitepaper promises."
        )
      },
    ]
  },

  // ── MODULE 3: WALLETS AND SECURITY (BASIC) ───────────────────────────────
  {
    id: 'b3',
    title: 'Wallets and Security',
    description: 'Seed phrases, hardware wallets, common scams, and protecting your crypto.',
    difficulty: Difficulty.BASIC,
    category: 'Security',
    estimatedMinutes: 15,
    rewardTokens: 10,
    subtopics: [
      {
        id: 'b3_s1',
        title: 'Hot Wallets vs. Cold Wallets',
        content: wrapNote(
          `The most important distinction in crypto storage is between hot wallets and cold wallets. The terms refer to whether the wallet has a connection to the internet.

Hot wallets are connected to the internet. They include software applications on your phone or computer (MetaMask, Trust Wallet, Phantom) and exchange accounts. Hot wallets are convenient for frequent transactions but are exposed to online threats including malware, phishing, and exchange insolvency.

Cold wallets have no internet connection. Hardware wallets like Ledger and Trezor store private keys inside a secure chip that never touches the internet. To sign a transaction, you connect the device physically and confirm on the device itself. Even if your computer is infected with malware, your private key remains protected inside the hardware.

Paper wallets, where the private key is printed or written and stored offline, are an older form of cold storage. They are secure from online threats but vulnerable to physical damage and are less convenient for regular use.

A practical setup for most users: an exchange account or software wallet for everyday amounts you are actively using, and a hardware wallet for any holdings you intend to keep long-term. The standard recommendation is to move any amount you would be upset to lose permanently to cold storage.`,
          "Hot wallets offer convenience at the cost of online exposure. Cold wallets offer security at the cost of some friction. Use both appropriately for different purposes.",
          "Ledger and Trezor are the two most widely used hardware wallet manufacturers. Both have undergone extensive security audits. Avoid purchasing hardware wallets from third-party resellers, as devices can be tampered with before delivery."
        )
      },
      {
        id: 'b3_s2',
        title: 'Seed Phrases: Your Master Key',
        content: wrapNote(
          `Your seed phrase, also called a recovery phrase or mnemonic, is typically a sequence of 12 or 24 common English words generated randomly by your wallet. Every other piece of wallet software, including private keys and addresses, is mathematically derived from this single phrase.

This means your seed phrase is the complete backup of your wallet. If your phone is lost, stolen, or broken, you can restore full access to all your funds on any compatible wallet by entering the same seed phrase. Conversely, anyone who obtains your seed phrase has complete, instant access to all funds associated with it.

The security of your seed phrase is therefore the security of your crypto. The threat model is physical, not just digital. Someone could photograph it. A house fire could destroy a single copy. Water damage is a risk.

Best practices: write your seed phrase on paper immediately upon wallet creation. Do not type it anywhere digital. Store multiple physical copies in different secure locations (a home safe and a bank safety deposit box is a common approach for significant holdings). Consider using fireproof storage media for important backups. Never share your seed phrase with any person, website, or application under any circumstances.

No legitimate service ever needs your seed phrase. If you are asked for it, you are being targeted by a scam.`,
          "Your seed phrase is the single most critical piece of information in your crypto life. Store it physically in multiple secure locations and never share it with anyone.",
          "Metal backup plates designed to engrave seed phrases, such as those from Cryptosteel or Bilodeau, offer protection against fire and water damage that paper cannot provide. They are worth the cost for significant holdings."
        )
      },
      {
        id: 'b3_s3',
        title: 'Exchange Security Best Practices',
        content: wrapNote(
          `Most new crypto users begin on exchanges, and while exchanges carry their own risks, you can significantly reduce exposure with proper security practices.

Enable two-factor authentication (2FA) on every exchange account. Use an authenticator app such as Google Authenticator or Authy rather than SMS 2FA. SMS is vulnerable to SIM-swap attacks, where a criminal convinces your mobile carrier to transfer your phone number to their device, giving them access to your SMS codes.

Use a unique, strong password for each exchange. A password manager (Bitwarden, 1Password) generates and stores these securely. Reusing passwords across sites is one of the most common ways accounts are compromised.

Be cautious with email links. Phishing sites replicate exchange interfaces pixel-for-pixel. Always type exchange URLs manually or use bookmarks. Check that the URL is correct before entering any credentials. Look for the padlock in the address bar indicating a valid SSL certificate.

Understand what exchange security offers and does not offer. Most major exchanges carry some insurance for hot wallet hacks. However, exchange insolvency, as demonstrated by FTX's collapse in November 2022, can result in total loss of customer funds. Do not store amounts on an exchange that you cannot afford to lose permanently.`,
          "Strong, unique passwords combined with authenticator-based 2FA form the baseline for exchange account security. Do not rely on the exchange as your primary custodian for significant holdings.",
          "Check whether an exchange publishes Proof of Reserves audits. This practice allows users to verify that the exchange holds sufficient assets to cover all deposits. Exchanges that refuse to publish these audits should be treated with additional caution."
        )
      },
      {
        id: 'b3_s4',
        title: 'Common Crypto Scams',
        content: wrapNote(
          `Crypto scams have cost individuals and organizations hundreds of billions of dollars. The patterns repeat, and knowing them is your best protection.

Investment scheme scams promise guaranteed returns on crypto investments, typically through WhatsApp groups, Telegram channels, or social media. No legitimate investment guarantees returns. Returns of 50 percent weekly or more are mathematically impossible to sustain. These are Ponzi structures: early participants are paid from new investor deposits until the operator disappears with the funds.

Romance scams, also called pig butchering, involve criminals building an online relationship over weeks or months before introducing a "private trading platform." Victims deposit funds, see fake gains on the platform, attempt to withdraw, and face demands for taxes or fees before receiving anything. The platform is controlled by the scammer.

Fake tokens and rug pulls involve developers launching a new token, generating artificial trading volume and social media hype, and then selling all their holdings to collapse the price. The project disappears. Signs include anonymous teams, unaudited contracts, and no locked liquidity.

Phishing attacks use fraudulent websites, emails, or messages to capture your credentials or seed phrase. Common tactics include fake browser extensions, customer support impersonators, and airdrop claims that require wallet connection to malicious contracts.

One consistent rule: if something seems too good to be true, and if any party is asking for your private key or seed phrase, it is a scam.`,
          "Most crypto scams follow recognizable patterns. Guaranteed returns, romance-based introductions to trading platforms, and requests for your seed phrase are universal red flags.",
          "Before interacting with any new crypto service or token, search the project name plus the word scam in a search engine. Community-reported issues typically surface quickly and can save you significant losses."
        )
      },
      {
        id: 'b3_s5',
        title: 'Safe DeFi Interactions',
        content: wrapNote(
          `Interacting with decentralized applications (dApps) requires additional care beyond standard account security, because on-chain transactions are irreversible and smart contracts can request broad permissions.

When connecting your wallet to a dApp, you are not sharing funds. You are authorizing the site to interact with your wallet. The key risk is in what you sign. A malicious or poorly written contract can request permission to transfer all your tokens in a single transaction. Always review what you are signing before confirming.

Token approvals are one of the most under-appreciated risks. When you use a DeFi protocol, you typically grant it an unlimited spending approval for a specific token. This approval persists even after you stop using the protocol. If that protocol is later hacked, the attacker can use your old approvals to drain your wallet.

Use a tool like Revoke.cash or Etherscan's Token Approval Checker to review and revoke unnecessary approvals regularly. This is particularly important after using a new protocol for the first time.

For significant DeFi interactions, consider using a dedicated wallet that holds only what you need for that session. Keep your main holdings in a separate wallet that never touches dApps. This limits exposure if you accidentally sign a malicious transaction.`,
          "Smart contract approvals are persistent permissions. Reviewing and revoking unnecessary approvals regularly is an important but widely overlooked security practice.",
          "Tools like Revoke.cash allow you to see and revoke all token approvals for any Ethereum address in minutes. Run this audit every few months or after significant DeFi activity."
        )
      },
      {
        id: 'b3_s6',
        title: 'Social Engineering and Phishing',
        content: wrapNote(
          `Social engineering attacks exploit psychology rather than software vulnerabilities. They are often more effective than technical attacks because they bypass security systems by targeting the human directly.

Impersonation is the most common form. Attackers pose as exchange support teams, wallet providers, or even known community members. They reach out via email, Telegram, Discord, or X (formerly Twitter) claiming there is an issue with your account, a security alert, or an exclusive opportunity. Their goal is to obtain your seed phrase, login credentials, or to get you to approve a malicious transaction.

Fake urgency is the mechanism. Claims like "your account will be locked in 24 hours" or "you must verify now to prevent loss of funds" create psychological pressure that bypasses careful evaluation. Legitimate services do not pressure you to act immediately.

Browser-based attacks include fake wallet extensions (particularly on Chrome), fake exchange websites that rank in paid search results, and malicious scripts injected into compromised websites. Some attackers monitor social media and reach out to people who post about having issues with exchanges.

The consistent defense is deliberate slowness. Do not act on unsolicited contact regardless of how legitimate it appears. Verify independently by navigating directly to the known URL of the service. Contact customer support directly through official channels found on the official website.`,
          "Social engineering succeeds through urgency and impersonation. Slowing down and verifying independently through official channels neutralizes most attacks.",
          "Real customer support for cryptocurrency services never initiates contact with users asking for credentials or seed phrases. Treat all unsolicited contact as potentially adversarial until proven otherwise."
        )
      },
      {
        id: 'b3_s7',
        title: 'Multi-Signature Wallets',
        content: wrapNote(
          `A multi-signature (multisig) wallet requires multiple private key signatures to authorize a transaction, rather than just one. For example, a 2-of-3 multisig requires any two of three keys to sign, while a 3-of-5 setup requires three of five.

This approach has several significant benefits. It eliminates single points of failure: losing one key does not mean losing access to funds. It reduces the risk of theft: an attacker who compromises one key cannot move funds without additional signatures. For organizations, it enforces governance: no single person can unilaterally move treasury funds.

Multisig is the standard for serious institutional crypto storage and is increasingly used by sophisticated individual investors with significant holdings. Protocols like Gnosis Safe allow teams to manage shared treasuries with multiple signers across different jurisdictions.

The tradeoffs are complexity and key management overhead. You need to securely manage multiple keys across potentially different devices and locations. Recovery procedures must be planned in advance. Multisig is not recommended for everyday transaction wallets due to the added friction, but it is excellent for long-term cold storage.`,
          "Multisig eliminates single points of failure for custody. For high-value or organizational holdings, it is the appropriate security architecture.",
          "Gnosis Safe is the most widely used multisig implementation on Ethereum and compatible chains. It has secured hundreds of billions of dollars in assets and its code has been extensively audited."
        )
      },
      {
        id: 'b3_s8',
        title: 'Module Summary: Wallets and Security',
        content: wrapNote(
          `Security is not optional in crypto. Unlike traditional finance, there is no fraud department to call and no transaction reversal. Understanding and implementing security practices correctly is what separates safe crypto users from those who experience preventable losses.

The hierarchy of wallet security, from most to least secure for long-term holdings: hardware wallets (cold storage), air-gapped devices, multi-signature setups, reputable software wallets, and exchange accounts.

Your seed phrase is the root of your security. Physical protection across multiple locations, never digital storage, is the standard. No legitimate service ever requires it.

Exchange accounts require strong unique passwords plus authenticator-based 2FA. Do not store significant holdings on exchanges.

DeFi interactions create token approval permissions that persist. Review and revoke these regularly using tools like Revoke.cash.

Social engineering attacks rely on urgency and impersonation. Deliberate slowness and independent verification through official channels are the countermeasures.

These practices are not complex, but they require consistent application. The cost of a single security failure in crypto is the permanent loss of the affected funds.`,
          "Good security habits in crypto are not sophisticated. They are consistent application of a small number of well-understood practices.",
          "Create a simple security checklist for yourself: seed phrase location, 2FA status, approval audit schedule, exchange holdings limit. Review it quarterly."
        )
      },
    ]
  },

  // ── MODULE 4: DEFI FUNDAMENTALS (FUNDAMENTAL) ────────────────────────────
  {
    id: 'f1',
    title: 'DeFi Fundamentals',
    description: 'Buying crypto safely, DeFi protocols, liquidity, and yield basics.',
    difficulty: Difficulty.FUNDAMENTAL,
    category: 'DeFi',
    estimatedMinutes: 18,
    rewardTokens: 10,
    subtopics: [
      {
        id: 'f1_s1',
        title: 'How to Buy Your First Crypto Safely',
        content: wrapNote(
          `Buying cryptocurrency for the first time is straightforward once you understand what to look for in a platform. The primary decision is choosing a reputable exchange.

Major global exchanges include Binance (the largest by volume, supporting local payment methods across many regions), Coinbase (well-regulated, strong in the US and Europe), and Kraken (known for security and transparency). For users in Africa, Yellow Card operates across twenty-plus countries with local payment rails including M-Pesa, bank transfer, and mobile money. Quidax is strong in Nigeria and Ghana.

All reputable exchanges require KYC verification: submitting a government ID and typically a selfie. This takes a few hours to a day. It is required by financial regulations and is standard practice for any licensed exchange.

Start with a small purchase to familiarize yourself with the process before committing larger amounts. There is no minimum. You can buy the equivalent of ten dollars in Bitcoin or USDT.

Dollar-cost averaging (DCA) is a strategy worth adopting from the beginning. Invest a fixed amount at regular intervals, regardless of price. This removes the impossible task of timing the market and smooths out the impact of volatility over time.`,
          "Choose a regulated exchange with local payment support, complete KYC, and begin with small amounts through consistent DCA rather than trying to time entries.",
          "Before depositing on any exchange, verify the URL manually. Phishing sites copy exchange interfaces precisely. Bookmark the correct URL after verifying it, and use that bookmark exclusively going forward."
        )
      },
      {
        id: 'f1_s2',
        title: 'What Is DeFi',
        content: wrapNote(
          `Decentralized Finance, known as DeFi, refers to financial services that run on blockchains through smart contracts, without banks, brokers, or any centralized intermediary.

In traditional finance, you deposit money into a bank. The bank lends it to others and keeps the spread between lending and deposit rates. In DeFi, you deposit cryptocurrency directly into a smart contract. The contract automatically lends it to borrowers and distributes the interest to depositors, with no institution in the middle taking a cut.

This creates accessible yield opportunities for anyone with internet access. It also enables other financial primitives: decentralized exchanges where you can trade tokens directly from your wallet, lending and borrowing with no credit check, synthetic assets that track real-world prices, and insurance products.

The DeFi ecosystem grew from essentially nothing in 2019 to over 100 billion dollars in total value locked (TVL) at its peak in 2021. The collapse of several protocols in 2022 brought TVL down significantly but also removed much of the speculation, leaving more sustainable protocols operating at the core.

Major DeFi protocols by TVL include Lido (Ethereum staking), AAVE (lending), MakerDAO (decentralized stablecoin), and Uniswap (decentralized exchange). These have been operating for years with regular security audits and have secured large amounts of value.`,
          "DeFi replaces financial intermediaries with smart contracts, enabling anyone with internet access to access lending, borrowing, and exchange services without permission or identification.",
          "Total Value Locked (TVL) is the primary metric for DeFi protocol size. Track it on DeFiLlama.com, which provides free, comprehensive TVL data across all major chains and protocols."
        )
      },
      {
        id: 'f1_s3',
        title: 'How Automated Market Makers Work',
        content: wrapNote(
          `Traditional exchanges match buyers with sellers through an order book. Decentralized exchanges mostly use a different mechanism called an Automated Market Maker (AMM), pioneered by Uniswap in 2018.

An AMM replaces the order book with a liquidity pool: a smart contract holding reserves of two tokens. When you want to trade Token A for Token B, you send Token A to the pool and receive Token B. The price is determined algorithmically by the ratio of tokens in the pool, typically using the formula x times y equals k, where x and y are the token quantities and k remains constant.

When you buy Token B, you reduce its supply in the pool and increase the supply of Token A, which moves the price. Large trades relative to pool size cause significant price impact, called slippage.

Liquidity providers (LPs) deposit equal values of both tokens into a pool. In return, they receive LP tokens representing their share of the pool and earn a percentage of every trade that passes through it. This creates a decentralized, permissionless market that anyone can both use and contribute to.

The risk for LPs is impermanent loss: if the price ratio between the two tokens changes significantly while deposited, the LP ends up with less total value than if they had simply held the tokens. For stable pairs or tokens with correlated price movements, impermanent loss is minimal.`,
          "AMMs replace order books with liquidity pools. Prices adjust automatically based on supply ratios. Anyone can provide liquidity and earn fees.",
          "Before providing liquidity to any AMM pool, use an impermanent loss calculator (available on many DeFi analytics sites) to model your expected returns against a simple hold strategy under various price scenarios."
        )
      },
      {
        id: 'f1_s4',
        title: 'Lending and Borrowing in DeFi',
        content: wrapNote(
          `Lending protocols are among the most established DeFi applications. Platforms like Aave, Compound, and Morpho allow users to deposit assets to earn interest or borrow against collateral.

As a lender, you deposit crypto assets into a pool. Borrowers take from this pool and pay interest, which is distributed to lenders proportionally. Rates fluctuate based on utilization: when demand to borrow is high relative to available supply, rates rise to attract more deposits and reduce borrowing demand.

As a borrower, you must post collateral that exceeds the value of what you borrow. This is called over-collateralization. If you want to borrow one thousand dollars of USDC, you might need to deposit fifteen hundred dollars of ETH as collateral. This protects lenders from default.

The critical risk for borrowers is liquidation. If your collateral value falls below a required threshold (the liquidation threshold), automated liquidators can sell your collateral to repay the debt. This happens on-chain instantly, with no warning beyond the price movement itself.

For lenders, the risks are smart contract vulnerabilities and, for variable-rate deposits, the interest rate fluctuating to near zero during low utilization periods. Established protocols like Aave have been operating since 2017 with multiple audits and billions in TVL, representing a more reliable risk profile than newer alternatives.`,
          "DeFi lending earns interest for depositors and enables borrowing without credit checks. Liquidation risk for borrowers makes close monitoring of collateral ratios essential.",
          "Use the health factor or collateral ratio metric prominently displayed in lending protocol dashboards. Keeping a health factor well above 1.0 (typically above 1.5 or 2.0) provides a buffer against liquidation from sudden price movements."
        )
      },
      {
        id: 'f1_s5',
        title: 'Yield Farming and Liquidity Mining',
        content: wrapNote(
          `Yield farming refers to the practice of actively moving crypto assets between protocols to maximize returns. Liquidity mining is a specific form where protocols distribute their governance tokens as additional rewards to users who provide liquidity.

In 2020, Compound launched liquidity mining by distributing COMP tokens to borrowers and lenders. This triggered the DeFi summer, a period of explosive growth as users chased high yields by providing liquidity to new protocols. Annual percentage yields (APYs) of hundreds of percent were common, though typically short-lived.

The mechanics are straightforward: deposit into a protocol, receive LP tokens or receipt tokens representing your position, and stake those tokens in a rewards contract to earn additional governance tokens on top of base yields.

The risks are layered. You carry the risk of the underlying assets, the lending or AMM protocol, and the rewards token simultaneously. Many governance tokens collapsed to near zero when mining rewards ended and speculative demand evaporated.

For most users, simple lending on established protocols offering sustainable base yields is preferable to chasing high yield farming returns. Sustainable yields come from real economic activity: trading fees and interest on loans. Unsustainable yields are subsidized by token emissions that dilute the supply.`,
          "Yield farming can amplify returns but layers risk at every level. Distinguish between yield from real economic activity and yield from token emissions.",
          "If an advertised APY seems very high, check its source. DeFiLlama displays base yield (from real fees) separately from reward yield (from token emissions). Base yield of five to fifteen percent on stablecoins is generally sustainable. Triple-digit APYs almost never are."
        )
      },
      {
        id: 'f1_s6',
        title: 'Stablecoins in DeFi',
        content: wrapNote(
          `Stablecoins play a central role in DeFi because they allow users to participate in yield strategies without exposure to the price volatility of other crypto assets. Most lending and borrowing activity in DeFi involves stablecoins.

USDC and USDT can be deposited into lending protocols to earn interest from borrowers. Rates vary by market conditions but have historically ranged from two to twelve percent annually on established platforms. This compares favorably to savings accounts in many jurisdictions, particularly when the alternative is holding a local currency that depreciates.

DAI is the leading decentralized stablecoin, issued by MakerDAO. It is backed by over-collateralized positions in ETH and other assets. Unlike USDC, it is not controlled by any company and cannot be blacklisted. However, it is more complex to understand and carries its own systemic risks if collateral values drop rapidly.

The collapse of Terra's algorithmic stablecoin UST in May 2022 serves as an important case study. UST maintained its peg through a mechanism involving its sister token LUNA, rather than actual reserves. When confidence broke, a death spiral ensued: UST depegged, triggering LUNA inflation to defend the peg, which further collapsed confidence. Approximately 40 billion dollars in value was destroyed in days.

The lesson is to distinguish stablecoins backed by real assets (USDC, USDT, DAI) from those backed by endogenous collateral or algorithmic mechanisms alone.`,
          "Not all stablecoins are equal. Asset-backed stablecoins have a fundamentally different risk profile from algorithmic ones. Understand the backing mechanism before allocating significant capital.",
          "Examine any stablecoin's depeg history before using it. Small, brief depegs are common during market stress. A stablecoin that has depegged significantly and recovered is a different risk profile from one that has never been tested."
        )
      },
      {
        id: 'f1_s7',
        title: 'DeFi Risks in Practice',
        content: wrapNote(
          `DeFi offers genuine financial utility, but the risks are real, specific, and worth understanding in detail before deploying capital.

Smart contract risk is the most fundamental. DeFi protocols run on code, and code can have bugs. Over three billion dollars was lost to smart contract exploits in 2022 alone. Audits reduce but do not eliminate this risk. Even audited protocols have been exploited. The most common recommendation is to limit any single protocol exposure and to favor protocols with long operational histories, multiple audits, and significant TVL.

Oracle risk affects any protocol that relies on external price feeds. Oracles report real-world prices to smart contracts. If an oracle is manipulated, which has happened through flash loan attacks, protocols can be drained. Major protocols use decentralized oracle networks like Chainlink with multiple data sources, which significantly reduces this vector.

Liquidity risk can trap you in a position. In a market panic, liquidity can drain from protocols rapidly, making exits expensive or temporarily impossible. This is particularly relevant for smaller pools and newer protocols.

Regulatory risk is increasing. Governments worldwide are examining DeFi more closely. Protocols that touch fiat on-ramps or are run by identifiable teams face potential enforcement. Purely decentralized protocols with immutable contracts and anonymous teams are harder to regulate but come with their own governance risks.`,
          "DeFi risk is multidimensional: smart contracts, oracles, liquidity, and regulation each represent distinct exposure. Position sizing accordingly.",
          "Start with small amounts in any new DeFi protocol, regardless of its reputation. The ability to lose a test position without significant financial impact is worth more than capturing the first few percentage points of yield."
        )
      },
      {
        id: 'f1_s8',
        title: 'Module Summary: DeFi Fundamentals',
        content: wrapNote(
          `DeFi represents a genuinely new financial paradigm. It removes intermediaries from lending, borrowing, trading, and yield generation, replacing them with transparent, auditable smart contracts.

The core infrastructure includes AMMs for decentralized trading (Uniswap, Curve), lending protocols (Aave, Compound), stablecoin systems (MakerDAO, Circle), and yield aggregators that automate strategy execution.

The dominant risk factors are smart contract vulnerabilities, oracle manipulation, liquidation cascades in lending, and unsustainable yield structures based on token emissions rather than real economic activity.

A sensible approach for most users begins with simple lending on established platforms, using stable assets, with amounts that represent a small enough proportion of their portfolio that a total loss of that position would not be catastrophic. From that base, familiarity with the mechanics can be built over time.

The DeFi space continues to evolve rapidly. New protocol categories, scaling solutions, and regulatory frameworks are emerging continuously. Following developments through sources like DeFiLlama, The Defiant, and Bankless provides a reasonable signal-to-noise ratio for ongoing education.`,
          "DeFi's risk-adjusted returns are highest for users who understand what they are doing. Familiarity with the mechanisms separates informed participation from uninformed speculation.",
          "Track your DeFi positions in one place using Zapper.fi or DeBank. Both provide a unified view of balances, yields, and approvals across chains, making it easier to monitor exposure and act when necessary."
        )
      },
    ]
  },

  // ── MODULE 5: TRADING AND TECHNICAL ANALYSIS (FUNDAMENTAL) ───────────────
  {
    id: 'f2',
    title: 'Trading and Technical Analysis',
    description: 'Charts, indicators, support and resistance, and building a trading strategy.',
    difficulty: Difficulty.FUNDAMENTAL,
    category: 'Trading',
    estimatedMinutes: 20,
    rewardTokens: 10,
    subtopics: [
      {
        id: 'f2_s1',
        title: 'Reading Candlestick Charts',
        content: wrapNote(
          `Candlestick charts are the standard visualization tool for price movement in crypto and traditional markets. Each candle represents the price action during a defined time period, whether one minute, one hour, one day, or longer.

Each candle has four data points. The open is where the price started at the beginning of the period. The close is where it ended. The high is the highest price reached. The low is the lowest. The thick body of the candle spans the open to close. The thin lines extending above and below the body are called wicks or shadows and represent the high and low.

A green (or white) candle means the close was higher than the open: the price went up during that period. A red (or black) candle means the price went down. The body size indicates the magnitude of movement. A long body shows strong directional movement. A short body suggests indecision or equilibrium between buyers and sellers.

Wicks carry important information. A long upper wick on an otherwise bullish candle suggests that buyers pushed the price up but sellers pushed it back down before the period closed, indicating resistance at higher levels. A long lower wick suggests buyers stepped in to prevent further decline.

Reading candlesticks is the first step toward understanding price action. Significant patterns, such as dojis (very small body indicating indecision), hammers (long lower wick suggesting reversal from a downtrend), and engulfing patterns (a candle that fully contains the previous one), become recognizable with practice.`,
          "Candlestick charts encode open, close, high, and low prices in a compact visual format. Reading them accurately is the foundation of technical analysis.",
          "TradingView is the standard platform for crypto charting. It is free for most features and covers every major cryptocurrency pair. Spend time exploring its interface before attempting to trade based on your analysis."
        )
      },
      {
        id: 'f2_s2',
        title: 'Support and Resistance',
        content: wrapNote(
          `Support and resistance are price levels where buying or selling pressure has historically been significant enough to halt or reverse price movement. They are among the most widely used concepts in technical analysis.

Support is a price level where buying interest has previously been sufficient to prevent the price from falling further. When price approaches a support level again, traders expect buyers to step in again. This expectation itself can become self-fulfilling, as traders place buy orders at those levels.

Resistance is the inverse: a price level where selling interest has previously prevented further advance. Former resistance levels often become support when broken, and former support levels often become resistance after a breakdown.

The reliability of support and resistance levels depends on how many times they have been tested and held, how high the trading volume was at those levels, and how recently they were established. A level tested four times with high volume is more significant than one tested twice with low volume.

Key psychological levels, such as round numbers like $50,000 or $100,000 for Bitcoin, often act as informal support and resistance because large numbers of people set orders and targets at convenient round figures.

Support and resistance are not precise lines. They are zones. Treating them as exact to the dollar introduces false precision into a system that reflects aggregated human behavior, which is inherently imprecise.`,
          "Support and resistance levels reflect areas of historical supply and demand concentration. They are more reliable when tested multiple times on high volume.",
          "When price spends time near a support or resistance level without breaking it, the level becomes stronger. A clean, swift break through a well-established level is a more significant signal than a slow grind through it."
        )
      },
      {
        id: 'f2_s3',
        title: 'Moving Averages',
        content: wrapNote(
          `A moving average smooths price data by averaging closing prices over a specified period, reducing the noise of individual candle-by-candle fluctuations to reveal the underlying trend.

The simple moving average (SMA) calculates the arithmetic mean of closing prices over N periods. The 200-day SMA is widely considered the most important long-term trend indicator in crypto markets. A price trading above the 200-day SMA is generally considered to be in a long-term uptrend; below it, a downtrend.

The exponential moving average (EMA) gives more weight to recent prices, making it more responsive to current price action. The 50-day EMA and 200-day EMA are commonly watched on daily charts. Many traders pay attention to the crossover between these two.

A golden cross occurs when the 50-day moving average crosses above the 200-day moving average. Historically in Bitcoin, this has preceded extended bull runs. A death cross, when the 50-day crosses below the 200-day, has historically preceded extended downtrends. These crossovers are lagging indicators, meaning they confirm a trend that has already begun rather than predicting it.

Moving averages work best in trending markets. In sideways, ranging markets they generate false signals repeatedly. Combining them with volume analysis and a broader understanding of the market cycle context makes them more useful.`,
          "Moving averages reveal trend direction by smoothing price noise. The 200-day SMA is the most widely watched long-term trend indicator.",
          "Avoid optimizing moving average parameters to fit past data. A strategy that works perfectly on historical data but fails on new data is called overfitting. Standard periods (50, 100, 200) are widely used precisely because their widespread adoption makes them more likely to be respected."
        )
      },
      {
        id: 'f2_s4',
        title: 'RSI: Relative Strength Index',
        content: wrapNote(
          `The Relative Strength Index (RSI) is a momentum oscillator that measures the speed and magnitude of price changes. It was developed by J. Welles Wilder in 1978 and has become one of the most widely used technical indicators across all markets.

RSI is displayed as a line oscillating between 0 and 100. It is typically calculated over 14 periods. An RSI above 70 is conventionally considered overbought, suggesting the asset may have risen too quickly and could be due for a pullback. An RSI below 30 is considered oversold, suggesting the asset may have fallen too quickly relative to recent history.

In practice, RSI in trending markets can remain in overbought or oversold territory for extended periods. Bitcoin ran an RSI above 70 for months during the 2017 and 2021 bull runs. Treating overbought RSI as an automatic sell signal in a strong uptrend is a common mistake.

RSI divergence is a more sophisticated and reliable signal. Bullish divergence occurs when the price makes a new low but RSI does not, suggesting diminishing bearish momentum. Bearish divergence occurs when the price makes a new high but RSI does not, suggesting the rally is losing strength. These divergences have historically preceded many significant reversals.

RSI is most useful as a confirmation tool rather than a standalone signal. Use it alongside price action analysis and broader market context.`,
          "RSI measures momentum and can identify potential turning points through divergence. Overbought/oversold levels alone are unreliable in trending markets.",
          "TradingView allows you to add RSI (and most other indicators) to any chart with a single click. Spend time observing RSI behavior across different market conditions before incorporating it into trading decisions."
        )
      },
      {
        id: 'f2_s5',
        title: 'Volume and Its Significance',
        content: wrapNote(
          `Volume is the number of units of an asset traded during a given period. It is often displayed as a bar chart at the bottom of a price chart. Volume analysis adds a dimension of conviction to price movements that price data alone cannot provide.

High volume during a price increase suggests broad participation and genuine buying interest. The move is more likely to be sustained. High volume during a price decline suggests strong selling pressure. Low volume during either direction suggests the move lacks conviction and is more likely to be temporary.

Volume typically spikes at significant price levels, such as during breakouts above resistance, breakdowns below support, and at major market reversals. When a price breaks above resistance on significantly higher-than-average volume, the breakout is generally considered more credible than one on low volume.

The concept of volume divergence parallels RSI divergence. When price is reaching new highs but volume is declining, fewer participants are driving the move, which is a warning sign that the trend may be weakening.

On-chain volume analysis is a dimension unique to crypto. The total value of transactions on a blockchain (not just exchange trading volume) is an indicator of actual network usage. A coin with rising exchange volume but flat on-chain volume may be primarily speculative, while rising on-chain volume alongside price suggests growing genuine utility.`,
          "Volume confirms price moves. High volume on a breakout or trend continuation is more reliable than the same move on low volume.",
          "CoinGecko shows both spot and derivatives volume for major cryptocurrencies. Unusually high derivatives volume relative to spot volume can indicate a leveraged, speculative environment where price moves may be exaggerated."
        )
      },
      {
        id: 'f2_s6',
        title: 'Common Chart Patterns',
        content: wrapNote(
          `Chart patterns are formations that appear in price charts and have historically preceded specific types of price movement. They represent collective market psychology made visible.

The head and shoulders pattern forms after an uptrend. It consists of three peaks: a left shoulder, a higher head, and a right shoulder approximately equal in height to the left. When the price breaks the neckline (connecting the lows between the peaks), the pattern suggests a trend reversal to the downside.

Triangles form when price makes a series of lower highs and higher lows, converging toward a point. A symmetrical triangle represents a period of consolidation and can break in either direction. An ascending triangle (flat resistance, rising support) is typically bullish. A descending triangle (falling resistance, flat support) is typically bearish.

Flags and pennants are short consolidation patterns following a strong move. A flag is a narrow rectangular channel moving counter to the trend. A pennant is a small symmetrical triangle following a spike. Both typically resolve in the direction of the preceding trend.

Double bottoms and double tops are reversal patterns. A double bottom forms when price tests a support level twice and fails to break lower, suggesting buyers are defending that level strongly. A double top is the inverse.

It is important to acknowledge that no pattern works reliably in all conditions. Chart patterns are useful for framing probabilistic scenarios, not for predicting the future with certainty.`,
          "Chart patterns represent human behavior and psychology rather than predictive laws. Use them to identify probabilities and invalidation levels, not guaranteed outcomes.",
          "Before trading based on a pattern, always identify your invalidation level (the price at which your pattern interpretation is proved wrong) before entry. This makes position sizing and risk management straightforward."
        )
      },
      {
        id: 'f2_s7',
        title: 'Risk Management in Trading',
        content: wrapNote(
          `Technical analysis is only half of trading. Risk management is the other half, and by most accounts, it is the more important one. Many traders who understand charts perfectly still lose money because they manage risk poorly.

Position sizing determines how much capital to allocate to any single trade. A common guideline is to risk no more than one to two percent of your total trading capital on a single trade. With a ten thousand dollar account, that means risking a maximum of one to two hundred dollars per trade. This ensures that even a run of consecutive losses cannot destroy your capital.

A stop-loss is a pre-defined price at which you will exit a losing trade to prevent further losses. Setting it before entering the trade removes the emotional decision-making that causes traders to hold losing positions hoping for recovery. A stop should be placed at a technically significant level, such as below a key support zone, rather than at an arbitrary fixed percentage.

The risk-reward ratio compares the potential profit of a trade to the potential loss. A minimum ratio of two to one (targeting twice the gain as the maximum loss) means you can be wrong more than half the time and still be profitable over many trades.

Trading without risk management is speculation with no floor. Every successful professional trader has a defined risk process. The goal of risk management is not to prevent losses entirely, but to ensure that losses are small enough that they cannot prevent recovery.`,
          "Risk management is what allows traders to survive long enough to improve. Position sizing and pre-set stop losses are the minimum viable framework.",
          "Paper trading (trading with simulated money) on platforms like TradingView allows you to test strategies and risk management approaches without real financial exposure. Spend meaningful time paper trading before risking capital."
        )
      },
      {
        id: 'f2_s8',
        title: 'Module Summary: Trading and Technical Analysis',
        content: wrapNote(
          `Technical analysis provides a framework for interpreting price action, not a system for predicting the future with certainty. Markets incorporate vast amounts of information rapidly and no indicator has consistent predictive power across all conditions.

The most useful elements from this module, applied consistently, are: reading candlesticks accurately to understand price action context, identifying significant support and resistance zones, using moving averages to determine trend direction, applying RSI to identify momentum and divergence, interpreting volume to assess conviction, and recognizing common patterns as probabilistic scenarios.

These tools work best in combination and in the context of broader market understanding, which includes where you are in the market cycle, the macroeconomic environment, and on-chain fundamentals.

Risk management is the discipline that makes long-term trading possible. No analysis improves outcomes without appropriate position sizing and pre-defined exits.

For most participants, applying a few indicators consistently over time produces better results than switching between systems based on recent performance. Consistency and discipline matter more than the sophistication of the tools used.`,
          "Technical analysis is a probabilistic tool for interpreting market psychology. Applied with discipline and proper risk management, it provides a practical edge over purely intuitive decision-making.",
          "Keep a trading journal. Record every trade: the reason for entry, the expected outcome, the actual outcome, and what you would do differently. Review it regularly. Most trading mistakes are patterned, and a journal makes those patterns visible."
        )
      },
    ]
  },

  // ── MODULE 6: TOKENOMICS AND MARKET CYCLES (FUNDAMENTAL) ─────────────────
  {
    id: 'f3',
    title: 'Tokenomics and Market Cycles',
    description: 'Supply, demand, halving cycles, bull and bear markets, and market psychology.',
    difficulty: Difficulty.FUNDAMENTAL,
    category: 'Market Dynamics',
    estimatedMinutes: 18,
    rewardTokens: 10,
    subtopics: [
      {
        id: 'f3_s1',
        title: 'What Is Tokenomics',
        content: wrapNote(
          `Tokenomics is the economic design of a cryptocurrency: its supply structure, distribution mechanism, use cases within its ecosystem, and the incentives that govern how participants behave.

Good tokenomics aligns the interests of users, developers, validators, and investors. Poor tokenomics creates misaligned incentives that ultimately destroy value regardless of the underlying technology.

The most important tokenomics variables are total supply (the maximum number of tokens that will ever exist), circulating supply (how many are currently in active circulation), and the inflation or emission schedule (how many new tokens are created and distributed over time).

Bitcoin has a fixed supply of 21 million, a halving schedule that reduces new issuance every four years, and no treasury controlled by any single party. These properties make it relatively simple to model.

Most altcoins have more complex token designs. They include pre-mined allocations to founders and investors, ecosystem funds, staking rewards, governance distributions, and complex vesting schedules. Evaluating these requires understanding not just the numbers but the incentives they create: do early insiders have strong financial incentives to dump their allocation when vesting ends?

Tokenomics cannot guarantee success, but poor tokenomics can guarantee failure. A technically excellent project with deeply flawed token economics will often underperform a simpler alternative.`,
          "Tokenomics determines the long-term supply dynamics and incentive structure of a crypto asset. Understanding it is as important as understanding the technology.",
          "For any token you are considering, check the vesting schedule for team and investor allocations. If large unlocks are scheduled in the near future, that represents potential selling pressure you should factor into your analysis."
        )
      },
      {
        id: 'f3_s2',
        title: 'Bitcoin Halving Cycles',
        content: wrapNote(
          `Bitcoin's supply issuance follows a predetermined schedule. Approximately every four years, or every 210,000 blocks, the reward for mining a new block is cut in half. This is called the halving, or halvening.

When Bitcoin launched in 2009, the block reward was 50 BTC. After the first halving in 2012, it became 25 BTC. After the second in 2016, 12.5 BTC. After the third in May 2020, 6.25 BTC. The April 2024 halving reduced it to 3.125 BTC. This process continues until approximately 2140, when all 21 million Bitcoin will have been mined.

The halving reduces the rate of new supply entering the market. If demand remains stable or increases, basic supply and demand dynamics suggest upward price pressure. Historical data shows that significant price appreciation has followed each halving, typically with a delay of six to eighteen months.

However, past halvings occurred when Bitcoin had a much smaller total market cap. Each successive cycle requires more capital inflows to achieve the same percentage gains. The claim that Bitcoin will repeat previous halving cycles exactly becomes less reliable as the market matures.

Halvings are not catalysts in themselves. They are scheduled, widely anticipated events. Markets often price in anticipated events before they occur and can sell off when they happen, consistent with the principle that markets move on new information rather than known information.`,
          "Bitcoin halving reduces new supply issuance on a fixed schedule. Historically correlated with market cycles, but the relationship becomes less mechanical as the market matures.",
          "Planbtc.com provides real-time tracking of Bitcoin's halving schedule, current block subsidy, and projected future halvings. It also tracks the Stock-to-Flow ratio, a model based on supply scarcity, which provides useful context even if the model's precise predictions are disputed."
        )
      },
      {
        id: 'f3_s3',
        title: 'Bull Markets and Bear Markets',
        content: wrapNote(
          `Crypto markets move in pronounced cycles between bull markets (sustained uptrends) and bear markets (sustained downtrends). Understanding the characteristics of each phase helps investors position appropriately rather than being caught off guard.

Bitcoin has experienced four major market cycles since 2011. Each cycle consisted of a roughly four-year accumulation and bull phase, followed by a prolonged bear phase where price declined 70 to 80 percent from its peak and stayed depressed for one to two years before the next accumulation began.

Bull markets in crypto are characterized by rising prices, increasing retail interest, growing media coverage, and elevated risk appetite. New participants enter the market, often at late-cycle highs. Leverage increases across derivative markets. Projects with no real utility attract capital on the basis of narratives alone.

Bear markets are characterized by declining prices, declining trading volume, reduced media attention, and the exit of speculative capital. Projects dependent on token emissions for revenue collapse. Teams with no real users continue building or shut down.

For long-term investors, bear markets are when the best assets are acquired at the most favorable prices. For traders, bear markets require shorter time horizons and less leverage. For builders, bear markets filter out projects without genuine product-market fit.

The transition between phases is rarely obvious in real time. Calling tops and bottoms consistently is not achievable. A systematic strategy such as DCA during accumulation phases and gradual profit-taking during bull phases serves most investors better than attempting to time cycles precisely.`,
          "Market cycles in crypto are real and pronounced. A strategy that accounts for both phases, rather than assuming perpetual uptrend, produces better long-term outcomes.",
          "The Fear and Greed Index (alternative.me/crypto/fear-and-greed-index) is a useful sentiment indicator. Extreme fear historically coincides with good buying opportunities. Extreme greed historically precedes corrections."
        )
      },
      {
        id: 'f3_s4',
        title: 'Market Psychology: Fear and Greed',
        content: wrapNote(
          `Price movements in crypto are driven by fundamental factors but amplified significantly by human psychology. Understanding the psychological patterns that repeat across cycles helps investors avoid the most costly behavioral mistakes.

FOMO, fear of missing out, drives buying at market peaks. As prices rise and news coverage intensifies, new participants rush in, afraid of being left behind. This buying drives prices higher, validating the FOMO of others in a feedback loop. The peak of a bull cycle is often characterized by pervasive FOMO.

FUD, fear, uncertainty, and doubt, drives selling at market lows. Negative news (exchange failures, regulatory actions, hacks) triggers panic selling. Experienced market participants who understand the fundamentals may buy during these moments.

Cognitive biases that affect crypto investors include recency bias (overweighting recent performance in predictions), anchoring (fixating on the all-time high as the reference price for future expectations), and loss aversion (the tendency to feel losses more acutely than equivalent gains, causing investors to sell winners too early and hold losers too long).

Warren Buffett's oft-quoted maxim applies directly to crypto cycles: be fearful when others are greedy, and greedy when others are fearful. Simple to state, very difficult to execute consistently because it requires acting against the dominant sentiment.

Building mechanical rules that reduce in-the-moment decision-making, such as automatic DCA purchases during defined drawdown levels, is one practical way to systematically take advantage of these patterns without relying on emotional discipline alone.`,
          "Market psychology amplifies price movements in both directions. Mechanical strategies that remove emotional decision-making outperform reactive behavior over most market cycles.",
          "Keep a note of your emotional state during significant market moves. Reviewing these notes during the next cycle helps you identify your personal psychological patterns and creates the self-awareness needed to act against them."
        )
      },
      {
        id: 'f3_s5',
        title: 'Altcoin Cycles and Bitcoin Dominance',
        content: wrapNote(
          `Altcoins and Bitcoin tend to move in related but distinct patterns. Understanding their relationship provides useful context for portfolio timing decisions.

Bitcoin dominance is the percentage of total crypto market capitalization represented by Bitcoin. When Bitcoin dominance rises, Bitcoin is outperforming altcoins: investors are rotating toward the perceived safety and liquidity of BTC. When Bitcoin dominance falls, capital is flowing from Bitcoin into altcoins, often reflecting heightened risk appetite.

The typical cycle sequence begins with Bitcoin leading the bull market. After Bitcoin establishes a significant uptrend, large-cap altcoins like Ethereum follow. Later in the cycle, mid- and small-cap altcoins see the most explosive percentage gains as speculative capital flows into higher-risk assets. Near the peak, the most speculative assets (new tokens, meme coins, obscure DeFi tokens) see the greatest interest and the greatest subsequent losses.

The inverse is true in bear markets. Small-cap altcoins tend to fall earliest and furthest. Bitcoin and Ethereum typically retain more value relative to speculative assets.

For investors, this pattern suggests concentrating exposure in Bitcoin and Ethereum during early-cycle uncertainty, and only expanding into altcoins with clear fundamental case as the cycle matures. Altcoin gains are largest in mid-to-late bull phases but are also the most dangerous to hold into the subsequent bear.`,
          "Bitcoin dominance provides a useful indicator of market cycle phase and capital rotation. Understanding the typical sequence helps with position timing.",
          "TradingView allows you to chart Bitcoin dominance (ticker: BTC.D) alongside price. Watching both simultaneously provides a more complete picture of market dynamics than price alone."
        )
      },
      {
        id: 'f3_s6',
        title: 'On-Chain Metrics Overview',
        content: wrapNote(
          `On-chain analysis examines data recorded directly on the blockchain to assess market health, investor behavior, and network fundamentals. Unlike price data, which reflects trading activity, on-chain data reflects actual usage and movement of assets.

Key on-chain metrics for Bitcoin include active addresses (the number of unique addresses active in a day, indicating network usage), exchange inflows and outflows (large outflows suggest investors are moving to self-custody, a bullish signal; large inflows suggest preparation to sell), and miner behavior (miners selling heavily can indicate near-term price pressure).

The MVRV ratio (Market Value to Realized Value) compares the current market cap to the aggregate cost basis of all Bitcoin holders. A high MVRV means most holders are significantly in profit, historically associated with cycle tops. A low MVRV means most holders are at or below their cost basis, historically associated with cycle bottoms.

SOPR (Spent Output Profit Ratio) measures whether coins being moved are at a profit or loss relative to when they were last moved. A SOPR persistently below 1 means holders are selling at a loss, often seen at capitulation bottoms.

These metrics do not predict price movements directly, but they provide useful probabilistic context. A Bitcoin at high MVRV, high SOPR, and with surging exchange inflows presents a very different risk profile from Bitcoin at low MVRV, low SOPR, and with declining exchange inflows.`,
          "On-chain metrics reveal investor behavior and network health that price data alone cannot show. MVRV and exchange flows are the most practically useful starting points.",
          "Glassnode (glassnode.com) is the leading on-chain analytics platform. Many key metrics are available on the free tier, with more advanced data requiring a subscription. CryptoQuant and LookIntoBitcoin also provide useful free on-chain data."
        )
      },
      {
        id: 'f3_s7',
        title: 'Token Distribution and Vesting',
        content: wrapNote(
          `How a token is distributed at launch and how early holders can sell their allocations has enormous impact on a token's price behavior and long-term prospects.

The initial distribution of many altcoins involves a private sale to venture capital funds and early investors at a significant discount to the eventual public price. These investors expect returns commensurate with their early risk, and when their vesting period ends, they have strong financial incentive to sell.

Vesting schedules specify when team members, investors, and advisors can sell their token allocations. A typical structure might lock tokens for twelve months and then release them gradually over the following two to four years. Token unlock events where large quantities of tokens become sellable for the first time are historically associated with price declines.

Fair launches, where a token is released to the public simultaneously with no pre-mine or preferential early access, represent an alternative model. Bitcoin was a fair launch: Satoshi mined the first blocks publicly but did not pre-allocate tokens to insiders. Most altcoins are not fair launches.

When evaluating a token, look for: what percentage of total supply goes to team and investors, how long is the vesting period, are the allocations published and auditable, and when are the largest unlock events scheduled. Tools like Tokenomist and CryptoRank publish vesting schedules for many projects.`,
          "Large upcoming token unlocks for team and investor allocations represent predictable selling pressure. Building this into your analysis before investing is straightforward and often overlooked.",
          "Tokenomist.ai provides detailed vesting schedules and upcoming unlock calendars across hundreds of projects. Checking it before any significant investment takes five minutes and can reveal important risk factors."
        )
      },
      {
        id: 'f3_s8',
        title: 'Module Summary: Tokenomics and Market Cycles',
        content: wrapNote(
          `Tokenomics and market cycles provide the macro context within which all shorter-term trading and investing decisions occur. Without this context, even technically correct analysis can lead to poor outcomes.

Key principles from this module: Bitcoin's fixed supply and halving schedule make it uniquely simple to model as a monetary asset. Most altcoins have complex, often unfavorable token structures that create significant selling pressure from insiders over time.

Crypto markets cycle pronounced, with bull phases characterized by risk appetite and altcoin outperformance, and bear phases characterized by capital concentration in higher-quality assets and the unwinding of leverage.

Human psychology amplifies cycles. FOMO and FUD drive behavior in predictable ways that mechanical, rules-based strategies can exploit.

On-chain metrics provide a fundamentals layer below price data. MVRV and exchange flows are the most accessible and actionable starting points.

Combining tokenomics analysis, cycle awareness, and on-chain fundamentals with technical price analysis creates a more complete framework for investment decisions than any single lens provides.`,
          "Context is everything in crypto markets. The same price action has different implications depending on where you are in the market cycle and what the on-chain data shows.",
          "At least once per month, review the on-chain metrics for your major holdings. This takes fifteen to thirty minutes and provides a fundamentals check that prevents purely narrative-driven decision-making."
        )
      },
    ]
  },

  // ── MODULE 7: WEB3 AND NFTS (MID) ────────────────────────────────────────
  {
    id: 'm1',
    title: 'Web3 and NFTs',
    description: 'Decentralized internet, NFTs beyond art, DAOs, and digital ownership.',
    difficulty: Difficulty.MID,
    category: 'Web3',
    estimatedMinutes: 18,
    rewardTokens: 10,
    subtopics: [
      {
        id: 'm1_s1',
        title: 'What Is Web3',
        content: wrapNote(
          `Web3 is a conceptual framework for the next iteration of the internet, built on decentralized protocols rather than centrally controlled platforms.

Web1 (1991 to roughly 2004) was the read-only internet: static websites that users could read but not interact with. Web2 (2004 to present) is the interactive internet: social platforms, cloud services, and user-generated content. The defining characteristic of Web2 is that a small number of large companies (Google, Meta, Amazon, Apple) own the infrastructure, the data, and the monetization layer.

Web3 proposes to replace centralized ownership with decentralized protocols. Instead of storing your data on a company's servers, you control it through cryptographic keys. Instead of earning value for a platform that captures it, protocols distribute that value to participants through tokens. Instead of trusting a company to run services correctly, you trust open-source code running on a public blockchain.

The practical manifestations of Web3 include self-custody wallets (owning your digital assets directly), DeFi (financial services without banks), NFTs (verifiable digital ownership), DAOs (organizations governed by token-holders), and decentralized storage networks like IPFS.

Critics argue that most Web3 applications today do not achieve meaningful decentralization, that user experience remains poor relative to Web2, and that many use cases are speculation-driven rather than genuinely utility-driven. Both the promise and the current limitations are real.`,
          "Web3 proposes user ownership and decentralized governance as an alternative to platform-controlled Web2. The vision is clear; the current reality is still evolving.",
          "The best way to understand Web3 is to use it. Set up a MetaMask wallet, acquire a small amount of ETH, and interact with a simple application like a decentralized exchange or ENS (Ethereum Name Service). Hands-on familiarity is more valuable than theoretical study."
        )
      },
      {
        id: 'm1_s2',
        title: 'NFTs: What They Actually Are',
        content: wrapNote(
          `An NFT, or non-fungible token, is a token on a blockchain that is unique and cannot be replicated. Fungible means interchangeable: one Bitcoin is identical to every other Bitcoin. Non-fungible means each token is distinct and its ownership is individually recorded on the chain.

This is technically a simple concept. What made NFTs culturally significant in 2021 was the application to digital art, where they enabled verifiable provenance and ownership of digital files for the first time. Before NFTs, digital images could be freely copied with no way to establish an original.

The key misunderstanding about NFTs is equating the token with the underlying file. An NFT proves ownership of a token on a blockchain. Whether that token represents meaningful ownership of the underlying asset depends entirely on the terms attached to it. Owning an NFT of a jpeg generally does not give you copyright or commercial rights to that image unless explicitly specified.

The 2021 NFT market exhibited significant speculative behavior. Many projects with no utility beyond social status traded at prices that collapsed rapidly when speculative interest faded. At their peak, NFT collections like Bored Ape Yacht Club reached floor prices above one hundred thousand dollars per token, and subsequently declined more than ninety percent.

The underlying technology remains valid and is finding application in areas with genuine utility: event ticketing (verifiable, transferable, unforgeable), gaming assets (player-owned items across games), music royalties, real estate tokenization, and digital identity.`,
          "NFTs enable verifiable on-chain ownership of unique digital assets. Their value depends entirely on what rights and utility the underlying token represents, not the technology itself.",
          "When evaluating any NFT project, start by asking what ongoing utility or rights the token provides to holders. Projects that can answer this clearly, with contractual or technical mechanisms rather than promises, represent a meaningfully different risk profile from pure speculation."
        )
      },
      {
        id: 'm1_s3',
        title: 'Smart Contracts in Depth',
        content: wrapNote(
          `Smart contracts are programs that execute automatically on a blockchain when specified conditions are met. Once deployed, they run exactly as written, without possibility of modification by any party (in most cases), and without needing any intermediary to execute or enforce them.

Consider a simple escrow: traditionally, both parties deposit funds with a trusted third party who releases them when conditions are met. A smart contract does this without the third party. The code holds the funds, evaluates the conditions, and releases them automatically when triggered. The rules are publicly visible in the code itself.

Solidity is the primary programming language for Ethereum smart contracts. Rust is used for Solana. The code is compiled and deployed to the blockchain, where it receives its own address. Once deployed on an immutable blockchain, the code cannot be changed (unless the contract was written with upgradeability mechanisms).

This immutability is both a feature and a risk. A flawlessly written contract executes forever exactly as intended. A flawed contract executes its flaws forever too, until someone exploits them. Smart contract audits by specialist security firms are the standard (though imperfect) mitigation.

Smart contracts enable composability: contracts can call other contracts, allowing complex applications to be built from simpler components. The entire DeFi ecosystem is built from interacting smart contracts. This composability creates power but also systemic risk: a vulnerability in one protocol can cascade through all the protocols that depend on it.`,
          "Smart contracts execute automatically and immutably on-chain. Their power comes from removing intermediary trust, and their risk comes from the same immutability that makes bugs permanent.",
          "Before interacting with any smart contract, check whether it has been audited by a reputable security firm and read a summary of the audit findings. Most major protocols publish these audits publicly."
        )
      },
      {
        id: 'm1_s4',
        title: 'DAOs: Decentralized Autonomous Organizations',
        content: wrapNote(
          `A DAO is an organization whose governance and treasury operations are managed through smart contracts and token-holder voting rather than traditional hierarchical management.

In a DAO, governance tokens grant holders the right to propose and vote on changes to the protocol: fee structures, treasury deployments, protocol upgrades, and strategic decisions. Votes are recorded on-chain and executed automatically by smart contracts when they pass. No CEO makes unilateral decisions.

The premise is democratized governance: those who have the most at stake in the protocol have the most influence over its direction. Larger token holders typically have proportionally more voting power, which creates its own power concentration dynamics.

Real examples include MakerDAO (which governs the DAI stablecoin and its risk parameters), Uniswap (which governs the protocol fee structure and treasury), Compound (which governs interest rate models), and various investment DAOs that pool capital and make collective investment decisions.

The limitations of DAOs in practice include voter apathy (most token holders do not vote), concentrated voting power (large holders dominate), coordination challenges, and legal ambiguity (DAOs do not fit neatly into existing corporate law frameworks in most jurisdictions). The promise of decentralized governance is genuine; the practical challenges are also genuine.`,
          "DAOs enable stakeholder governance of protocols without traditional organizational structures. Their effectiveness depends heavily on token distribution and participant engagement.",
          "If you hold governance tokens for any protocol, explore their governance forum (typically governance.protocol.com or on Snapshot.org). Reading active proposals provides insight into the community's priorities and the protocol's direction."
        )
      },
      {
        id: 'm1_s5',
        title: 'Decentralized Storage and IPFS',
        content: wrapNote(
          `The current internet stores data on centralized servers owned by companies. If a company goes bankrupt, censors content, or changes its policies, data can disappear or become inaccessible. Decentralized storage networks offer an alternative.

IPFS (InterPlanetary File System) is a peer-to-peer protocol for storing and accessing files. Rather than identifying files by their location (like a URL pointing to a specific server), IPFS identifies files by their content hash: a unique fingerprint of the file's data. Any node that has the file can serve it, and its authenticity is verifiable by matching the hash.

NFT metadata (the image and attributes associated with a token) should ideally be stored on IPFS rather than on a company's servers. An NFT pointing to a traditional URL can lose its associated content if the company hosts the URL disappears. An NFT pointing to an IPFS content hash is more durable, though it still requires at least one node to be "pinning" (hosting) the content.

Filecoin is a blockchain that incentivizes distributed storage by paying miners in FIL tokens to store data for clients. Arweave offers permanent data storage for a one-time fee, using an economic model designed to fund hosting indefinitely.

Decentralized storage is still maturing. Retrieval speeds are generally slower than centralized cloud storage, and content availability is not guaranteed unless actively pinned. But for content that must be censorship-resistant or permanently accessible, these networks represent a meaningful alternative.`,
          "Decentralized storage removes single points of failure and censorship from content hosting. IPFS-stored NFT metadata is more durable than metadata stored on centralized servers.",
          "When evaluating an NFT collection, check whether its metadata is stored on IPFS or a centralized server. Most NFT marketplaces display this information. IPFS storage is meaningfully better for long-term asset integrity."
        )
      },
      {
        id: 'm1_s6',
        title: 'Crypto in Gaming and the Metaverse',
        content: wrapNote(
          `Blockchain technology introduces genuinely new capabilities to gaming: player-owned assets, interoperable items across games, transparent in-game economies, and play-to-earn mechanics that allow players to generate real income.

Traditional games lock players into closed ecosystems. You can acquire items, but you cannot truly own them. The developer can ban you, shut down the game, or change item values at will. Blockchain games issue items as NFTs on a public chain, meaning players own them independently of the game developer.

Axie Infinity became the most prominent early example of play-to-earn gaming. At its peak in 2021, players in the Philippines and Vietnam were earning hundreds of dollars monthly playing the game. The model relied on a two-token economy and new player entry to sustain returns. When growth slowed, the economy collapsed. This demonstrated both the potential and the design challenges of blockchain gaming economies.

Gods Unchained, Illuvium, and games built on platforms like Immutable X represent a newer generation attempting more sustainable designs with real gameplay rather than pure economic mechanics.

The "metaverse" as a concept envisions persistent digital environments where users interact, work, play, and conduct commerce. Decentraland and The Sandbox are existing blockchain-based virtual worlds where users own land as NFTs and can build experiences. Both have seen significant speculation and more modest actual usage.`,
          "Blockchain gaming enables genuine player ownership of in-game assets, but the economic sustainability of play-to-earn models requires careful design to avoid collapse.",
          "Evaluate blockchain games the same way you evaluate any game first: is it enjoyable to play? Games where the economic incentive is the primary reason to play tend to collapse when early growth slows. Games with genuine fun first are more likely to sustain a player economy."
        )
      },
      {
        id: 'm1_s7',
        title: 'Real-World Asset Tokenization',
        content: wrapNote(
          `One of the most significant emerging use cases for blockchain is the tokenization of real-world assets (RWAs): representing ownership of physical or traditional financial assets as tokens on a blockchain.

Tokenized treasuries allow holders to earn US Treasury bill yields through on-chain tokens rather than traditional brokerage accounts. BlackRock's BUIDL fund and Franklin Templeton's BENJI token are live examples with hundreds of millions in assets. This makes dollar-denominated yield accessible to anyone with an Ethereum wallet, without the need for a US brokerage account.

Real estate tokenization allows property ownership to be divided into fractional tokens, enabling investment in properties that would be inaccessible to most individual investors due to minimum investment sizes. Platforms like RealT in the US tokenize rental properties and distribute rental income to token holders automatically.

Tokenized equities, commodities, carbon credits, and private credit are all in various stages of development. The key value propositions are fractional ownership (no minimum investment), 24/7 trading (unlike traditional markets), programmability (automatic dividend distribution, governance votes), and global accessibility.

The primary friction points are regulatory: securities laws in most jurisdictions require specific licensing to offer tokenized financial products. Most current RWA projects operate in restricted jurisdictions or for accredited investors only.`,
          "Real-world asset tokenization represents one of the most practically impactful blockchain applications, connecting on-chain infrastructure to the much larger world of traditional financial assets.",
          "Track the RWA sector's growth on RWA.xyz, which provides comprehensive data on the total value of tokenized assets across categories including treasuries, real estate, and private credit."
        )
      },
      {
        id: 'm1_s8',
        title: 'Module Summary: Web3 and NFTs',
        content: wrapNote(
          `Web3 is both a vision and an evolving technical reality. The vision, user sovereignty over data and assets, decentralized governance, and open financial infrastructure, is coherent and addresses real limitations of the current internet. The current reality involves significant tradeoffs in user experience, scalability, and genuine decentralization.

NFTs established verifiable digital ownership at scale for the first time. The 2021 speculation obscured this underlying technical achievement. The applications finding genuine traction now are those with clear utility: ticketing, gaming assets, access passes, and real-world asset representation.

Smart contracts are the technical foundation of Web3. Their power is automation and trustlessness. Their risk is immutability of bugs and complexity of interactions.

DAOs offer new organizational models that have shown promise in governing protocols but face real challenges in voter engagement and power concentration.

Real-world asset tokenization is the sector most likely to demonstrate mainstream institutional adoption in the near term, with regulated products already live at significant scale.

The most important disposition toward Web3 is informed skepticism: understanding both what the technology genuinely enables and where speculative narratives outpace practical utility.`,
          "Web3's most durable applications solve genuine problems with decentralization, not problems that exist only because centralized solutions have not been tried.",
          "The best Web3 projects are easily identifiable: they have clear answers to who their users are, what problem they solve, whether decentralization is necessary for that solution, and whether real users exist today."
        )
      },
    ]
  },

  // ── MODULE 8: LAYER 2S AND SCALING (MID) ─────────────────────────────────
  {
    id: 'm2',
    title: 'Layer 2s and Scaling',
    description: 'Rollups, Polygon, Arbitrum, Optimism, and the future of Ethereum scaling.',
    difficulty: Difficulty.MID,
    category: 'Infrastructure',
    estimatedMinutes: 18,
    rewardTokens: 10,
    subtopics: [
      {
        id: 'm2_s1',
        title: 'The Blockchain Scalability Problem',
        content: wrapNote(
          `The most fundamental challenge facing public blockchains is scalability: how to process more transactions, faster and cheaper, without sacrificing decentralization or security.

Bitcoin processes approximately seven transactions per second. Ethereum processes approximately fifteen. By comparison, Visa processes approximately twenty-four thousand transactions per second. This limitation is not a bug; it is a direct consequence of decentralization. Every node on a fully decentralized network must process every transaction. As throughput increases, so do the hardware requirements to run a node, which reduces the number of participants who can do so.

Ethereum's high fees during peak periods (which reached hundreds of dollars per transaction during the 2021 bull run) are the direct consequence of demand exceeding this throughput constraint. The fee market allocates scarce block space to those willing to pay the most.

The blockchain trilemma, popularized by Ethereum co-founder Vitalik Buterin, states that a blockchain can optimize for at most two of three properties: decentralization, security, and scalability. Maximizing all three simultaneously is exceptionally difficult.

The dominant scaling approach chosen for Ethereum is Layer 2 technology: keeping the base layer (Layer 1) decentralized and secure while processing most transactions on separate layers that inherit security from the main chain.`,
          "The scalability trilemma explains why public blockchains process fewer transactions than centralized systems. Layer 2 networks are the primary solution for Ethereum.",
          "Understanding the scalability tradeoffs of different blockchains helps evaluate competing claims. When a new blockchain claims extremely high throughput, investigate what decentralization or security concessions were made to achieve it."
        )
      },
      {
        id: 'm2_s2',
        title: 'How Layer 2 Networks Work',
        content: wrapNote(
          `Layer 2 networks process transactions off the main Ethereum chain (Layer 1) while using Ethereum as a security and settlement layer. They inherit the security of Ethereum without requiring every transaction to be processed by every Ethereum node.

The core mechanic is batching: instead of submitting each transaction individually to Ethereum (expensive), a Layer 2 processes thousands of transactions internally and submits a compressed summary or proof to Ethereum periodically. This dramatically reduces the per-transaction cost and increases throughput.

There are two main types of Layer 2 networks: optimistic rollups and zero-knowledge (ZK) rollups. Both achieve similar scaling goals through different cryptographic mechanisms.

The distinction between Layer 2 and other scaling approaches like sidechains is important. A true Layer 2 derives its security from Ethereum: if something goes wrong on the Layer 2, users can always exit their funds to Ethereum mainnet using cryptographic proof, without requiring cooperation from any Layer 2 operator. A sidechain (like the original Polygon PoS chain) has its own validators and its own security model, separate from Ethereum.

The practical user experience on Layer 2 networks is near-identical to Ethereum: the same wallets (MetaMask), the same DeFi protocols (Uniswap, Aave), the same NFT standards, but with transaction costs typically ninety to ninety-nine percent lower and confirmation times of one to two seconds.`,
          "Layer 2 networks batch transactions and settle to Ethereum, inheriting its security while enabling much higher throughput and lower costs.",
          "Bridge carefully. Moving assets from Ethereum to a Layer 2 requires a bridging transaction, which takes a few minutes and costs a small Ethereum gas fee. Moving back from some Layer 2s (particularly optimistic rollups) can take up to seven days through the official bridge, though third-party fast bridges are available."
        )
      },
      {
        id: 'm2_s3',
        title: 'Optimistic Rollups',
        content: wrapNote(
          `Optimistic rollups operate on the assumption that transactions submitted to Ethereum are valid by default, and only verify them if someone disputes them. This is where the "optimistic" terminology comes from.

An optimistic rollup sequencer collects transactions, processes them off-chain, and periodically publishes a batched state update to Ethereum with a compressed representation of the new state. This update is considered valid unless a validator submits a fraud proof within a challenge period (typically seven days).

The seven-day challenge period is the primary user-facing limitation of optimistic rollups: withdrawals through the official bridge back to Ethereum mainnet take up to seven days to finalize. Third-party liquidity providers offer instant withdrawal services for a small fee, which removes this friction for most users.

Arbitrum and Optimism are the two dominant optimistic rollup networks. Together they process more transactions than Ethereum mainnet and have secured hundreds of billions of dollars in TVL. Both support the full Ethereum Virtual Machine (EVM), meaning any Ethereum smart contract can be deployed on them with minimal modification.

Arbitrum has historically led in TVL and transaction volume. Optimism introduced a novel governance structure through its Optimism Collective and has significant ecosystem development support from the Ethereum Foundation.`,
          "Optimistic rollups inherit Ethereum security while dramatically reducing costs. The primary limitation is the seven-day withdrawal period through official bridges.",
          "Most major DeFi protocols, including Uniswap, Aave, Curve, and GMX, are deployed on Arbitrum and Optimism. For most Ethereum-compatible operations, these networks offer comparable functionality at a fraction of the cost."
        )
      },
      {
        id: 'm2_s4',
        title: 'Zero-Knowledge Rollups',
        content: wrapNote(
          `Zero-knowledge rollups use cryptographic proofs called ZK-SNARKs (Succinct Non-Interactive Arguments of Knowledge) or ZK-STARKs to mathematically prove the validity of every transaction batch, without revealing the underlying transaction data.

Unlike optimistic rollups, which assume validity and challenge fraud, ZK rollups mathematically prove every state transition. A verifier contract on Ethereum can confirm in milliseconds that a batch of thousands of transactions was processed correctly by checking the proof, without re-executing any of them.

The advantages of ZK rollups over optimistic rollups include near-instant finality (no challenge period), potentially stronger security properties, and privacy capabilities that ZK proofs enable. The disadvantages are computational intensity (generating ZK proofs is expensive) and greater complexity to build.

zkSync Era, StarkNet, and Polygon zkEVM are the leading ZK rollup networks. Achieving full EVM compatibility (so that any Ethereum contract works without modification) in a ZK context was a significant engineering challenge that has only recently been solved.

The long-term vision, supported by Vitalik Buterin among others, is that ZK rollups will become the dominant scaling solution for Ethereum, with the base chain evolving into a settlement and data availability layer serving hundreds of ZK rollups.`,
          "ZK rollups prove transaction validity cryptographically, enabling near-instant finality without a challenge period. They represent the likely long-term direction of Ethereum scaling.",
          "The field is evolving rapidly. zkSync Era's native account abstraction (which simplifies user experience significantly) and StarkNet's Cairo language represent different architectural bets on what ZK rollup design should look like."
        )
      },
      {
        id: 'm2_s5',
        title: 'Polygon: Multi-Chain Scaling',
        content: wrapNote(
          `Polygon is a blockchain infrastructure company that has built multiple scaling products for Ethereum. Its approach is notable for breadth: rather than betting on a single scaling architecture, it has developed both a sidechain (Polygon PoS) and ZK-based solutions.

Polygon PoS (Proof of Stake) was the original Polygon product, launched in 2020 as a sidechain to Ethereum with faster and cheaper transactions. It gained significant adoption quickly due to its EVM compatibility and low fees, becoming home to many popular DeFi protocols and gaming applications.

The distinction that matters: Polygon PoS is not a true Layer 2. It has its own validators and its own security model, meaning users ultimately trust Polygon's validators rather than Ethereum's consensus. This is a meaningful security tradeoff.

Polygon has since launched Polygon zkEVM, a ZK rollup that does inherit Ethereum's security properties, and the Agglayer, an infrastructure for connecting multiple ZK chains with shared liquidity.

The MATIC token (rebranded to POL in 2024) is used for gas fees on Polygon networks and for validator staking. The rebranding reflects the shift from a single network to a broader ecosystem of connected chains.

Polygon has attracted significant enterprise partnerships including Nike, Starbucks, and Reddit, which have used its infrastructure for mainstream-facing blockchain applications.`,
          "Polygon PoS is a fast, inexpensive sidechain widely adopted but not a true Layer 2. Polygon's ZK products are evolving toward genuine Ethereum security inheritance.",
          "When bridging to Polygon, use the official Polygon Bridge (wallet.polygon.technology) or a reputable third-party bridge. Always verify the bridge's security track record before transferring significant amounts."
        )
      },
      {
        id: 'm2_s6',
        title: 'Cross-Chain Bridges',
        content: wrapNote(
          `As the multi-chain ecosystem has grown, the ability to move assets between different blockchains has become essential infrastructure. Bridges serve this function, allowing tokens on one chain to be represented on another.

The basic mechanism involves locking tokens on the source chain and minting equivalent wrapped tokens on the destination chain. The wrapped tokens represent a claim on the locked original assets. When you bridge back, the wrapped tokens are burned and the originals are unlocked.

Bridges have been the most exploited category of crypto infrastructure. In 2022, over two billion dollars was stolen from bridges including Ronin (the Axie Infinity bridge, 625 million dollars), Wormhole (320 million dollars), and Nomad (190 million dollars). The fundamental reason is that bridges hold large concentrations of locked assets, creating high-value targets.

There are different bridge architectures with different security tradeoffs. Multisig bridges require M-of-N trusted validators to approve transfers, creating reliance on that set of validators. Optimistic bridges apply the challenge mechanism of optimistic rollups to cross-chain messaging. ZK bridges use cryptographic proofs. Official rollup bridges (connecting Ethereum to Arbitrum, Optimism, or zkSync) have the strongest security as they inherit from the rollup's security model.

For moving assets between Ethereum and major Layer 2 networks, the official bridges are safest. For bridging between other chains, using the most established and well-audited third-party bridges reduces (but does not eliminate) risk.`,
          "Bridges are high-value attack targets and have been exploited for billions. Using official bridges and well-audited third-party solutions, while limiting amounts in transit, is the practical approach.",
          "Before using any bridge, check its security history on DeFiLlama's hack tracker or the rekt.news database. Bridges with a history of exploits or unaudited code should be avoided regardless of how convenient they are."
        )
      },
      {
        id: 'm2_s7',
        title: 'The Future of Ethereum Scaling',
        content: wrapNote(
          `Ethereum's scaling roadmap, as articulated by Vitalik Buterin, is multi-layered and evolving. Understanding the direction helps contextualize current Layer 2 developments.

The Surge phase of Ethereum's roadmap focuses on increasing data availability for Layer 2 networks. EIP-4844 (the Cancun upgrade, March 2024) introduced "blobs": a new type of data storage on Ethereum designed specifically for rollup data. This reduced Layer 2 transaction costs by approximately eighty to ninety percent in practice.

The ultimate goal is full danksharding, which would massively increase the amount of rollup data Ethereum can accommodate, enabling hundreds of thousands of transactions per second across the ecosystem.

Account abstraction (EIP-4337) is a parallel development that addresses user experience. It allows wallets to function as smart contracts, enabling features like social recovery (recovering a wallet through trusted contacts without a seed phrase), gasless transactions (a third party pays gas), and session keys (temporary authorization for in-app transactions). These changes are expected to make crypto wallets dramatically easier for non-technical users.

The direction of travel for Ethereum is clear: a highly secure, decentralized base layer serving as the trust foundation for a diverse ecosystem of specialized Layer 2 networks, with progressively better user experience through account abstraction and infrastructure improvement.`,
          "Ethereum's scaling roadmap focuses on making Layer 2 networks cheaper and more capable, while account abstraction makes crypto wallets more accessible to mainstream users.",
          "Following Ethereum's roadmap through vitalik.eth.limo (Vitalik Buterin's blog) and ethereum.org/roadmap provides the most authoritative view of where the ecosystem is heading."
        )
      },
      {
        id: 'm2_s8',
        title: 'Module Summary: Layer 2s and Scaling',
        content: wrapNote(
          `Layer 2 networks have already fundamentally changed the practical economics of using Ethereum. Transaction costs that were prohibitive on mainnet have dropped to cents on optimistic and ZK rollups, enabling DeFi, gaming, and NFT applications to reach users at meaningful scale.

Optimistic rollups (Arbitrum, Optimism) are currently the most adopted Layer 2 category, with the largest ecosystem of protocols and users. Their primary limitation is the seven-day withdrawal window, which third-party liquidity providers largely solve in practice.

ZK rollups represent the longer-term technical direction, with mathematical proof of validity rather than fraud challenges, and near-instant finality. The technology is maturing rapidly.

Polygon occupies a hybrid position: its PoS sidechain is widely adopted but less secure than true Layer 2 networks, while its ZK products are moving toward full Ethereum security inheritance.

Bridges remain the highest-risk component of the multi-chain ecosystem. Using official bridges and well-audited solutions reduces, but does not eliminate, risk.

For users, the practical takeaway is that Layer 2 networks offer a substantially better experience for most operations than Ethereum mainnet, at significantly lower cost, with security approaching Ethereum's own guarantees for the more mature rollup implementations.`,
          "Layer 2 networks have made Ethereum practically usable at scale. Understanding their different architectures helps you navigate the ecosystem intelligently.",
          "L2beat.com provides the most comprehensive independent tracking of Layer 2 networks, their security properties, TVL, and upgrade risk status. It is the authoritative reference for comparing Layer 2 security."
        )
      },
    ]
  },

  // ── MODULE 9: CRYPTO PORTFOLIO STRATEGY (PRO) ────────────────────────────
  {
    id: 'p1',
    title: 'Crypto Portfolio Strategy',
    description: 'Risk management, DCA, diversification, tax efficiency, and long-term frameworks.',
    difficulty: Difficulty.PRO,
    category: 'Investment Strategy',
    estimatedMinutes: 20,
    rewardTokens: 10,
    subtopics: [
      {
        id: 'p1_s1',
        title: 'Portfolio Frameworks for Crypto',
        content: wrapNote(
          `A portfolio framework is a deliberate structure for allocating capital across different crypto assets according to your risk tolerance, time horizon, and financial goals. Without a framework, investment decisions become reactive to market sentiment, which reliably produces poor outcomes.

A common structure for thoughtful crypto investors divides holdings into three tiers. Core holdings (fifty to seventy percent) consist of Bitcoin and Ethereum, the two assets with the longest track records, deepest liquidity, and most credible long-term value cases. Strategic positions (twenty to thirty percent) consist of larger-cap altcoins with clear utility, real user bases, and established development teams: Solana, Polygon, or Chainlink, depending on your conviction. Speculative positions (five to ten percent maximum) are higher-risk, higher-potential-reward smaller projects where total loss is genuinely possible.

The structure enforces two disciplines simultaneously. First, the most volatile and speculative assets are constrained to a portion of the portfolio where their full loss would not be catastrophic. Second, the core holdings provide a stable foundation that grows in line with broad crypto market appreciation without requiring active management.

Rebalancing periodically, perhaps quarterly or when a position grows to more than twice its target allocation, maintains the intended risk profile. Without rebalancing, winning positions grow to dominate the portfolio, increasing concentration risk precisely when market exposure is highest.`,
          "A three-tier portfolio framework allocates capital according to conviction and risk tolerance, preventing speculative positions from inadvertently dominating the portfolio.",
          "Write down your portfolio framework before the next bull market begins. Having a documented plan prevents the rationalization of abandoning it when prices are rising and everything seems like a good idea."
        )
      },
      {
        id: 'p1_s2',
        title: 'Dollar-Cost Averaging in Practice',
        content: wrapNote(
          `Dollar-cost averaging (DCA) is the practice of investing a fixed amount at regular intervals regardless of price. It is the most widely recommended approach for crypto investing and has strong theoretical and empirical support.

The mechanism is straightforward: investing fifty dollars weekly means you buy more units when the price is low and fewer units when the price is high. Over time, your average cost basis is lower than the time-weighted average price. You do not need to predict market movements to benefit.

The psychological benefit of DCA is equally important. By removing the decision of when to buy, DCA eliminates the anxiety of trying to time the market and the emotional weight of buying at what turns out to be a local peak. The discipline of consistent investment regardless of market sentiment is itself valuable.

Backtesting DCA on Bitcoin across various periods shows consistent outperformance of lump-sum investing for investors without the ability to reliably predict market direction. Lump-sum investing performs better when markets rise consistently, but DCA performs better during the volatile, sideways, and declining markets that characterize much of crypto history.

Platforms including Binance, Coinbase, and Kraken offer automated recurring purchases. Setting up a weekly or monthly purchase removes any ongoing decision-making requirement and ensures consistent execution.`,
          "DCA outperforms market timing for most investors by eliminating the emotion and error of discretionary entry decisions. Automation makes it frictionless.",
          "Calculate your average cost basis for any DCA strategy using a spreadsheet or the portfolio tracking features in most exchanges. Knowing your cost basis is essential for assessing actual performance and for tax reporting."
        )
      },
      {
        id: 'p1_s3',
        title: 'Risk Management and Position Sizing',
        content: wrapNote(
          `Risk management in a crypto portfolio operates at two levels: the allocation level (how much goes into crypto overall) and the position level (how much goes into any individual asset).

At the allocation level, the fundamental question is how much of your total net worth should be in crypto. Given the asset class's volatility (sixty to eighty percent peak-to-trough drawdowns in bear markets), a common recommendation is that no more than ten to twenty percent of investable assets should be in crypto for most investors, with higher percentages only appropriate for those with long time horizons, strong understanding of the space, and genuine ability to withstand large paper losses without being forced to sell.

At the position level, the one to three percent rule is a common guideline from professional trading: no single position should represent more than one to three percent of the total portfolio. For a crypto-specific portfolio, this might be applied within the speculative tier: no single speculative bet should represent more than two to three percent of total crypto holdings.

Stop-losses are less commonly used in longer-term crypto investing than in trading, but the principle of defining exit conditions before entry remains valid. Knowing in advance the circumstances under which you would sell a position, whether that is a specific price level, a fundamental change in the project, or a percentage drawdown, reduces the emotion involved in execution.`,
          "Risk management at both the allocation and position level prevents any single asset or market event from causing permanent, unrecoverable loss.",
          "Review your portfolio's correlation structure periodically. If most of your altcoins move ninety percent in correlation with Bitcoin during market downturns (which most do), your diversification is less effective than it appears."
        )
      },
      {
        id: 'p1_s4',
        title: 'Taking Profits Systematically',
        content: wrapNote(
          `One of the most common portfolio mistakes in crypto is failing to realize gains during bull markets, only to see those gains evaporate in the subsequent bear. Systematic profit-taking is the discipline that converts unrealized gains into real financial improvement.

A rules-based approach removes the emotional difficulty of selling assets that are still rising. One common framework is selling a fixed percentage (ten to twenty-five percent) of a position each time it doubles from your cost basis. This locks in real returns while retaining meaningful exposure to further appreciation.

Profit targets can also be tied to fundamental valuations or market cycle indicators. Some investors reduce exposure when Bitcoin's MVRV ratio exceeds three (historically associated with cycle tops) and increase it when MVRV falls below one (historically associated with cycle bottoms).

Where you direct profits matters as much as when you take them. Reinvesting entirely into other crypto assets replaces one exposure with another. Converting to stablecoins preserves purchasing power while keeping optionality to re-enter crypto. Converting to fiat and paying down debt or investing in other asset classes achieves genuine portfolio diversification.

Tax implications of profit-taking vary by jurisdiction. Short-term capital gains (on assets held less than one year in many tax regimes) are taxed at higher rates than long-term gains. Understanding your jurisdiction's rules before taking profits allows you to structure sales in a tax-efficient way.`,
          "Systematic profit-taking is what converts a bull market into lasting financial improvement. Define the rules in advance and apply them mechanically.",
          "Track your unrealized gains regularly. Many investors discover during bear markets that they held through gains that significantly exceeded their initial investment target. The time to act on this recognition is before the correction, not during it."
        )
      },
      {
        id: 'p1_s5',
        title: 'Crypto Tax Fundamentals',
        content: wrapNote(
          `Tax obligations from crypto investments are real, often misunderstood, and increasingly enforced. Understanding the basics protects you from unpleasant surprises.

In most jurisdictions, including the United States, the United Kingdom, and much of Europe, crypto is treated as property for tax purposes. This means every disposal event is a taxable event: selling crypto for fiat, trading one crypto for another, and using crypto to purchase goods or services all trigger capital gains or losses that must be reported.

The gain or loss is the difference between your cost basis (what you paid, including fees) and the proceeds at disposal. If you bought Bitcoin at twenty thousand dollars and sold at forty thousand dollars, you have a twenty thousand dollar capital gain.

The distinction between short-term and long-term gains matters significantly. In the US, assets held for more than one year qualify for lower long-term capital gains rates (zero, fifteen, or twenty percent depending on income). Assets held for less than one year are taxed as ordinary income (up to thirty-seven percent). This creates meaningful incentives for longer holding periods.

Record-keeping is the foundation of crypto tax compliance. You need the date and amount of every purchase, the cost basis, and the date and proceeds of every disposal. Exchanges provide transaction histories, but these become complex quickly if you trade frequently or use multiple platforms.

Tools like Koinly, CoinTracker, and TaxBit aggregate transaction data across exchanges and wallets, calculate gains and losses, and generate tax reports. Using them from the beginning is far simpler than trying to reconstruct history later.`,
          "Every crypto disposal is a taxable event in most jurisdictions. Starting systematic record-keeping immediately is the lowest-cost way to ensure compliance.",
          "Consult a tax professional familiar with crypto in your jurisdiction. The rules are jurisdiction-specific, frequently updated, and the cost of professional advice is typically far lower than the cost of non-compliance."
        )
      },
      {
        id: 'p1_s6',
        title: 'Diversification Within Crypto',
        content: wrapNote(
          `Diversification in crypto operates differently from traditional portfolio theory because most crypto assets are highly correlated with Bitcoin, particularly during market downturns. True diversification requires careful analysis of how assets actually behave, not just how many you hold.

During significant market downtrends, the correlation between Bitcoin and most altcoins approaches one. When Bitcoin falls thirty percent in a week, most altcoins fall fifty percent or more in the same period. Simply holding twenty different altcoins provides much less diversification than it appears.

Genuine diversification in a crypto-focused portfolio can be achieved in several ways. Holding Bitcoin and Ethereum as uncorrelated assets relative to each other (they diverge meaningfully in performance over multi-year periods). Allocating a portion to stablecoins (which do not appreciate but also do not decline, providing dry powder). Including assets from different blockchain categories (infrastructure, DeFi, gaming) which may respond differently to sector-specific news.

True diversification beyond crypto, through real estate, equities, bonds, or other asset classes, is the most effective approach for those with significant crypto exposure. The crypto allocation should be sized such that a total loss of the crypto portfolio would not fundamentally alter your financial situation.

Concentration in a few high-conviction assets is not inherently wrong. Warren Buffett and many successful investors argue against over-diversification for those with genuine knowledge of specific assets. The key is that concentration requires proportionally higher conviction and understanding.`,
          "Most crypto assets are highly correlated in downturns. Genuine diversification requires allocation across asset classes, not just across crypto tokens.",
          "When you feel most confident in adding more crypto exposure, use that as a trigger to review whether your overall financial position can genuinely absorb the worst-case scenario of a sustained bear market."
        )
      },
      {
        id: 'p1_s7',
        title: 'Evaluating Projects Before Investing',
        content: wrapNote(
          `A structured evaluation framework reduces the risk of investing in projects based on narrative rather than substance. Applying the same criteria consistently across projects builds a defensible, evidence-based portfolio.

Technology and differentiation: Does the project solve a real problem? What is its technical differentiation from existing solutions? Is the codebase open source and audited? A project whose technical case cannot be clearly explained in plain language likely lacks genuine differentiation.

Team and track record: Are the founders and developers publicly identified? What is their prior work in the space? Have they built and shipped before? Projects with anonymous teams should be held to a higher standard of evidence because there is no reputational accountability.

Adoption and usage: Does the project have real users conducting real transactions? What is the trend in daily active addresses, transaction volume, and TVL (for DeFi)? Metrics available from on-chain analytics should confirm the narrative, not just be provided by the project team.

Tokenomics: Who holds the supply, and what are the vesting schedules? Is the current market cap reasonable relative to comparable projects given the actual level of adoption? Is there a clear, credible reason for the token to accrue value?

Competitive landscape: Who are the competitors? Why would users choose this over the existing leader? Projects with genuine moats, such as network effects, protocol liquidity, or switching costs, are more defensible.`,
          "Evaluating projects through consistent criteria prevents narrative-driven investments. The most important signal is actual current usage, not projected future potential.",
          "Keep a written investment thesis for every significant position. It should be verifiable: what metrics would confirm or invalidate the thesis? Reviewing it quarterly against actual data builds analytical discipline."
        )
      },
      {
        id: 'p1_s8',
        title: 'Module Summary: Crypto Portfolio Strategy',
        content: wrapNote(
          `Portfolio strategy is what separates investors from speculators. The practices covered in this module are not complicated, but they require consistent application rather than occasional use when convenient.

A three-tier framework (core/strategic/speculative) provides a structure for allocating capital by conviction and risk tolerance. DCA provides a systematic entry mechanism that outperforms most timing attempts. Risk management at allocation and position levels prevents catastrophic loss. Systematic profit-taking converts bull market gains into permanent financial improvement. Tax awareness prevents compliance issues that erode returns.

Diversification in crypto is more limited than it appears, because most assets correlate heavily with Bitcoin in downturns. True diversification requires position across asset classes, not just across crypto tokens.

Project evaluation should be consistent, evidence-based, and verifiable: technology, team, adoption, tokenomics, and competitive position are the core dimensions.

The most valuable quality for a long-term crypto investor is not analytical sophistication but behavioral discipline: the ability to follow a defined plan during the market conditions specifically designed to make you abandon it.`,
          "Behavioral discipline applied to a well-designed framework produces better outcomes than analytical sophistication applied inconsistently.",
          "Review this module's framework at the beginning of each calendar quarter. Ask yourself which elements you have applied consistently, which you have drifted from, and what one adjustment would have the largest positive impact on your portfolio."
        )
      },
    ]
  },

  // ── MODULE 10: ADVANCED DEFI AND ON-CHAIN ANALYSIS (PRO) ─────────────────
  {
    id: 'p2',
    title: 'Advanced DeFi and On-Chain Analysis',
    description: 'On-chain metrics, protocol research, liquidation dynamics, and governance.',
    difficulty: Difficulty.PRO,
    category: 'Advanced DeFi',
    estimatedMinutes: 22,
    rewardTokens: 10,
    subtopics: [
      {
        id: 'p2_s1',
        title: 'Key On-Chain Metrics',
        content: wrapNote(
          `On-chain analysis uses data recorded directly on a blockchain to assess market conditions, investor behavior, and network health. Unlike price data, which reflects market activity, on-chain data reflects actual asset movements and usage.

The MVRV ratio (Market Value to Realized Value) is one of the most powerful cycle indicators for Bitcoin. Realized Value is calculated by pricing each unspent Bitcoin at the price it was last moved, rather than the current market price. This provides an estimate of the aggregate cost basis of all holders. MVRV above three has historically signaled overvaluation near cycle peaks. MVRV below one has historically signaled undervaluation near cycle bottoms.

SOPR (Spent Output Profit Ratio) measures whether coins being transferred are at a gain or loss relative to when they last moved. A persistently below-one SOPR during a downtrend indicates holders are capitulating and selling at a loss, which has historically coincided with cycle bottoms.

Exchange flows measure the net movement of coins to and from exchange wallets. Large net inflows to exchanges suggest holders are preparing to sell. Large net outflows suggest accumulation into self-custody, which is broadly bullish.

NVT (Network Value to Transactions) compares market cap to on-chain transaction volume, analogous to a P/E ratio for the network. High NVT suggests the network is overvalued relative to its current usage. Low NVT suggests undervaluation.`,
          "MVRV, SOPR, and exchange flows are the three on-chain metrics with the strongest historical signal for identifying cycle extremes.",
          "Glassnode Studio (glassnode.com) provides the most comprehensive on-chain analytics platform. Many critical metrics are accessible free of charge. The weekly Glassnode Insights newsletter summarizes the most important readings with professional interpretation."
        )
      },
      {
        id: 'p2_s2',
        title: 'Whale Watching and Wallet Analysis',
        content: wrapNote(
          `Large wallet movements, colloquially called whale activity, often precede significant market moves because large holders transacting at scale inevitably move prices. Tracking these wallets provides a supplementary signal layer.

Blockchain explorers allow anyone to monitor specific wallet addresses in real time. When a wallet known to belong to an exchange, a major fund, or an early project investor moves significant funds, that information is public immediately.

Several services aggregate and interpret whale wallet activity. Whale Alert (whale-alert.io) provides real-time alerts for large transactions across multiple chains. Nansen (nansen.ai) labels wallets with on-chain behavior tags such as "smart money" (wallets with strong historical returns), exchange wallets, and early-stage investors. Arkham Intelligence provides similar wallet intelligence with more sophisticated clustering tools.

The interpretation of large wallet movements requires context. A large transfer from an exchange to a private wallet can indicate accumulation (an institution taking custody of newly purchased crypto). A transfer from a private wallet to an exchange can indicate preparation to sell. Transfers between unknown wallets may be internal reorganization with no market implication.

Over-reliance on whale watching creates a risk of false signals and second-guessing. It is most useful as a confirmation tool when combined with other indicators, not as a standalone trading signal.`,
          "On-chain wallet tracking provides public insight into large-holder behavior. It is most useful as a confirming signal rather than a primary decision driver.",
          "Use Etherscan's wallet labeling features and Nansen's free tier to identify the counterparties in large on-chain transactions. Context about who moved what matters as much as the raw numbers."
        )
      },
      {
        id: 'p2_s3',
        title: 'Advanced Yield Strategies',
        content: wrapNote(
          `Beyond simple lending, advanced DeFi participants deploy more complex strategies to optimize yield. Understanding these approaches, and their associated risks, provides a clearer picture of where DeFi yield actually comes from.

Leveraged yield farming involves borrowing assets to deploy as additional liquidity in yield-generating positions, amplifying both returns and risk. For example, depositing ETH as collateral, borrowing USDC, and deploying both into a Curve pool generates yield on a larger capital base than the initial ETH alone. If ETH's price drops enough to trigger liquidation of the borrowed position, the amplified losses can exceed the yield earned.

Delta-neutral strategies aim to generate yield without directional price exposure. By simultaneously holding a long spot position and a short perpetual futures position of equal size, a trader captures funding rate income (paid by longs to shorts in perpetual markets when the funding rate is positive) while being insulated from price direction. This has historically generated four to twenty percent annually during bull markets when funding rates are positive.

Liquidity provision on concentrated AMMs (like Uniswap v3) requires active management. Rather than providing liquidity across all prices, you specify a price range within which your liquidity is active. Capital efficiency within the range is dramatically higher, but if price exits the range, your position earns no fees and is fully converted to the weaker-performing asset.

Vault strategies, offered by protocols like Yearn Finance and Beefy Finance, automate complex yield strategies. They compound returns automatically and often implement sophisticated strategies on behalf of depositors.`,
          "Advanced yield strategies offer higher potential returns at the cost of complexity, active management requirements, and layered risks from leverage and price range exposure.",
          "Before deploying any leveraged yield strategy, model the liquidation price carefully and add a significant buffer. Market conditions can move faster than you expect, and the cost of being caught short of collateral is the permanent loss of the position."
        )
      },
      {
        id: 'p2_s4',
        title: 'Protocol Research Framework',
        content: wrapNote(
          `Serious DeFi participation requires the ability to evaluate protocols at a level beyond surface metrics. A structured research framework makes this systematic.

Start with the protocol's documentation. A well-documented protocol demonstrates that the team understands their own system well enough to explain it clearly, reduces the risk of undiscovered complexity, and allows independent verification of claimed mechanics.

Audit history is essential. Check for audits by reputable firms (Trail of Bits, OpenZeppelin, Certik, Chainalysis) and read the findings. Look at how many issues were identified, how many were critical or high severity, and whether they were resolved. An audit with ten medium-severity issues all resolved is meaningfully different from one with two unresolved critical findings.

Protocol revenue and sustainability: does the protocol generate real fee revenue from users independent of token incentives? A protocol earning ten million dollars annually in trading fees has a fundamentally different revenue model from one distributing ten million dollars in token emissions with minimal actual usage.

Governance structure: how are protocol changes made? Who controls the admin keys? Can a single entity change fees, upgrade contracts, or pause the protocol unilaterally? A protocol where three multisig holders can drain the treasury without governance approval presents meaningfully higher risk than one requiring a week-long timelock after community voting.

Competitive moat: what prevents a competitor from forking the protocol and taking its users? Liquidity depth (Uniswap), credit scores (Aave), and user trust built over years are genuine moats. Low switching costs and easily replicated mechanics are not.`,
          "Rigorous protocol research focuses on documentation, audit quality, genuine revenue, governance safeguards, and competitive positioning rather than price performance or team promises.",
          "DeFiLlama's protocol pages provide revenue data, TVL history, audit links, and competitor comparisons in a single view. Making this your starting point for protocol research saves significant time."
        )
      },
      {
        id: 'p2_s5',
        title: 'Liquidation Dynamics in DeFi',
        content: wrapNote(
          `Liquidations are a fundamental mechanism in DeFi lending that maintains solvency but can create dangerous cascades during market stress. Understanding how they work helps both borrowers protect themselves and observers interpret market events.

When a borrower's collateral value drops below the protocol's liquidation threshold, their position becomes eligible for liquidation. Any participant (called a liquidator) can repay a portion of the debt and receive the collateral at a discount (the liquidation bonus, typically five to ten percent). This creates a competitive race to liquidate underwater positions, run by automated bots monitoring thousands of positions simultaneously.

In normal market conditions, liquidations are orderly. The liquidation bonus is attractive enough that liquidators act quickly, maintaining protocol solvency without unnecessary collateral sold at depressed prices.

In severe market conditions (rapid forty to fifty percent price drops in hours), cascades can form. Mass liquidations increase selling pressure, which drives prices lower, which triggers more liquidations. The March 2020 COVID crash and the May 2021 correction both caused significant cascade events on Aave and Compound.

For borrowers, the practical implications are clear. Maintain health factors well above one (Aave recommends above 1.5 for most positions). Avoid leveraging on volatile assets during periods of elevated market stress. Set monitoring alerts for your collateral ratio using the lending protocol's own notifications or third-party tools like DeFi Saver.

For observers, unusually high on-chain liquidation volumes are a real-time indicator of market stress and potential cascade risk.`,
          "Cascade liquidations amplify market downturns in DeFi. Maintaining sufficient collateral buffers and monitoring health factors actively are the primary protections.",
          "DeFi Saver (defisaver.com) provides automated position management for Aave and Compound, including automated collateral top-ups and profit-taking. For active borrowing positions, its automation features provide meaningful protection against cascade liquidation."
        )
      },
      {
        id: 'p2_s6',
        title: 'MEV: Miner Extractable Value',
        content: wrapNote(
          `Miner Extractable Value (MEV), also called Maximal Extractable Value, refers to the profit that block producers (miners or validators) can earn by manipulating the order or content of transactions within the blocks they produce.

The most common MEV strategies are sandwich attacks, front-running, and arbitrage. A sandwich attack targets a large pending swap transaction: the attacker places a buy order before the victim's transaction (driving the price up) and a sell order after (profiting from the inflated price the victim paid). The victim effectively subsidizes the attacker's profit.

Front-running uses the visibility of the mempool (pending transactions) to act on others' information: seeing a large buy order pending, a bot submits its own buy first at a higher gas price, executes before the victim, and sells into the victim's price impact.

Arbitrage MEV is more benign: searchers monitor for price discrepancies between DEXs and submit atomic transactions to capture the difference, which keeps prices aligned across markets.

MEV has extracted billions of dollars from DeFi users. Flashbots and similar MEV-aware infrastructure has partially addressed the most extractive forms by moving the MEV process off the public mempool into private relays, reducing the harmful effects of chaotic front-running while maintaining the economically productive arbitrage.

For users, practical mitigations include using MEV-protected RPCs (Flashbots Protect, MEV Blocker), trading during low-traffic periods, and using protocols with MEV-resistant designs.`,
          "MEV is an inherent feature of transparent blockchains with open mempools. Understanding it helps users take steps to reduce unnecessary extraction from their transactions.",
          "Use a MEV-protected RPC endpoint for your MetaMask or wallet: Flashbots Protect (rpc.flashbots.net) routes transactions through a private relay, protecting against sandwich attacks while retaining normal functionality."
        )
      },
      {
        id: 'p2_s7',
        title: 'On-Chain Governance Participation',
        content: wrapNote(
          `Governance tokens grant holders the right to participate in protocol decision-making. For significant token holders, active governance participation represents both a responsibility and a way to protect and improve the value of their holdings.

Governance processes vary by protocol. Most use an off-chain signaling vote (on Snapshot.org, which is free and gasless) followed by an on-chain execution vote through a timelock contract. The timelock introduces a delay (typically 24 to 72 hours) between a vote passing and its execution, giving holders time to exit if they disagree with the outcome.

Key governance decisions include fee structures (how much the protocol charges and who receives it), treasury deployments (how protocol-owned funds are allocated), risk parameters (collateral factors, liquidation thresholds), protocol upgrades, and asset listings.

Informed governance participation requires understanding the protocol deeply enough to evaluate proposals on their technical and economic merits rather than following large holder votes blindly. Reading the governance forum discussions and the reasoning behind proposals is as important as the vote itself.

Many token holders delegate their votes to active governance participants who have demonstrated informed, aligned decision-making. Delegation without engagement still contributes to protocol governance, and most protocols make delegation straightforward through their governance interface.`,
          "Active governance participation in protocols you hold gives you direct influence over their development. Even delegating votes contributes to better protocol governance.",
          "Tally.xyz and Boardroom.info aggregate governance activity across major protocols, making it straightforward to review recent proposals and voting history without visiting each protocol's separate governance interface."
        )
      },
      {
        id: 'p2_s8',
        title: 'Module Summary: Advanced DeFi and On-Chain Analysis',
        content: wrapNote(
          `Advanced DeFi participation is characterized by depth of protocol understanding, active risk management, and systematic on-chain analysis rather than passive participation or narrative following.

On-chain metrics (MVRV, SOPR, exchange flows) provide a fundamentals layer for Bitcoin market cycle analysis that price data alone cannot. Wallet analysis adds behavioral intelligence about large holder activity.

Advanced yield strategies amplify returns and risk simultaneously. Understanding the precise mechanics of each strategy, including its specific risk factors and failure modes, is the prerequisite for deploying capital.

Protocol research requires evaluating documentation, audit history, genuine revenue, governance safeguards, and competitive moat. The most defensible protocols have multiple overlapping moats and long track records.

Liquidation dynamics create cascade risks in leveraged lending. Maintaining adequate collateral buffers and monitoring positions actively are the primary protections. MEV is an inherent feature of transparent blockchains, and practical mitigations exist for the most extractive forms.

Active governance participation gives token holders direct influence over protocol development. The governance process, when functioning well, is one of DeFi's genuinely novel contributions to organizational design.

The trajectory from beginner to advanced DeFi participant is a journey of progressive depth: first understanding the mechanics, then building familiarity through small-scale participation, then applying structured analysis to larger and more sophisticated positions.`,
          "Advanced DeFi mastery is built on protocol depth, analytical rigor, and disciplined risk management applied consistently over time.",
          "The highest-quality ongoing education for advanced DeFi comes from reading protocol governance forums, following technical researchers (Hasu, Tarun Chitra, Dan Robinson), and tracking Messari Research for structured protocol analysis."
        )
      },
    ]
  },

];

// ─────────────────────────────────────────────────────────────────────────────
// SUPPORTING DATA
// ─────────────────────────────────────────────────────────────────────────────

export const DID_YOU_KNOW_FACTS: DidYouKnow[] = [
  { id: 'dyk1', fact: "Bitcoin's smallest unit is called a Satoshi. 1 BTC = 100,000,000 Satoshis, so you can own Bitcoin for less than one dollar.", rarity: 'common' },
  { id: 'dyk2', fact: "The first real-world Bitcoin purchase was 10,000 BTC for two pizzas in 2010. At 2024 prices, those pizzas would be worth over $600 million.", rarity: 'rare' },
  { id: 'dyk3', fact: "Nigeria, Kenya, and South Africa consistently rank in the global top 10 for crypto adoption, driven by remittances, inflation hedging, and a young tech-savvy population.", rarity: 'common' },
  { id: 'dyk4', fact: "Africans in the diaspora send over $48 billion home each year. Crypto rails can reduce the average 8.5% transfer fee to under 1%, saving billions annually.", rarity: 'rare' },
  { id: 'dyk5', fact: "There will only ever be 21 million Bitcoin. As of 2024, over 19.5 million have already been mined. Roughly 4 million are estimated to be permanently lost.", rarity: 'legendary' },
  { id: 'dyk6', fact: "The Celo blockchain was specifically designed for mobile-first crypto in emerging markets. Its stablecoin cUSD can be sent to a phone number without a wallet address.", rarity: 'rare' },
  { id: 'dyk7', fact: "Ethereum processes more value daily than Bitcoin in many periods, primarily because of DeFi and stablecoin activity built on its smart contract layer.", rarity: 'common' },
  { id: 'dyk8', fact: "The total value locked (TVL) in DeFi protocols peaked above $180 billion in November 2021. It declined significantly in 2022 and has been rebuilding with a more sustainable base.", rarity: 'rare' },
];

export const KEYWORD_RESOURCES: Record<string, string> = {
  'NFTs': 'https://ethereum.org/en/nft/',
  'DAOs': 'https://ethereum.org/en/dao/',
  'Layer 2 Scaling Solutions': 'https://ethereum.org/en/layer-2/',
  'Proof-of-Stake': 'https://ethereum.org/en/developers/docs/consensus-mechanisms/pos/',
  'Proof-of-Work': 'https://ethereum.org/en/developers/docs/consensus-mechanisms/pow/',
  'DeFi': 'https://ethereum.org/en/defi/',
  'smart contracts': 'https://ethereum.org/en/smart-contracts/',
  'stablecoins': 'https://ethereum.org/en/stablecoins/',
  'dollar-cost averaging': 'https://www.investopedia.com/terms/d/dollarcostaveraging.asp',
  'seed phrase': 'https://ethereum.org/en/glossary/#hd-wallet-seed',
  'MVRV': 'https://glassnode.com/',
  'impermanent loss': 'https://ethereum.org/en/defi/',
  'rollups': 'https://ethereum.org/en/layer-2/',
  'MEV': 'https://ethereum.org/en/developers/docs/mev/',
};

export const MASTERY_TIMELINE = [
  { week: 1,  phase: 'Foundations',           focus: 'What crypto is, Bitcoin, wallets, and blockchain basics' },
  { week: 2,  phase: 'Security',              focus: 'Seed phrases, hardware wallets, scam patterns, exchange security' },
  { week: 3,  phase: 'DeFi Entry',            focus: 'Buying safely, AMMs, lending and borrowing, stablecoins' },
  { week: 4,  phase: 'Markets',               focus: 'Candlestick reading, support/resistance, volume analysis' },
  { week: 5,  phase: 'Market Dynamics',       focus: 'Tokenomics, halving cycles, bull and bear market behavior' },
  { week: 6,  phase: 'Indicators',            focus: 'Moving averages, RSI, MACD, chart patterns' },
  { week: 7,  phase: 'Web3',                  focus: 'Web3 architecture, NFTs, smart contracts, DAOs' },
  { week: 8,  phase: 'Scaling',               focus: 'Layer 2 networks, rollups, bridges, Ethereum roadmap' },
  { week: 9,  phase: 'Portfolio Strategy',    focus: 'Risk management, DCA, profit-taking, tax fundamentals' },
  { week: 10, phase: 'Advanced DeFi',         focus: 'On-chain analysis, protocol research, MEV, governance' },
];

export const LANGUAGES = [
  { code: Language.EN, name: 'English', flag: '🇬🇧' },
  { code: Language.ES, name: 'Español', flag: '🇪🇸' },
  { code: Language.FR, name: 'Français', flag: '🇫🇷' },
  { code: Language.ZH, name: '中文', flag: '🇨🇳' },
];
