import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function App() {
  const [text, setText] = useState('');
  const [translate, setTranslate] = useState(false);
  const [width, setWidth] = useState(400);
  const [height, setHeight] = useState(300);
  const [generatedImage, setGeneratedImage] = useState('');

  const handleGenerate = () => {
    // In a real application, you would call an API to generate the image here
    // For this example, we'll use a placeholder image URL
    const placeholderUrl = `/placeholder.svg?height=${height}&width=${width}&text=${encodeURIComponent(
      text
    )}`;
    setGeneratedImage(placeholderUrl);
  };

  return (
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
      {generatedImage && (
        <CardContent>
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Generated Image:</h3>
            <img
              src={generatedImage}
              alt="Generated image with text"
              className="max-w-full h-auto border rounded"
            />
          </div>
        </CardContent>
      )}
    </Card>
  );
}
