# Configuration

This document details the configuration system for the JEMP application, covering runtime settings, module configuration, and external service integration. The configuration system centralizes application settings and enables connection to services such as Supabase, Kuntur API, and Sentry.

## Configuration Overview

The JEMP application uses Nuxt.js's configuration system, which is primarily defined in the `nuxt.config.ts` file. This configuration provides both compile-time and runtime settings for the application, controlling everything from module loading to external service connections.

## Runtime Configuration

The runtime configuration is divided into two categories:

- Public configuration: Accessible on both client and server sides
- Private configuration: Only accessible on the server side (for sensitive data)

### Public Configuration

| **Setting** | **Description** | **Default Value** |
| --- | --- | --- |
| baseUrl | Base URL for the application | [**http://localhost:3000**](http://localhost:3000/) |
| appVersion | Current application version | 1.0.5 |

To access public configuration in components or pages:

```javascript
// In a component
const config = useRuntimeConfig()
console.log(config.public.baseUrl) // http://localhost:3000
```

### Private Configuration

| **Setting** | **Description** | **Default Value** |
| --- | --- | --- |
| kuntur.token | Authentication token for Teable API | Empty string |
| kuntur.domain | Domain for Kuntur API | Empty string |
| kuntur.eventiTable | ID of `Partecipazione Interna Evento` table in Kuntur | Empty string |
| kuntur.rgTable | ID of `Partecipazione Interna Riunione Generale` table in Kuntur | Empty string |
| kuntur.sociTable | ID of `Anagrafica Socio` table in Kuntur | Empty string |

To access private configuration in server API endpoints:

```javascript
// In a server API endpoint
const config = useRuntimeConfig()
console.log(config.kuntur.domain) // Only available server-side
```

## Module Configuration

JEMP uses several Nuxt.js modules to extend functionality:

### Supabase Configuration

The Supabase module is configured with:

| **Setting** | **Description** | **Value** |
| --- | --- | --- |
| redirectOptions.login | Login page path | /login |
| redirectOptions.callback | Authentication callback path | /confirm |
| redirectOptions.exclude | Paths excluded from authentication | ["/bcard/view/*"] |
| cookieOptions.secure | Whether cookies are secure | true in production |
| types | TypeScript types path | ./interfaces/supabase.ts |

### Sentry Configuration

Sentry error tracking is configured with:

| **Setting** | **Description** |
| --- | --- |
| sourceMapsUploadOptions.org | Organization name in Sentry |
| sourceMapsUploadOptions.project | Project name in Sentry |
| sourceMapsUploadOptions.authToken | Authentication token for Sentry API |

## Environment Variables

The application's configuration can be overridden at runtime using environment variables. Nuxt automatically transforms environment variables with specific prefixes into runtime configuration:

| **Environment Variable** | **Configuration Property** |
| --- | --- |
| NUXT_PUBLIC_BASE_URL | public.baseUrl |
| NUXT_PUBLIC_APP_VERSION | public.appVersion |
| NUXT_KUNTUR_TOKEN | kuntur.token |
| NUXT_KUNTUR_DOMAIN | kuntur.domain |
| NUXT_KUNTUR_EVENTI_TABLE | kuntur.eventiTable |
| NUXT_KUNTUR_RG_TABLE | kuntur.rgTable |
| NUXT_KUNTUR_SOCI_TABLE | kuntur.sociTable |
| NUXT_PUBLIC_SUPABASE_URL |
| NUXT_PUBLIC_SUPABASE_KEY |


These environment variables can be set when deploying the application in different environments to override the default values in the configuration file.

## Summary

The JEMP application's configuration system provides a central place to manage all application settings. It is built on Nuxt.js's configuration system and provides:

- Runtime configuration for both client and server-side access
- Module configuration for integrating with Nuxt.js modules
- External service configuration for connecting to Supabase, Kuntur API, and Sentry
- Environment-specific settings that adjust based on development or production environments

This configuration architecture allows for flexibility while maintaining security by keeping sensitive information server-side only.