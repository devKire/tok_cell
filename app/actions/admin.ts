/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '../lib/prisma';

function slug(str: string) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// ─── Brands ───────────────────────────────────────────────

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

// ─── Lines ────────────────────────────────────────────────

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

// ─── Models ───────────────────────────────────────────────

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

// ─── Services ─────────────────────────────────────────────

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

// ─── Orders ───────────────────────────────────────────────

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

// ─── Dashboard Stats ──────────────────────────────────────

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

// ─── Settings ─────────────────────────────────────────────

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

// ─── Testimonials ─────────────────────────────────────────

export async function adminGetTestimonials() {
  return prisma.testimonial.findMany({
    orderBy: { createdAt: 'desc' },
  });
}

export async function adminCreateTestimonial(data: {
  name: string;
  avatar?: string | null;
  rating?: number;
  content: string;
  device?: string | null;
}) {
  const testimonial = await prisma.testimonial.create({
    data: {
      name: data.name,
      avatar: data.avatar || null,
      rating: data.rating || 5,
      content: data.content,
      device: data.device || null,
      active: true,
    },
  });
  revalidatePath('/admin/testimonials');
  return testimonial;
}

export async function adminUpdateTestimonial(
  id: string,
  data: {
    name: string;
    avatar?: string | null;
    rating?: number;
    content: string;
    device?: string | null;
    active: boolean;
  }
) {
  const testimonial = await prisma.testimonial.update({
    where: { id },
    data: {
      name: data.name,
      avatar: data.avatar || null,
      rating: data.rating || 5,
      content: data.content,
      device: data.device || null,
      active: data.active,
    },
  });
  revalidatePath('/admin/testimonials');
  return testimonial;
}

export async function adminDeleteTestimonial(id: string) {
  await prisma.testimonial.delete({
    where: { id },
  });
  revalidatePath('/admin/testimonials');
}
