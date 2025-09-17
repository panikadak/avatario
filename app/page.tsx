'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [address, setAddress] = useState('0x742d35Cc6634C0532925a3b844Bc9e7595f0fEb1');
  const [response, setResponse] = useState('');

  const testAPI = async () => {
    if (!address) return;
    
    const url = `/api/avatar/${address.trim()}`;
    setResponse(`GET ${url}`);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        <header className="mb-8 sm:mb-16">
          <h1 className="text-2xl sm:text-4xl font-mono font-bold mb-2">AVATARIO</h1>
          <p className="text-gray-400 text-sm sm:text-base">by Bario Entertainment System</p>
        </header>

        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-mono font-bold mb-4">API Documentation</h2>
          <div className="bg-gray-900 border border-gray-800 p-4 sm:p-6 rounded mb-6">
            <p className="text-gray-300 leading-relaxed">
              This service was originally created for <span className="text-white font-mono">baes.app</span> to display 
              Bario Punks-inspired avatars for users who comment without ENS or Basename profile pictures, 
              replacing empty silhouettes with generated pixel art. 
            </p>
            <p className="text-gray-300 leading-relaxed mt-4">
              The API is domain-restricted and won&apos;t work if you try to use it directly on your site. 
              However, we&apos;d be happy if you&apos;re interested in using it! Please reach out to us at{' '}
              <a 
                href="https://x.com/basebario" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:underline font-mono"
              >
                @basebario
              </a>{' '}
              to discuss integration possibilities.
            </p>
          </div>
        </section>

        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-mono font-bold mb-4">Open Source & Vercel Ready</h2>
          <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/30 p-4 sm:p-6 rounded mb-6">
            <div className="mb-4">
              <h3 className="text-white font-mono text-lg mb-2">Fork and Create Your Own!</h3>
              <p className="text-gray-300 leading-relaxed">
                This project is <span className="text-white font-semibold">100% open source</span>! You can fork it, 
                customize it with your own NFT artwork layers, and deploy your own avatar generation service.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-4 mt-6">
              <a 
                href="https://github.com/panikadak/avatario" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-900/50 border border-gray-700 hover:border-purple-500 p-4 rounded transition-all group"
              >
                <div className="flex items-center space-x-2 mb-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <span className="font-mono text-white group-hover:text-purple-400">GitHub Repository</span>
                </div>
                <p className="text-gray-400 text-sm">Fork, star, and contribute</p>
              </a>
              
              <a 
                href="https://vercel.com/new/clone?repository-url=https://github.com/panikadak/avatario" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-900/50 border border-gray-700 hover:border-blue-500 p-4 rounded transition-all group"
              >
                <div className="flex items-center space-x-2 mb-2">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 22.525H0l12-21.05 12 21.05z"/>
                  </svg>
                  <span className="font-mono text-white group-hover:text-blue-400">Deploy on Vercel</span>
                </div>
                <p className="text-gray-400 text-sm">One-click deployment</p>
              </a>
            </div>

            <div className="mt-6 p-4 bg-black/30 rounded border border-gray-800">
              <h4 className="text-yellow-400 font-mono mb-2">Quick Setup</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-start space-x-2">
                  <span className="text-gray-500">1.</span>
                  <span className="text-gray-300">Fork the repository or click "Deploy on Vercel"</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-gray-500">2.</span>
                  <span className="text-gray-300">Add your own artwork layers in <code className="text-blue-400">public/layers/</code></span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-gray-500">3.</span>
                  <span className="text-gray-300">Update domain whitelist for production</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-gray-500">4.</span>
                  <span className="text-gray-300">Deploy and start generating unique avatars!</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8 sm:mb-12">
          <h3 className="text-lg sm:text-xl font-mono font-bold mb-4">Endpoint</h3>
          <div className="bg-gray-900 border border-gray-800 p-3 sm:p-4 rounded mb-4">
            <code className="text-green-400 break-all text-xs sm:text-sm">GET https://avatario.baes.so/api/avatar/[address]</code>
          </div>
        </section>

        <section className="mb-8 sm:mb-12">
          <h3 className="text-lg sm:text-xl font-mono font-bold mb-4">Parameters</h3>
          <div className="space-y-4">
            <div>
              <code className="text-blue-400">address</code>
              <span className="text-gray-400 ml-2">string</span>
              <span className="text-red-400 ml-2">required</span>
              <p className="text-gray-300 mt-1">Valid Ethereum address (0x...)</p>
            </div>
            <div>
              <code className="text-blue-400">size</code>
              <span className="text-gray-400 ml-2">integer</span>
              <span className="text-gray-500 ml-2">optional</span>
              <p className="text-gray-300 mt-1">Avatar size in pixels (16-2048, default: 512)</p>
              <p className="text-gray-400 text-sm mt-1">Supported sizes: 16, 32, 64, 128, 256, 512, 1024, 2048</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h3 className="text-xl font-mono font-bold mb-4">Response</h3>
          <p className="text-gray-300 mb-2">Returns PNG image with headers:</p>
          <div className="bg-gray-900 border border-gray-800 p-4 rounded">
            <div className="text-gray-300">
              <div><span className="text-yellow-400">Content-Type:</span> image/png</div>
              <div><span className="text-yellow-400">Cache-Control:</span> public, max-age=31536000, immutable</div>
            </div>
          </div>
        </section>

        <section className="mb-8 sm:mb-12">
          <h3 className="text-lg sm:text-xl font-mono font-bold mb-4">Examples</h3>
          <div className="space-y-4">
            <div className="bg-gray-900 border border-gray-800 p-3 sm:p-4 rounded">
              <code className="text-green-400 break-all text-xs sm:text-sm">GET https://avatario.baes.so/api/avatar/0x742d35Cc6634C0532925a3b844Bc9e7595f0fEb1</code>
            </div>
            <div className="bg-gray-900 border border-gray-800 p-3 sm:p-4 rounded">
              <code className="text-green-400 break-all text-xs sm:text-sm">GET https://avatario.baes.so/api/avatar/0x742d35Cc6634C0532925a3b844Bc9e7595f0fEb1?size=256</code>
            </div>
          </div>
        </section>

        <section className="mb-8 sm:mb-12">
          <h3 className="text-lg sm:text-xl font-mono font-bold mb-4">Test API</h3>
          <div className="border border-gray-800 p-6 rounded">
            <div className="mb-4">
              <label className="block text-sm font-mono mb-2">Ethereum Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="0x742d35Cc6634C0532925a3b844Bc9e7595f0fEb1"
                className="w-full p-3 bg-black border border-gray-700 text-white font-mono focus:border-white focus:outline-none"
              />
            </div>
            <button
              onClick={testAPI}
              className="bg-white text-black px-6 py-2 font-mono hover:bg-gray-200 transition-colors"
            >
              TEST REQUEST
            </button>
            {response && (
              <div className="mt-4 p-4 bg-gray-900 border border-gray-800 rounded">
                <p className="text-green-400 font-mono text-xs sm:text-sm break-all">{response}</p>
                {address && (
                  <Image 
                    src={`/api/avatar/${address.trim()}`}
                    alt="Avatar"
                    width={128}
                    height={128}
                    className="mt-4 border border-gray-700 pixelated"
                    unoptimized
                  />
                )}
              </div>
            )}
          </div>
        </section>

        <footer className="mt-16 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <a 
              href="https://baes.so" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Image 
                src="https://baes.so/logotype.png" 
                alt="Bario Entertainment System" 
                width={200}
                height={48}
                className="h-12 w-auto object-contain hover:opacity-80 transition-opacity"
              />
            </a>
          </div>
          <p>
            Want to use this API for your project? Please reach out to us at{' '}
            <a 
              href="https://x.com/basebario" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:underline"
            >
              @basebario
            </a>
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mt-6">
            <a 
              href="https://baes.so" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Baes.so Website
            </a>
            <a 
              href="https://baes.app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Baes.App Onchain Video Game Marketplace
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
