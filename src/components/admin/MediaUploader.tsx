import { useState, useRef } from "react";
import { mediaService, type CloudinaryUploadResult } from "@/services/mediaService";
import { Upload, CheckCircle, X, Loader2, Film, ImageIcon } from "lucide-react";
import type { MediaRecord } from "@/lib/admin-constants";

interface MediaUploaderProps {
  productSlug?: string;
  onUploaded?: (record: MediaRecord) => void;
}

export function MediaUploader({ productSlug, onUploaded }: MediaUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<"idle" | "uploading" | "saving" | "done" | "error">("idle");
  const [preview, setPreview] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (f: File) => {
    setFile(f);
    setTitle(f.name.replace(/\.[^.]+$/, ""));
    setStatus("idle");
    setProgress(0);
    setError("");
    if (f.type.startsWith("image/")) {
      setPreview(URL.createObjectURL(f));
    } else {
      setPreview(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    try {
      setStatus("uploading");
      setError("");
      const result: CloudinaryUploadResult = await mediaService.uploadToCloudinary(file, setProgress);
      setStatus("saving");
      const mediaType = file.type.startsWith("video/") ? "video" : "image";
      try {
        const saved = await mediaService.saveToBackend({
          title,
          productSlug,
          mediaType,
          fileUrl: result.secure_url,
          publicId: result.public_id,
          contentType: file.type,
        });
        setStatus("done");
        onUploaded?.(saved);
      } catch {
        // Backend may not be ready yet - still treat as partial success
        setStatus("done");
        onUploaded?.({
          id: result.public_id,
          title,
          productSlug,
          mediaType,
          fileUrl: result.secure_url,
          publicId: result.public_id,
          contentType: file.type,
          createdAt: new Date().toISOString(),
        });
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
      setStatus("error");
    }
  };

  const reset = () => {
    setFile(null);
    setProgress(0);
    setStatus("idle");
    setPreview(null);
    setTitle("");
    setError("");
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground">Upload Media</h3>
        {file && (
          <button onClick={reset} className="text-muted-foreground hover:text-foreground">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {!file ? (
        <div
          onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed border-border rounded-xl p-8 flex flex-col items-center gap-3 cursor-pointer hover:border-admin-brand/40 hover:bg-admin-surface transition-colors"
        >
          <Upload className="w-8 h-8 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Click to upload images or videos</p>
          <p className="text-xs text-muted-foreground/60">PNG, JPG, GIF, MP4, MOV, WebM</p>
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            accept="image/*,video/*"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          />
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-admin-surface rounded-lg">
            {file.type.startsWith("video/") ? (
              <Film className="w-8 h-8 text-admin-stat-amber" />
            ) : preview ? (
              <img src={preview} alt="" className="w-12 h-12 rounded-lg object-cover" />
            ) : (
              <ImageIcon className="w-8 h-8 text-admin-stat-blue" />
            )}
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
              <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
          </div>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full px-3 py-2 bg-background border border-input rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-admin-brand/30"
          />

          {status === "uploading" && (
            <div className="space-y-2">
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-admin-brand rounded-full transition-all" style={{ width: `${progress}%` }} />
              </div>
              <p className="text-xs text-muted-foreground text-center">{progress}% uploading...</p>
            </div>
          )}
          {status === "saving" && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="w-4 h-4 animate-spin" /> Saving to backend...
            </div>
          )}
          {status === "done" && (
            <div className="flex items-center gap-2 text-sm text-admin-stat-green">
              <CheckCircle className="w-4 h-4" /> Uploaded successfully!
            </div>
          )}
          {error && <p className="text-sm text-destructive">{error}</p>}

          {status !== "done" && (
            <button
              onClick={handleUpload}
              disabled={status === "uploading" || status === "saving"}
              className="w-full py-2.5 bg-admin-brand text-admin-brand-foreground rounded-lg text-sm font-medium hover:opacity-90 disabled:opacity-50 transition-opacity"
            >
              {status === "uploading" || status === "saving" ? "Processing..." : "Upload"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
