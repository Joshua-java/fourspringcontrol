import { useState, useRef, useEffect } from "react";
import { mediaService, type CloudinaryUploadResult } from "@/services/mediaService";
import type { MediaRecord } from "@/lib/admin-constants";
import {
  Upload,
  CheckCircle,
  X,
  Loader2,
  Film,
  ImageIcon,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductUploaderProps {
  productSlug: string;
  mediaType: "image" | "video";
}

export function ProductUploader({ productSlug, mediaType }: ProductUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<"idle" | "uploading" | "saving" | "done" | "error">("idle");
  const [preview, setPreview] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [uploads, setUploads] = useState<MediaRecord[]>([]);
  const [loadingList, setLoadingList] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadUploads();
  }, [productSlug, mediaType]);

  const loadUploads = async () => {
    setLoadingList(true);
    try {
      const all = await mediaService.list();
      const filtered = (all || []).filter(
        (m) => m.productSlug === productSlug && m.mediaType === mediaType
      );
      setUploads(filtered);
    } catch {
      setUploads([]);
    } finally {
      setLoadingList(false);
    }
  };

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
        setUploads((prev) => [saved, ...prev]);
      } catch {
        setStatus("done");
        const fallback: MediaRecord = {
          id: result.public_id,
          title,
          productSlug,
          mediaType,
          fileUrl: result.secure_url,
          publicId: result.public_id,
          contentType: file.type,
          createdAt: new Date().toISOString(),
        };
        setUploads((prev) => [fallback, ...prev]);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
      setStatus("error");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await mediaService.delete(id);
    } catch {
      // backend may not be ready
    }
    setUploads((prev) => prev.filter((u) => u.id !== id));
  };

  const reset = () => {
    setFile(null);
    setProgress(0);
    setStatus("idle");
    setPreview(null);
    setTitle("");
    setError("");
  };

  const accept = mediaType === "image" ? "image/*" : "video/*";
  const Icon = mediaType === "image" ? ImageIcon : Film;
  const label = mediaType === "image" ? "Images" : "Videos";

  return (
    <div className="space-y-6">
      {/* Upload area */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <Icon className="h-5 w-5 text-muted-foreground" />
            Upload {label}
          </h3>
          {file && (
            <button onClick={reset} className="text-muted-foreground hover:text-foreground">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {!file ? (
          <div
            onClick={() => inputRef.current?.click()}
            className="border-2 border-dashed border-border rounded-xl p-8 flex flex-col items-center gap-3 cursor-pointer hover:border-primary/40 hover:bg-secondary/50 transition-colors"
          >
            <Upload className="w-8 h-8 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Click to upload {mediaType === "image" ? "images" : "videos"}
            </p>
            <p className="text-xs text-muted-foreground/60">
              {mediaType === "image" ? "PNG, JPG, GIF, WebP" : "MP4, MOV, WebM"}
            </p>
            <input
              ref={inputRef}
              type="file"
              className="hidden"
              accept={accept}
              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
              {mediaType === "video" ? (
                <Film className="w-8 h-8 text-muted-foreground flex-shrink-0" />
              ) : preview ? (
                <img src={preview} alt="" className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
              ) : (
                <ImageIcon className="w-8 h-8 text-muted-foreground flex-shrink-0" />
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
              className="w-full px-3 py-2 bg-background border border-input rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />

            {status === "uploading" && (
              <div className="space-y-2">
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${progress}%` }} />
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
              <div className="flex items-center gap-2 text-sm text-[oklch(0.6_0.18_155)]">
                <CheckCircle className="w-4 h-4" /> Uploaded successfully!
              </div>
            )}
            {error && <p className="text-sm text-destructive">{error}</p>}

            {status !== "done" && (
              <Button
                onClick={handleUpload}
                disabled={status === "uploading" || status === "saving"}
                className="w-full"
              >
                {status === "uploading" || status === "saving" ? "Processing..." : "Upload"}
              </Button>
            )}
            {status === "done" && (
              <Button variant="outline" onClick={reset} className="w-full">
                Upload Another
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Uploaded media list */}
      <div>
        <h4 className="text-sm font-medium text-muted-foreground mb-3">
          Uploaded {label} ({uploads.length})
        </h4>
        {loadingList ? (
          <div className="flex items-center justify-center py-8 text-muted-foreground">
            <Loader2 className="w-5 h-5 animate-spin" />
          </div>
        ) : uploads.length === 0 ? (
          <p className="text-sm text-muted-foreground/60 py-4 text-center">
            No {label.toLowerCase()} uploaded yet.
          </p>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {uploads.map((item) => (
              <div
                key={item.id}
                className="group flex items-center gap-3 rounded-lg border border-border bg-card p-3 transition-shadow hover:shadow-md"
              >
                {item.mediaType === "image" ? (
                  <img
                    src={item.fileUrl}
                    alt={item.title}
                    className="h-14 w-14 rounded-lg object-cover flex-shrink-0"
                  />
                ) : (
                  <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-secondary flex-shrink-0">
                    <Film className="h-6 w-6 text-muted-foreground" />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium truncate">{item.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
