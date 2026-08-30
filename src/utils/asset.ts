/**
 * アセットURL解決ヘルパー関数
 * - AI Studio Preview (import.meta.env.DEV === true): Netlify本番の公開URLから直接画像を参照
 * - Netlify本番 (import.meta.env.DEV === false): ルート相対パス (/harbor-desktop.jpg 等) を使用
 */

const PREVIEW_ASSET_BASE_URL = 'https://yoa-official.netlify.app';

export function getAssetUrl(path: string): string {
  // Netlify本番 (production build) では常にルート相対パスをそのまま返す
  if (!import.meta.env.DEV) {
    return path;
  }

  // 開発環境 (AI Studio Preview) ではNetlify本番の公開URLを直接参照
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${PREVIEW_ASSET_BASE_URL}${cleanPath}`;
}

