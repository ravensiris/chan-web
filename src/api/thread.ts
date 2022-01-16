import Reply from "./reply";
import { try_get_resource } from "./api";

export interface ThreadInterface {
  id: string;
  board_id: string;
  created_at: string;
  updated_at: string;
  op: Reply;
}

export default class Thread implements ThreadInterface {
    id: string;
    board_id: string;
    created_at: string;
    updated_at: string;
    op: Reply;
  constructor(data: ThreadInterface) {
    this.id = data.id;
    this.board_id = data.board_id;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
    this.op = data.op;
  }

  static async fetch(board_id: string, id: string): Promise<Thread> {
    return await try_get_resource({ board: board_id, thread: id});
  }

  static async fetchAll(board_id: string): Promise<Thread[]> {
    return await try_get_resource({ board: board_id, thread: "" });
  }
}
