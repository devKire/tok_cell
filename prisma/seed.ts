/* eslint-disable @typescript-eslint/no-explicit-any */
import { AtendimentoType, ServiceType } from '@prisma/client';
import { prisma } from '../app/lib/prisma';

function slug(str: string) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

async function main() {
  console.log('🌱 Seeding database...');

  // Settings
  await prisma.settings.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      whatsapp: '5547997513609',
      address: 'Adhemar Garcia, Joinville/SC',
      city: 'Joinville',
      state: 'SC',
      multiDiscount: 5,
      locationFee: 7,
      minServicesDiscount: 2,
    },
  });

  // ─── Apple ───────────────────────────────────────────────
  const apple = await prisma.brand.upsert({
    where: { slug: 'apple' },
    update: {},
    create: { name: 'Apple', slug: 'apple', order: 1 },
  });

  const iphoneLines: { name: string; models: string[] }[] = [
    {
      name: 'iPhone 11',
      models: ['iPhone 11', 'iPhone 11 Pro', 'iPhone 11 Pro Max'],
    },
    {
      name: 'iPhone 12',
      models: [
        'iPhone 12',
        'iPhone 12 Mini',
        'iPhone 12 Pro',
        'iPhone 12 Pro Max',
      ],
    },
    {
      name: 'iPhone 13',
      models: [
        'iPhone 13',
        'iPhone 13 Mini',
        'iPhone 13 Pro',
        'iPhone 13 Pro Max',
      ],
    },
    {
      name: 'iPhone 14',
      models: [
        'iPhone 14',
        'iPhone 14 Plus',
        'iPhone 14 Pro',
        'iPhone 14 Pro Max',
      ],
    },
    {
      name: 'iPhone 15',
      models: [
        'iPhone 15',
        'iPhone 15 Plus',
        'iPhone 15 Pro',
        'iPhone 15 Pro Max',
      ],
    },
    {
      name: 'iPhone 16',
      models: [
        'iPhone 16',
        'iPhone 16 Plus',
        'iPhone 16 Pro',
        'iPhone 16 Pro Max',
      ],
    },
    {
      name: 'iPhone 17',
      models: [
        'iPhone 17',
        'iPhone 17 Air',
        'iPhone 17 Pro',
        'iPhone 17 Pro Max',
      ],
    },
  ];

  for (const lineData of iphoneLines) {
    const line = await prisma.deviceLine.upsert({
      where: { brandId_slug: { brandId: apple.id, slug: slug(lineData.name) } },
      update: {},
      create: {
        name: lineData.name,
        slug: slug(lineData.name),
        brandId: apple.id,
      },
    });

    for (const modelName of lineData.models) {
      const model = await prisma.deviceModel.upsert({
        where: { lineId_slug: { lineId: line.id, slug: slug(modelName) } },
        update: {},
        create: { name: modelName, slug: slug(modelName), lineId: line.id },
      });

      // Services for iPhone 15 as example (replicate pattern)
      if (lineData.name === 'iPhone 15' && modelName === 'iPhone 15 Pro') {
        await seedIphoneServices(model.id);
      }
    }
  }

  // ─── Samsung ─────────────────────────────────────────────
  const samsung = await prisma.brand.upsert({
    where: { slug: 'samsung' },
    update: {},
    create: { name: 'Samsung', slug: 'samsung', order: 2 },
  });

  const samsungLines = [
    {
      name: 'Galaxy S24',
      models: ['Galaxy S24', 'Galaxy S24+', 'Galaxy S24 Ultra'],
    },
    {
      name: 'Galaxy S25',
      models: ['Galaxy S25', 'Galaxy S25+', 'Galaxy S25 Ultra'],
    },
    { name: 'Galaxy A55', models: ['Galaxy A55', 'Galaxy A35'] },
    { name: 'Galaxy Z Fold', models: ['Galaxy Z Fold 6', 'Galaxy Z Fold 5'] },
    { name: 'Galaxy Z Flip', models: ['Galaxy Z Flip 6', 'Galaxy Z Flip 5'] },
  ];

  for (const lineData of samsungLines) {
    const line = await prisma.deviceLine.upsert({
      where: {
        brandId_slug: { brandId: samsung.id, slug: slug(lineData.name) },
      },
      update: {},
      create: {
        name: lineData.name,
        slug: slug(lineData.name),
        brandId: samsung.id,
      },
    });
    for (const modelName of lineData.models) {
      await prisma.deviceModel.upsert({
        where: { lineId_slug: { lineId: line.id, slug: slug(modelName) } },
        update: {},
        create: { name: modelName, slug: slug(modelName), lineId: line.id },
      });
    }
  }

  // ─── Motorola ────────────────────────────────────────────
  const motorola = await prisma.brand.upsert({
    where: { slug: 'motorola' },
    update: {},
    create: { name: 'Motorola', slug: 'motorola', order: 3 },
  });

  const motorolaLines = [
    { name: 'Moto G', models: ['Moto G84', 'Moto G54', 'Moto G34'] },
    { name: 'Edge', models: ['Edge 50 Pro', 'Edge 50 Fusion', 'Edge 40 Pro'] },
    { name: 'Razr', models: ['Razr 50', 'Razr 50 Ultra'] },
  ];

  for (const lineData of motorolaLines) {
    const line = await prisma.deviceLine.upsert({
      where: {
        brandId_slug: { brandId: motorola.id, slug: slug(lineData.name) },
      },
      update: {},
      create: {
        name: lineData.name,
        slug: slug(lineData.name),
        brandId: motorola.id,
      },
    });
    for (const modelName of lineData.models) {
      await prisma.deviceModel.upsert({
        where: { lineId_slug: { lineId: line.id, slug: slug(modelName) } },
        update: {},
        create: { name: modelName, slug: slug(modelName), lineId: line.id },
      });
    }
  }

  // ─── Xiaomi ──────────────────────────────────────────────
  const xiaomi = await prisma.brand.upsert({
    where: { slug: 'xiaomi' },
    update: {},
    create: { name: 'Xiaomi', slug: 'xiaomi', order: 4 },
  });

  const xiaomiLines = [
    {
      name: 'Redmi Note',
      models: ['Redmi Note 13 Pro', 'Redmi Note 13', 'Redmi Note 12'],
    },
    { name: 'POCO', models: ['POCO X6 Pro', 'POCO M6 Pro'] },
    { name: 'Xiaomi 14', models: ['Xiaomi 14', 'Xiaomi 14 Ultra'] },
  ];

  for (const lineData of xiaomiLines) {
    const line = await prisma.deviceLine.upsert({
      where: {
        brandId_slug: { brandId: xiaomi.id, slug: slug(lineData.name) },
      },
      update: {},
      create: {
        name: lineData.name,
        slug: slug(lineData.name),
        brandId: xiaomi.id,
      },
    });
    for (const modelName of lineData.models) {
      await prisma.deviceModel.upsert({
        where: { lineId_slug: { lineId: line.id, slug: slug(modelName) } },
        update: {},
        create: { name: modelName, slug: slug(modelName), lineId: line.id },
      });
    }
  }

  // Testimonials
  await prisma.testimonial.createMany({
    skipDuplicates: true,
    data: [
      {
        name: 'Carlos Mendes',
        rating: 5,
        content:
          'Excelente atendimento! Troquei a tela do meu iPhone 15 Pro em menos de 40 minutos. Serviço impecável.',
        device: 'iPhone 15 Pro',
      },
      {
        name: 'Ana Paula',
        rating: 5,
        content:
          'Fui indicada por uma amiga e não me arrependi. Bateria trocada com garantia, preço justo.',
        device: 'Samsung Galaxy S24',
      },
      {
        name: 'Ricardo Ferreira',
        rating: 5,
        content:
          'Serviço de qualidade em Joinville. Atenderam no local, super conveniente!',
        device: 'Motorola Edge 50',
      },
    ],
  });

  console.log('✅ Seed completo!');
}

