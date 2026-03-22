export interface paths {
    "/ping": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Ping */
        get: operations["ping_ping_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/errors": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Example Errors From Server */
        get: operations["example_errors_from_server_errors_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/contact/count": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get Contact Count
         * @description Возвращает количество контактов текущего пользователя.
         */
        get: operations["get_contact_count_contact_count_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/contact/list": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get Contacts */
        get: operations["get_contacts_contact_list_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/contact/add": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Add Contact
         * @description Передать или user_id или login или friend_code
         */
        post: operations["add_contact_contact_add_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/contact/update": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        /** Update Contact */
        patch: operations["update_contact_contact_update_patch"];
        trace?: never;
    };
    "/contact/remove": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /** Remove Contact */
        delete: operations["remove_contact_contact_remove_delete"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/blacklist/list": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get Blacklist */
        get: operations["get_blacklist_blacklist_list_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/blacklist/add": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Add To Blacklist */
        post: operations["add_to_blacklist_blacklist_add_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/blacklist/remove": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /** Remove From Blacklist */
        delete: operations["remove_from_blacklist_blacklist_remove_delete"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/role": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get User Role */
        get: operations["get_user_role_role_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        /** BaseResponse */
        BaseResponse: {
            /** Status */
            status: string;
            data: components["schemas"]["MessageData"];
        };
        /** BlacklistCreateRequest */
        BlacklistCreateRequest: {
            /** User Id */
            user_id?: string | null;
            /** Login */
            login?: string | null;
        };
        /** BlacklistCreateResponse */
        BlacklistCreateResponse: {
            /** Status */
            status: string;
            data: components["schemas"]["BlacklistInfo"];
        };
        /** BlacklistDeleteRequest */
        BlacklistDeleteRequest: {
            /**
             * User Id
             * Format: uuid
             */
            user_id: string;
        };
        /** BlacklistInfo */
        BlacklistInfo: {
            /**
             * User Id
             * Format: uuid
             */
            user_id: string;
            /** Login */
            login?: string | null;
            /** Full Name */
            full_name?: string | null;
            /**
             * Created At
             * Format: date-time
             * @description Дата добавления в Blacklist
             */
            created_at: string;
        };
        /** BlacklistInfoData */
        BlacklistInfoData: {
            /** Items */
            items: components["schemas"]["BlacklistInfo"][];
            /** Has More */
            has_more: boolean;
        };
        /** BlacklistInfoResponse */
        BlacklistInfoResponse: {
            /** Status */
            status: string;
            data: components["schemas"]["BlacklistInfoData"];
        };
        /** ContactCountData */
        ContactCountData: {
            /** Count */
            count: number;
        };
        /** ContactCountResponse */
        ContactCountResponse: {
            /** Status */
            status: string;
            data: components["schemas"]["ContactCountData"];
        };
        /** ContactCreateRequest */
        ContactCreateRequest: {
            /** User Id */
            user_id?: string | null;
            /** Login */
            login?: string | null;
            /** Friend Code */
            friend_code?: string | null;
            /** Custom Name */
            custom_name?: string | null;
        };
        /** ContactCreateResponse */
        ContactCreateResponse: {
            /** Status */
            status: string;
            data: components["schemas"]["ContactInfo"];
        };
        /** ContactDeleteRequest */
        ContactDeleteRequest: {
            /**
             * User Id
             * Format: uuid
             */
            user_id: string;
        };
        /** ContactInfo */
        ContactInfo: {
            /**
             * User Id
             * Format: uuid
             */
            user_id: string;
            /** Login */
            login?: string | null;
            /** Full Name */
            full_name?: string | null;
            /** Custom Name */
            custom_name?: string | null;
            /** Friend Code */
            friend_code: boolean;
            /**
             * Created At
             * Format: date-time
             * @description Дата добавления в контакты
             */
            created_at: string;
            /**
             * Last Seen At
             * @description Дата последнего онлайна
             */
            last_seen_at?: string | null;
        };
        /** ContactInfoData */
        ContactInfoData: {
            /** Items */
            items: components["schemas"]["ContactInfo"][];
            /** Has More */
            has_more: boolean;
        };
        /** ContactInfoResponse */
        ContactInfoResponse: {
            /** Status */
            status: string;
            data: components["schemas"]["ContactInfoData"];
        };
        /** ContactUpdateRequest */
        ContactUpdateRequest: {
            /**
             * User Id
             * Format: uuid
             */
            user_id: string;
            /** Custom Name */
            custom_name?: string | null;
        };
        /** MessageData */
        MessageData: {
            /** Message */
            message: string;
        };
        /** UserPrivilege */
        UserPrivilege: {
            /** Id */
            id: number;
            /** Code */
            code: string;
            /** Name */
            name: string;
            /** Description */
            description: string;
            /** Is Active */
            is_active: boolean;
            /**
             * Created At
             * Format: date-time
             */
            created_at: string;
        };
        /** UserRoleData */
        UserRoleData: {
            /**
             * User Id
             * Format: uuid
             * @description ID пользователя
             */
            user_id: string;
            /** @description Привилегия пользователя */
            user_privilege?: components["schemas"]["UserPrivilege"] | null;
            /**
             * User Permissions
             * @description Список кодов прав
             */
            user_permissions?: string[];
        };
        /** UserRoleResponse */
        UserRoleResponse: {
            /** Status */
            status: string;
            data: components["schemas"]["UserRoleData"];
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    ping_ping_get: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BaseResponse"];
                };
            };
        };
    };
    example_errors_from_server_errors_get: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BaseResponse"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "status": "error",
                     *       "errors": [
                     *         {
                     *           "field": "general",
                     *           "message": "Bad request syntax or invalid parameters"
                     *         }
                     *       ]
                     *     }
                     */
                    "application/json": unknown;
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "status": "error",
                     *       "errors": [
                     *         {
                     *           "field": "login",
                     *           "message": "Invalid login or password"
                     *         }
                     *       ]
                     *     }
                     */
                    "application/json": unknown;
                };
            };
            /** @description Forbidden */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "status": "error",
                     *       "errors": [
                     *         {
                     *           "field": "permission",
                     *           "message": "You don't have access to this resource"
                     *         }
                     *       ]
                     *     }
                     */
                    "application/json": unknown;
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "status": "error",
                     *       "errors": [
                     *         {
                     *           "field": "resource",
                     *           "message": "Requested resource not found"
                     *         }
                     *       ]
                     *     }
                     */
                    "application/json": unknown;
                };
            };
            /** @description Method Not Allowed */
            405: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "status": "error",
                     *       "errors": [
                     *         {
                     *           "field": "method",
                     *           "message": "Method not allowed on this endpoint"
                     *         }
                     *       ]
                     *     }
                     */
                    "application/json": unknown;
                };
            };
            /** @description Conflict */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "status": "error",
                     *       "errors": [
                     *         {
                     *           "field": "conflict",
                     *           "message": "Resource already exists or conflict occurred"
                     *         }
                     *       ]
                     *     }
                     */
                    "application/json": unknown;
                };
            };
            /** @description I'm a teapot (In Development) */
            418: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "status": "error",
                     *       "errors": [
                     *         {
                     *           "field": "debug",
                     *           "message": "This feature is under development"
                     *         }
                     *       ]
                     *     }
                     */
                    "application/json": unknown;
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "status": "error",
                     *       "errors": [
                     *         {
                     *           "field": "login",
                     *           "message": "Login must not contain whitespace characters"
                     *         }
                     *       ]
                     *     }
                     */
                    "application/json": unknown;
                };
            };
            /** @description Internal Server Error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "status": "error",
                     *       "errors": [
                     *         {
                     *           "field": "server",
                     *           "message": "An unexpected error occurred. Please try again later."
                     *         }
                     *       ]
                     *     }
                     */
                    "application/json": unknown;
                };
            };
        };
    };
    get_contact_count_contact_count_get: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ContactCountResponse"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "status": "error",
                     *       "errors": [
                     *         {
                     *           "field": "login",
                     *           "message": "Invalid login or password"
                     *         }
                     *       ]
                     *     }
                     */
                    "application/json": unknown;
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "status": "error",
                     *       "errors": [
                     *         {
                     *           "field": "login",
                     *           "message": "Login must not contain whitespace characters"
                     *         }
                     *       ]
                     *     }
                     */
                    "application/json": unknown;
                };
            };
        };
    };
    get_contacts_contact_list_get: {
        parameters: {
            query?: {
                /** @description Смещение для пагинации */
                offset?: number;
                /** @description Количество юзеров для загрузки */
                limit?: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ContactInfoResponse"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "status": "error",
                     *       "errors": [
                     *         {
                     *           "field": "login",
                     *           "message": "Invalid login or password"
                     *         }
                     *       ]
                     *     }
                     */
                    "application/json": unknown;
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "status": "error",
                     *       "errors": [
                     *         {
                     *           "field": "login",
                     *           "message": "Login must not contain whitespace characters"
                     *         }
                     *       ]
                     *     }
                     */
                    "application/json": unknown;
                };
            };
        };
    };
    add_contact_contact_add_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["ContactCreateRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ContactCreateResponse"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "status": "error",
                     *       "errors": [
                     *         {
                     *           "field": "general",
                     *           "message": "Bad request syntax or invalid parameters"
                     *         }
                     *       ]
                     *     }
                     */
                    "application/json": unknown;
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "status": "error",
                     *       "errors": [
                     *         {
                     *           "field": "login",
                     *           "message": "Invalid login or password"
                     *         }
                     *       ]
                     *     }
                     */
                    "application/json": unknown;
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "status": "error",
                     *       "errors": [
                     *         {
                     *           "field": "resource",
                     *           "message": "Requested resource not found"
                     *         }
                     *       ]
                     *     }
                     */
                    "application/json": unknown;
                };
            };
            /** @description Conflict */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "status": "error",
                     *       "errors": [
                     *         {
                     *           "field": "conflict",
                     *           "message": "Resource already exists or conflict occurred"
                     *         }
                     *       ]
                     *     }
                     */
                    "application/json": unknown;
                };
            };
            /** @description I'm a teapot (In Development) */
            418: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "status": "error",
                     *       "errors": [
                     *         {
                     *           "field": "debug",
                     *           "message": "This feature is under development"
                     *         }
                     *       ]
                     *     }
                     */
                    "application/json": unknown;
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "status": "error",
                     *       "errors": [
                     *         {
                     *           "field": "login",
                     *           "message": "Login must not contain whitespace characters"
                     *         }
                     *       ]
                     *     }
                     */
                    "application/json": unknown;
                };
            };
        };
    };
    update_contact_contact_update_patch: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["ContactUpdateRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BaseResponse"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "status": "error",
                     *       "errors": [
                     *         {
                     *           "field": "login",
                     *           "message": "Invalid login or password"
                     *         }
                     *       ]
                     *     }
                     */
                    "application/json": unknown;
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "status": "error",
                     *       "errors": [
                     *         {
                     *           "field": "resource",
                     *           "message": "Requested resource not found"
                     *         }
                     *       ]
                     *     }
                     */
                    "application/json": unknown;
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "status": "error",
                     *       "errors": [
                     *         {
                     *           "field": "login",
                     *           "message": "Login must not contain whitespace characters"
                     *         }
                     *       ]
                     *     }
                     */
                    "application/json": unknown;
                };
            };
        };
    };
    remove_contact_contact_remove_delete: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["ContactDeleteRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BaseResponse"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "status": "error",
                     *       "errors": [
                     *         {
                     *           "field": "login",
                     *           "message": "Invalid login or password"
                     *         }
                     *       ]
                     *     }
                     */
                    "application/json": unknown;
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "status": "error",
                     *       "errors": [
                     *         {
                     *           "field": "resource",
                     *           "message": "Requested resource not found"
                     *         }
                     *       ]
                     *     }
                     */
                    "application/json": unknown;
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "status": "error",
                     *       "errors": [
                     *         {
                     *           "field": "login",
                     *           "message": "Login must not contain whitespace characters"
                     *         }
                     *       ]
                     *     }
                     */
                    "application/json": unknown;
                };
            };
        };
    };
    get_blacklist_blacklist_list_get: {
        parameters: {
            query?: {
                /** @description Смещение для пагинации */
                offset?: number;
                /** @description Количество юзеров для загрузки */
                limit?: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BlacklistInfoResponse"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "status": "error",
                     *       "errors": [
                     *         {
                     *           "field": "login",
                     *           "message": "Invalid login or password"
                     *         }
                     *       ]
                     *     }
                     */
                    "application/json": unknown;
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "status": "error",
                     *       "errors": [
                     *         {
                     *           "field": "login",
                     *           "message": "Login must not contain whitespace characters"
                     *         }
                     *       ]
                     *     }
                     */
                    "application/json": unknown;
                };
            };
        };
    };
    add_to_blacklist_blacklist_add_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["BlacklistCreateRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BlacklistCreateResponse"];
                };
            };
            /** @description Bad Request */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "status": "error",
                     *       "errors": [
                     *         {
                     *           "field": "general",
                     *           "message": "Bad request syntax or invalid parameters"
                     *         }
                     *       ]
                     *     }
                     */
                    "application/json": unknown;
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "status": "error",
                     *       "errors": [
                     *         {
                     *           "field": "login",
                     *           "message": "Invalid login or password"
                     *         }
                     *       ]
                     *     }
                     */
                    "application/json": unknown;
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "status": "error",
                     *       "errors": [
                     *         {
                     *           "field": "resource",
                     *           "message": "Requested resource not found"
                     *         }
                     *       ]
                     *     }
                     */
                    "application/json": unknown;
                };
            };
            /** @description Conflict */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "status": "error",
                     *       "errors": [
                     *         {
                     *           "field": "conflict",
                     *           "message": "Resource already exists or conflict occurred"
                     *         }
                     *       ]
                     *     }
                     */
                    "application/json": unknown;
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "status": "error",
                     *       "errors": [
                     *         {
                     *           "field": "login",
                     *           "message": "Login must not contain whitespace characters"
                     *         }
                     *       ]
                     *     }
                     */
                    "application/json": unknown;
                };
            };
        };
    };
    remove_from_blacklist_blacklist_remove_delete: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["BlacklistDeleteRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BaseResponse"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "status": "error",
                     *       "errors": [
                     *         {
                     *           "field": "login",
                     *           "message": "Invalid login or password"
                     *         }
                     *       ]
                     *     }
                     */
                    "application/json": unknown;
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "status": "error",
                     *       "errors": [
                     *         {
                     *           "field": "resource",
                     *           "message": "Requested resource not found"
                     *         }
                     *       ]
                     *     }
                     */
                    "application/json": unknown;
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "status": "error",
                     *       "errors": [
                     *         {
                     *           "field": "login",
                     *           "message": "Login must not contain whitespace characters"
                     *         }
                     *       ]
                     *     }
                     */
                    "application/json": unknown;
                };
            };
        };
    };
    get_user_role_role_get: {
        parameters: {
            query?: {
                user_id?: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["UserRoleResponse"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "status": "error",
                     *       "errors": [
                     *         {
                     *           "field": "login",
                     *           "message": "Invalid login or password"
                     *         }
                     *       ]
                     *     }
                     */
                    "application/json": unknown;
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "status": "error",
                     *       "errors": [
                     *         {
                     *           "field": "resource",
                     *           "message": "Requested resource not found"
                     *         }
                     *       ]
                     *     }
                     */
                    "application/json": unknown;
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "status": "error",
                     *       "errors": [
                     *         {
                     *           "field": "login",
                     *           "message": "Login must not contain whitespace characters"
                     *         }
                     *       ]
                     *     }
                     */
                    "application/json": unknown;
                };
            };
        };
    };
}
