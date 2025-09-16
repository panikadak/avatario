import { createCanvas, loadImage } from 'canvas';
import { LayerSelection, DEFAULT_AVATAR_SIZE } from '../types';

export async function compositeImages(
  layers: LayerSelection[],
  size: number = DEFAULT_AVATAR_SIZE
): Promise<Buffer> {
  if (layers.length === 0) {
    throw new Error('No layers provided for composition');
  }
  
  // Create canvas
  const canvas = createCanvas(1000, 1000);
  const ctx = canvas.getContext('2d');
  
  // Disable image smoothing for pixelated effect
  ctx.imageSmoothingEnabled = false;
  
  // Load and draw each layer
  for (const layer of layers) {
    try {
      const image = await loadImage(layer.imagePath);
      
      // Ensure image smoothing is disabled before each draw
      ctx.imageSmoothingEnabled = false;
      
      ctx.drawImage(image, 0, 0, 1000, 1000);
    } catch (error) {
      console.error(`Failed to load image: ${layer.imagePath}`, error);
      continue;
    }
  }
  
  // Resize if needed
  if (size !== 1000) {
    const resizedCanvas = createCanvas(size, size);
    const resizedCtx = resizedCanvas.getContext('2d');
    
    // Disable image smoothing for pixelated effect
    resizedCtx.imageSmoothingEnabled = false;
    
    resizedCtx.drawImage(canvas, 0, 0, size, size);
    return resizedCanvas.toBuffer('image/png');
  }
  
  return canvas.toBuffer('image/png');
}

export async function generateAvatar(
  address: string,
  layers: LayerSelection[],
  size?: number
): Promise<Buffer> {
  try {
    const avatarBuffer = await compositeImages(layers, size);
    return avatarBuffer;
  } catch (error) {
    console.error('Error generating avatar:', error);
    throw new Error('Failed to generate avatar');
  }
}