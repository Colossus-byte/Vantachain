
import { Topic, Difficulty, DidYouKnow, Achievement, Language, Guild, Proposal, Peer } from './types';

export const LANGUAGES = [
  { code: Language.EN, name: 'English', flag: '🇺🇸' },
  { code: Language.ES, name: 'Español', flag: '🇪🇸' },
  { code: Language.FR, name: 'Français', flag: '🇫🇷' },
  { code: Language.ZH, name: '中文', flag: '🇨🇳' },
];

export const DEFAULT_AVATARS = [
  "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=Felix",
  "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=Buddy",
  "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=Midnight",
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
  [Guild.ARCHITECTS]: { name: 'Clarix Architects', color: 'indigo', icon: 'fa-compass-drafting', desc: 'Builders of the new world. Master of Solidity and modular stacks.' },
  [Guild.LIQUIDATORS]: { name: 'Clarix Liquidators', color: 'emerald', icon: 'fa-chart-mixed', desc: 'Masters of capital efficiency. Specialists in AMMs and rebase mechanics.' },
  [Guild.NONE]: { name: 'Independent', color: 'slate', icon: 'fa-user', desc: 'Unallied node.' }
};

export const UI_TRANSLATIONS: Record<Language, any> = {
  [Language.EN]: {
    academy: 'Knowledge Atlas',
    certification: 'Clarix Credentials',
    institutional: 'Protocol Org',
    guilds: 'Guild Network',
    peers: 'P2P Nexus',
    governance: 'Governance DAO',
    profile: 'Identity Core',
    scan_modules: 'SCANNING CLARIX-NODES...',
    knowledge_sync: 'Cognitive Sync',
    intel_logs: 'Mempool Intel',
    collectibles: 'Artifacts',
    access_level: 'Protocol Access Tier',
    genesis_pool: 'Genesis Pool',
    active: 'ONLINE',
    mainnet_sync: 'Chain Sinc',
    allocation: 'STAKING',
    next_node: 'SYNC NEXT NODE',
    final_validation: 'INIT FINAL PROOF',
    generating_block: 'FORGING BLOCK...',
    search_restricted: 'Search restricted to Clarix Context',
    level: 'RANK',
  },
  [Language.ES]: {
    academy: 'Atlas de Conocimiento',
    certification: 'Credenciales Clarix',
    institutional: 'Org del Protocolo',
    guilds: 'Red de Gremios',
    peers: 'Nexus P2P',
    governance: 'DAO de Gobernanza',
    profile: 'Núcleo de Identidad',
    scan_modules: 'ESCANEO DE NODOS...',
    knowledge_sync: 'Sinc Cognitiva',
    intel_logs: 'Intel de Mempool',
    collectibles: 'Artefactos',
    access_level: 'Nivel de Acceso',
    genesis_pool: 'Bassin Génesis',
    active: 'EN LÍNEA',
    mainnet_sync: 'Sinc Mainnet',
    allocation: 'STAKING',
    next_node: 'SINC SIGUIENTE NODO',
    final_validation: 'INIT PRUEBA FINAL',
    generating_block: 'FORJANDO BLOQUE...',
    search_restricted: 'Búsqueda restringida al contexto Clarix',
    level: 'RANGO',
  },
  [Language.FR]: {
    academy: 'Atlas de Connaissance',
    certification: 'Certificats Clarix',
    institutional: 'Org du Protocole',
    guilds: 'Réseau de Guildes',
    peers: 'Nexus P2P',
    governance: 'DAO de Gouvernance',
    profile: 'Cœur d\'Identité',
    scan_modules: 'SCAN DES NŒUDS CLARIX...',
    knowledge_sync: 'Sync Cognitive',
    intel_logs: 'Intel Mempool',
    collectibles: 'Artéfacts',
    access_level: 'Niveau d\'Accès',
    genesis_pool: 'Bassin Genèse',
    active: 'EN LIGNE',
    mainnet_sync: 'Sinc Mainnet',
    allocation: 'STAKING',
    next_node: 'SYNC NŒUD SUIVANT',
    final_validation: 'INIT PREUVE FINALE',
    generating_block: 'FORGE DU BLOC...',
    search_restricted: 'Recherche restreinte au contexte Clarix',
    level: 'RANG',
  },
  [Language.ZH]: {
    academy: '知识地图',
    certification: 'Clarix 凭证',
    institutional: '协议组织',
    guilds: '公会网络',
    peers: 'P2P 枢纽',
    governance: '治理 DAO',
    profile: '身份核心',
    scan_modules: '正在扫描 CLARIX 节点...',
    knowledge_sync: '认知同步',
    intel_logs: '内存池情报',
    collectibles: '文物',
    access_level: '协议访问层级',
    genesis_pool: '创世池',
    active: '在线',
    mainnet_sync: '主网同步',
    allocation: '质押',
    next_node: '同步下一个节点',
    final_validation: '初始化最终证明',
    generating_block: '正在铸造区块...',
    search_restricted: '搜索仅限于 Clarix 环境',
    level: '等级',
  },
};

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'genesis', title: 'First Step', description: 'Completed your first lesson on Clarix.', icon: 'fa-seedling', rarity: 'common' },
  { id: 'auditor', title: 'Scam Shield', description: 'Completed the How to Spot Crypto Scams lesson.', icon: 'fa-shield-halved', rarity: 'rare' },
  { id: 'math_wizard', title: 'Chart Reader', description: 'Completed the Reading Crypto Charts lesson.', icon: 'fa-chart-line', rarity: 'rare' },
  { id: 'mev_master', title: 'DeFi Explorer', description: 'Completed DeFi Basics — Earning Yield.', icon: 'fa-coins', rarity: 'epic' },
  { id: 'whale', title: 'Africa Investor', description: 'Completed the full Knowledge Atlas curriculum.', icon: 'fa-globe-africa', rarity: 'legendary' },
];

