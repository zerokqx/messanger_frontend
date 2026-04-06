import { describe, it, expect, expectTypeOf } from 'vitest';
import { createPermissions } from './create-permissions.ts';
import type { ApiSchemasMeProfilePermissionsResponse } from '@/shared/api/orval/profile-service/profile-service.schemas';

describe('createPermissions', () => {
  const mockPermission: ApiSchemasMeProfilePermissionsResponse =
    {
      is_searchable: true,
      allow_message_forwarding: false,
      allow_messages_from_non_contacts: true,
      show_profile_photo_to_non_contacts: false,
      show_bio_to_non_contacts: true,
      show_stories_to_non_contacts: true,
      last_seen_visibility: 2,
      public_invite_permission: 1,
      group_invite_permission: 2,
      call_permission: 2,
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

  it('не должна оставлять числовые поля в исходном виде', () => {
    expect(result.last_seen_visibility).not.toBe(2);
    expect(result.public_invite_permission).not.toBe(1);
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
