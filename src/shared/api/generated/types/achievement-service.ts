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
    "/internal/progress-update": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Internal Achievement Progress Update
         * @description Внутренний метод для обновления прогресса по ачивке.
         */
        post: operations["internal_achievement_progress_update_internal_progress_update_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/internal/update-all": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Internal Achievement Update All
         * @description Внутренний метод для обновления прогресса по ачивке.
         */
        post: operations["internal_achievement_update_all_internal_update_all_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/internal/list": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Internal Achievement List
         * @description Внутренний метод — полный список ачивок для конкретного пользователя.
         */
        get: operations["internal_achievement_list_internal_list_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/my": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get My Achievements
         * @description Публичный метод — достижения текущего пользователя.
         */
        get: operations["get_my_achievements_my_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/user/{user_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get User Achievements
         * @description Публичный метод — достижения другого пользователя.
         *     Секретные скрываем.
         */
        get: operations["get_user_achievements_user__user_id__get"];
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
        /** InternalAchievementListResponse */
        InternalAchievementListResponse: {
            /** Status */
            status: string;
            data: components["schemas"]["PublicAchievementListData"];
        };
        /** InternalAchievementProgressUpdateData */
        InternalAchievementProgressUpdateData: {
            /**
             * Achievement Id
             * @description ID ачивки (achievements.id)
             */
            achievement_id: number;
            /**
             * Achievement Code
             * @description Код ачивки
             */
            achievement_code: string;
            /**
             * Progress
             * @description Текущий прогресс пользователя по ачивке
             */
            progress: number;
            /**
             * Required Progress
             * @description Сколько нужно для выполнения ачивки
             */
            required_progress: number;
            /**
             * Is Completed
             * @description Флаг: ачивка полностью выполнена
             */
            is_completed: boolean;
            /**
             * Just Unlocked
             * @description Была ли ачивка разблокирована именно в этом вызове
             */
            just_unlocked: boolean;
            /**
             * Unlocked At
             * @description Когда ачивка была выполнена (если выполнена)
             */
            unlocked_at?: string | null;
        };
        /** InternalAchievementProgressUpdateRequest */
        InternalAchievementProgressUpdateRequest: {
            /**
             * User Id
             * Format: uuid
             * @description ID пользователя
             */
            user_id: string;
            /**
             * Achievement Code
             * @description Код ачивки (из achievements.code)
             */
            achievement_code: string;
            /**
             * Increment
             * @description Насколько увеличить прогресс (по умолчанию 1)
             * @default 1
             */
            increment: number;
        };
        /** InternalAchievementProgressUpdateResponse */
        InternalAchievementProgressUpdateResponse: {
            /** Status */
            status: string;
            data: components["schemas"]["InternalAchievementProgressUpdateData"];
        };
        /** InternalAchievementUpdateAllRequest */
        InternalAchievementUpdateAllRequest: {
            /**
             * User Id
             * Format: uuid
             * @description ID пользователя
             */
            user_id: string;
        };
        /** MessageData */
        MessageData: {
            /** Message */
            message: string;
        };
        /** PublicAchievementItem */
        PublicAchievementItem: {
            /**
             * Achievement Id
             * @description ID ачивки (achievements.id)
             */
            achievement_id: number;
            /**
             * Code
             * @description Код ачивки
             */
            code: string;
            /**
             * Name
             * @description Название ачивки
             */
            name: string;
            /**
             * Description
             * @description Описание ачивки
             */
            description?: string | null;
            /**
             * Icon
             * @description Путь к иконке
             */
            icon?: string | null;
            /**
             * Category
             * @description Категория (Posts, Comments, Profile, ...)
             */
            category?: string | null;
            /**
             * Badge Type
             * @description Тип медали
             * @enum {string}
             */
            badge_type: "bronze" | "silver" | "gold" | "platinum" | "diamond" | "legendary";
            /**
             * Is Completed
             * @description Выполнена ли ачивка пользователем
             */
            is_completed: boolean;
            /**
             * Unlocked At
             * @description Когда пользователь получил ачивку
             */
            unlocked_at?: string | null;
            /**
             * Progress
             * @description Текущий прогресс пользователя (None, если еще нет записи)
             */
            progress?: number | null;
            /**
             * Required Progress
             * @description Необходимый прогресс для выполнения
             */
            required_progress?: number | null;
        };
        /** PublicAchievementListData */
        PublicAchievementListData: {
            /** Items */
            items: {
                [key: string]: components["schemas"]["PublicAchievementItem"][];
            };
        };
        /** PublicAchievementListResponse */
        PublicAchievementListResponse: {
            /** Status */
            status: string;
            data: components["schemas"]["PublicAchievementListData"];
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
    internal_achievement_progress_update_internal_progress_update_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["InternalAchievementProgressUpdateRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["InternalAchievementProgressUpdateResponse"];
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
    internal_achievement_update_all_internal_update_all_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["InternalAchievementUpdateAllRequest"];
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
    internal_achievement_list_internal_list_get: {
        parameters: {
            query: {
                /** @description ID пользователя, для которого нужно получить список ачивок */
                user_id: string;
                /** @description для своего профиля флаг */
                for_self: boolean;
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
                    "application/json": components["schemas"]["InternalAchievementListResponse"];
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
    get_my_achievements_my_get: {
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
                    "application/json": components["schemas"]["PublicAchievementListResponse"];
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
    get_user_achievements_user__user_id__get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                user_id: string;
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
                    "application/json": components["schemas"]["PublicAchievementListResponse"];
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