const wrapNote = (content: string, takeaway: string, tip: string) =>
  `${content}\n\n💡 **Key Takeaway**\n${takeaway}\n\n🛡️ **Pro Tip**\n${tip}`;

export const TOPICS: Topic[] = [
  // ── LEVEL 1: BASIC ─────────────────────────────────────────────────────────
  {
    id: 'b1',
    title: 'Getting Started with Crypto',
    description: 'What crypto is, why Africa needs it, and how to keep your coins safe.',
    difficulty: Difficulty.BASIC,
    category: 'Foundations',
    estimatedMinutes: 12,
    rewardTokens: 100,
    subtopics: [
      {
        id: 'b1_s1',
        title: 'What Is Crypto and Why It Matters in Africa',
        content: wrapNote(
          `Cryptocurrency is digital money that lives on the internet — no bank, no government, no middleman. Think of it like M-Pesa, but nobody owns the network. Anyone with a smartphone can send and receive value anywhere in the world, usually within minutes, for a fraction of the cost.

Why does this matter in Africa specifically? Consider remittances. Africans in the diaspora send over $48 billion home every year, but traditional services like Western Union or MoneyGram take between 8 and 12% in fees. With crypto, you can send money from London to Nairobi or from the US to Lagos and the fee is often less than $1 — arriving in minutes instead of days.

Then there's currency instability. When the Nigerian naira lost over 40% of its value in 2023, Nigerians who held even a small amount of Bitcoin or USDT (a dollar-pegged stablecoin) protected their savings. The same story played out in Zimbabwe, Ghana, and Ethiopia. Crypto gives ordinary people access to a store of value that their governments cannot inflate away.

There is also the financial inclusion angle. Over 60% of adults in Sub-Saharan Africa are unbanked — they have no savings account, no credit, no access to international payments. Crypto only requires a smartphone and internet. In 2023, Nigeria, Kenya, and South Africa were all in the global top 10 for crypto adoption, not because Africans are speculators, but because they have real-world reasons to use it.`,
          "Crypto is not just an investment — for many Africans it is a practical financial tool for cheaper remittances, savings protection, and access to global markets.",
          "Start by following credible African crypto communities like Crypto Mzigo (Kenya), Quidax Blog (Nigeria), or the Binance Africa Twitter account to stay informed without the noise."
        )
      },
      {
        id: 'b1_s2',
        title: 'How Bitcoin and Blockchain Work (Plain English)',
        content: wrapNote(
          `Imagine a notebook that thousands of people around the world have an identical copy of. Every time someone sends Bitcoin, that transaction is written into the notebook. Once written, it cannot be erased or changed — everyone would notice. That notebook is called the blockchain.

Bitcoin was the first cryptocurrency, created in 2009 by an anonymous person or group called Satoshi Nakamoto. Nobody owns Bitcoin. There is no Bitcoin headquarters. The rules are written in open-source code that anyone can read. The total supply is capped at 21 million coins — ever. That scarcity is why many people compare it to gold.

When you send Bitcoin, your transaction is broadcast to thousands of computers (called nodes) around the world. Miners bundle transactions into blocks and compete to add the next block by solving a mathematical puzzle. The winner gets rewarded with new Bitcoin. This process is called Proof of Work. It is intentionally energy-intensive — that cost is what makes the network secure.

You do not need to understand all of this to use Bitcoin, just like you do not need to understand TCP/IP to send an email. But knowing the basics helps you understand why Bitcoin is valuable: it is the first money in history that is provably scarce, publicly auditable, and controlled by no single party.`,
          "Bitcoin is a fixed-supply digital asset secured by thousands of computers worldwide. No one can print more of it or freeze your account.",
          "Do not confuse Bitcoin (BTC) with Bitcoin Cash (BCH) or Bitcoin SV (BSV) — these are separate coins created by community disagreements. The original is always referred to as BTC."
        )
      },
      {
        id: 'b1_s3',
        title: 'Wallets — Your Crypto Bank Account',
        content: wrapNote(
          `A crypto wallet does not actually store your coins — the coins live on the blockchain. What a wallet stores is your private key: a secret password that proves ownership and lets you authorize transactions. Lose your private key, lose your crypto. Share your private key, and someone can steal everything.

There are two main types of wallets. A custodial wallet is managed by an exchange like Binance or Coinbase. They hold your keys on your behalf — convenient, but they can freeze your account or get hacked. Think of it like a bank. A self-custody wallet like MetaMask, Trust Wallet, or a hardware wallet (Ledger, Trezor) puts you in full control. Your keys, your coins.

Every self-custody wallet gives you a seed phrase — 12 or 24 random words in a specific order. This phrase IS your wallet. It can restore access on any device. Write it down on paper. Store that paper somewhere safe — not on your phone, not in a screenshot, not in a Google Doc. Anyone who gets those words gets your money.

For most beginners in Africa, a reputable exchange (Binance, Yellow Card, or Quidax) is a reasonable starting point because of the simpler interface and local payment options. But as your holdings grow, moving to self-custody becomes increasingly important.`,
          "Your seed phrase is the master key to your crypto. Protect it like cash — because it is.",
          "Never store your seed phrase digitally. Screenshots, WhatsApp messages, and cloud notes are all vulnerable. Write it on paper and store it in a physically secure location."
        )
      }
    ]
  },

  // ── LEVEL 2: FUNDAMENTAL ───────────────────────────────────────────────────
  {
    id: 'f1',
    title: 'Your First Steps',
    description: 'Buy crypto safely, avoid scams, and start reading market data.',
    difficulty: Difficulty.FUNDAMENTAL,
    category: 'Practical Skills',
    estimatedMinutes: 15,
    rewardTokens: 250,
    subtopics: [
      {
        id: 'f1_s1',
        title: 'How to Buy Your First Crypto Safely',
        content: wrapNote(
          `Buying crypto for the first time can feel intimidating, but the process is straightforward once you know what to look for. The most important decision is choosing where to buy — your exchange.

For African users, reputable options include Binance (the world's largest exchange, with M-Pesa and bank transfer support in many African countries), Yellow Card (built specifically for Africa, available in 20+ countries), and Quidax (strong in Nigeria, Ghana, and Kenya). For peer-to-peer (P2P) trading — where you buy directly from another person — Noones (formerly Paxful) and the P2P section on Binance are widely used.

After choosing an exchange, you will need to complete KYC (Know Your Customer) — uploading a national ID or passport and sometimes a selfie. This is standard practice and required by law. It typically takes a few hours to a day. Once verified, you can deposit local currency via bank transfer, mobile money, or card and purchase crypto.

Start small — there is no minimum. You can buy $10 worth of Bitcoin or USDT to get comfortable before committing larger amounts. Dollar-cost averaging (DCA) is a strategy where you invest a fixed amount regularly — say, KES 1,000 every week — regardless of price. This removes the pressure of trying to buy at exactly the right time.

One golden rule: only invest what you can afford to lose. Crypto is volatile. Bitcoin has dropped 80% from its all-time high more than once. Those who kept investing through the dips have historically been rewarded — but that requires not needing the money back urgently.`,
          "Choose a regulated, Africa-friendly exchange, complete KYC, start small, and invest consistently rather than trying to time the market.",
          "Before depositing on any exchange, verify the website URL manually. Phishing sites copy the look of legitimate exchanges. Bookmark the real URL once you find it."
        )
      },
      {
        id: 'f1_s2',
        title: 'How to Spot and Avoid Crypto Scams',
        content: wrapNote(
          `Africa has seen explosive crypto adoption — and unfortunately, an equally explosive rise in crypto scams. Understanding the patterns can save you everything.

The most common scam is the investment scheme. You see a WhatsApp message or Instagram post from someone promising 50% weekly returns on crypto investments. They show screenshots of big profits. Real crypto does not work this way. No legitimate investment guarantees any return, let alone 50% per week. These are Ponzi schemes — they pay early investors with money from new investors until it collapses.

Romance scams (sometimes called "pig butchering") are growing rapidly. Someone contacts you online, builds a relationship over weeks or months, then introduces you to a "special crypto investment platform" — usually a fake site they control. You deposit, see fake gains, try to withdraw, and suddenly there are "taxes" or "fees" required before you can get your money. The platform disappears.

Rug pulls happen in new tokens and NFT projects. Developers create a new coin, generate hype, attract investors, and then sell all their holdings at once — crashing the price to zero and walking away with the money.

Other red flags: anyone who asks for your seed phrase (legitimate services never will), unsolicited "tech support" who want remote access to your device, and celebrity endorsements for coins you have never heard of. In 2023, fake Elon Musk and Dangote crypto promotions tricked thousands of Africans.

If someone contacts you about crypto and you did not ask them to — stop, pause, and verify independently before doing anything.`,
          "Guaranteed returns in crypto do not exist. Anyone promising them is running a scam.",
          "Use the website ScamAdviser or Google the project name plus the word 'scam' before investing in anything new. A two-minute search has saved many people from losing their savings."
        )
      },
      {
        id: 'f1_s3',
        title: 'Reading Crypto Charts Without Any Experience',
        content: wrapNote(
          `You do not need to be a finance professional to read a crypto chart. A few basic concepts will help you understand what the market is doing without getting overwhelmed.

The most common chart type is the candlestick chart. Each candle represents a time period — one day, one hour, one minute. A green candle means the price went up during that period. A red candle means it went down. The body of the candle shows the opening and closing price; the thin lines (wicks) show the highest and lowest price reached.

Market cap is more important than price. Bitcoin at $60,000 per coin sounds expensive, but a small coin priced at $0.001 could still be worth less than $1 million total. Market cap = price × total coins in circulation. Always look at market cap, not just price, when comparing assets.

Support and resistance are levels where the price has historically bounced or struggled. Support is a price floor where buyers tend to step in. Resistance is a ceiling where sellers tend to appear. These are not magic — they just reflect human psychology about fair value.

Volume tells you how much crypto changed hands. High volume during a price rise means the move is likely genuine. High volume during a fall means strong selling pressure. Low volume moves are often less reliable. CoinGecko and CoinMarketCap are free tools that show price history, market cap, volume, and basic chart data for every major crypto.`,
          "Focus on market cap, volume, and trend direction. You do not need complex indicators to make informed decisions.",
          "Zoom out before you zoom in. Looking at a 7-day or 30-day chart gives you far more context than a 1-hour chart, especially when you are learning."
        )
      }
    ]
  },

  // ── LEVEL 3: MID ──────────────────────────────────────────────────────────
  {
    id: 'm1',
    title: 'Going Deeper',
    description: 'Stablecoins, DeFi yield, and understanding the broader crypto market.',
    difficulty: Difficulty.MID,
    category: 'Intermediate Concepts',
    estimatedMinutes: 18,
    rewardTokens: 500,
    subtopics: [
      {
        id: 'm1_s1',
        title: 'Stablecoins — Your Digital Dollar Account',
        content: wrapNote(
          `One of the most practical uses of crypto for Africans is not Bitcoin speculation — it is stablecoins. A stablecoin is a cryptocurrency whose value is pegged to a stable asset, most commonly the US dollar.

USDT (Tether) and USDC (USD Coin) are the two largest. One USDT is always worth approximately $1. You can hold USDT in a self-custody wallet with no bank account, no minimum balance, and no one who can freeze it. For Nigerians watching the naira depreciate, or Ghanaians dealing with cedi volatility, holding savings in USDT has been a practical hedge.

Stablecoins are also transforming remittances. Instead of paying 10% to send money from the UK to your family in Uganda, you can send USDT directly to a mobile wallet. Services like Kotani Pay in Kenya allow recipients to convert USDT to M-Pesa cash. The total fee can be under 1%.

There are different types of stablecoins. Centralized stablecoins like USDT and USDC are backed by reserves (dollars, bonds) held by a company. If that company fails or gets regulated, the peg could break. Decentralized stablecoins like DAI are governed by smart contracts and crypto collateral. In 2022, the algorithmic stablecoin UST (Terra Luna) collapsed spectacularly, wiping out billions — a reminder that not all stablecoins are equal.

For practical use, stick to USDC (issued by Circle, a US-regulated company) or USDT on well-established networks like Ethereum or BNB Chain.`,
          "Stablecoins let you hold US dollars without a US bank account — one of the most powerful financial tools available to African retail investors.",
          "Always check which blockchain network a stablecoin is on before sending. Sending USDT on BNB Chain to an Ethereum address will result in lost funds."
        )
      },
      {
        id: 'm1_s2',
        title: 'DeFi Basics — Earning Yield on Your Savings',
        content: wrapNote(
          `DeFi stands for Decentralised Finance. It refers to financial services — lending, borrowing, earning interest — that run on blockchains via smart contracts, with no banks involved.

Here is the basic idea: you deposit your USDT or USDC into a lending protocol like Aave or Compound. Other users borrow from that pool and pay interest. That interest flows back to you as yield. Rates fluctuate, but lending stablecoins on established protocols has historically returned 3–12% annually. Compare that to a Kenyan bank savings account offering 4–7% in shillings — but the shilling also depreciated against the dollar, whereas USDC yield preserves your dollar value.

Yield farming takes this further — moving funds between protocols to chase higher returns. This can increase rewards but also increases complexity and risk. For beginners, simple lending on established platforms is the right starting point.

The risks of DeFi are real and worth understanding. Smart contract risk: the code that runs these protocols could have bugs that hackers exploit. In 2022, over $3 billion was lost in DeFi hacks. Liquidation risk: if you use your crypto as collateral to borrow, and the price drops sharply, your collateral can be automatically sold. Stablecoin risk: if the stablecoin you hold depegs, your dollar-denominated savings can lose value instantly.

DeFi is powerful but not beginner-friendly in its raw form. For African users starting out, platforms like Fonbnk or centralized exchange earn products (Binance Earn, Coinbase Yield) offer simpler entry points with DeFi-like returns and more familiar interfaces.`,
          "DeFi lets you earn interest on your crypto without a bank — but smart contract risks mean you should start with small amounts on established platforms.",
          "Never deposit more than you can afford to lose into any DeFi protocol, no matter how established. Even Aave and Compound have had near-misses with exploits."
        )
      },
      {
        id: 'm1_s3',
        title: 'Altcoins — Understanding the Wider Crypto Market',
        content: wrapNote(
          `Bitcoin is the original cryptocurrency. Everything else is called an altcoin (alternative coin). There are tens of thousands of them — most will eventually be worth nothing, but some represent genuine technological innovation.

Ethereum is the most important altcoin. It introduced smart contracts — self-executing programs that run on the blockchain. Almost all of DeFi, NFTs, and decentralized apps are built on Ethereum or inspired by it. Ethereum is the platform; Bitcoin is the asset.

BNB Chain (Binance), Solana, and Polygon are popular alternatives to Ethereum that offer faster and cheaper transactions. They made DeFi and crypto gaming accessible to users who could not afford Ethereum's high fees at peak times.

When evaluating any altcoin, ask four questions. First, what problem does it solve — and is that a real problem? Second, who is on the team, and do they have a public track record? Third, what is the token supply and how is it distributed — tokens where the team holds 50%+ are high risk. Fourth, is there genuine user activity, or just hype?

Be especially wary of meme coins. DOGE, SHIB, and their many imitators have no utility — their price is driven purely by sentiment and social media. Some people have made fortunes on them, but many more have lost money holding them after the hype fades.

For most African retail investors, a simple portfolio of Bitcoin and Ethereum represents the best risk-adjusted starting point. Altcoins are higher risk and higher reward — appropriate only for money you can genuinely afford to lose.`,
          "Most altcoins fail long-term. Stick to coins with clear utility, transparent teams, and real usage before exploring smaller projects.",
          "Use CoinGecko to check a coin's age, trading volume, and how the circulating supply compares to total supply. A coin with 2% of its supply circulating is a red flag."
        )
      }
    ]
  },

  // ── LEVEL 4: PRO ──────────────────────────────────────────────────────────
  {
    id: 'p1',
    title: 'Smart Investor Strategies',
    description: 'Portfolio building, African regulations, and the future of crypto on the continent.',
    difficulty: Difficulty.PRO,
    category: 'Advanced Strategy',
    estimatedMinutes: 20,
    rewardTokens: 1000,
    subtopics: [
      {
        id: 'p1_s1',
        title: 'Building a Crypto Portfolio That Works for You',
        content: wrapNote(
          `A portfolio is not just a list of coins you bought. It is a deliberate allocation of risk, designed around your goals and your ability to stomach losses.

A common starting framework for African retail investors: 60–70% in Bitcoin as a base layer (the most liquid, most established, best risk profile), 20–25% in Ethereum or other large-cap coins (higher growth potential, reasonable risk), and 5–10% maximum in smaller altcoins or DeFi positions (highest risk, highest potential). Many experienced investors never go beyond BTC and ETH.

Dollar-cost averaging (DCA) is your most powerful tool. Investing a fixed amount — say $50 or KES 5,000 — every week or month, regardless of price, removes the impossible task of timing the market. Data consistently shows that DCA over two or more years outperforms attempts to buy the dip at exactly the right moment.

Take profits as you go. Do not wait for the perfect top — nobody hits it. A common strategy is to sell 10–25% of a position when it doubles, locking in real money while still holding exposure to further gains. This disciplines you against greed.

Keep most of your holdings off exchanges. Use a self-custody wallet or hardware wallet for anything you are not actively trading. Exchanges can freeze withdrawals, get hacked, or — like FTX in 2022 — collapse entirely. The FTX collapse wiped out billions of dollars of user funds overnight, most of it from people who left crypto on the exchange assuming it was safe.`,
          "Allocate intentionally, invest consistently with DCA, take profits regularly, and keep most holdings in self-custody. This is the discipline that separates investors from gamblers.",
          "Do not track your portfolio price every hour. Set a weekly or monthly review schedule. Constant price-checking leads to emotional decisions that hurt long-term returns."
        )
      },
      {
        id: 'p1_s2',
        title: 'Crypto Taxes and Regulations Across Africa',
        content: wrapNote(
          `The regulatory landscape for crypto in Africa is evolving rapidly, and understanding it protects you from legal and tax surprises.

Nigeria is one of Africa's most active crypto markets and has one of the more complex regulatory histories. After the Central Bank of Nigeria restricted banks from servicing crypto exchanges in 2021, peer-to-peer trading exploded. By 2023, the SEC Nigeria was moving toward a licensing framework, and the government was exploring the crypto ecosystem more constructively — while also introducing a 10% capital gains tax on crypto profits. The e-Naira (Nigeria's CBDC) launched in 2021 but has seen limited adoption.

South Africa's Financial Sector Conduct Authority (FSCA) declared crypto a financial product in 2022, meaning exchanges must be licensed. This is broadly positive — it means consumer protections are growing. Capital gains tax applies to crypto profits in South Africa, generally at the standard CGT rate.

Kenya has been watching closely. The Kenya Revenue Authority (KRA) has signalled interest in taxing crypto gains, and a proposed 3% digital asset tax was tabled in 2023. Ghana and Egypt have also discussed regulatory frameworks.

The practical takeaway: keep records of every purchase, sale, and exchange. Use a spreadsheet or a tool like Koinly (which supports many African exchanges) to track your cost basis and gains. Even if enforcement is limited today, regulations are tightening, and having clean records now prevents problems later.

Never use crypto to evade legitimate taxes — that exposure creates far more risk than the taxes themselves.`,
          "Crypto regulations across Africa are tightening. Keeping transaction records from day one is free and could save you significant stress later.",
          "Use a crypto tax tool like Koinly or CoinTracker and connect it to your exchange account. Most generate a basic tax report for free. Do this once a year, not at the last minute."
        )
      },
      {
        id: 'p1_s3',
        title: 'The Future of Crypto in Africa',
        content: wrapNote(
          `Africa is not just adopting crypto — in important ways, it is leading the world in figuring out how crypto solves real problems.

The remittance corridor alone justifies the entire crypto industry for the continent. The World Bank estimates that remittances to Sub-Saharan Africa cost an average of 8.5% — among the highest in the world. Stablecoin rails running on Stellar, Celo, and BNB Chain are beginning to route billions of dollars at a fraction of that cost. Projects like Kotani Pay, Bitpesa (now AZA Finance), and Fonbnk are building the on- and off-ramp infrastructure that makes crypto practical for non-technical users.

Central Bank Digital Currencies (CBDCs) are being explored or piloted by nearly every major African central bank. The e-Naira, e-Cedi (Ghana), digital Rand (South Africa), and others represent government acknowledgment that digital money is the future. However, CBDCs are different from crypto in a critical way: they are controlled by the issuing government. They can be programmed with expiry dates, spending restrictions, or surveillance capabilities. Understanding the difference between a CBDC and Bitcoin matters.

The mobile-first nature of Africa gives the continent a structural advantage in crypto adoption. Over 60% of Africans access the internet primarily via smartphones, and crypto wallets are inherently mobile-native. The infrastructure leap-frogging we saw with M-Pesa (bypassing traditional banking) is happening again with DeFi.

African crypto startups raised over $500 million in 2022. Exchanges, payment rails, DeFi protocols, and NFT platforms built on and for the continent are multiplying. The opportunity for investors who understand both crypto and the African context is significant.`,
          "Africa's structural challenges — currency instability, high remittance costs, unbanked populations — make it one of the world's most fertile environments for practical crypto adoption.",
          "Follow projects building specifically for African infrastructure: Celo (mobile-first DeFi), Stellar (remittances), and local exchanges like Yellow Card and Quidax. These are where the real-world traction is happening."
        )
      }
    ]
  }
];

