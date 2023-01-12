'use client';

import { MenuItem, Text, View } from '../../Reshaped/Reshaped';
import options from './data.json';
import { useSearchParams } from 'next/navigation';
import { ProstheticsQuestions } from './components/ProstheticsQuestions';
import { TreatmentQuestions } from './components/TreatmentQuestions';
import Image from 'next/image';


export default function SelectedTooth() {
  const params = useSearchParams();
  const step = params.get('step')?.split('-')
  const questionNum = Number(step?.[0]);
  const optionNum = Number(step?.[1])
  const disabled = [false, true];

  return (
    <View gap={2} paddingTop={5} direction="column" divided>
      {options.map((option, optionIndex) => (
        <>
          <View key={optionIndex} gap={1}>
            <MenuItem
              disabled={disabled[optionIndex]}
              startSlot={disabled[optionIndex] ? <Image width={24} height={24} src='/lock.svg' alt='Locked Options' /> : <></>}
              roundedCorners
              selected={optionIndex <= questionNum}
              href={`/selected-tooth/${option.url}`}
            >
              <Text variant="body-medium-2">{option.title}</Text>
            </MenuItem>

            <View direction="column" gap={1} paddingStart={3} paddingTop={2}>
              {option.availableOptions.map((availableOption, availableOptionIndex) => (
                <View direction="row" key={availableOptionIndex}>
                  <View.Item grow>
                    {(option.type === 'product' && 'startIcon' in availableOption) ? (
                      <ProstheticsQuestions
                        key={`${optionIndex}-${availableOptionIndex}`}
                        availableOptionIndex={availableOptionIndex}
                        option={availableOption}
                        optionIndex={optionIndex}
                        optionNumber={optionNum}
                        questionNumber={questionNum}
                        questionUrl={option.url}
                        disabled={disabled[optionIndex]}
                      />
                    ) : (
                      <TreatmentQuestions
                        key={`${optionIndex}-${availableOptionIndex}`}
                        availableOptionIndex={availableOptionIndex}
                        option={availableOption}
                        optionIndex={optionIndex}
                        optionNumber={optionNum}
                        questionNumber={questionNum}
                        questionUrl={option.url}
                        disabled={disabled[optionIndex]}
                      />
                    )}
                  </View.Item>
                </View>
              ))}
            </View>
          </View>
        </>
      ))}
    </View>
  );
}

