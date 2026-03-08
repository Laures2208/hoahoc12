import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Upload, Video, Loader2, Download, AlertCircle, Sparkles } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

declare global {
  interface Window {
    aistudio: {
      hasSelectedApiKey: () => Promise<boolean>;
      openSelectKey: () => Promise<void>;
    };
  }
}

export const VeoGenerator = () => {
  const [image, setImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('A cinematic animation showing molten metal flowing through a futuristic industrial furnace, high detail, 4k');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateVideo = async () => {
    if (!image) return;
    setIsGenerating(true);
    setError(null);
    setVideoUrl(null);

    try {
      const hasKey = await window.aistudio.hasSelectedApiKey();
      if (!hasKey) {
        await window.aistudio.openSelectKey();
      }

      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
      const base64Data = image.split(',')[1];
      
      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: prompt,
        image: {
          imageBytes: base64Data,
          mimeType: 'image/png',
        },
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: '16:9'
        }
      });

      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 5000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (downloadLink) {
        const response = await fetch(downloadLink, {
          headers: { 'x-goog-api-key': process.env.GEMINI_API_KEY! }
        });
        const blob = await response.blob();
        setVideoUrl(URL.createObjectURL(blob));
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to generate video. Please ensure you have a valid API key selected.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-display font-bold text-slate-900 dark:text-white flex items-center justify-center gap-3">
          <Sparkles className="text-primary" /> Veo Visualizer
        </h1>
        <p className="text-slate-500">Bring metallurgy concepts to life with AI video generation.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="glass p-6 rounded-3xl space-y-4">
            <h3 className="font-bold text-lg">1. Upload Reference Image</h3>
            <div 
              className={`border-2 border-dashed rounded-2xl h-64 flex flex-col items-center justify-center transition-all ${image ? 'border-primary bg-primary/5' : 'border-slate-300 hover:border-primary'}`}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const file = e.dataTransfer.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => setImage(reader.result as string);
                  reader.readAsDataURL(file);
                }
              }}
            >
              {image ? (
                <div className="relative w-full h-full p-2">
                  <img src={image} alt="Upload" className="w-full h-full object-contain rounded-xl" referrerPolicy="no-referrer" />
                  <button onClick={() => setImage(null)} className="absolute top-4 right-4 bg-red-500 text-white p-1 rounded-full shadow-lg">
                    <Download className="rotate-45" size={16} />
                  </button>
                </div>
              ) : (
                <>
                  <Upload className="text-slate-400 mb-2" size={40} />
                  <p className="text-sm text-slate-500">Drag & drop or click to upload</p>
                  <input type="file" className="hidden" id="file-upload" onChange={handleImageUpload} accept="image/*" />
                  <label htmlFor="file-upload" className="mt-4 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg cursor-pointer hover:bg-slate-200 font-bold text-sm">
                    Select File
                  </label>
                </>
              )}
            </div>
          </div>

          <div className="glass p-6 rounded-3xl space-y-4">
            <h3 className="font-bold text-lg">2. Describe the Animation</h3>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full h-32 bg-slate-50 dark:bg-slate-800 border-none rounded-xl p-4 focus:ring-2 focus:ring-primary outline-none text-sm"
              placeholder="Describe how the metal should move..."
            />
            <button
              disabled={!image || isGenerating}
              onClick={generateVideo}
              className="w-full py-4 bg-primary text-white rounded-2xl font-bold hover:bg-primary-dark disabled:opacity-50 transition-all shadow-lg flex items-center justify-center gap-2"
            >
              {isGenerating ? <><Loader2 className="animate-spin" /> Generating...</> : <><Video /> Generate Animation</>}
            </button>
          </div>
        </div>

        <div className="glass rounded-3xl overflow-hidden flex flex-col min-h-[400px]">
          <div className="p-4 bg-slate-900 text-white flex justify-between items-center">
            <span className="text-sm font-bold">Preview Output</span>
            {videoUrl && <a href={videoUrl} download="metallurgy-viz.mp4" className="text-xs bg-white/20 px-2 py-1 rounded hover:bg-white/30">Download</a>}
          </div>
          <div className="flex-1 flex items-center justify-center bg-slate-100 dark:bg-slate-950 relative">
            {isGenerating ? (
              <div className="text-center space-y-4 p-8">
                <Loader2 className="animate-spin text-primary mx-auto" size={48} />
                <p className="text-slate-500 font-medium">Veo is crafting your video...</p>
                <p className="text-xs text-slate-400">This usually takes about 30-60 seconds.</p>
              </div>
            ) : videoUrl ? (
              <video src={videoUrl} controls className="w-full h-full object-contain" autoPlay loop />
            ) : error ? (
              <div className="text-center p-8 space-y-2 text-red-500">
                <AlertCircle size={40} className="mx-auto" />
                <p className="font-bold">Generation Error</p>
                <p className="text-sm opacity-80">{error}</p>
              </div>
            ) : (
              <div className="text-center p-8 space-y-2 text-slate-400">
                <Video size={48} className="mx-auto opacity-20" />
                <p>Your generated video will appear here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
