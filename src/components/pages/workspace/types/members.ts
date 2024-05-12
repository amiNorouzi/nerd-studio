import type { Workspace } from "@/services/types";

export type WorkspaceMember = {
  id: number;
  user: {
    email: string;
    username: string;
    first_name: string;
    last_name: string;
    is_active: boolean;
    date_joined: string;
    phone_number: null | string;
    description: null | string;
    is_verified: boolean;
  };
  role: string;
  workspace: Workspace;
};
