import 'server-only';

/**
 * Partial-match filter for inappropriate usernames.
 *
 * This is an additional layer on top of reserved-usernames.ts (exact match).
 * It catches derivative patterns like "fuckboy", "sh1tface", "official_foo", etc.
 */

const LAME_PATTERNS: readonly string[] = [
  // Sexual expressions
  'fuck',
  'shit',
  'porn',
  'sex',
  'hentai',
  'erotic',
  'penis',
  'vagina',
  'orgasm',
  'masturbat',
  'blowjob',
  'handjob',
  'dildo',
  'analsex',
  'boob',
  'nipple',

  // Discrimination / violence
  'nazi',
  'hitler',
  'nigger',
  'nigga',
  'genocide',
  'holocaust',
  'faggot',
  'slut',
  'whore',
  'rape',
  'terrorist',
  'jihad',
  'kkk',

  // Impersonation patterns (prefix only — leading underscore is blocked by username regex)
  'official_',
  'support_',
  'admin_',
  'moderator_',
  'staff_',
];

export function isLameName(username: string): boolean {
  const lower = username.toLowerCase();
  return LAME_PATTERNS.some((pattern) => lower.includes(pattern));
}
