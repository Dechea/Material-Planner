'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Hidden, Popover, Text, View } from 'reshaped';
import { Route } from 'next';

interface SignInPopoverProps {
  readonly description: string;
}

export default function SignInPopover({ description }: SignInPopoverProps) {
  const [activePopup, setActivePopup] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (activePopup) {
      setTimeout(() => {
        setActivePopup(false);
      }, 5000);
    }
  }, []);

  return (
    <Popover active={activePopup} padding={0} width='auto' position='top-end'>
      <Popover.Trigger>
        {(attributes) => (
          <Button
            color='primary'
            size='medium'
            variant='solid'
            onClick={() => router.push('/sign-in' as Route)}
            attributes={attributes}
          >
            Sign in
          </Button>
        )}
      </Popover.Trigger>
      <Popover.Content>
        <Hidden hide={{ s: true, m: false }}>
          <View
            padding={4}
            maxWidth={82}
            backgroundColor='black'
            borderRadius={'large'}
          >
            <Text
              variant='body-2'
              weight='regular'
              className='text-[--rs-color-white]'
            >
              {description}
            </Text>
          </View>
        </Hidden>
      </Popover.Content>
    </Popover>
  );
}
