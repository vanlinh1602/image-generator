import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import Together from 'together-ai';

import { API_KEY } from '@/configs/key';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const together = new Together({
  apiKey: API_KEY,
});

export const generateImage = async (
  text: string,
  width: number,
  height: number
) => {
  try {
    const result = await together.images.create({
      model: 'black-forest-labs/FLUX.1-schnell-Free',
      prompt: text,
      width,
      height,
      steps: 4,
      n: 1,
    });
    return result.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
