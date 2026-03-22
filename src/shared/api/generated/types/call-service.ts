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
    "/create": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Create Call
         * @description Публичный метод — создать исходящий звонок.
         */
        post: operations["create_call_create_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/{call_id}/end": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * End Call
         * @description Завершить активный звонок.
         */
        post: operations["end_call__call_id__end_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/internal/{call_id}/end": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Internal End Call
         * @description Завершить активный звонок.
         */
        post: operations["internal_end_call_internal__call_id__end_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/internal/{call_id}/accept": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Internal Accept Call
         * @description Принять входящий звонок.
         */
        post: operations["internal_accept_call_internal__call_id__accept_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/internal/{call_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Internal Call State
         * @description Внутренний метод — получить состояние звонка.
         */
        get: operations["internal_call_state_internal__call_id__get"];
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
        /** CallActionMessageData */
        CallActionMessageData: {
            /** Message */
            message?: string | null;
        };
        /** CallActionResponse */
        CallActionResponse: {
            /** Status */
            status: string;
            data: components["schemas"]["CallActionMessageData"];
        };
        /** CreateCallData */
        CreateCallData: {
            /**
             * Call Id
             * Format: uuid
             */
            call_id: string;
            /**
             * Status
             * @enum {string}
             */
            status: "ringing" | "active" | "ended" | "declined" | "missed";
            /**
             * Started At
             * Format: date-time
             */
            started_at: string;
        };
        /** CreateCallRequest */
        CreateCallRequest: {
            /**
             * To User Id
             * Format: uuid
             * @description ID пользователя, которому звоним
             */
            to_user_id: string;
            /**
             * Call Type
             * @description Тип звонка
             * @default audio
             * @constant
             */
            call_type: "audio";
        };
        /** CreateCallResponse */
        CreateCallResponse: {
            /** Status */
            status: string;
            data: components["schemas"]["CreateCallData"];
        };
        /** HTTPValidationError */
        HTTPValidationError: {
            /** Detail */
            detail?: components["schemas"]["ValidationError"][];
        };
        /** InternalAcceptCallRequest */
        InternalAcceptCallRequest: {
            /**
             * User Id
             * Format: uuid
             */
            user_id: string;
        };
        /** InternalCallStateData */
        InternalCallStateData: {
            /**
             * Call Id
             * Format: uuid
             */
            call_id: string;
            /**
             * Status
             * @enum {string}
             */
            status: "ringing" | "active" | "ended" | "declined" | "missed";
            /**
             * Initiator User Id
             * Format: uuid
             */
            initiator_user_id: string;
            /** Receiver User Ids */
            receiver_user_ids: string[];
            /**
             * Call Type
             * @constant
             */
            call_type: "audio";
            /**
             * Started At
             * Format: date-time
             */
            started_at: string;
            /** Answered At */
            answered_at: string | null;
            /** Ended At */
            ended_at: string | null;
        };
        /** InternalCallStateResponse */
        InternalCallStateResponse: {
            /** Status */
            status: string;
            data: components["schemas"]["InternalCallStateData"];
        };
        /** InternalEndCallRequest */
        InternalEndCallRequest: {
            /**
             * Current User
             * Format: uuid
             */
            current_user: string;
            /**
             * Set Missed
             * @default false
             */
            set_missed: boolean;
        };
        /** MessageData */
        MessageData: {
            /** Message */
            message: string;
        };
        /** ValidationError */
        ValidationError: {
            /** Location */
            loc: (string | number)[];
            /** Message */
            msg: string;
            /** Error Type */
            type: string;
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
    create_call_create_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreateCallRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CreateCallResponse"];
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
    end_call__call_id__end_post: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                call_id: string;
            };
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
                    "application/json": components["schemas"]["CallActionResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    internal_end_call_internal__call_id__end_post: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                call_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["InternalEndCallRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CallActionResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    internal_accept_call_internal__call_id__accept_post: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                call_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["InternalAcceptCallRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CallActionResponse"];
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
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    internal_call_state_internal__call_id__get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                call_id: string;
            };
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
                    "application/json": components["schemas"]["InternalCallStateResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
}
