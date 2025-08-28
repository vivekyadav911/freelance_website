'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Cookies from 'js-cookie';

export default function NavCookieTracker() {
  const pathname = usePathname();

  useEffect(() => {
    Cookies.set('lastVisitedPage', pathname, { expires: 7 });
  }, [pathname]);

  return null;
}