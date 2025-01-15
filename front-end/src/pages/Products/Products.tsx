import { Alert, Button, Grid2 as Grid } from '@mui/material';
import { omitBy } from 'lodash';
import { toast } from 'react-toastify';
import ConfirmationModal from '../../components/ConfirmationModal';
import Icon from '../../components/Icon';
import PageContainer from '../../components/PageContainer';
import PageTitle from '../../components/PageTitle';
import Pill from '../../components/Pill';
import useAsyncPagination from '../../hooks/useAsyncPagination';
import { useModalMode } from '../../hooks/useModalMode';
import {
  useAddProductMutation,
  useDeleteProductMutation,
  useLazyGetProductsQuery,
  useUpdateProductMutation,
} from '../../redux/api/productsApi';
import { ModalMode } from '../../types/enums';
import { Product, ProductData } from '../../types/products';
import { toastErr } from '../../utils/form-utils';
import AddEditProductModal from './modals/AddEditProductModal';
import ProductsFilters from './sections/ProductsFilters';
import ProductsTable from './sections/ProductsTable';

const Products = () => {
  const { products, refetch, filters, ResetButton, ...asyncPagination } =
    useAsyncPagination<Product>({
      lazyRtkQuery: useLazyGetProductsQuery as any,
      queryKey: 'products',
    });

  const [addProduct, addProductState] = useAddProductMutation();
  const [updateProduct, updateProductState] = useUpdateProductMutation();
  const [deleteProduct, deleteProductState] = useDeleteProductMutation();
  const [addEditMode, setAddEditMode, addEditValues] = useModalMode<Product>();
  const [deleteMode, setDeleteMode, deleteValues] = useModalMode<Product>();
  const [changeActiveStatusMode, setChangeActiveStatusMode, changeActiveStatusValues] =
    useModalMode<Product>();

  const onAddProduct = (data: ProductData): void => {
    const nonEmptyData = omitBy(data, (v) => v === '') as ProductData;
    const promise = addProduct(nonEmptyData);

    toast
      .promise(promise, {
        pending: 'Dodawanie produktu...',
        success: 'Pomyślnie dodano produkt',
        error: 'Nie udało się dodać produktu',
      })
      .then(() => {
        setAddEditMode(ModalMode.CLOSED);
        refetch();
      });
  };

  const onEditProduct = (data: ProductData): void => {
    if (!addEditValues) return toastErr();

    const promise = updateProduct({ ...data, id: addEditValues.id });

    toast
      .promise(promise, {
        pending: 'Edytowanie produktu...',
        success: 'Pomyślnie edytowano produkt',
        error: 'Nie udało się edytować produktu',
      })
      .then(() => {
        setAddEditMode(ModalMode.CLOSED);
        refetch();
      });
  };

  const onDeleteProduct = (): void => {
    if (!deleteValues) return toastErr();

    const promise = deleteProduct(deleteValues.id);

    toast
      .promise(promise, {
        pending: 'Usuwanie produktu...',
        success: 'Pomyślnie usunięto produkt',
        error: 'Nie udało się usunąć produktu',
      })
      .then(() => {
        setDeleteMode(ModalMode.CLOSED);
        refetch();
      });
  };

  const onChangeProductActiveStatus = (): void => {
    if (!changeActiveStatusValues) return toastErr();

    const promise = updateProduct({
      ...changeActiveStatusValues,
      active: !changeActiveStatusValues.active,
      id: changeActiveStatusValues.id,
    });

    toast
      .promise(promise, {
        pending: 'Zmiana statusu aktywności produktu...',
        success: 'Pomyślnie edytowano status aktywności produktu',
        error: 'Nie udało się zmienić statusu aktywności produktu',
      })
      .then(() => {
        setChangeActiveStatusMode(ModalMode.CLOSED);
        refetch();
      });
  };

  return (
    <PageContainer>
      <PageTitle
        title="Lista produktów"
        rightContent={
          <Button
            variant="contained"
            startIcon={<Icon.Add />}
            onClick={() => setAddEditMode(ModalMode.ADD)}
          >
            Dodaj produkt
          </Button>
        }
        bottomContent={
          <>
            <Alert severity="info" color="success" sx={{ mb: 2 }}>
              <strong>Produkty</strong> - tak na potrzeby aplikacji zostały nazwane wszelkie usługi
              zarobkowe organizacji.
            </Alert>
            <ResetButton />
          </>
        }
      />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }}>
          <ProductsFilters filters={filters} />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <ProductsTable
            products={products}
            asyncPagination={asyncPagination as any}
            {...{
              setAddEditMode,
              setDeleteMode,
              setChangeActiveStatusMode,
            }}
          />
        </Grid>
      </Grid>

      <AddEditProductModal
        mode={addEditMode}
        setMode={setAddEditMode}
        values={addEditValues}
        submit={addEditMode === ModalMode.ADD ? onAddProduct : onEditProduct}
        isLoading={addProductState.isLoading || updateProductState.isLoading}
      />

      <ConfirmationModal
        open={!!deleteMode}
        close={() => setDeleteMode(ModalMode.CLOSED)}
        onConfirm={onDeleteProduct}
        title={
          <>
            Usuń produkt <Pill severity="error">{deleteValues?.name}</Pill>
          </>
        }
        isLoading={deleteProductState.isLoading}
        deletion
      >
        <Alert severity="error">
          Czy na pewno chcesz trwale usunąć ten produkt z bazy? Może to wpłynąć na dane Twojej
          organizacji.
        </Alert>
      </ConfirmationModal>

      <ConfirmationModal
        open={!!changeActiveStatusMode}
        close={() => setChangeActiveStatusMode(ModalMode.CLOSED)}
        onConfirm={onChangeProductActiveStatus}
        title={changeActiveStatusValues?.active ? 'Deaktywuj product' : 'Aktywuj product'}
        isLoading={updateProductState.isLoading}
      >
        <Alert severity="warning">
          Czy na pewno chcesz zmienić status produktu{' '}
          <Pill severity="warning">{changeActiveStatusValues?.name}</Pill> na{' '}
          <strong>{changeActiveStatusValues?.active ? 'nieaktywny' : 'aktywny'}</strong>?
        </Alert>
      </ConfirmationModal>
    </PageContainer>
  );
};

export default Products;
