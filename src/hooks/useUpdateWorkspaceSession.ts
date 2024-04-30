import { useCallback } from 'react';
import { useSession } from 'next-auth/react';
import type { Workspace } from "@/services/types";

export function useUpdateWorkspaceSession() {
  const { data: session, update } = useSession();

  const updateUserWorkspace = useCallback(async (workspace: Workspace) => {
    await update({
      ...session,
      user: {
        ...session?.user,
        workspace,
      },
    });
  }, [session, update]);

  return updateUserWorkspace;
}
