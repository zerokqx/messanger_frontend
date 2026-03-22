import axios from 'axios';

interface CombinedReturn {
  servers?: { url?: string }[];
}

// Теперь это массив объектов, что гораздо удобнее для итерации в генераторе
interface ServiceInfo {
  original: string; // "auth_service"
  clean: string; // "auth" или "chat/private"
}

/**
 * @param baseUrl - Базовый URL (например, https://dev.api.yobble.org/docs/openapi)
 * @param urlify - Массив имен для замены "_" на "/"
 */
export async function fetchServiceNames(
  baseUrl: string,
  urlify: string[] = []
): Promise<ServiceInfo[]> {
  const serviceRegex = /(\w+)_service/;

  try {
    const targetUrl = `${baseUrl.replace(/\/$/, '')}/combined`;
    const { data, status } = await axios.get<CombinedReturn>(targetUrl);

    if (status !== 200) {
      throw new Error(`Ошибка сети: ${status}`);
    }

    if (!data.servers) return [];

    // Используем flatMap, чтобы сразу отфильтровать пустые или невалидные совпадения
    return data.servers.flatMap((service) => {
      if (!service.url) return [];

      const match = serviceRegex.exec(service.url);

      if (!match) {
        console.warn(`Service URL: ${service.url} skipped by regex`);
        return [];
      }

      const original = match[0]; // "auth_service"
      const cleanName = match[1]; // "auth"

      // Формируем "чистое" имя с учетом urlify
      const clean = urlify.includes(cleanName)
        ? cleanName.replace('_', '/')
        : cleanName;

      return { original, clean };
    });
  } catch (error) {
    console.error(`[fetchServiceNames] Ошибка запроса к ${baseUrl}:`, error);
    throw error;
  }
}
