export const formatLEK = (n: number) =>
  new Intl.NumberFormat("sq-AL", { maximumFractionDigits: 0 }).format(n) + " LEK";

export const MINISTRIES = [
  "Ministria e Shëndetësisë",
  "Ministria e Arsimit",
  "Ministria e Infrastrukturës",
  "Ministria e Mbrojtjes",
  "Ministria e Financave",
  "Ministria e Bujqësisë",
];

export const ministryBudget = [
  { name: "Shëndetësisë", value: 48_500_000_000 },
  { name: "Arsimit", value: 39_200_000_000 },
  { name: "Infrastrukturës", value: 62_700_000_000 },
  { name: "Mbrojtjes", value: 31_800_000_000 },
  { name: "Financave", value: 21_400_000_000 },
  { name: "Bujqësisë", value: 14_900_000_000 },
];

export const monthlySpending = [
  { month: "Maj", spending: 14_200_000_000 },
  { month: "Qer", spending: 16_800_000_000 },
  { month: "Kor", spending: 15_300_000_000 },
  { month: "Gus", spending: 18_900_000_000 },
  { month: "Sht", spending: 21_400_000_000 },
  { month: "Tet", spending: 19_700_000_000 },
];

export const REGISTERED_NIPTS = new Set([
  "K12345678A", "L98765432B", "M11223344C", "K55667788D", "L22334455E",
  "M66778899F", "K33445566G", "L77889900H", "M44556677I", "K88990011J",
  "L12121212K", "M34343434L", "K56565656M", "L78787878N", "M90909090O",
  "K11112222P", "L33334444Q", "M55556666R", "K77778888S", "L99990000T",
]);

export type Tx = {
  id: string;
  date: string;
  recipient: string;
  nipt: string;
  amount: number;
  category: string;
  ministry: string;
  fund: string;
  status: "Paguar" | "Në pritje" | "Refuzuar";
  region: string;
};

const companies = [
  ["Ndërtimi-A SHPK", "K12345678A"],
  ["Infrastruktura Shqiptare SHA", "L98765432B"],
  ["MediTech Albania SHPK", "M11223344C"],
  ["EduPro Tiranë SHPK", "K55667788D"],
  ["Rrugët e Vendit SHA", "L22334455E"],
  ["Spitali Privat Vlorë SHPK", "M66778899F"],
  ["AgroVita Shqipëri SHPK", "K33445566G"],
  ["Teknologjia Kombëtare SHPK", "L77889900H"],
  ["Konstruksion Durrës SHA", "M44556677I"],
  ["Furnizime Mjekësore SHPK", "K88990011J"],
  ["BetonBeton SHPK", "L12121212K"],
  ["Sigurimi Civil SHA", "M34343434L"],
  ["Auto-Trans Shkodër SHPK", "K56565656M"],
  ["LibraShkollore SHPK", "L78787878N"],
  ["Energjia e Re SHA", "M90909090O"],
  // unregistered (NIPTs not in registry)
  ["Fantom Build SHPK", "X00000001Z"],
  ["GhostVendor Albania SHPK", "X00000002Z"],
];

const categories = ["Ndërtim", "Shëndetësi", "Arsim", "Furnizime", "Konsulencë", "Transport", "IT"];
const funds = ["Fondi i Shëndetësisë", "Fondi i Arsimit", "Fondi i Investimeve Publike", "Fondi i Mbrojtjes", "Fondi i Bujqësisë"];
const regions = ["Tiranë", "Durrës", "Vlorë", "Shkodër", "Elbasan", "Fier", "Korçë"];
const statuses: Tx["status"][] = ["Paguar", "Paguar", "Paguar", "Në pritje", "Refuzuar"];

function d(daysAgo: number, hour = 10) {
  const dt = new Date();
  dt.setDate(dt.getDate() - daysAgo);
  dt.setHours(hour, 30, 0, 0);
  return dt.toISOString();
}

