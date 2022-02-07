import "format-unicorn";

import axios from "redaxios";

export const BASE_URL = "https://chan-api-ri.herokuapp.com";

class UrlSegment {
  private segment;
  private static param_exp = new RegExp(/{([^{]*)}/g);
  public isParameterized;
  constructor(segment: string) {
    this.segment = segment;
    this.isParameterized = UrlSegment.param_exp.test(segment);
  }

  public static segments(relative_url: string): UrlSegment[] {
    return relative_url.split("/").map((segment) => new UrlSegment(segment));
  }

  public toString(): string {
    let str = this.segment;

    if (this.isParameterized) {
      str = str.substring(1, str.length - 1);
    }

    return str;
  }
}

class Endpoint {
  private relative_url;
  private segments;

  constructor(relative_url: string) {
    this.relative_url = relative_url;
    this.segments = UrlSegment.segments(relative_url);
  }

  public get parameterized_segments(): UrlSegment[] {
    return this.segments.filter((segment) => segment.isParameterized);
  }

  public matching(params: APIParams): boolean {
    const segments = this.parameterized_segments.map((segment) =>
      segment.toString(),
    );

    const keys = Object.keys(params);

    return (
      segments.length === keys.length &&
      keys.every((key) => segments.includes(key))
    );
  }

  public format(params: APIParams): string {
    return this.relative_url.formatUnicorn(params);
  }

  public toString(): string {
    return this.relative_url;
  }
}

const ENDPOINTS = [
  "/boards/{board}",
  "/boards/{board}/threads/{thread}",
  "/boards/{board}/threads/{thread}/replies/{reply}",
  "/images/{image}",
].map((endpoint) => new Endpoint(endpoint));

export interface APIParams {
  board?: string;
  thread?: string;
  reply?: string;
  image?: string;
}

/**
 * @throws {Error}
 */
export function find_url(params: APIParams): URL {
  const endpoint = ENDPOINTS.find((_endpoint) => _endpoint.matching(params));

  if (!endpoint || endpoint.toString() === "") {
    throw new Error("No match");
  }

  return new URL(endpoint.format(params), BASE_URL);
}

export async function try_get_resource<T>(params: APIParams): Promise<T> {
  const url = find_url(params);
  const response = await axios.get<T>(url.toString());

  return response.data;
}
