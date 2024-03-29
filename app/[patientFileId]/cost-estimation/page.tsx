'use client';

import { useEffect, useState } from 'react';
import { View } from 'reshaped';
import CostEstimationHeader from '../../../components/CostEstimationHeader';
import CostEstimationList from '../../../components/CostEstimationList';
import PrintCostEstimationHeader from '../../../components/PrintCostEstimationHeader';
import TotalCostEstimationCard from '../../../components/TotalCostEstimationCard';
import { Product } from '../../../fqlx-generated/typedefs';
import { useProductCalculations } from '../../../hooks/useProductCalculations';

export interface UniqueProduct {
  [key: string]: { count: number; details: Product };
}

interface CostEstimationProps {
  params: { patientFileId: string };
}

export default function CostEstimation({ params }: CostEstimationProps) {
  const [uniqueProducts, setUniqueProducts] = useState<UniqueProduct>({});

  const { selectedProducts, totalCostOfProductsInCart } =
    useProductCalculations(params.patientFileId);

  useEffect(() => {
    const uniqueProductsData: UniqueProduct = {};

    selectedProducts.forEach((product) => {
      const productId = product?.selectedProduct?.id as string;

      if (!(productId in uniqueProductsData)) {
        uniqueProductsData[productId] = {
          count: product?.quantity as number,
          details: product?.selectedProduct as Product,
        };
      } else {
        uniqueProductsData[productId] = {
          ...uniqueProductsData[productId],
          count: uniqueProductsData[productId].count + (product?.quantity ?? 0),
        };
      }
    });

    setUniqueProducts(uniqueProductsData);
  }, [selectedProducts]);

  return (
    <View className='overflow-y-scroll max-h-[calc(100svh-53px)] print:block print:overflow-visible'>
      <CostEstimationHeader />

      <PrintCostEstimationHeader patientFileId={params.patientFileId} />

      <View direction='column' width='100%' align='center'>
        <View
          direction='row'
          width='100%'
          paddingBlock={8}
          paddingInline={6}
          gap={34}
          className='print:!p-0'
          maxWidth='1280px'
          justify='center'
        >
          <View.Item
            columns={8}
            className='print:block print:p-x12 print:!w-full'
          >
            <CostEstimationList products={uniqueProducts} />
          </View.Item>
          <View.Item columns={4} className='sticky !top-[133px] print:hidden'>
            <View maxWidth='306px' width='100%'>
              <TotalCostEstimationCard totalPrice={totalCostOfProductsInCart} />
            </View>
          </View.Item>
        </View>
      </View>
    </View>
  );
}
