const {
  isDefineOptionValue,
  isDisabledButton,
  modifyOption,
  translateFromEnToRu,
  defineParam,
} = require("utils/products");

describe("Product utils", () => {
  describe("should test isDefineOptionValue function", () => {
    it("should get the object with OptionShape type", () => {
      const result = isDefineOptionValue({
        colors: {
          key: "0",
          content: "white",
        },
      });

      expect(result).toEqual({
        colors: {
          key: "0",
          content: "white",
        },
      });
    });

    it("should get the empty string with undefined initial value", () => {
      const result = isDefineOptionValue(undefined);

      expect(result).toEqual("");
    });

    test("should get the empty string with empty string initial value", () => {
      const result = isDefineOptionValue("");

      expect(result).toEqual("");
    });
  });

  describe("should test isDisabledButton function", () => {
    it("should get falsy value with all correct params", () => {
      const result = isDisabledButton(
        {
          colors: {
            key: "0",
            content: "white",
          },
          sizes: {
            key: "0",
            content: "L",
          },
          stickerName: {
            key: "0",
            content: "1",
          },
        },
        ["white"],
        ["L"],
        ["1", "2"]
      );

      expect(result).toBeFalsy();
    });

    it("should get falsy value with correct 3 params", () => {
      const result = isDisabledButton(
        {
          colors: {
            key: "0",
            content: "white",
          },
          sizes: {
            key: "0",
            content: "L",
          },
        },
        ["white"],
        ["L"]
      );

      expect(result).toBeFalsy();
    });

    it("should get truthy value with incorrect  params", () => {
      const result = isDisabledButton(
        {
          colors: {
            key: "0",
            content: "white",
          },
          sizes: {
            key: "0",
            content: "L",
          },
        },
        ["white"],
        ["L"],
        ["1", "2"]
      );

      expect(result).toBeTruthy();
    });
  });

  describe("should test modifyOption function", () => {
    it("should get an object from an array of strings", () => {
      const result = modifyOption(["One", "Two", "Three"]);

      expect(result).toEqual([
        {
          key: "0",
          content: "One",
        },
        {
          key: "1",
          content: "Two",
        },
        {
          key: "2",
          content: "Three",
        },
      ]);
    });

    it("should get an object from an array of numbers", () => {
      const result = modifyOption([1, 2, 3]);

      expect(result).toEqual([
        {
          key: "0",
          content: "1",
        },
        {
          key: "1",
          content: "2",
        },
        {
          key: "2",
          content: "3",
        },
      ]);
    });

    it("should get an empty array", () => {
      const result = modifyOption([]);

      expect(result).toEqual([]);
    });
  });

  describe("should test translateFromEnToRu function", () => {
    it("should test with translate black to черный", () => {
      const result = translateFromEnToRu("black");

      expect(result).toEqual("черный");
    });

    it("should test with translate orange word to orange", () => {
      const result = translateFromEnToRu("orange");

      expect(result).toEqual("orange");
    });

    it("should test with empty string", () => {
      const result = translateFromEnToRu("");

      expect(result).toEqual("");
    });
  });

  describe("should test defineParam function", () => {
    it("should test with return XS", () => {
      const result = defineParam({ key: "0", content: "XS" });

      expect(result).toEqual("XS");
    });

    it("should test with return белый", () => {
      const result = defineParam({ key: "0", content: "белый" });

      expect(result).toEqual("белый");
    });

    it("should test with return null", () => {
      const result = defineParam(undefined);

      expect(result).toEqual(null);
    });
  });
});
