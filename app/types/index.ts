export interface LayerInfo {
  folderName: string;
  images: string[];
}

export interface AvatarGenerationOptions {
  address: string;
  size?: number;
}

export interface LayerSelection {
  layer: string;
  imagePath: string;
}

export const LAYER_FOLDERS = [
  '01-Backscope',
  '02-Existatron',
  '03-Skinframe',
  '04-Brainbox',
  '05-Gearbit'
] as const;

export const DEFAULT_AVATAR_SIZE = 512;
export const MIN_AVATAR_SIZE = 16;
export const MAX_AVATAR_SIZE = 2048;