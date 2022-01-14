import { try_get_resource } from "./api";

export interface BoardInterface {
  id: string;
  name: string;
  shorthand: string;
  description: string;
}

export default class Board implements BoardInterface {
  id: string;
  name: string;
  shorthand: string;
  description: string;

  constructor(data: BoardInterface) {
    this.id = data.id;
    this.name = data.name;
    this.shorthand = data.shorthand;
    this.description = data.description;
  }

  static async fetch(id: string): Promise<Board> {
    return await try_get_resource({ board: id });
  }

  static async fetchAll(): Promise<Board[]> {
    return await try_get_resource({ board: "" });
  }
}
