// ロゴのマーク:「見せるカード（吹き出し）」＋「助け（十字）」。public/favicon.svg と同じ形。
export function LogoMark({ size = 32 }: { size?: number }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true" style={{ flex: 'none', borderRadius: size / 4 }}>
      <rect width="64" height="64" rx="14" fill="#0b7a55" />
      <path d="M18 14h28a6 6 0 0 1 6 6v18a6 6 0 0 1-6 6H28l-9 8v-8h-1a6 6 0 0 1-6-6V20a6 6 0 0 1 6-6z" fill="#fff" />
      <path d="M29 21h6v5h5v6h-5v5h-6v-5h-5v-6h5z" fill="#0b7a55" />
    </svg>
  );
}
