import { find_url, try_get_resource } from "./api";

import axios from "redaxios";

export interface ImageInterface {
  id: string;
  mime?: string;
  data?: string;
}

const readAsBase64: (file: File) => Promise<ArrayBuffer|null|string> = (file: File) => new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
});

export default class Image implements ImageInterface {
  id: string;
  mime?: string | undefined;
  data?: string | undefined;

  constructor(data: ImageInterface) {
    this.id = data.id;
    this.mime = data.mime;
    this.data = data.data;
  }

  static async fetch(id: string): Promise<Image> {
    return new Image(await try_get_resource({ image: id }));
  }

  async send(file: File): Promise<Image>{
    const data = await readAsBase64(file);
    console.log(data);
    return new Image((await axios.post<ImageInterface>(this.url, {data})).data);
  }

  get url(): string {
      return find_url({image: this.id}).toString();
  }

}