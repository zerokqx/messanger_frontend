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
    "/delete": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /** Delete Private Chat */
        delete: operations["delete_private_chat_delete_delete"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/list": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get List Private Chats */
        get: operations["get_list_private_chats_list_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/history": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get Private Chat History */
        get: operations["get_private_chat_history_history_get"];
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
        /** Create Private Chat By Uuid */
        post: operations["create_private_chat_by_uuid_create_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/message/send": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Send Private Message With Uuid */
        post: operations["send_private_message_with_uuid_message_send_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/message/delete": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Delete Private Message */
        post: operations["delete_private_message_message_delete_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/message/edit": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /** Edit Private Message */
        put: operations["edit_private_message_message_edit_put"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/message/mark-read": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Mark Private Chat Read */
        post: operations["mark_private_chat_read_message_mark_read_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/internal/send": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Internal Send Private Message With Login */
        post: operations["internal_send_private_message_with_login_internal_send_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/internal/members": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Internal Members Private Chat */
        get: operations["internal_members_private_chat_internal_members_get"];
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
        /** InternalPrivateChatMembersData */
        InternalPrivateChatMembersData: {
            /** Is Exist */
            is_exist: boolean;
            /** Members */
            members: string[];
        };
        /** InternalPrivateChatMembersResponse */
        InternalPrivateChatMembersResponse: {
            /**
             * Status
             * @default fine
             */
            status: string;
            data: components["schemas"]["InternalPrivateChatMembersData"];
        };
        /** InternalPrivateMessageSendRequest */
        InternalPrivateMessageSendRequest: {
            /**
             * Sender
             * @description Системный отправитель (yobble, support, feedback, yobble_system)
             * @enum {string}
             */
            sender: "yobble" | "support" | "feedback" | "yobble_system" | "feedback_idea" | "feedback_issue" | "feedback_praise" | "feedback_content";
            /**
             * User Id
             * Format: uuid
             */
            user_id: string;
            /**
             * Content
             * @description Содержимое сообщения (макс. 4096 символов)
             */
            content?: string | null;
            /**
             * Broker Customization Msg
             * @description Содержимое сообщения для брокера (макс. 4096 символов)
             */
            broker_customization_msg?: string | null;
        };
        /** MessageData */
        MessageData: {
            /** Message */
            message: string;
        };
        /** MessageForward */
        MessageForward: {
            /**
             * Forward Type
             * @description Тип пересылаемого контента
             */
            forward_type?: ("chat_private_messages" | "chat_group_messages" | "chat_public_messages" | "reply") | null;
            /**
             * Forward Sender Id
             * @description ID чата, откуда переслано сообщение
             */
            forward_sender_id?: string | null;
            /**
             * Forward Message Id
             * @description Данные внутренний ид сообщения в forward_chat
             */
            forward_message_id?: number | null;
            /**
             * Forward Chat Data
             * @description Данные о чате пересылаемом (беседы и паблики)
             */
            forward_chat_data?: unknown | null;
        };
        /** MessageItem */
        MessageItem: {
            /**
             * Message Id
             * @description внутренний ID сообщения
             */
            message_id: number;
            /**
             * Message Type
             * @description Типы сообщения
             */
            message_type: ("text" | "media" | "circle" | "voice" | "system" | "forward" | "reply" | "poll")[];
            forward_metadata: components["schemas"]["MessageForward"] | null;
            /**
             * Chat Id
             * Format: uuid
             * @description Чат ID
             */
            chat_id: string;
            /**
             * Sender Id
             * Format: uuid
             * @description Кто отправил
             */
            sender_id: string;
            /**
             * Sender Data
             * @description Данные о пользователе
             */
            sender_data?: unknown | null;
            /**
             * Content
             * @description Текст сообщения
             */
            content?: string | null;
            /**
             * Media Link
             * @description Ссылка на медиа (заглушка)
             */
            media_link?: unknown | null;
            /**
             * Is Viewed
             * @description Флаг просмотра
             */
            is_viewed: boolean;
            /**
             * Viewed At
             * @description Дата и время просмотра сообщения
             */
            viewed_at?: string | null;
            /**
             * Created At
             * Format: date-time
             * @description Дата и время создания сообщения
             */
            created_at: string;
            /**
             * Is Edited
             * @description Было ли сообщение отредактировано
             * @default false
             */
            is_edited: boolean;
            /**
             * Updated At
             * @description Дата и время обновления сообщения
             */
            updated_at?: string | null;
        };
        /** PrivateChatCreateData */
        PrivateChatCreateData: {
            /**
             * Chat Id
             * Format: uuid
             * @description ID созданного или существующего приватного чата
             */
            chat_id: string;
            /**
             * Chat Type
             * @description Тип чата: self — чат с собой, private — приватный чат с другим пользователем
             * @enum {string}
             */
            chat_type: "private" | "self";
            /**
             * Status
             * @description Статус создания ('fine' или 'exists')
             */
            status: string;
            /**
             * Message
             * @description Сообщение
             */
            message: string;
        };
        /** PrivateChatCreateResponse */
        PrivateChatCreateResponse: {
            /** Status */
            status: string;
            data: components["schemas"]["PrivateChatCreateData"];
        };
        /** PrivateChatDeleteRequest */
        PrivateChatDeleteRequest: {
            /**
             * Chat Id
             * Format: uuid
             * @description ID приватного чата
             */
            chat_id: string;
        };
        /** PrivateChatHistoryData */
        PrivateChatHistoryData: {
            /** Items */
            items: components["schemas"]["MessageItem"][];
            /** Has More */
            has_more: boolean;
        };
        /** PrivateChatHistoryResponse */
        PrivateChatHistoryResponse: {
            /** Status */
            status: string;
            data: components["schemas"]["PrivateChatHistoryData"];
        };
        /** PrivateChatListData */
        PrivateChatListData: {
            /** Items */
            items: components["schemas"]["PrivateChatListItem"][];
            /** Has More */
            has_more: boolean;
        };
        /** PrivateChatListItem */
        PrivateChatListItem: {
            /**
             * Chat Id
             * Format: uuid
             * @description ID чата
             */
            chat_id: string;
            /**
             * Chat Type
             * @description Тип чата
             * @enum {string}
             */
            chat_type: "self" | "private";
            /**
             * Chat Companion Ids
             * @description ID участников чата
             */
            chat_companion_ids?: string[];
            /**
             * Chat Data
             * @description Данные о чате
             */
            chat_data?: {
                [key: string]: unknown;
            } | null;
            /** @description Последнее сообщение в чате */
            last_message?: components["schemas"]["MessageItem"] | null;
            /**
             * Created At
             * Format: date-time
             * @description Дата создания чата
             */
            created_at: string;
            /**
             * Unread Count
             * @description Кол-во непрочитанных сообщений
             */
            unread_count: number;
        };
        /** PrivateChatListResponse */
        PrivateChatListResponse: {
            /** Status */
            status: string;
            data: components["schemas"]["PrivateChatListData"];
        };
        /** PrivateChatMarkReadData */
        PrivateChatMarkReadData: {
            /**
             * Chat Id
             * Format: uuid
             * @description ID чата
             */
            chat_id: string;
            /**
             * Marked Count
             * @description Количество отмеченных сообщений
             */
            marked_count: number;
        };
        /** PrivateChatMarkReadRequest */
        PrivateChatMarkReadRequest: {
            /**
             * Chat Id
             * Format: uuid
             * @description ID приватного чата
             */
            chat_id: string;
            /**
             * Message Id
             * @description ID сообщения для отметки (если None - все непрочитанные до последнего)
             */
            message_id?: number | null;
            /**
             * Mark All
             * @description Отметить все непрочитанные сообщения в чате
             * @default false
             */
            mark_all: boolean;
        };
        /** PrivateChatMarkReadResponse */
        PrivateChatMarkReadResponse: {
            /**
             * Status
             * @default fine
             */
            status: string;
            data: components["schemas"]["PrivateChatMarkReadData"];
        };
        /** PrivateMessageDeleteData */
        PrivateMessageDeleteData: {
            /**
             * Message Id
             * @description ID удалённого сообщения
             */
            message_id: number;
            /**
             * Chat Id
             * Format: uuid
             * @description ID чата
             */
            chat_id: string;
            /**
             * Deleted At
             * Format: date-time
             * @description Дата и время удаления
             */
            deleted_at: string;
            /**
             * Delete For All
             * @description Удалено у всех или только у себя
             */
            delete_for_all: boolean;
        };
        /** PrivateMessageDeleteRequest */
        PrivateMessageDeleteRequest: {
            /**
             * Chat Id
             * Format: uuid
             * @description ID приватного чата
             */
            chat_id: string;
            /**
             * Message Id
             * @description ID сообщения для удаления
             */
            message_id: number;
            /**
             * Delete For All
             * @description Удалить у всех или только у себя
             * @default false
             */
            delete_for_all: boolean;
        };
        /** PrivateMessageDeleteResponse */
        PrivateMessageDeleteResponse: {
            /**
             * Status
             * @default fine
             */
            status: string;
            data: components["schemas"]["PrivateMessageDeleteData"];
        };
        /** PrivateMessageEditData */
        PrivateMessageEditData: {
            /**
             * Message Id
             * @description ID отредактированного сообщения
             */
            message_id: number;
            /**
             * Chat Id
             * Format: uuid
             * @description ID чата
             */
            chat_id: string;
            /**
             * Content
             * @description Новый текст сообщения
             */
            content: string;
            /**
             * Updated At
             * Format: date-time
             * @description Дата и время редактирования
             */
            updated_at: string;
        };
        /** PrivateMessageEditRequest */
        PrivateMessageEditRequest: {
            /**
             * Chat Id
             * Format: uuid
             * @description ID приватного чата
             */
            chat_id: string;
            /**
             * Message Id
             * @description ID сообщения для редактирования
             */
            message_id: number;
            /**
             * Content
             * @description Новый текст сообщения
             */
            content: string;
        };
        /** PrivateMessageEditResponse */
        PrivateMessageEditResponse: {
            /**
             * Status
             * @default fine
             */
            status: string;
            data: components["schemas"]["PrivateMessageEditData"];
        };
        /** PrivateMessageSendData */
        PrivateMessageSendData: {
            /** Message Id */
            message_id: number;
            /**
             * Chat Id
             * Format: uuid
             */
            chat_id: string;
            /**
             * Created At
             * Format: date-time
             */
            created_at: string;
        };
        /** PrivateMessageSendRequest */
        PrivateMessageSendRequest: {
            /**
             * Chat Id
             * Format: uuid
             */
            chat_id: string;
            /**
             * Content
             * @description Содержимое сообщения (макс. 4096 символов)
             */
            content?: string | null;
            /**
             * Message Type
             * @description Один или несколько типов сообщения
             */
            message_type: "text"[];
        };
        /** PrivateMessageSendResponse */
        PrivateMessageSendResponse: {
            /** Status */
            status: string;
            data: components["schemas"]["PrivateMessageSendData"];
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
    delete_private_chat_delete_delete: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["PrivateChatDeleteRequest"];
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
    get_list_private_chats_list_get: {
        parameters: {
            query?: {
                /** @description Смещение для пагинации */
                offset?: number;
                /** @description Количество чатов для загрузки */
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
                    "application/json": components["schemas"]["PrivateChatListResponse"];
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
    get_private_chat_history_history_get: {
        parameters: {
            query: {
                /** @description ID приватного чата */
                chat_id: string;
                /** @description Пагинация: внутренний ID последнего сообщения */
                before_message_id?: number | null;
                /** @description Сколько сообщений загрузить (макс. 100) */
                limit?: number;
                /** @description TODO (не работает) Загрузка истории чата при нажатии на forward */
                is_forward?: boolean;
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
                    "application/json": components["schemas"]["PrivateChatHistoryResponse"];
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
    create_private_chat_by_uuid_create_post: {
        parameters: {
            query: {
                target_user_id: string;
            };
            header?: {
                "is-bot"?: string | null;
            };
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
                    "application/json": components["schemas"]["PrivateChatCreateResponse"];
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
    send_private_message_with_uuid_message_send_post: {
        parameters: {
            query?: never;
            header?: {
                "is-bot"?: string | null;
            };
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["PrivateMessageSendRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PrivateMessageSendResponse"];
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
    delete_private_message_message_delete_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["PrivateMessageDeleteRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PrivateMessageDeleteResponse"];
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
    edit_private_message_message_edit_put: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["PrivateMessageEditRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PrivateMessageEditResponse"];
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
    mark_private_chat_read_message_mark_read_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["PrivateChatMarkReadRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PrivateChatMarkReadResponse"];
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
    internal_send_private_message_with_login_internal_send_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["InternalPrivateMessageSendRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PrivateMessageSendResponse"];
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
    internal_members_private_chat_internal_members_get: {
        parameters: {
            query: {
                chat_id: string;
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
                    "application/json": components["schemas"]["InternalPrivateChatMembersResponse"];
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
}
