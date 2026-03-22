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
    "/me": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get My Profile */
        get: operations["get_my_profile_me_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/edit": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /** Edit Profile */
        put: operations["edit_profile_edit_put"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/{user_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get User Profile By User Id */
        get: operations["get_user_profile_by_user_id__user_id__get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/user_id/internal": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Get User Profile By User Id */
        post: operations["get_user_profile_by_user_id_user_id_internal_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/user_ids/internal": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** [internal] Get Profiles Internal */
        post: operations["get_profiles_internal_user_ids_internal_post"];
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
        /** AvatarItem */
        AvatarItem: {
            /** File Id */
            file_id?: string | null;
            /** Mime */
            mime?: string | null;
            /** Size */
            size?: number | null;
            /** Width */
            width?: number | null;
            /** Height */
            height?: number | null;
            /** Created At */
            created_at?: string | null;
        };
        /** AvatarsBlock */
        AvatarsBlock: {
            current?: components["schemas"]["AvatarItem"] | null;
            /** History */
            history?: components["schemas"]["AvatarItem"][];
        };
        /** BaseResponse */
        BaseResponse: {
            /** Status */
            status: string;
            data: components["schemas"]["MessageData"];
        };
        /** HTTPValidationError */
        HTTPValidationError: {
            /** Detail */
            detail?: components["schemas"]["ValidationError"][];
        };
        /** MessageData */
        MessageData: {
            /** Message */
            message: string;
        };
        /** PermissionsResponse */
        PermissionsResponse: {
            /**
             * You Can Send Message
             * @description Можно ли отправить сообщение
             */
            you_can_send_message: boolean;
            /**
             * You Can Public Invite Permission
             * @description Можно ли приглашать в паблики
             */
            you_can_public_invite_permission: boolean;
            /**
             * You Can Group Invite Permission
             * @description Можно ли приглашать в беседы
             */
            you_can_group_invite_permission: boolean;
            /**
             * You Can Call Permission
             * @description Можно ли звонить
             */
            you_can_call_permission: boolean;
        };
        /** ProfileByUserIdData */
        ProfileByUserIdData: {
            /**
             * User Id
             * Format: uuid
             * @description ID пользователя
             */
            user_id: string;
            /**
             * Login
             * @description Логин
             */
            login?: string | null;
            /**
             * Full Name
             * @description Полное имя
             */
            full_name?: string | null;
            /** Custom Name */
            custom_name?: string | null;
            /**
             * Bio
             * @description Биография
             */
            bio?: string | null;
            /**
             * Is Verified
             * @description Подтвержденный (официальный) аккаунт
             * @default false
             */
            is_verified: boolean | null;
            /**
             * Is System
             * @description Системный аккаунт
             * @default false
             */
            is_system: boolean | null;
            /** @description Рейтинг пользователя */
            rating: components["schemas"]["RatingData"];
            /**
             * Last Seen At
             * @description Дата последнего посещения (null если скрыто)
             */
            last_seen_at?: string | null;
            /**
             * Created At
             * Format: date-time
             * @description Дата регистрации
             */
            created_at: string;
            /** @description Блок с текущей аватаркой и историей */
            avatars?: components["schemas"]["AvatarsBlock"];
            /**
             * Stories
             * @description Список сторис пользователя
             */
            stories?: unknown[];
            /** @description что МОЖЕТ текущий пользователь сделать с этим пользователем */
            permissions: components["schemas"]["PermissionsResponse"];
            /** @description что настроено в профиле целевого пользователя */
            profile_permissions: components["schemas"]["api__schemas__user_id__ProfilePermissionsResponse"];
            /** @description Статус отношений между текущим и целевым пользователем */
            relationship: components["schemas"]["RelationshipStatusResponse"];
        };
        /** ProfileByUserIdResponse */
        ProfileByUserIdResponse: {
            /** Status */
            status: string;
            data: components["schemas"]["ProfileByUserIdData"];
        };
        /** ProfileByUserIdsResponse */
        ProfileByUserIdsResponse: {
            /**
             * Status
             * @description Статус ответа
             */
            status: string;
            /**
             * Data
             * @description Профили пользователей по user_id
             */
            data: {
                [key: string]: components["schemas"]["ProfileByUserIdData"];
            };
        };
        /** ProfileData */
        ProfileData: {
            /**
             * User Id
             * Format: uuid
             * @description ID пользователя
             */
            user_id: string;
            /**
             * Login
             * @description Логин
             */
            login: string;
            /**
             * Full Name
             * @description Полное имя
             */
            full_name?: string | null;
            /**
             * Bio
             * @description Биография
             */
            bio?: string | null;
            /**
             * Is Verified
             * @description Подтвержденный (официальный) аккаунт
             * @default false
             */
            is_verified: boolean | null;
            /** @description Рейтинг пользователя */
            rating: components["schemas"]["RatingData"];
            /**
             * Balances
             * @description Список доступных балансов пользователя
             */
            balances: components["schemas"]["WalletBalance"][];
            /**
             * Created At
             * Format: date-time
             * @description Дата регистрации
             */
            created_at: string;
            /** @description Блок с текущей аватаркой и историей */
            avatars?: components["schemas"]["AvatarsBlock"];
            /**
             * Stories
             * @description Список сторис пользователя
             */
            stories?: unknown[];
            /** @description что настроено в профиле целевого пользователя */
            profile_permissions: components["schemas"]["api__schemas__me__ProfilePermissionsResponse"];
        };
        /** ProfilePermissionsRequest */
        ProfilePermissionsRequest: {
            /**
             * Is Searchable
             * @description Можно ли находить пользователя
             */
            is_searchable?: boolean | null;
            /**
             * Allow Message Forwarding
             * @description Можно ли пересылать сообщения
             */
            allow_message_forwarding?: boolean | null;
            /**
             * Allow Messages From Non Contacts
             * @description Принимать сообщения от незнакомцев
             */
            allow_messages_from_non_contacts?: boolean | null;
            /**
             * Show Profile Photo To Non Contacts
             * @description Показывать фото не-контактам
             */
            show_profile_photo_to_non_contacts?: boolean | null;
            /**
             * Last Seen Visibility
             * @description Видимость 'был в сети' (0 - все, 1 - контакты, 2 - никто)
             */
            last_seen_visibility?: number | null;
            /**
             * Show Bio To Non Contacts
             * @description Показывать био не-контактам
             */
            show_bio_to_non_contacts?: boolean | null;
            /**
             * Show Stories To Non Contacts
             * @description Показывать сторисы не-контактам
             */
            show_stories_to_non_contacts?: boolean | null;
            /**
             * Allow Server Chats
             * @description Разрешить чаты хранить на сервере
             */
            allow_server_chats?: boolean | null;
            /**
             * Public Invite Permission
             * @description Кто может приглашать в паблики (0 - все, 1 - контакты, 2 - никто)
             */
            public_invite_permission?: number | null;
            /**
             * Group Invite Permission
             * @description Кто может приглашать в беседы (0 - все, 1 - контакты, 2 - никто)
             */
            group_invite_permission?: number | null;
            /**
             * Call Permission
             * @description Кто может звонить (0 - все, 1 - контакты, 2 - никто)
             */
            call_permission?: number | null;
            /**
             * Force Auto Delete Messages In Private
             * @description Принудительное автоудаление в ЛС
             */
            force_auto_delete_messages_in_private?: boolean | null;
            /**
             * Max Message Auto Delete Seconds
             * @description Макс. таймер удаления сообщений
             */
            max_message_auto_delete_seconds?: number | null;
            /**
             * Auto Delete After Days
             * @description Автоудаление аккаунта через X дней
             */
            auto_delete_after_days?: number | null;
        };
        /** ProfileResponse */
        ProfileResponse: {
            /** Status */
            status: string;
            data: components["schemas"]["ProfileData"];
        };
        /** ProfileUpdateRequest */
        ProfileUpdateRequest: {
            /**
             * Full Name
             * @description Полное имя
             */
            full_name?: string | null;
            /**
             * Bio
             * @description Биография
             */
            bio?: string | null;
            /** @description что настроено в профиле целевого пользователя */
            profile_permissions?: components["schemas"]["ProfilePermissionsRequest"];
        };
        /** RatingData */
        RatingData: {
            /** Rating */
            rating?: number | null;
            /**
             * Status
             * @description fine | unavailable | blocked | deleted
             * @default unavailable
             */
            status: string;
        };
        /** RelationshipStatusResponse */
        RelationshipStatusResponse: {
            /**
             * Is Target In Contacts Of Current User
             * @description target_user_id в контактах ли у current_user
             */
            is_target_in_contacts_of_current_user: boolean;
            /**
             * Is Current User In Contacts Of Target
             * @description current_user в контактах ли у пользователя
             */
            is_current_user_in_contacts_of_target: boolean;
            /**
             * Is Target User Blocked By Current User
             * @description Заблокировал ли target_user_id у нашего пользователя
             */
            is_target_user_blocked_by_current_user: boolean;
            /**
             * Is Current User In Blacklist Of Target
             * @description Заблокировал ли current_user у пользователя
             */
            is_current_user_in_blacklist_of_target: boolean;
        };
        /** UserProfileRequest */
        UserProfileRequest: {
            /**
             * User Id
             * Format: uuid
             */
            user_id: string;
            /**
             * Current User
             * Format: uuid
             */
            current_user: string;
        };
        /** UserProfilesRequest */
        UserProfilesRequest: {
            /**
             * User Id
             * Format: uuid
             */
            user_id: string;
            /** User Ids */
            user_ids: string[];
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
        /** WalletBalance */
        WalletBalance: {
            /**
             * Currency
             * @description Тип валюты, например: btc или stable
             */
            currency: string;
            /**
             * Balance
             * @description Точный баланс
             */
            balance: string;
            /**
             * Display Balance
             * @description Форматированный баланс для отображения (опционально)
             */
            display_balance?: number | null;
        };
        /** ProfilePermissionsResponse */
        api__schemas__me__ProfilePermissionsResponse: {
            /**
             * Is Searchable
             * @description Можно ли находить пользователя
             */
            is_searchable: boolean;
            /**
             * Allow Message Forwarding
             * @description Можно ли пересылать сообщения
             */
            allow_message_forwarding: boolean;
            /**
             * Allow Messages From Non Contacts
             * @description Принимать сообщения от незнакомцев
             */
            allow_messages_from_non_contacts: boolean;
            /**
             * Show Profile Photo To Non Contacts
             * @description Показывать фото не-контактам
             */
            show_profile_photo_to_non_contacts: boolean;
            /**
             * Last Seen Visibility
             * @description Видимость 'был в сети' (0 - все, 1 - контакты, 2 - никто)
             */
            last_seen_visibility: number;
            /**
             * Show Bio To Non Contacts
             * @description Показывать био не-контактам
             */
            show_bio_to_non_contacts: boolean;
            /**
             * Show Stories To Non Contacts
             * @description Показывать сторисы не-контактам
             */
            show_stories_to_non_contacts: boolean;
            /**
             * Allow Server Chats
             * @description Разрешить чаты хранить на сервере
             */
            allow_server_chats: boolean;
            /**
             * Public Invite Permission
             * @description Кто может приглашать в паблики (0 - все, 1 - контакты, 2 - никто)
             */
            public_invite_permission: number;
            /**
             * Group Invite Permission
             * @description Кто может приглашать в беседы (0 - все, 1 - контакты, 2 - никто)
             */
            group_invite_permission: number;
            /**
             * Call Permission
             * @description Кто может звонить (0 - все, 1 - контакты, 2 - никто)
             */
            call_permission: number;
            /**
             * Force Auto Delete Messages In Private
             * @description Принудительное автоудаление в ЛС
             */
            force_auto_delete_messages_in_private: boolean;
            /**
             * Max Message Auto Delete Seconds
             * @description Макс. таймер удаления сообщений
             */
            max_message_auto_delete_seconds?: number | null;
            /**
             * Auto Delete After Days
             * @description Автоудаление аккаунта через X дней
             */
            auto_delete_after_days?: number | null;
        };
        /** ProfilePermissionsResponse */
        api__schemas__user_id__ProfilePermissionsResponse: {
            /**
             * Is Searchable
             * @description Можно ли находить пользователя
             */
            is_searchable?: boolean | null;
            /**
             * Allow Message Forwarding
             * @description Можно ли пересылать сообщения
             */
            allow_message_forwarding: boolean;
            /**
             * Allow Messages From Non Contacts
             * @description Принимать сообщения от незнакомцев
             */
            allow_messages_from_non_contacts: boolean;
            /**
             * Allow Server Chats
             * @description Разрешить чаты хранить на сервере
             */
            allow_server_chats: boolean;
            /**
             * Force Auto Delete Messages In Private
             * @description Принудительное автоудаление в ЛС
             */
            force_auto_delete_messages_in_private: boolean;
            /**
             * Max Message Auto Delete Seconds
             * @description Макс. таймер удаления сообщений
             */
            max_message_auto_delete_seconds?: number | null;
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
    get_my_profile_me_get: {
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
                    "application/json": components["schemas"]["ProfileResponse"];
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
    edit_profile_edit_put: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["ProfileUpdateRequest"];
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
    get_user_profile_by_user_id__user_id__get: {
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
                    "application/json": components["schemas"]["ProfileByUserIdResponse"];
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
    get_user_profile_by_user_id_user_id_internal_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UserProfileRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ProfileByUserIdResponse"];
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
    get_profiles_internal_user_ids_internal_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UserProfilesRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ProfileByUserIdsResponse"];
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
