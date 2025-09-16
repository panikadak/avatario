import fs from 'fs/promises';
import path from 'path';
import { addressToSeed } from './ethereum-utils';
import { LAYER_FOLDERS, LayerSelection } from '../types';

class SeededRandom {
  private seed: number;
  
  constructor(seed: number) {
    this.seed = seed;
  }
  
  next(): number {
    this.seed = (this.seed * 9301 + 49297) % 233280;
    return this.seed / 233280;
  }
  
  nextInt(min: number, max: number): number {
    return Math.floor(this.next() * (max - min + 1)) + min;
  }
}

export async function getLayerImages(layerFolder: string): Promise<string[]> {
  const layerPath = path.join(process.cwd(), 'public', 'layers', layerFolder);
  
  try {
    const files = await fs.readdir(layerPath);
    const imageFiles = files
      .filter(file => file.endsWith('.png'))
      .sort();
    
    return imageFiles.map(file => path.join(layerPath, file));
  } catch (error) {
    console.error(`Error reading layer ${layerFolder}:`, error);
    return [];
  }
}

export async function selectLayersForAddress(address: string): Promise<LayerSelection[]> {
  const seed = addressToSeed(address);
  const random = new SeededRandom(seed);
  const selections: LayerSelection[] = [];
  
  for (const layerFolder of LAYER_FOLDERS) {
    const images = await getLayerImages(layerFolder);
    
    if (images.length === 0) {
      console.warn(`No images found in layer ${layerFolder}`);
      continue;
    }
    
    const selectedIndex = random.nextInt(0, images.length - 1);
    const selectedImage = images[selectedIndex];
    
    selections.push({
      layer: layerFolder,
      imagePath: selectedImage
    });
  }
  
  return selections;
}