import Root from '../areas/root';
import Crown from '../areas/crown-side-view';
import { JawType } from '../areas/tooth/interfaces/props';
import { ToothContainer, ToothNumber, Tooth } from '../areas/tooth';
import { useTeethDiagramStore } from '../../../../zustand/teethDiagram';
import { ComposesToothProps } from './interfaces/props';

function Tooth15Composed({ customStyles }: ComposesToothProps) {
  const { treatments } = useTeethDiagramStore((state) => state);
  const toothData = treatments['15' as keyof typeof treatments] || {};

  return (
    <ToothContainer tooth={15} customStyles={customStyles}>
      <Tooth tooth={15} variant={toothData.toothVariant}>
        <Root tooth={15} variant={toothData.rootVariant} />
        <Crown
          tooth={15}
          variant={toothData.crownVariant}
          leftAnchor={toothData.leftAnchor}
          rightAnchor={toothData.rightAnchor}
        />
      </Tooth>
      <ToothNumber tooth={15} jawType={JawType.UPPER} />
    </ToothContainer>
  );
}

export default Tooth15Composed;
