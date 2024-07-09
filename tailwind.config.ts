import type { Config } from "tailwindcss"

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        yellow: {
          "50": "#ffffe7",
          "100": "#ffffc1",
          "200": "#fffb86",
          "300": "#fff141",
          "400": "#ffe10d",
          "500": "#ffd200",
          "600": "#d19a00",
          "700": "#a66e02",
          "800": "#89550a",
          "900": "#74460f",
          "950": "#442404",
        },
      },
    },
  },
}
