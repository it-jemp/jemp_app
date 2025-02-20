import * as Sentry from "@sentry/nuxt"

Sentry.init({
  dsn: "https://5cc4057c916260b2a6abb4687b158735@o4508852702281728.ingest.de.sentry.io/4508852703854672",

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
})
