const DEVICE_KEY = 'seph.principal.device';

export function getDeviceId(): string {
  const existing = localStorage.getItem(DEVICE_KEY);
  if (existing) {
    return existing;
  }

  const next = crypto.randomUUID();
  localStorage.setItem(DEVICE_KEY, next);
  return next;
}
