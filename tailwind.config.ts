const config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}"],
  theme: { extend: {animation: {
        "spin-slow": "spin 30s linear infinite",
      },} },
  plugins: [],
}
export default config
