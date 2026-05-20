//app\actions\index.ts

/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { prisma } from '../lib/prisma';
import { revalidatePath } from 'next/cache';

interface CreateOrderItem {
  serviceId?: string;
  serviceName: string;
  variantName?: string;
  componentName?: string;
  price: number;
  installTime?: string;
}

interface CreateOrderInput {
  atendimento: 'LOJA' | 'LOCAL';
  customerName: string;
  customerCpf?: string;
  customerPhone: string;
  address?: string;
  preferredTime?: string;
  observation?: string;
  gift: boolean;
  subtotal: number;
  discount: number;
  locationFee: number;
  total: number;
  deviceModelId?: string;
  deviceModelName?: string;
  brandName?: string;
  items: CreateOrderItem[];
}

// ─── Slug Helper ──────────────────────────────────────────
function slug(str: string) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// ═══════════════════════════════════════════════════════════
// 📱 FLUXO PÚBLICO - Catálogo de Serviços
// ═══════════════════════════════════════════════════════════

export async function getBrands() {
  return prisma.brand.findMany({
    where: { active: true },
    orderBy: { order: 'asc' },
  });
}

export async function getBrandBySlug(slug: string) {
  return prisma.brand.findUnique({
    where: { slug },
    include: {
      lines: {
        where: { active: true },
        orderBy: { order: 'asc' },
        include: {
          models: {
            where: { active: true },
            orderBy: { order: 'asc' },
          },
        },
      },
    },
  });
}

export async function getLinesByBrand(brandSlug: string) {
  console.log('getLinesByBrand - Input slug:', brandSlug); // DEBUG

  if (!brandSlug || brandSlug === 'undefined') {
    console.error('Invalid brandSlug:', brandSlug);
    return [];
  }

  // Tenta buscar diretamente pelas linhas primeiro
  const lines = await prisma.deviceLine.findMany({
    where: {
      brand: {
        slug: brandSlug,
      },
      active: true,
    },
    orderBy: { order: 'asc' },
    include: {
      brand: true,
      models: {
        where: { active: true },
        orderBy: { order: 'asc' },
      },
    },
  });

  console.log('getLinesByBrand - Found lines:', lines.length); // DEBUG

  return lines;
}

export async function getModelBySlug(
  brandSlug: string,
  lineSlug: string,
  modelSlug: string
) {
  return prisma.deviceModel.findFirst({
    where: {
      slug: modelSlug,
      active: true,
      line: {
        slug: lineSlug,
        active: true,
        brand: {
          slug: brandSlug,
          active: true,
        },
      },
    },
    include: {
      line: {
        include: {
          brand: true,
        },
      },
      services: {
        where: { active: true },
        orderBy: { order: 'asc' },
        include: {
          variants: {
            where: { active: true },
            orderBy: { order: 'asc' },
          },
          components: {
            where: { active: true },
            orderBy: { order: 'asc' },
          },
        },
      },
    },
  });
}

// ═══════════════════════════════════════════════════════════
// 🛒 PEDIDOS
// ═══════════════════════════════════════════════════════════

