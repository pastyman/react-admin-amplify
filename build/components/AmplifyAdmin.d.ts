import React from "react";
import { Operations } from "../providers/DataProvider";
export interface AmplifyAdminOptions {
    authGroups?: string[];
}
export declare const AmplifyAdmin: React.FC<{
    operations: Operations;
    options?: AmplifyAdminOptions;
}>;
