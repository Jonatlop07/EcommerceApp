import AddItemInputModel from '@core/domain/catalog/use-case/input-model/add_item.input_model'

const addItemStub = (): AddItemInputModel => ({
  vendor_id: '1',
  name: 'item1',
  description: '',
  price: 1.0,
  units_available: 1
});

export default addItemStub;
