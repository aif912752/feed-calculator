export default {
  transform: {
    "^.+\\.jsx?$": "babel-jest",
    "^.+\\.vue$": "@vue/vue3-jest"
  },
  moduleFileExtensions: ["js", "jsx", "json", "vue"],
  testEnvironment: "jsdom",
  transformIgnorePatterns: ["/node_modules/"]
};
