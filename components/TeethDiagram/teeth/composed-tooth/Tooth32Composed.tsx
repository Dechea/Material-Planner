import Root from '../areas/root';
import Crown from '../areas/crown-side-view';
import { JawType } from '../areas/tooth/interfaces/props';
import { ToothContainer, ToothNumber, Tooth } from '../areas/tooth';
import { useTeethDiagramStore } from '../../../../zustand/teethDiagram';
import { ComposesToothProps } from './interfaces/props';

function Tooth32Composed({ customStyles }: ComposesToothProps) {
  const { treatments } = useTeethDiagramStore((state) => state);
  const toothData = treatments['32' as keyof typeof treatments] || {};

  return (
    <ToothContainer tooth={32} customStyles={customStyles}>
      <ToothNumber tooth={32} jawType={JawType.LOWER} />
      <Tooth tooth={32} variant={toothData.toothVariant}>
        <Root tooth={32} variant={toothData.rootVariant} />
        <Crown
          tooth={32}
          variant={toothData.crownVariant}
          leftAnchor={toothData.leftAnchor}
          rightAnchor={toothData.rightAnchor}
        />
      </Tooth>
    </ToothContainer>
  );
}

export default Tooth32Composed;
