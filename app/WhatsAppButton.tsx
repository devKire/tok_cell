'use client';

import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { ComponentProps } from 'react';

type Props = Pick<ComponentProps<typeof Button>, 'size' | 'className'>;

export default function WhatsAppButton({ size, className }: Props) {
  return (
    <Button
      size={size}
      className={`bg-[#25D366] hover:bg-[#128C7E] text-white h-12 px-8 text-base rounded-xl ${className ?? ''}`}
      onClick={() => window.open('https://wa.me/5547997513609', '_blank')}
    >
      <MessageCircle className="mr-2 h-4 w-4" />
      Chamar no WhatsApp
    </Button>
  );
}
