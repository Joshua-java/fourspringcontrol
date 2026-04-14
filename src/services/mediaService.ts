import { CLOUDINARY, API_ROUTES, type MediaRecord } from "@/lib/admin-constants";
import { apiGet, apiPost, apiPut, apiDelete } from "./api";

function isVideo(file: File): boolean {
  return file.type.startsWith("video/");
}

export interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
  resource_type: string;
  format: string;
  width?: number;
  height?: number;
  duration?: number;
  bytes?: number;
}

export const mediaService = {
  uploadToCloudinary: async (
    file: File,
    onProgress?: (pct: number) => void
  ): Promise<CloudinaryUploadResult> => {
    const url = isVideo(file) ? CLOUDINARY.videoUploadUrl : CLOUDINARY.imageUploadUrl;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY.uploadPreset);

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", url);
      if (onProgress) {
        xhr.upload.onprogress = (e) => {
          if (e.lengthComputable) onProgress(Math.round((e.loaded / e.total) * 100));
        };
      }
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject(new Error("Upload failed"));
        }
      };
      xhr.onerror = () => reject(new Error("Network error"));
      xhr.send(formData);
    });
  },

  saveToBackend: (data: Partial<MediaRecord>) =>
    apiPost<MediaRecord>(API_ROUTES.uploads.create, data),

  list: () => apiGet<MediaRecord[]>(API_ROUTES.uploads.list),

  get: (id: string) => apiGet<MediaRecord>(API_ROUTES.uploads.get(id)),

  update: (id: string, data: Partial<MediaRecord>) =>
    apiPut<MediaRecord>(API_ROUTES.uploads.update(id), data),

  delete: (id: string) => apiDelete<{ success: boolean }>(API_ROUTES.uploads.delete(id)),
};
