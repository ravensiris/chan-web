import type { APIErrorResponse } from "./error";
import axios from "redaxios";

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
    const response = await axios.get<BoardInterface>(
      `https://chan-api-ri.herokuapp.com/boards/${id}`,
    );

    return new Board(response.data);
  }

  static async fetchAll(): Promise<Board[]>{
    const response = await axios.get<BoardInterface[]>(
      'https://chan-api-ri.herokuapp.com/boards',
    );

    const data = response.data;

    data.forEach((b) => new Board(b));

    return data;
  }
}
