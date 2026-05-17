export type StoredFile = {
  url: string;
  key: string;
  provider: "local" | "cloudinary";
};

export interface StorageProvider {
  upload(buffer: Buffer, fileName: string, contentType: string): Promise<StoredFile>;
  remove(key: string): Promise<void>;
}

export class LocalStorageProvider implements StorageProvider {
  async upload(_buffer: Buffer, fileName: string): Promise<StoredFile> {
    return {
      provider: "local",
      key: `uploads/${fileName}`,
      url: `/uploads/${fileName}`
    };
  }

  async remove(_key: string): Promise<void> {
    return Promise.resolve();
  }
}

export const storageProvider: StorageProvider = new LocalStorageProvider();
