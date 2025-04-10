import dynamic from 'next/dynamic';
import React, { Suspense } from 'react';

const HostelPromoCard = dynamic(() => import('@/components/promo/Card'), {
  ssr: false,
  loading: () => <div className="w-full h-[600px] flex items-center justify-center bg-gray-100 rounded-lg">
    <div className="animate-pulse text-gray-400">Loading promo content...</div>
  </div>
});


export default function PromoCard() {
  return (
        <Suspense fallback={<div className="w-full h-[600px] flex items-center justify-center bg-white rounded-lg">Loading...</div>}>
          <HostelPromoCard />
        </Suspense>
  )

}