import { CognitoUser } from "@aws-amplify/auth";
export interface AuthProviderOptions {
    authGroups?: string[];
}
export declare class AuthProvider {
    authGroups: string[];
    constructor(options?: AuthProviderOptions);
    login: ({ username, password, clientMetadata, }: Record<string, unknown>) => Promise<CognitoUser | unknown>;
    changePassword: ({ user, oldPassword, newPassword, clientMetadata, }: Record<string, unknown>) => Promise<string>;
    logout: () => Promise<any>;
    checkAuth: () => Promise<void>;
    checkError: (error: Record<string, unknown>) => Promise<void>;
    getPermissions: () => Promise<string[]>;
}
