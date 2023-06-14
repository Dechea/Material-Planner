import cx from 'classnames';
import { View } from 'reshaped';
import { RootProps } from '../../interfaces/props';
import { withEnable } from '../../../../hoc/withEnable';
import { useTeethDiagramStore } from '../../../../../../../zustand/teethDiagram';
import { toothId } from '../../../../constants/toothArea';

function Root11({ children, customStyles }: RootProps) {
  const { onClick } = useTeethDiagramStore((state) => state);

  return (
    <View width='35.294%' insetBottom={0} height='100%'>
      <View
        width='91.66%'
        position='absolute'
        aspectRatio={22 / 45}
        className={cx('-bottom-[12%]', customStyles)}
      >
        <svg
          width='100%'
          viewBox='0 0 22 45'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          id={toothId[11]}
        >
          <path
            d='M1.67643 43.8197L1.01468 43.8984C1.12229 43.4907 1.29566 43.0085 1.50945 42.4426C1.56166 42.3044 1.61615 42.1616 1.67228 42.0145C1.85337 41.5397 2.05145 41.0204 2.24446 40.4702C2.75157 39.0244 3.23952 37.3224 3.35637 35.4513C3.47847 33.4962 3.58464 31.3692 3.69489 29.1603C3.96591 23.7306 4.26164 17.8059 4.87947 12.7213C5.31415 9.14403 5.90381 6.02807 6.73923 3.81785C7.15728 2.71184 7.62422 1.8676 8.13656 1.30713C8.64046 0.755885 9.16623 0.500023 9.7344 0.5C11.2547 0.499939 12.5063 1.58845 13.5514 3.73069C14.5902 5.85991 15.3441 8.87994 15.9212 12.3967C16.7177 17.2507 17.1634 22.9462 17.5891 28.3861C17.7805 30.8315 17.9678 33.2252 18.1811 35.4675C18.3564 37.3097 18.9311 39.0327 19.5216 40.5634C19.6929 41.0074 19.8633 41.4306 20.0261 41.8347C20.4249 42.825 20.7777 43.7009 20.9836 44.4877C14.6146 43.2803 8.10893 43.0551 1.67643 43.8197Z'
            onClick={onClick}
          />
        </svg>
      </View>

      {children}
    </View>
  );
}

export default withEnable(Root11);