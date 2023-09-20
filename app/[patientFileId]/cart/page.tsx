'use client';

import { useQuery } from 'fqlx-client';
import { useEffect, useMemo, useState } from 'react';
import { Badge, Tabs, Text, View } from 'reshaped';
import ShippingForm from '../../../components/AddressForm';
import CartCostCard from '../../../components/CartButtonComponent';
import CartHeader from '../../../components/CartHeader';
import CartItemsList from '../../../components/CartItemsList';
import CartOrder from '../../../components/CartOrder';
import {
  Product,
  Query,
  SelectedProduct,
  Tooth,
} from '../../../fqlx-generated/typedefs';
import { useProductCalculations } from '../../../hooks/useProductCalculations';
import { useProductCrudOps } from '../../../hooks/useProductCrudOps';
import { AREA_TYPE } from '../../../zustand/product/interface';
import { useUserStore } from '../../../zustand/user';

const ShippingTabs = [
  { id: '1', title: 'Selected Products' },
  { id: '2', title: 'Shipping Details' },
  { id: '3', title: 'Order' },
];

interface CartProps {
  params: { patientFileId: string };
}

export default function Cart({ params }: CartProps) {
  const query = useQuery<Query>();
  const [activeTab, setActiveTab] = useState('1');
  const [unlockedTabs, setUnlockedTabs] = useState<string[]>(['1', '2']);
  const { setAddressFormData } = useUserStore();

  const { totalProductsInCart } = useProductCalculations(params.patientFileId);

  const { addOrUpdateProductInFqlx } = useProductCrudOps({
    patientFileId: params.patientFileId,
  });

  const patientFile = useMemo(
    () =>
      query.PatientFile.firstWhere(
        `(product) => product.id == "${params.patientFileId}"`
      )
        .project({ patient: true, teeth: true })
        .exec(),
    [params.patientFileId, query]
  );

  const handleProductCountChange = async (
    updatedQuantity: number,
    toothNumber: number,
    productId: string
  ) => {
    const getMappedTeeth = (teeth: Tooth[]) => {
      teeth.forEach((tooth: Tooth) => {
        const localToothNumber = Number(tooth.name);

        Object.values(AREA_TYPE).forEach((area) => {
          const selectedProducts = [
            ...(tooth?.[area]?.treatmentDoc?.selectedProducts ?? []),
          ];
          const isToothMatched = localToothNumber === toothNumber;

          // @ts-expect-error
          tooth[area].treatmentDoc.selectedProducts = selectedProducts.map(
            ({ selectedProduct, quantity, ...args }) => {
              const isProductMatched = selectedProduct?.id === productId;

              return {
                ...args,
                selectedProduct: `Product.byId("${
                  selectedProduct?.id as string
                }")`,
                quantity:
                  isToothMatched && isProductMatched
                    ? updatedQuantity
                    : quantity,
              };
            }
          );
        });
      });
    };

    addOrUpdateProductInFqlx(getMappedTeeth);
  };

  const handleDeleteProduct = async (
    toothNumber: number,
    productId: string
  ) => {
    const getMappedTeeth = (teeth: Tooth[]) => {
      teeth.forEach((tooth: Tooth) => {
        const localToothNumber = Number(tooth.name);

        Object.values(AREA_TYPE).forEach((area) => {
          const selectedProducts = [
            ...(tooth[area].treatmentDoc.selectedProducts ?? []),
          ];
          const filteredSelectedProducts: SelectedProduct[] = [];
          const isToothMatched = localToothNumber === toothNumber;

          selectedProducts.forEach(({ quantity, selectedProduct, ...args }) => {
            if (!(selectedProduct?.id === productId && isToothMatched)) {
              filteredSelectedProducts.push({
                ...args,
                selectedProduct:
                  `Product.byId("${selectedProduct?.id}")` as unknown as Product,
                quantity: quantity,
              });
            }
          });

          tooth[area].treatmentDoc.selectedProducts = filteredSelectedProducts;
        });
      });
    };

    addOrUpdateProductInFqlx(getMappedTeeth);
  };

  const handleTabClick = (tabId: string) => {
    if (unlockedTabs.includes(tabId)) {
      setActiveTab(tabId);
    }
  };

  const activateTab = (tabId: string) => {
    if (!unlockedTabs.includes(tabId)) {
      setUnlockedTabs([...unlockedTabs, tabId]);
    }

    setActiveTab(tabId);
  };

  useEffect(() => {
    setAddressFormData(null);
  }, []);

  return (
    <View
      height={'100%'}
      className="overflow-y-scroll print:overflow-visible print:mr-x2 sm:!max-h-[calc(100svh-53px)]"
    >
      <CartHeader totalProductsCount={totalProductsInCart} />
      <View
        height={'100%'}
        direction="column"
        align="center"
        paddingInline={{ xl: 35 }}
        className={'!max-h-[calc(100svh-153px)]'}
      >
        <Tabs
          variant="pills-elevated"
          value={activeTab}
          onChange={({ value }) => handleTabClick(value)}
        >
          <View
            paddingBlock={{ xl: 6 }}
            width={'100%'}
            maxWidth={'1280px'}
            className="print:hidden"
            paddingInline={{ xl: 6, l: 6, m: 0, s: 0 }}
          >
            <Tabs.List
              className={
                '[&_[role=presentation]]:max-lg:!grow [&_[role=presentation]]:max-lg:!basis-0 [&_[role=tablist]]:max-lg:!w-full [&_[role=tablist]]:flex-1 [&_[role=tablist]]:overflow-x-visible [&_[role=tablist]]:min-[1024px]:!min-w-[624px] [&_[role=tablist]>*]:!w-[33%] '
              }
            >
              {ShippingTabs.map((tab) => (
                <Tabs.Item key={tab.title} value={tab.id}>
                  <View
                    direction={{ s: 'column', xl: 'row' }}
                    align={'center'}
                    justify={'center'}
                    gap={2}
                    className="!flex-nowrap"
                  >
                    <Badge
                      color={activeTab === tab.id ? 'primary' : undefined}
                      size="small"
                    >
                      {tab.id}
                    </Badge>
                    <Text variant="body-3">{tab.title}</Text>
                  </View>
                </Tabs.Item>
              ))}
            </Tabs.List>
          </View>

          <View
            width="100%"
            maxWidth="1280px"
            align="center"
            paddingTop={11}
            className="[&_[role=tabpanel]]:w-full [&_[role=tabpanel]]:h-full"
          >
            <Tabs.Panel value="1">
              <View
                direction={{ s: 'column', xl: 'row' }}
                gap={{ xl: 26 }}
                height="100%"
                grow
              >
                <View.Item grow>
                  <CartItemsList
                    teeth={patientFile.teeth}
                    onProductCountChange={handleProductCountChange}
                    onDeleteProduct={handleDeleteProduct}
                  />
                </View.Item>
                <View.Item className="sticky bottom-0 top-[128px]">
                  <CartCostCard
                    params={params}
                    onClick={() => setActiveTab('2')}
                    buttonText="Shipping Details"
                    color="primary"
                  />
                </View.Item>
              </View>
            </Tabs.Panel>

            <Tabs.Panel value="2">
              <ShippingForm setActiveTab={activateTab} params={params} />
            </Tabs.Panel>

            <Tabs.Panel value="3">
              <CartOrder params={params} setActiveTab={activateTab} />
            </Tabs.Panel>
          </View>
        </Tabs>
      </View>
    </View>
  );
}