export async function createOrder(data: CreateOrderInput) {
  try {
    const order = await prisma.order.create({
      data: {
        status: 'PENDING',
        atendimento: data.atendimento,
        customerName: data.customerName,
        customerCpf: data.customerCpf || null,
        customerPhone: data.customerPhone,
        address: data.address || null,
        preferredTime: data.preferredTime || null,
        observation: data.observation || null,
        gift: data.gift,
        subtotal: data.subtotal,
        discount: data.discount,
        locationFee: data.locationFee,
        total: data.total,
        deviceModelId: data.deviceModelId || null,
        deviceModelName: data.deviceModelName || null,
        brandName: data.brandName || null,
        items: {
          create: data.items.map((item) => ({
            serviceId: item.serviceId || null,
            serviceName: item.serviceName,
            variantName: item.variantName || null,
            componentName: item.componentName || null,
            price: item.price,
            installTime: item.installTime || null,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    revalidatePath('/admin/orders');
    return { success: true, order };
  } catch (error) {
    console.error('Error creating order:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro ao criar pedido',
    };
  }
}

// Versão alternativa que cria o pedido E envia o WhatsApp
export async function createOrderAndNotify(data: CreateOrderInput) {
  try {
    // 1. Salvar no banco
    const result = await createOrder(data);

    if (!result.success) {
      return result;
    }

    // 2. Gerar mensagem do WhatsApp (mesma lógica do frontend)
    const message = generateOrderMessage(data);

    // 3. Buscar número do WhatsApp das configurações
    const settings = await prisma.settings.findFirst();
    const whatsappNumber =
      settings?.whatsapp ||
      process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ||
      '554730171887';

    return {
      success: true,
      order: result.order,
      whatsappUrl: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
      message,
    };
  } catch (error) {
    console.error('Error in createOrderAndNotify:', error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'Erro ao processar pedido',
    };
  }
}

// Função auxiliar para gerar a mensagem do WhatsApp
function generateOrderMessage(data: CreateOrderInput): string {
  const lines: string[] = [
    '📱 *Novo Pedido — Tok Cell*',
    '─────────────────────────',
    '',
    `👤 *Cliente:* ${data.customerName}`,
    data.customerCpf ? `🪪 *CPF:* ${data.customerCpf}` : '',
    `📞 *WhatsApp:* ${data.customerPhone}`,
    '',
    data.brandName || data.deviceModelName
      ? `📱 *Aparelho:* ${[data.brandName, data.deviceModelName].filter(Boolean).join(' ')}`
      : '',
    '',
    `📍 *Atendimento:* ${data.atendimento === 'LOCAL' ? 'No Local' : 'Na Loja'}`,
    data.atendimento === 'LOCAL' && data.address
      ? `🏠 *Endereço:* ${data.address}`
      : '',
    data.atendimento === 'LOCAL' && data.preferredTime
      ? `🕐 *Horário preferido:* ${data.preferredTime}`
      : '',
    '',
    '🔧 *Serviços Solicitados:*',
    ...data.items.map((item, i) => {
      const label = [item.serviceName, item.variantName, item.componentName]
        .filter(Boolean)
        .join(' — ');
      return `  ${i + 1}. ${label} → ${formatCurrency(item.price)}`;
    }),
    '',
    '─────────────────────────',
    `💰 *Subtotal:* ${formatCurrency(data.subtotal)}`,
    data.discount > 0
      ? `🎉 *Desconto multi-serviço (5%):* -${formatCurrency(data.discount)}`
      : '',
    data.atendimento === 'LOCAL'
      ? `🚗 *Taxa de deslocamento (7%):* +${formatCurrency(data.locationFee)}`
      : '',
    `✅ *Total: ${formatCurrency(data.total)}*`,
    '',
    data.gift ? '🎁 *Brinde:* Película ou capinha' : '',
    data.observation ? `📝 *Observação:* ${data.observation}` : '',
    '',
    `🆔 *Pedido #:* Será gerado automaticamente`,
  ];

  return lines.filter((l) => l !== '').join('\n');
}

// Helper para formatação (mesmo que o frontend)
function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}
export async function getOrders(page = 1, pageSize = 20) {
  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      take: pageSize,
      skip: (page - 1) * pageSize,
      orderBy: { createdAt: 'desc' },
      include: { items: true },
    }),
    prisma.order.count(),
  ]);
  return { orders, total, pages: Math.ceil(total / pageSize) };
}

export async function updateOrderStatus(id: string, status: string) {
  return prisma.order.update({
    where: { id },
    data: { status: status as any },
  });
}

// ═══════════════════════════════════════════════════════════
// 🔧 ADMIN - Marcas
// ═══════════════════════════════════════════════════════════

export async function adminGetBrands() {
  return prisma.brand.findMany({
    orderBy: { order: 'asc' },
    include: { _count: { select: { lines: true } } },
  });
}

export async function adminCreateBrand(data: {
  name: string;
  imageUrl?: string;
}) {
  const brand = await prisma.brand.create({
    data: { name: data.name, slug: slug(data.name), imageUrl: data.imageUrl },
  });
  revalidatePath('/admin/brands');
  revalidatePath('/servicos');
  return brand;
}

export async function adminUpdateBrand(
  id: string,
  data: { name: string; imageUrl?: string; active: boolean; order: number }
) {
  const brand = await prisma.brand.update({
    where: { id },
    data: { ...data, slug: slug(data.name) },
  });
  revalidatePath('/admin/brands');
  revalidatePath('/servicos');
  return brand;
}

export async function adminDeleteBrand(id: string) {
  await prisma.brand.delete({ where: { id } });
  revalidatePath('/admin/brands');
  revalidatePath('/servicos');
}

// ═══════════════════════════════════════════════════════════
// 🔧 ADMIN - Linhas
// ═══════════════════════════════════════════════════════════

export async function adminGetLines(brandId?: string) {
  return prisma.deviceLine.findMany({
    where: brandId ? { brandId } : undefined,
    orderBy: [{ brandId: 'asc' }, { order: 'asc' }],
    include: {
      brand: true,
      _count: { select: { models: true } },
    },
  });
}

export async function adminCreateLine(data: { name: string; brandId: string }) {
  const line = await prisma.deviceLine.create({
    data: { name: data.name, slug: slug(data.name), brandId: data.brandId },
  });
  revalidatePath('/admin/lines');
  return line;
}

export async function adminUpdateLine(
  id: string,
  data: { name: string; active: boolean; order: number }
) {
  const line = await prisma.deviceLine.update({
    where: { id },
    data: { ...data, slug: slug(data.name) },
  });
  revalidatePath('/admin/lines');
  return line;
}

export async function adminDeleteLine(id: string) {
  await prisma.deviceLine.delete({ where: { id } });
  revalidatePath('/admin/lines');
}

// ═══════════════════════════════════════════════════════════
// 🔧 ADMIN - Modelos
// ═══════════════════════════════════════════════════════════

export async function adminGetModels(lineId?: string) {
  return prisma.deviceModel.findMany({
    where: lineId ? { lineId } : undefined,
    orderBy: [{ lineId: 'asc' }, { order: 'asc' }],
    include: {
      line: { include: { brand: true } },
      _count: { select: { services: true } },
    },
  });
}

export async function adminCreateModel(data: {
  name: string;
  lineId: string;
  imageUrl?: string;
}) {
  const model = await prisma.deviceModel.create({
    data: {
      name: data.name,
      slug: slug(data.name),
      lineId: data.lineId,
      imageUrl: data.imageUrl,
    },
  });
  revalidatePath('/admin/models');
  return model;
}

export async function adminUpdateModel(
  id: string,
  data: { name: string; active: boolean; order: number; imageUrl?: string }
) {
  const model = await prisma.deviceModel.update({
    where: { id },
    data: { ...data, slug: slug(data.name) },
  });
  revalidatePath('/admin/models');
  return model;
}

export async function adminDeleteModel(id: string) {
  await prisma.deviceModel.delete({ where: { id } });
  revalidatePath('/admin/models');
}

// ═══════════════════════════════════════════════════════════
// 🔧 ADMIN - Serviços
// ═══════════════════════════════════════════════════════════

export async function adminGetServices(modelId?: string) {
  return prisma.service.findMany({
    where: modelId ? { modelId } : undefined,
    orderBy: [{ modelId: 'asc' }, { order: 'asc' }],
    include: {
      model: { include: { line: { include: { brand: true } } } },
      variants: { orderBy: { order: 'asc' } },
      components: { orderBy: { order: 'asc' } },
    },
  });
}

export async function adminCreateService(data: {
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  installTime: string;
  atendimento: string;
  type: string;
  isAttempt: boolean;
  promotionBadge?: string;
  modelId: string;
}) {
  const service = await prisma.service.create({
    data: {
      ...data,
      slug: slug(data.name),
      price: data.price,
      originalPrice: data.originalPrice ?? null,
      atendimento: data.atendimento as any,
      type: data.type as any,
    },
  });
  revalidatePath('/admin/services');
  return service;
}

export async function adminUpdateService(
  id: string,
  data: {
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    installTime: string;
    atendimento: string;
    type: string;
    isAttempt: boolean;
    promotionBadge?: string;
    active: boolean;
    order: number;
  }
) {
  const service = await prisma.service.update({
    where: { id },
    data: {
      ...data,
      slug: slug(data.name),
      originalPrice: data.originalPrice ?? null,
      atendimento: data.atendimento as any,
      type: data.type as any,
    },
  });
  revalidatePath('/admin/services');
  return service;
}

export async function adminDeleteService(id: string) {
  await prisma.service.delete({ where: { id } });
  revalidatePath('/admin/services');
}

export async function adminUpsertVariants(
  serviceId: string,
  variants: { name: string; price: number }[]
) {
  await prisma.serviceVariant.deleteMany({ where: { serviceId } });
  await prisma.serviceVariant.createMany({
    data: variants.map((v, i) => ({ ...v, serviceId, order: i })),
  });
  revalidatePath('/admin/services');
}

export async function adminUpsertComponents(
  serviceId: string,
  components: { name: string; price: number }[]
) {
  await prisma.serviceComponent.deleteMany({ where: { serviceId } });
  await prisma.serviceComponent.createMany({
    data: components.map((c, i) => ({ ...c, serviceId, order: i })),
  });
  revalidatePath('/admin/services');
}

// ═══════════════════════════════════════════════════════════
// 🔧 ADMIN - Pedidos
// ═══════════════════════════════════════════════════════════

export async function adminGetOrders({
  page = 1,
  status,
}: { page?: number; status?: string } = {}) {
  const pageSize = 20;
  const where = status ? { status: status as any } : {};

  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      where,
      take: pageSize,
      skip: (page - 1) * pageSize,
      orderBy: { createdAt: 'desc' },
      include: { items: true },
    }),
    prisma.order.count({ where }),
  ]);

  return { orders, total, pages: Math.ceil(total / pageSize) };
}

