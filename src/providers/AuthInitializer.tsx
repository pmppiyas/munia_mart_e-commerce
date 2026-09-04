'use client';

import * as React from 'react';
import { useLazyGetMeQuery } from '@/services/api/authApi';

export function AuthInitializer() {
  const [triggerGetMe] = useLazyGetMeQuery();

  React.useEffect(() => {
    // Silently restore customer session on client mount
    triggerGetMe();
  }, [triggerGetMe]);

  return null;
}
