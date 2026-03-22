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
    "/search": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Search By Query
         * @description Поиск пользователей по логину (по префиксу, максимум 10 результатов).
         *
         *     Показываются пользователи:
         *     - у которых is_searchable = true
         *     - или находятся в контактах текущего пользователя
         *     - или текущий пользователь находится у них в контактах
         *
         *     Показываются беседы (не работает):
         *     - в которых находится пользователь
         *
         *     Показываются паблики (не работает):
         *     - у которых is_private = false
         *     - или пользователь состоит в паблике
         *     - или пользователь админ паблика
         *
         *     Показываются сообщения (не работает):
         *     - в которых находится пользователь
         */
        get: operations["search_by_query_search_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/user/search": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Search By Query
         * @description Поиск пользователей по логину (по префиксу, максимум 10 результатов).
         *
         *     Показываются пользователи:
         *     - у которых is_searchable = true
         *     - или находятся в контактах текущего пользователя
         *     - или текущий пользователь находится у них в контактах
         */
        get: operations["search_by_query_user_search_get"];
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
        /** MessageData */
        MessageData: {
            /** Message */
            message: string;
        };
        /** SearchResponse */
        SearchResponse: {
            /** Status */
            status: string;
            data: components["schemas"]["api__schemas__search__SearchData"];
        };
        /** UserSearchResponse */
        UserSearchResponse: {
            /** Status */
            status: string;
            data: components["schemas"]["api__schemas__user__search__SearchData"];
        };
        /** UserSearchResult */
        UserSearchResult: {
            /**
             * User Id
             * Format: uuid
             */
            user_id: string;
            /**
             * Profile
             * @description Модель как у /profile/{user_id}
             */
            profile?: unknown | null;
        };
        /** SearchData */
        api__schemas__search__SearchData: {
            /** Users */
            users: components["schemas"]["UserSearchResult"][];
            /**
             * Groups
             * @default []
             */
            groups: unknown[];
            /**
             * Channels
             * @default []
             */
            channels: unknown[];
            /**
             * Messages
             * @default []
             */
            messages: unknown[];
        };
        /** SearchData */
        api__schemas__user__search__SearchData: {
            /** Users */
            users: components["schemas"]["UserSearchResult"][];
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
    search_by_query_search_get: {
        parameters: {
            query: {
                query: string;
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
                    "application/json": components["schemas"]["SearchResponse"];
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
    search_by_query_user_search_get: {
        parameters: {
            query: {
                query: string;
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
                    "application/json": components["schemas"]["UserSearchResponse"];
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
}
