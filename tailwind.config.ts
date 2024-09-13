import type { Config } from "tailwindcss"

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        yellow: {
          "50": "#ffffe7",
          "100": "#ffffc1",
          "200": "#fffb86",
          "300": "#fff041",
          "400": "#ffe00d",
          "500": "#ffd100",
          "600": "#d19900",
          "700": "#a66d02",
          "800": "#89550a",
          "900": "#74450f",
          "950": "#442404",
        },
      },
    },
  },
}
