import Reply, { ReplyInterface } from "./reply";
import { find_url, try_get_resource } from "./api";

import axios from "redaxios";

export interface ThreadInterface {
  id: string;
  board_id: string;
  created_at: string;
  updated_at: string;
  op: Reply;
}

export interface ReplyPostInterface {
  title: string;
  body: string;
  wants_image?: boolean;
}

export default class Thread implements ThreadInterface {
  id: string;
  board_id: string;
  created_at: string;
  updated_at: string;
  public op: Reply;
  constructor(data: ThreadInterface) {
    this.id = data.id;
    this.board_id = data.board_id;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;

    if (!(data.op instanceof Reply)){
      this.op = new Reply(data.op);
    }else{
      this.op = data.op;
    }
  }

  static async fetch(board_id: string, id: string): Promise<Thread> {
    return new Thread(await try_get_resource({ board: board_id, thread: id }));
  }

  static async fetchAll(board_id: string): Promise<Thread[]> {
    const data: ThreadInterface[] = await try_get_resource({ board: board_id, thread: "" });

    return data.map((t) => new Thread(t));
  }

  static async create(
    board_id: string,
    op: ReplyPostInterface,
  ): Promise<Thread> {
    const response = await axios.post<ThreadInterface>(
      find_url({ board: board_id, thread: "" }).toString(),
      op,
    );

    return new Thread(response.data);
  }

  static async reply(
    id: string,
    board_id: string,
    reply: ReplyPostInterface,
  ): Promise<Reply> {
    const response = await axios.post<ReplyInterface>(
      find_url({ board: board_id, thread: id, reply: "" }).toString(),
      reply,
    );

    return new Reply(response.data);
  }
}
