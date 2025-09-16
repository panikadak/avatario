import { NextRequest } from 'next/server';

const PRODUCTION_DOMAINS = [
  'baes.so',
  'baes.app',
  'bario.so'
];

const DEVELOPMENT_DOMAINS = [
  ...PRODUCTION_DOMAINS,
  'localhost'
];

export function isAllowedDomain(request: NextRequest): boolean {
  const referer = request.headers.get('referer');
  const origin = request.headers.get('origin');
  
  // Use production domains in production, development domains in dev
  const allowedDomains = process.env.NODE_ENV === 'production' 
    ? PRODUCTION_DOMAINS 
    : DEVELOPMENT_DOMAINS;
  
  // Check both referer and origin headers
  const urlsToCheck = [referer, origin].filter(Boolean);
  
  if (urlsToCheck.length === 0) {
    // Allow direct API calls only in development
    return process.env.NODE_ENV !== 'production';
  }
  
  for (const urlString of urlsToCheck) {
    try {
      const url = new URL(urlString!);
      const hostname = url.hostname.toLowerCase();
      
      // Check if hostname matches any allowed domain or is a subdomain
      const isAllowed = allowedDomains.some(domain => 
        hostname === domain || hostname.endsWith(`.${domain}`)
      );
      
      if (isAllowed) {
        return true;
      }
    } catch {
      // Invalid URL, skip this one
      continue;
    }
  }
  
  return false;
}

export function getDomainFromRequest(request: NextRequest): string | null {
  const referer = request.headers.get('referer');
  const origin = request.headers.get('origin');
  
  const urlString = referer || origin;
  if (!urlString) return null;
  
  try {
    const url = new URL(urlString);
    return url.hostname;
  } catch {
    return null;
  }
}