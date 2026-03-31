import { describe, it, expect, expectTypeOf } from 'vitest';
import { createPermissions } from './create-permissions.ts';
import type { components } from '@/shared/types/v1.js';

describe('createPermissions', () => {
  const mockPermission: components['schemas']['api__schemas__me__ProfilePermissionsResponse'] =
    {
      is_searchable: true,
      allow_message_forwarding: false,
      allow_messages_from_non_contacts: true,
      show_profile_photo_to_non_contacts: false,
      show_bio_to_non_contacts: true,
      show_stories_to_non_contacts: true,
      allow_server_chats: false,
      force_auto_delete_messages_in_private: true,
      last_seen_visibility: 2,
      public_invite_permission: 1,
      group_invite_permission: 2,
      call_permission: 3,
      max_message_auto_delete_seconds: 3600,
      auto_delete_after_days: 7,
    };

  const result = createPermissions(mockPermission);

  it('должна возвращать объект с правильными типами данных в runtime', () => {
    expect(typeof result.last_seen_visibility).toBe('string');
    expect(typeof result.public_invite_permission).toBe('string');
    expect(typeof result.group_invite_permission).toBe('string');
    expect(typeof result.call_permission).toBe('string');
    expect(typeof result.auto_delete_after_days).toBe('string');

    expect(typeof result.is_searchable).toBe('boolean');
  });

  it('должна корректно трансформировать числовые значения в строки', () => {
    expect(result.auto_delete_after_days).toBe('7');
  });

  it('не должна включать удалённые из формы поля', () => {
    expect(result).not.toHaveProperty('allow_server_chats');
    expect(result).not.toHaveProperty(
      'force_auto_delete_messages_in_private'
    );
    expect(result).not.toHaveProperty('max_message_auto_delete_seconds');
  });

  it('проверка статических типов (TypeScript)', () => {
    expectTypeOf(result.last_seen_visibility).toBeString();

    expectTypeOf(result.is_searchable).not.toBeString();
    expectTypeOf(result.is_searchable).toBeBoolean();
  });
  it('должна быть идемпотентной (повторные вызовы с теми же данными дают тот же результат)', () => {
    const result1 = createPermissions(mockPermission);
    const result2 = createPermissions(mockPermission);

    expect(result1).toEqual(result2);

    expect(result1).not.toBe(result2);
  });

  it('не должна мутировать исходный объект permission', () => {
    const originalCopy = { ...mockPermission };
    createPermissions(mockPermission);
    expect(mockPermission).toEqual(originalCopy);
  });
});
