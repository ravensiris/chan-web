import { BASE_URL, find_url, try_get_resource } from "../api";

describe("find_url", () => {
  describe("/boards", () => {
    test("/", () => {
      expect(find_url({ board: "" }).toString()).toStrictEqual(
        new URL("/boards/", BASE_URL).toString(),
      );
    });

    test("/test", () => {
      expect(find_url({ board: "test" }).toString()).toStrictEqual(
        new URL("/boards/test", BASE_URL).toString(),
      );
    });

    describe("/test/threads", () => {
      test("/", () => {
        expect(find_url({ board: "test", thread: "" }).toString()).toStrictEqual(
          new URL("/boards/test/threads/", BASE_URL).toString(),
        );
      });

      test("/123", () => {
        expect(find_url({ board: "test", thread: "123" }).toString()).toStrictEqual(
          new URL("/boards/test/threads/123", BASE_URL).toString(),
        );
      });
    });
  });

  test("fails /boards/?/threads/123", () => {
    expect(() => {
      find_url({ thread: "123" });
    }).toThrow("No match");
  });
});
