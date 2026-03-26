/**
 * Reserved usernames that cannot be registered by users.
 *
 * Categories:
 * 1. System / infrastructure
 * 2. URL routing / app paths
 * 3. Common role / identity words
 * 4. Boatrace-specific terms
 *
 * Note: Offensive words are handled by lame-name.ts (partial match),
 * so they are not duplicated here.
 */

const RESERVED_USERNAMES: ReadonlySet<string> = new Set([
  // ── 1. System / infrastructure ──
  // Note: "admin" is excluded from this list because it is reserved for use
  // as an operator's own username.
  'administrator',
  'api',
  'auth',
  'bot',
  'cron',
  'daemon',
  'debug',
  'dev',
  'email',
  'ftp',
  'git',
  'guest',
  'help',
  'hostmaster',
  'imap',
  'info',
  'localhost',
  'mail',
  'mailer',
  'mx',
  'news',
  'noc',
  'noreply',
  'no_reply',
  'null',
  'operator',
  'pop',
  'postmaster',
  'root',
  'security',
  'smtp',
  'ssl',
  'ssladmin',
  'staging',
  'status',
  'support',
  'sys',
  'sysadmin',
  'system',
  'test',
  'undefined',
  'usenet',
  'webmaster',
  'www',

  // ── 2. URL routing / app paths ──
  'about',
  'account',
  'billing',
  'callback',
  'contact',
  'dashboard',
  'docs',
  'explore',
  'feed',
  'home',
  'legal',
  'login',
  'logout',
  'mypage',
  'notifications',
  'pricing',
  'privacy',
  'profile',
  'races',
  'search',
  'settings',
  'sign_in',
  'sign_up',
  'signin',
  'signup',
  'terms',
  'tos',
  'welcome',

  // ── 3. Common role / identity words ──
  'anonymous',
  'everyone',
  'member',
  'moderator',
  'mod',
  'nobody',
  'official',
  'owner',
  'staff',
  'superuser',
  'user',

  // ── 4. Boatrace-specific terms ──
  'boatrace',
  'kyotei',
  'race',
  'racer',
  'stadium',
  'boat',
  'motor',
  'course',
  'regatta',
  'odds',
  'betting',
  'trifecta',
  'quinella',
  'exacta',
  'place',
  'show',
  'win',
]);

export function isReservedUsername(username: string): boolean {
  return RESERVED_USERNAMES.has(username.toLowerCase());
}
