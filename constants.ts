
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
  { id: 'genesis', title: 'Genesis Core', description: 'Synchronized your first Clarix node.', icon: 'fa-cube', rarity: 'common' },
  { id: 'auditor', title: 'Phantom Auditor', description: 'Found all vulnerabilities in the Audit Lab.', icon: 'fa-shield-halved', rarity: 'rare' },
  { id: 'math_wizard', title: 'Circuit Wizard', description: 'Reached 50% Cryptography mastery.', icon: 'fa-wand-sparkles', rarity: 'epic' },
  { id: 'mev_master', title: 'Dark Forest God', description: 'Completed Advanced MEV Strategies.', icon: 'fa-mask', rarity: 'epic' },
  { id: 'whale', title: 'Clarix Whale', description: 'Accumulated over 5,000 $PATH tokens.', icon: 'fa-whale', rarity: 'legendary' },
];

const wrapNote = (content: string, takeaway: string, tip: string) => 
  `${content}\n\n💡 **Key Takeaway**\n${takeaway}\n\n🛡️ **Pro Tip**\n${tip}`;

export const TOPICS: Topic[] = [
  {
    id: 'b1',
    title: 'The Clarix Thesis',
    description: 'Why the world needs the Clarix protocol.',
    difficulty: Difficulty.BASIC,
    category: 'Protocol Strategy',
    estimatedMinutes: 5,
    rewardTokens: 100,
    subtopics: [
      { id: 'b1_s1', title: 'The Trust Monopoly', content: wrapNote(
        "Clarix addresses the centralized trust monopoly by distributing authority across an obsidian-hard cryptographic layer.",
        "Distributed authority replaces institutional trust.",
        "Think of Clarix as the foundational 'Layer 0' for your digital assets."
      )}
    ]
  },
  {
    id: 'f1',
    title: 'Clarix-EVM Dynamics',
    description: 'Programmable obsidian logic.',
    difficulty: Difficulty.FUNDAMENTAL,
    category: 'Engineering',
    estimatedMinutes: 10,
    rewardTokens: 250,
    subtopics: [
      { id: 'f1_s1', title: 'The Kernel Node Architecture', content: wrapNote(
        "Clarix nodes execute code within an isolated, high-performance runtime (CVM).",
        "Money is now a software object.",
        "Always audit your logic for reentrancy before deployment."
      )}
    ]
  },
  {
    id: 'm1',
    title: 'Liquidity Engineering',
    description: 'Master the flow of capital in automated markets.',
    difficulty: Difficulty.MID,
    category: 'DeFi Economics',
    estimatedMinutes: 15,
    rewardTokens: 500,
    subtopics: [
      { id: 'm1_s1', title: 'AMM Architectures', content: wrapNote(
        "Automated Market Makers (AMMs) use the constant product formula (x * y = k) to provide continuous liquidity without a central limit order book.",
        "Liquidity is the lifeblood of decentralized exchange.",
        "Monitor Impermanent Loss closely during high volatility periods."
      )}
    ]
  },
  {
    id: 'p1',
    title: 'The Dark Forest: MEV',
    description: 'Advanced block-space extraction and security.',
    difficulty: Difficulty.PRO,
    category: 'Security & Extraction',
    estimatedMinutes: 20,
    rewardTokens: 1000,
    subtopics: [
      { id: 'p1_s1', title: 'Frontrunning & Backrunning', content: wrapNote(
        "Maximal Extractable Value (MEV) is the profit miners/validators can extract by reordering or inserting transactions within a block.",
        "Block space is a competitive financial commodity.",
        "Use private RPC endpoints to avoid predatory sandwich attacks."
      )}
    ]
  }
];

export const DID_YOU_KNOW_FACTS: DidYouKnow[] = [
  { id: 'dyk1', fact: "Bitcoin's smallest unit is a 'Satoshi'. 1 BTC = 100M Satoshis.", rarity: 'common' },
  { id: 'dyk2', fact: "The first Bitcoin purchase was 10,000 BTC for two pizzas.", rarity: 'rare' },
];

export const KEYWORD_RESOURCES: Record<string, string> = {
  'NFTs': 'https://ethereum.org/en/nft/',
  'DAOs': 'https://ethereum.org/en/dao/',
  'Layer 2 Scaling Solutions': 'https://ethereum.org/en/layer-2/',
  'Proof-of-Stake': 'https://ethereum.org/en/developers/docs/consensus-mechanisms/pos/',
  'Proof-of-Work': 'https://ethereum.org/en/developers/docs/consensus-mechanisms/pow/',
  'MEV': 'https://ethereum.org/en/developers/docs/mev/',
};

// Defined MASTERY_TIMELINE to fix import error in components/MasteryTimeline.tsx
export const MASTERY_TIMELINE = [
  { week: 1, phase: 'Genesis', focus: 'Node setup & Protocol Thesis' },
  { week: 2, phase: 'Architecture', focus: 'EVM Dynamics & Solidity logic' },
  { week: 3, phase: 'DeFi Mastery', focus: 'Liquidity Engineering & AMMs' },
  { week: 4, phase: 'Dark Forest', focus: 'MEV & Advanced Extraction' },
];
