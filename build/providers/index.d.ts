import { AuthProvider as AuthProviderInterface, DataProvider as DataProviderInterface } from "ra-core";
import { AuthProviderOptions } from "./AuthProvider";
import { DataProviderOptions, Operations } from "./DataProvider";
export declare function buildAuthProvider(options?: AuthProviderOptions): AuthProviderInterface;
export declare function buildDataProvider(operations: Operations, options?: DataProviderOptions): DataProviderInterface;
