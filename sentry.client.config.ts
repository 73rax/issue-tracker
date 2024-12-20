// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://75f2e8dad4881f6690afcbde219374ad@o4506224987930624.ingest.sentry.io/4506224992518144",
   // Replay may only be enabled for the client-side
   integrations: [Sentry.replayIntegration()],

   // Set tracesSampleRate to 1.0 to capture 100%
   // of transactions for tracing.
   // We recommend adjusting this value in production
   tracesSampleRate: 1.0,
 
   // Capture Replay for 10% of all sessions,
   // plus for 100% of sessions with an error
   replaysSessionSampleRate: 0.1,
   replaysOnErrorSampleRate: 1.0,
 
  // // Adjust this value in production, or use tracesSampler for greater control
  // tracesSampleRate: 1,

  // // Setting this option to true will print useful information to the console while you're setting up Sentry.
  // debug: false,

  // replaysOnErrorSampleRate: 1.0,

  // // This sets the sample rate to be 10%. You may want this to be 100% while
  // // in development and sample at a lower rate in production
  // replaysSessionSampleRate: 0.1,

  // // You can remove this option if you're not planning to use the Sentry Session Replay feature:
  // integrations: [
  //   new Sentry.Replay({
  //     // Additional Replay configuration goes in here, for example:
  //     maskAllText: true,
  //     blockAllMedia: true,
  //   }),
  // ],
});
