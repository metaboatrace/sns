import { getOptionalUser } from '@/lib/auth';
import { isAdmin } from '@/lib/db/queries/user-roles';

type AuthSuccess = { userId: string };
type AuthFailure = { error: 'unauthorized' };
type AuthResult = AuthSuccess | AuthFailure;

export async function requireAdmin(): Promise<AuthResult> {
  const user = await getOptionalUser();

  if (!user) {
    return { error: 'unauthorized' };
  }

  if (!(await isAdmin(user.id))) {
    return { error: 'unauthorized' };
  }

  return { userId: user.id };
}