export async function adminUpdateOrderStatus(id: string, status: string) {
  const order = await prisma.order.update({
    where: { id },
    data: { status: status as any },
  });
  revalidatePath('/admin/orders');
  return order;
}

export async function adminGetOrderById(id: string) {
  return prisma.order.findUnique({
    where: { id },
    include: { items: true },
  });
}

// ═══════════════════════════════════════════════════════════
// 🔧 ADMIN - Dashboard
// ═══════════════════════════════════════════════════════════

export async function adminGetStats() {
  const [
    totalOrders,
    pendingOrders,
    completedOrders,
    totalBrands,
    totalModels,
    totalServices,
    recentOrders,
  ] = await Promise.all([
    prisma.order.count(),
    prisma.order.count({ where: { status: 'PENDING' } }),
    prisma.order.count({ where: { status: 'COMPLETED' } }),
    prisma.brand.count(),
    prisma.deviceModel.count(),
    prisma.service.count(),
    prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: { items: { take: 1 } },
    }),
  ]);

  const revenue = await prisma.order.aggregate({
    where: { status: 'COMPLETED' },
    _sum: { total: true },
  });

  return {
    totalOrders,
    pendingOrders,
    completedOrders,
    totalBrands,
    totalModels,
    totalServices,
    revenue: Number(revenue._sum.total ?? 0),
    recentOrders,
  };
}

// ═══════════════════════════════════════════════════════════
// 🔧 ADMIN - Configurações
// ═══════════════════════════════════════════════════════════

export async function adminGetSettings() {
  return prisma.settings.findFirst();
}

export async function adminUpdateSettings(data: {
  whatsapp: string;
  address: string;
  city: string;
  state: string;
  multiDiscount: number;
  locationFee: number;
  minServicesDiscount: number;
}) {
  const existing = await prisma.settings.findFirst();
  if (existing) {
    return prisma.settings.update({ where: { id: existing.id }, data });
  }
  return prisma.settings.create({ data: { id: 'default', ...data } });
}
