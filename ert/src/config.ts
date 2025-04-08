import fs from 'fs';
import path from 'path';

export const RESOURCES_DIR = process.env.RESOURCES_DIR || path.join(process.cwd(), 'resources');
export const RESOURCES_IMAGES_DIR = path.join(RESOURCES_DIR, 'images');
export const ZIM_CONFIGS_DIR = path.join(RESOURCES_DIR, 'zim-configs');
export const WORKSHEETS_DIR = path.join(process.cwd(), 'worksheets');

export interface ZimFile {
  name: string;
  filename: string;
  description: string;
  category: string;
}

export interface ZimConfig {
  zimFiles: ZimFile[];
  defaultImage: string;
  kiwixPort: number;
  nextjsPort: number;
}

function loadZimConfigs(): ZimFile[] {
  try {
    // Create directories if they don't exist
    if (!fs.existsSync(RESOURCES_DIR)) {
      fs.mkdirSync(RESOURCES_DIR, { recursive: true });
    }
    if (!fs.existsSync(ZIM_CONFIGS_DIR)) {
      fs.mkdirSync(ZIM_CONFIGS_DIR, { recursive: true });
    }
    if (!fs.existsSync(RESOURCES_IMAGES_DIR)) {
      fs.mkdirSync(RESOURCES_IMAGES_DIR, { recursive: true });
    }
    if (!fs.existsSync(WORKSHEETS_DIR)) {
      fs.mkdirSync(WORKSHEETS_DIR, { recursive: true });
    }

    const configFiles = fs.readdirSync(ZIM_CONFIGS_DIR);
    return configFiles
      .filter(file => file.endsWith('.json'))
      .map(file => {
        const configData = fs.readFileSync(path.join(ZIM_CONFIGS_DIR, file), 'utf-8');
        return JSON.parse(configData);
      });
  } catch (error) {
    console.error('Error loading ZIM configs:', error);
    return [];
  }
}

export function loadZimConfig(): ZimConfig {
  return {
    zimFiles: loadZimConfigs(),
    defaultImage: 'ert',
    kiwixPort: 8080,
    nextjsPort: 3000
  };
}

export const zimConfig = loadZimConfig(); 