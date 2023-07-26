'use client';

import { Actionable, Carousel, Tabs, Tooltip, View } from 'reshaped';
import { useTreatmentsByGroup } from '../../hooks/useTreatmentsByGroup';
import { CarouselTooth } from '../CarouselTooth';
import { useProductStore } from '../../zustand/product';

interface CarouselTeethProps {
  patientFileId: string;
}

export default function CarouselTeeth({ patientFileId }: CarouselTeethProps) {
  const { activeTreatmentGroup, setActiveTreatmentGroup } = useProductStore();
  const { toothGroupsByTreatmentAndLockStatus: toothGroups } =
    useTreatmentsByGroup();

  return (
    <View
      width='100%'
      position='sticky'
      insetTop={11}
      zIndex={50}
      backgroundColor='page-faded'
      direction='row'
      justify='center'
      align='end'
      borderColor='neutral-faded'
      wrap={false}
      paddingBlock={4}
      height='146px'
    >
      <Carousel
        gap={2}
        className='flex justify-center items-center w-[calc(100%-20px)] h-full'
      >
        <Tabs
          value={activeTreatmentGroup}
          onChange={({ value }) => {
            const [_group, index] = value.split('-');
            toothGroups[Number(index)].open && setActiveTreatmentGroup(value);
          }}
        >
          <Tabs.List className={`[&_[role=tablist]]:!gap-[8px]`}>
            {toothGroups.map((tooth, index) => {
              const isEmptyFilterGroup = tooth.group === '{}';
              return (
                <Tabs.Item
                  value={`${tooth.group}-${index}`}
                  key={`${tooth.group}-${tooth?.tabgroup}`}
                >
                  <Tooltip
                    position='top'
                    text={
                      toothGroups[index]?.open
                        ? tooth?.tabgroup ?? tooth.group
                        : toothGroups[index]?.tooltipText
                    }
                  >
                    {(attributes) => (
                      <Actionable
                        attributes={attributes}
                        className={isEmptyFilterGroup && 'pointer-events-none'}
                      >
                        <CarouselTooth
                          treatmentToothData={toothGroups[index]?.teeth}
                          active={toothGroups[index]?.open}
                          patientFileId={patientFileId}
                        />
                      </Actionable>
                    )}
                  </Tooltip>
                </Tabs.Item>
              );
            })}
          </Tabs.List>
        </Tabs>
      </Carousel>
    </View>
  );
}