async function seedIphoneServices(modelId: string) {
  const services = [
    {
      name: 'Troca de Vidro',
      slug: 'troca-de-vidro',
      type: ServiceType.TROCA_VIDRO,
      description:
        'Reparo avançado que mantém o display original, substituindo apenas o vidro frontal danificado. Processo delicado realizado com equipamentos de precisão.',
      price: 1650,
      originalPrice: 2800,
      installTime: '1 dia',
      atendimento: AtendimentoType.LOJA,
      isAttempt: true,
      promotionBadge: '-41%',
    },
    {
      name: 'Troca de Tela',
      slug: 'troca-de-tela',
      type: ServiceType.TROCA_TELA,
      description:
        'Substituição completa do conjunto de tela. Display com a mesma qualidade de cores e brilho do original.',
      price: 2100,
      installTime: '30 min',
      atendimento: AtendimentoType.LOJA_E_LOCAL,
      variants: [
        { name: 'Premium', price: 2100 },
        { name: 'Original Apple', price: 3200 },
      ],
    },
    {
      name: 'Bateria',
      slug: 'bateria',
      type: ServiceType.BATERIA,
      description:
        'Troca da bateria por componente de alta capacidade com certificação. Restore de vida útil do aparelho.',
      price: 600,
      installTime: '30 min',
      atendimento: AtendimentoType.LOJA_E_LOCAL,
    },
    {
      name: 'Componentes',
      slug: 'componentes',
      type: ServiceType.COMPONENTE,
      description:
        'Reparo e substituição de componentes internos. Selecione o componente desejado.',
      price: 350,
      installTime: '30 min',
      atendimento: AtendimentoType.LOJA_E_LOCAL,
      components: [
        { name: 'Conector de carga', price: 450 },
        { name: 'Microfone', price: 350 },
        { name: 'Alto-falante', price: 380 },
        { name: 'Botão volume', price: 320 },
        { name: 'Botão power', price: 320 },
        { name: 'Flash', price: 280 },
      ],
    },
    {
      name: 'Face ID',
      slug: 'face-id',
      type: ServiceType.OUTRO,
      description:
        'Restauração e reparo do sistema de reconhecimento facial. Requer peça original Apple.',
      price: 1950,
      installTime: '1 a 2 dias',
      atendimento: AtendimentoType.LOJA,
    },
    {
      name: 'Câmera Traseira',
      slug: 'camera-traseira',
      type: ServiceType.CAMERA,
      description:
        'Troca do conjunto de câmeras traseiras. Resolução e qualidade preservadas.',
      price: 1200,
      installTime: '1 hora',
      atendimento: AtendimentoType.LOJA_E_LOCAL,
    },
    {
      name: 'Tampa Traseira',
      slug: 'tampa-traseira',
      type: ServiceType.TAMPA,
      description:
        'Substituição do painel traseiro de vidro. Aparelho volta ao visual de fábrica.',
      price: 800,
      installTime: '2 a 3 horas',
      atendimento: AtendimentoType.LOJA,
    },
    {
      name: 'Limpeza Química',
      slug: 'limpeza-quimica',
      type: ServiceType.LIMPEZA,
      description:
        'Limpeza ultrassônica completa dos componentes internos. Ideal para aparelhos com contato com líquido.',
      price: 180,
      installTime: '2 horas',
      atendimento: AtendimentoType.LOJA,
    },
  ];

  for (const s of services) {
    const { variants, components, ...serviceData } = s as any;

    const service = await prisma.service.upsert({
      where: { modelId_slug: { modelId, slug: s.slug } },
      update: {},
      create: { ...serviceData, modelId },
    });

    if (variants) {
      for (const v of variants) {
        await prisma.serviceVariant
          .create({ data: { ...v, serviceId: service.id } })
          .catch(() => {});
      }
    }

    if (components) {
      for (const c of components) {
        await prisma.serviceComponent
          .create({ data: { ...c, serviceId: service.id } })
          .catch(() => {});
      }
    }
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
