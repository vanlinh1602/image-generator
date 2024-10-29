import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import Together from 'together-ai';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const together = new Together({
  apiKey: '2244e78ace3efd0c45e4a1739efb5a3f230b4e6127e806991ae999c62ffd114f',
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
