import { GRAPHQL_AUTH_MODE } from "@aws-amplify/api";
import { CreateParams, CreateResult, DeleteManyParams, DeleteManyResult, DeleteParams, DeleteResult, GetListParams, GetListResult, GetManyParams, GetManyReferenceParams, GetManyReferenceResult, GetManyResult, GetOneParams, GetOneResult, UpdateManyParams, UpdateManyResult, UpdateParams, UpdateResult } from "ra-core";
export interface Operations {
    queries: Record<string, string>;
    mutations: Record<string, string>;
}
export interface DataProviderOptions {
    authMode?: GRAPHQL_AUTH_MODE;
}
export declare class DataProvider {
    queries: Record<string, string>;
    mutations: Record<string, string>;
    authMode: GRAPHQL_AUTH_MODE;
    constructor(operations: Operations, options?: DataProviderOptions);
    getList: (resource: string, params: GetListParams) => Promise<GetListResult>;
    getOne: (resource: string, params: GetOneParams) => Promise<GetOneResult>;
    getMany: (resource: string, params: GetManyParams) => Promise<GetManyResult>;
    getManyReference: (resource: string, params: GetManyReferenceParams) => Promise<GetManyReferenceResult>;
    create: (resource: string, params: CreateParams) => Promise<CreateResult>;
    update: (resource: string, params: UpdateParams) => Promise<UpdateResult>;
    updateMany: (resource: string, params: UpdateManyParams) => Promise<UpdateManyResult>;
    delete: (resource: string, params: DeleteParams) => Promise<DeleteResult>;
    deleteMany: (resource: string, params: DeleteManyParams) => Promise<DeleteManyResult>;
    getQuery(queryName: string): string;
    graphql(query: string, variables: Record<string, unknown>): Promise<any>;
}
