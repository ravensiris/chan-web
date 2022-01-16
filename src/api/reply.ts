import { try_get_resource } from "./api";

export interface ReplyInterface {
  id: string;
  thread_id: string;
  image_id?: string;
  title: string;
  body: string;
  created_at: string;
  updated_at: string;
}

export default class Reply implements ReplyInterface {

    id: string;
    thread_id: string;
    image_id?: string;
    title: string;
    body: string;
    created_at: string;
    updated_at: string;

  constructor(data: ReplyInterface) {
    this.id = data.id;
    this.thread_id = data.thread_id;
    this.title = data.title;
    this.body = data.body;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
  }

  static async fetch(board_id: string,thread_id:string, id: string): Promise<Reply> {
    return await try_get_resource({ board: board_id, thread: thread_id, reply: id});
  }

  static async fetchAll(board_id: string, thread_id: string): Promise<Reply[]> {
    return await try_get_resource({ board: board_id, thread: thread_id, reply: ""});
  }
}
