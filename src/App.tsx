import { useState } from 'react';

import { toast } from '@/components/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import Waiting from './components/Waiting';
import { generateImage } from './lib/utils';

export default function App() {
  const [text, setText] = useState('');
  const [translate, setTranslate] = useState(false);
  const [width, setWidth] = useState(1024);
  const [height, setHeight] = useState(768);
  const [generatedImage, setGeneratedImage] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const result = await generateImage(text, width, height);
      console.log('result', result);
      setGeneratedImage((prev) => [...prev, (result[0] as any).url]);
    } catch (error: any) {
      console.log({ ...error });
      toast({
        title: 'Error',
        description: error.message || 'An error occurred',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen">
      {loading ? <Waiting /> : null}
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Generate Image with Text</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="text">Text for Image</Label>
              <Input
                id="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text for your image"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="translate"
                checked={translate}
                onCheckedChange={(checked) => setTranslate(checked as boolean)}
              />
              <Label htmlFor="translate">Translate into English</Label>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="width">Width (px)</Label>
                <Input
                  id="width"
                  type="number"
                  value={width}
                  onChange={(e) => setWidth(Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="height">Height (px)</Label>
                <Input
                  id="height"
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={handleGenerate}>Generate Image</Button>
        </CardFooter>

        <Carousel>
          <CarouselContent>
            {generatedImage.reverse().map((image, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <CardContent>
                    <div className="mt-4">
                      <h3 className="text-lg font-semibold mb-2">
                        Generated Image:
                      </h3>
                      <img
                        src={image}
                        alt="Generated image with text"
                        className="max-w-full h-auto border rounded"
                      />
                    </div>
                  </CardContent>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <div></div>
      </Card>
    </div>
  );
}
