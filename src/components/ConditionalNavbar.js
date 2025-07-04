'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from './Navbar';

export function ConditionalNavbar() {
  const pathname = usePathname();
  const [isNotFoundPage, setIsNotFoundPage] = useState(false);
  
  // Daftar path yang tidak boleh menampilkan navbar
  const hideNavbarPaths = [
    '/fwb-config',
  ];
  
  // Detect if current page is 404
  useEffect(() => {
    // Check if body has hide-navbar class (set by not-found page)
    const checkNotFound = () => {
      setIsNotFoundPage(document.body.classList.contains('hide-navbar'));
    };
    
    checkNotFound();
    
    // Create observer to watch for class changes
    const observer = new MutationObserver(checkNotFound);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    return () => observer.disconnect();
  }, []);
  
  // Cek apakah path saat ini termasuk dalam daftar yang harus menyembunyikan navbar
  const shouldHideNavbar = hideNavbarPaths.some(path => 
    pathname.startsWith(path)
  ) || isNotFoundPage;
  
  // Jika harus disembunyikan, return null
  if (shouldHideNavbar) {
    return null;
  }
  
  // Jika tidak, tampilkan navbar
  return <Navbar />;
}