// 25 transactions; some duplicates and high-risk
export const transactions: Tx[] = [
  { id: "TX-2026-0001", date: d(1, 9), recipient: companies[0][0], nipt: companies[0][1], amount: 12_500_000, category: "Ndërtim", ministry: MINISTRIES[2], fund: funds[2], status: "Paguar", region: "Tiranë" },
  { id: "TX-2026-0002", date: d(1, 14), recipient: companies[0][0], nipt: companies[0][1], amount: 12_500_000, category: "Ndërtim", ministry: MINISTRIES[2], fund: funds[2], status: "Paguar", region: "Tiranë" }, // DUPLICATE
  { id: "TX-2026-0003", date: d(2, 11), recipient: companies[1][0], nipt: companies[1][1], amount: 185_000_000, category: "Ndërtim", ministry: MINISTRIES[2], fund: funds[2], status: "Paguar", region: "Durrës" }, // HIGH RISK
  { id: "TX-2026-0004", date: d(2, 16), recipient: companies[2][0], nipt: companies[2][1], amount: 8_300_000, category: "Shëndetësi", ministry: MINISTRIES[0], fund: funds[0], status: "Paguar", region: "Tiranë" },
  { id: "TX-2026-0005", date: d(3, 10), recipient: companies[15][0], nipt: companies[15][1], amount: 4_700_000, category: "Ndërtim", ministry: MINISTRIES[2], fund: funds[2], status: "Në pritje", region: "Vlorë" }, // UNREGISTERED
  { id: "TX-2026-0006", date: d(3, 13), recipient: companies[3][0], nipt: companies[3][1], amount: 6_200_000, category: "Arsim", ministry: MINISTRIES[1], fund: funds[1], status: "Paguar", region: "Tiranë" },
  { id: "TX-2026-0007", date: d(4, 9), recipient: companies[4][0], nipt: companies[4][1], amount: 240_500_000, category: "Ndërtim", ministry: MINISTRIES[2], fund: funds[2], status: "Paguar", region: "Shkodër" }, // HIGH RISK
  { id: "TX-2026-0008", date: d(4, 15), recipient: companies[5][0], nipt: companies[5][1], amount: 9_800_000, category: "Shëndetësi", ministry: MINISTRIES[0], fund: funds[0], status: "Paguar", region: "Vlorë" },
  { id: "TX-2026-0009", date: d(5, 10), recipient: companies[6][0], nipt: companies[6][1], amount: 3_400_000, category: "Furnizime", ministry: MINISTRIES[5], fund: funds[4], status: "Paguar", region: "Fier" },
  { id: "TX-2026-0010", date: d(5, 14), recipient: companies[7][0], nipt: companies[7][1], amount: 14_200_000, category: "IT", ministry: MINISTRIES[4], fund: funds[2], status: "Paguar", region: "Tiranë" },
  { id: "TX-2026-0011", date: d(6, 11), recipient: companies[8][0], nipt: companies[8][1], amount: 27_800_000, category: "Ndërtim", ministry: MINISTRIES[2], fund: funds[2], status: "Paguar", region: "Durrës" },
  { id: "TX-2026-0012", date: d(6, 18), recipient: companies[8][0], nipt: companies[8][1], amount: 27_800_000, category: "Ndërtim", ministry: MINISTRIES[2], fund: funds[2], status: "Paguar", region: "Durrës" }, // DUPLICATE
  { id: "TX-2026-0013", date: d(7, 10), recipient: companies[9][0], nipt: companies[9][1], amount: 18_900_000, category: "Shëndetësi", ministry: MINISTRIES[0], fund: funds[0], status: "Paguar", region: "Korçë" },
  { id: "TX-2026-0014", date: d(7, 13), recipient: companies[10][0], nipt: companies[10][1], amount: 7_600_000, category: "Ndërtim", ministry: MINISTRIES[2], fund: funds[2], status: "Refuzuar", region: "Elbasan" },
  { id: "TX-2026-0015", date: d(8, 9), recipient: companies[11][0], nipt: companies[11][1], amount: 11_300_000, category: "Konsulencë", ministry: MINISTRIES[3], fund: funds[3], status: "Paguar", region: "Tiranë" },
  { id: "TX-2026-0016", date: d(8, 15), recipient: companies[12][0], nipt: companies[12][1], amount: 5_400_000, category: "Transport", ministry: MINISTRIES[2], fund: funds[2], status: "Paguar", region: "Shkodër" },
  { id: "TX-2026-0017", date: d(9, 10), recipient: companies[13][0], nipt: companies[13][1], amount: 9_200_000, category: "Arsim", ministry: MINISTRIES[1], fund: funds[1], status: "Paguar", region: "Tiranë" },
  { id: "TX-2026-0018", date: d(9, 14), recipient: companies[14][0], nipt: companies[14][1], amount: 320_000_000, category: "Ndërtim", ministry: MINISTRIES[4], fund: funds[2], status: "Në pritje", region: "Tiranë" }, // HIGH RISK
  { id: "TX-2026-0019", date: d(10, 11), recipient: companies[16][0], nipt: companies[16][1], amount: 6_800_000, category: "IT", ministry: MINISTRIES[4], fund: funds[2], status: "Paguar", region: "Tiranë" }, // UNREGISTERED
  { id: "TX-2026-0020", date: d(10, 16), recipient: companies[0][0], nipt: companies[0][1], amount: 22_100_000, category: "Ndërtim", ministry: MINISTRIES[2], fund: funds[2], status: "Paguar", region: "Tiranë" },
  { id: "TX-2026-0021", date: d(11, 9), recipient: companies[2][0], nipt: companies[2][1], amount: 15_400_000, category: "Shëndetësi", ministry: MINISTRIES[0], fund: funds[0], status: "Paguar", region: "Tiranë" },
  { id: "TX-2026-0022", date: d(12, 13), recipient: companies[4][0], nipt: companies[4][1], amount: 41_700_000, category: "Ndërtim", ministry: MINISTRIES[2], fund: funds[2], status: "Paguar", region: "Fier" },
  { id: "TX-2026-0023", date: d(13, 10), recipient: companies[6][0], nipt: companies[6][1], amount: 8_900_000, category: "Furnizime", ministry: MINISTRIES[5], fund: funds[4], status: "Paguar", region: "Elbasan" },
  { id: "TX-2026-0024", date: d(14, 14), recipient: companies[1][0], nipt: companies[1][1], amount: 195_000_000, category: "Ndërtim", ministry: MINISTRIES[2], fund: funds[2], status: "Paguar", region: "Durrës" }, // HIGH RISK
  { id: "TX-2026-0025", date: d(15, 11), recipient: companies[3][0], nipt: companies[3][1], amount: 7_300_000, category: "Arsim", ministry: MINISTRIES[1], fund: funds[1], status: "Paguar", region: "Tiranë" },
];

export type Anomaly = { type: "Duplicate" | "High Risk" | "Unregistered"; reason: string };

export function detectAnomalies(tx: Tx, all: Tx[]): Anomaly[] {
  const anomalies: Anomaly[] = [];
  if (tx.amount > 100_000_000) {
    anomalies.push({ type: "High Risk", reason: `Shuma tejkalon 100,000,000 LEK (${formatLEK(tx.amount)})` });
  }
  if (!REGISTERED_NIPTS.has(tx.nipt)) {
    anomalies.push({ type: "Unregistered", reason: `NIPT ${tx.nipt} nuk është në regjistrin zyrtar` });
  }
  const txTime = new Date(tx.date).getTime();
  const dup = all.find(
    (o) =>
      o.id !== tx.id &&
      o.nipt === tx.nipt &&
      o.amount === tx.amount &&
      Math.abs(new Date(o.date).getTime() - txTime) <= 24 * 3600 * 1000,
  );
  if (dup) anomalies.push({ type: "Duplicate", reason: `Transaksion identik me ${dup.id} brenda 24 orëve` });
  return anomalies;
}

export const stats = {
  totalBudget: ministryBudget.reduce((s, m) => s + m.value, 0),
  activeContracts: 1_847,
  registeredVendors: 12_394,
};