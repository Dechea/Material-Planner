'use client';

import { useRouter } from 'next/navigation';
import { Badge, Button, Icon, Text, View } from 'reshaped';
import BackwardIcon from '../Icons/Backward';
import CartIcon from '../Icons/Cart';

interface CartHeaderProps {
  readonly totalProductsCount: number;
}

export default function CartHeader({ totalProductsCount }: CartHeaderProps) {
  const router = useRouter();

  return (
    <View
      width='100%'
      position='sticky'
      insetTop={0}
      zIndex={55}
      backgroundColor='page-faded'
      direction='row'
      paddingBlock={{ s: 4, xl: 6 }}
      align='center'
      gap={4}
      className='border-b border-[--rs-color-border-neutral-faded] print:!hidden'
    >
      <View direction='column' width='100%' align='center'>
        <View
          direction='row'
          maxWidth='1280px'
          gap={3}
          align='center'
          justify='start'
          width='100%'
          paddingInline={{ l: 30, m: 4, s: 4 }}
        >
          <Button
            icon={<Icon svg={BackwardIcon} size={4} />}
            onClick={() => router.back()}
          />

          <View direction='row' align='center' gap={4}>
            <Icon svg={CartIcon} size={6} />
            <View direction='row' align='center' gap={3}>
              <Text variant='featured-2' weight='medium'>
                {' '}
                Cart
              </Text>
              <Badge className='!min-w-[30px] !text-center' color='critical'>
                {totalProductsCount}
              </Badge>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
