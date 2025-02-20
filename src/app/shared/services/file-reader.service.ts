import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FileReaderService {
  async readJsonFile<T>(file: File): Promise<T> {
    try {
      const fileContent = await this.readFile(file);

      return JSON.parse(fileContent);
    } catch (_e) {
      throw new Error('Error reading or parsing file');
    }
  }

  private readFile(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event: ProgressEvent<FileReader>) => {
        if (event.target && event.target.result) {
          resolve(event.target.result as string);
        } else {
          reject(new Error('Failed'));
        }
      };

      reader.onerror = () => {
        reject(new Error('Failed'));
      };

      reader.readAsText(file);
    });
  }
}
