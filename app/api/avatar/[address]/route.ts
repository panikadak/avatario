import { NextRequest, NextResponse } from 'next/server';
import { isValidEthereumAddress, normalizeAddress } from '@/app/lib/ethereum-utils';
import { selectLayersForAddress } from '@/app/lib/avatar-generator';
import { generateAvatar } from '@/app/lib/image-processor';
import { isAllowedDomain } from '@/app/lib/domain-validator';
import { avatarCache } from '@/app/lib/avatar-cache';
import { DEFAULT_AVATAR_SIZE, MIN_AVATAR_SIZE, MAX_AVATAR_SIZE } from '@/app/types';

export const runtime = 'nodejs';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ address: string }> }
) {
  try {
    // Check domain whitelist
    if (!isAllowedDomain(request)) {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      );
    }

    const { address } = await context.params;
    const searchParams = request.nextUrl.searchParams;
    
    if (!address) {
      return NextResponse.json(
        { error: 'Ethereum address is required' },
        { status: 400 }
      );
    }
    
    if (!isValidEthereumAddress(address)) {
      return NextResponse.json(
        { error: 'Invalid Ethereum address format' },
        { status: 400 }
      );
    }
    
    const normalizedAddress = normalizeAddress(address);
    
    let size = DEFAULT_AVATAR_SIZE;
    const sizeParam = searchParams.get('size');
    if (sizeParam) {
      const parsedSize = parseInt(sizeParam, 10);
      if (!isNaN(parsedSize) && parsedSize >= MIN_AVATAR_SIZE && parsedSize <= MAX_AVATAR_SIZE) {
        size = parsedSize;
      }
    }

    // Check cache first
    const cachedAvatar = avatarCache.get(normalizedAddress, size);
    if (cachedAvatar) {
      return new NextResponse(new Uint8Array(cachedAvatar), {
        status: 200,
        headers: {
          'Content-Type': 'image/png',
          'Cache-Control': 'public, max-age=31536000, immutable',
          'X-Ethereum-Address': normalizedAddress,
          'X-Avatar-Size': size.toString(),
          'X-Cache': 'HIT'
        }
      });
    }
    
    const layers = await selectLayersForAddress(normalizedAddress);
    
    if (layers.length === 0) {
      return NextResponse.json(
        { error: 'Failed to select avatar layers' },
        { status: 500 }
      );
    }
    
    const avatarBuffer = await generateAvatar(normalizedAddress, layers, size);
    
    // Store in cache
    avatarCache.set(normalizedAddress, size, avatarBuffer);
    
    return new NextResponse(new Uint8Array(avatarBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=31536000, immutable',
        'X-Ethereum-Address': normalizedAddress,
        'X-Avatar-Size': size.toString(),
        'X-Cache': 'MISS'
      }
    });
  } catch (error) {
    console.error('Avatar generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate avatar' },
      { status: 500 }
    );
  }
}