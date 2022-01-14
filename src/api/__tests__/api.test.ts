import { BASE_URL, find_url, try_get_resource } from "../api";

describe("find_url", () => {
  describe("/boards", () => {
    test("/", () => {
      expect(find_url({ board: "" })).toStrictEqual(
        new URL("/boards/", BASE_URL),
      );
    });

    test("/test", () => {
      expect(find_url({ board: "test" })).toStrictEqual(
        new URL("/boards/test", BASE_URL),
      );
    });

    describe("/test/threads", () => {
      test("/", () => {
        expect(find_url({ board: "test", thread: "" })).toStrictEqual(
          new URL("/boards/test/threads", BASE_URL),
        );
      });

      test("/123", () => {
        expect(find_url({ board: "test", thread: "123" })).toStrictEqual(
          new URL("/boards/test/threads/123", BASE_URL),
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