export const DID_YOU_KNOW_FACTS: DidYouKnow[] = [
  { id: 'dyk1', fact: "Bitcoin's smallest unit is called a 'Satoshi'. 1 BTC = 100,000,000 Satoshis — so you can own Bitcoin for less than $1.", rarity: 'common' },
  { id: 'dyk2', fact: "The first real-world Bitcoin purchase was 10,000 BTC for two pizzas in 2010. At 2024 prices, those pizzas would be worth over $600 million.", rarity: 'rare' },
  { id: 'dyk3', fact: "Nigeria, Kenya, and South Africa consistently rank in the global top 10 for crypto adoption — driven by remittances, inflation hedging, and a young tech-savvy population.", rarity: 'common' },
  { id: 'dyk4', fact: "Africans in the diaspora send over $48 billion home each year. Crypto rails can reduce the average 8.5% transfer fee to under 1%, saving billions annually.", rarity: 'rare' },
  { id: 'dyk5', fact: "There will only ever be 21 million Bitcoin. As of 2024, over 19.5 million have already been mined. Roughly 4 million are estimated to be permanently lost.", rarity: 'legendary' },
  { id: 'dyk6', fact: "The Celo blockchain was specifically designed for mobile-first crypto in emerging markets — its stablecoin cUSD can be sent to a phone number without a wallet address.", rarity: 'rare' },
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
};

export const MASTERY_TIMELINE = [
  { week: 1, phase: 'Foundations', focus: 'What crypto is, how Bitcoin works, wallet security' },
  { week: 2, phase: 'First Steps', focus: 'Buying safely, avoiding scams, reading charts' },
  { week: 3, phase: 'Going Deeper', focus: 'Stablecoins, DeFi yield, understanding altcoins' },
  { week: 4, phase: 'Smart Strategies', focus: 'Portfolio building, African regulations, the future' },
];
