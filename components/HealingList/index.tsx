'use client';

import { useRouter } from 'next/navigation';
import { Divider, Image, Text, View } from 'reshaped';
import {
  healingProductListProps,
  healingOptionsProps,
} from '../../interfaces/healing';
import AbutmentProductOption from '../SelectionMenuItem';

const HealingList = ({
  image,
  heading,
  description,
  price,
  options,
  patientFileId,
}: healingProductListProps) => {
  const router = useRouter();

  return (
    <View direction={'row'} align={'stretch'}>
      <View.Item>
        <View padding={7} justify='center'>
          <Image src={image} alt={heading} height='166px' width='166px' />
        </View>
      </View.Item>
      <View.Item grow>
        <View
          direction={'column'}
          height={'100%'}
          paddingBlock={6}
          paddingInline={0}
          gap={1}
        >
          <Text variant='body-2' weight='bold'>
            {heading}
          </Text>
          <View paddingStart={6}>
            <ul>
              {description.map((listData: string, index: number) => (
                <li key={index}>
                  <Text color='neutral-faded' variant='body-3'>
                    {listData}
                  </Text>
                </li>
              ))}
            </ul>
          </View>

          <View.Item grow>
            <View direction={'column'} justify={'end'} height={'100%'}>
              <Text color='neutral' variant='body-3'>
                {price} €
              </Text>
            </View>
          </View.Item>
        </View>
      </View.Item>

      <View.Item>
        <View gap={1} paddingBlock={6} paddingInline={8}>
          <View paddingBottom={2}>
            <Text variant='caption-1' weight='medium' color='neutral-faded'>
              Order for:
            </Text>
          </View>

          <View borderColor='neutral-faded' borderRadius='small' divided>
            {options?.map((data: healingOptionsProps) => (
              <AbutmentProductOption
                key={data.id}
                id={data.id}
                selectedTeeth={data.selectedTeeth}
                localStorageCount={data.localStorageCount}
                onClick={() =>
                  router.push(`/${patientFileId}/treatments/temporary`)
                }
              />
            ))}
          </View>
        </View>
      </View.Item>
    </View>
  );
};

export default HealingList;
