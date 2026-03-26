// Note: server-validation.ts is intentionally NOT re-exported here.
// It uses `import 'server-only'` to prevent inclusion in client bundles.
// Import it directly via `@/lib/username/server-validation` on the server side.
export {
  validateUsernameFormat,
  validateUsername,
  USERNAME_MAX_LENGTH,
  DISPLAY_NAME_MAX_LENGTH,
  type UsernameFormatError,
  type UsernameValidationError,
} from './validation';
