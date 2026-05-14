export type Brand = {
  id: string;
  name: string;
  slug: string;
  imageUrl: string | null;
  order: number;
};

export type DeviceLine = {
  id: string;
  name: string;
  slug: string;
  brandId: string;
  brand?: Brand;
  models?: DeviceModel[];
};

export type DeviceModel = {
  id: string;
  name: string;
  slug: string;
  lineId: string;
  line?: DeviceLine;
  imageUrl: string | null;
};

export type ServiceVariant = {
  id: string;
  name: string;
  price: number;
};

export type ServiceComponent = {
  id: string;
  name: string;
  price: number;
};

export type Service = {
  id: string;
  name: string;
  slug: string;
  description: string;
  type: string;
  atendimento: 'LOJA' | 'LOCAL' | 'LOJA_E_LOCAL';
  originalPrice: number | null;
  price: number;
  installTime: string;
  isAttempt: boolean;
  promotionBadge: string | null;
  modelId: string;
  variants: ServiceVariant[];
  components: ServiceComponent[];
};

export type CartItem = {
  id: string;
  service: Service;
  selectedVariant?: ServiceVariant;
  selectedComponent?: ServiceComponent;
  price: number;
  modelName: string;
  brandName: string;
  lineSlug: string;
  brandSlug: string;
};

export type CartState = {
  items: CartItem[];
  deviceModel: DeviceModel | null;
  brandName: string;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  setDevice: (model: DeviceModel, brandName: string) => void;
  total: number;
  subtotal: number;
  discount: number;
  locationFee: number;
  itemCount: number;
};

export type CheckoutForm = {
  atendimento: 'LOJA' | 'LOCAL';
  name: string;
  cpf?: string;
  phone: string;
  address?: string;
  preferredTime?: string;
  observation?: string;
  gift: boolean;
};

export type OrderPayload = {
  form: CheckoutForm;
  items: CartItem[];
  subtotal: number;
  discount: number;
  locationFee: number;
  total: number;
  deviceModelName: string;
  brandName: string;
};

export interface OrderItem {
  id: string;
  orderId: string;
  serviceId: string | null;
  serviceName: string;
  variantName: string | null;
  componentName: string | null;
  price: number;
  installTime: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Order {
  id: string;
  status: 'PENDING' | 'CONFIRMED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELED';
  atendimento: 'LOJA' | 'LOCAL';
  customerName: string;
  customerCpf: string | null;
  customerPhone: string;
  address: string | null;
  preferredTime: string | null;
  observation: string | null;
  gift: boolean;
  subtotal: number;
  discount: number;
  locationFee: number;
  total: number;
  deviceModelId: string | null;
  deviceModelName: string | null;
  brandName: string | null;
  items: OrderItem[];
  createdAt: Date;
  updatedAt: Date;
}
