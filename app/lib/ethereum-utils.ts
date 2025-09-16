export function isValidEthereumAddress(address: string): boolean {
  const cleanAddress = address.toLowerCase().trim();
  
  if (!/^0x[a-f0-9]{40}$/i.test(cleanAddress)) {
    return false;
  }
  
  return true;
}

export function normalizeAddress(address: string): string {
  const cleanAddress = address.toLowerCase().trim();
  
  if (!cleanAddress.startsWith('0x')) {
    return '0x' + cleanAddress;
  }
  
  return cleanAddress;
}

export function addressToSeed(address: string): number {
  const normalized = normalizeAddress(address);
  
  let hash = 0;
  for (let i = 2; i < normalized.length; i++) {
    const char = normalized.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  
  return Math.abs(hash);
}