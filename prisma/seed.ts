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
      whatsapp: '554730171887',
      address:
        'R. Eng. Eugênio Junqueira Neto, 95 - Adhemar Garcia, Joinville - SC, 89230-734',
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
    {
      name: 'iPhone SE',
      models: ['iPhone SE (2020)', 'iPhone SE (2022)'],
    },
    {
      name: 'iPhone XR',
      models: ['iPhone XR'],
    },
    {
      name: 'iPhone XS',
      models: ['iPhone XS', 'iPhone XS Max'],
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

      // Seed services for all iPhone models
      await seedIphoneServices(model.id, modelName);
    }
  }

  // ─── Samsung ─────────────────────────────────────────────
  const samsung = await prisma.brand.upsert({
    where: { slug: 'samsung' },
    update: {},
    create: { name: 'Samsung', slug: 'samsung', order: 2 },
  });

  const samsungLines = [
    // Linha Galaxy S
    {
      name: 'Galaxy S21',
      models: ['Galaxy S21', 'Galaxy S21+', 'Galaxy S21 Ultra'],
    },
    {
      name: 'Galaxy S22',
      models: ['Galaxy S22', 'Galaxy S22+', 'Galaxy S22 Ultra'],
    },
    {
      name: 'Galaxy S23',
      models: [
        'Galaxy S23',
        'Galaxy S23+',
        'Galaxy S23 Ultra',
        'Galaxy S23 FE',
      ],
    },
    {
      name: 'Galaxy S24',
      models: [
        'Galaxy S24',
        'Galaxy S24+',
        'Galaxy S24 Ultra',
        'Galaxy S24 FE',
      ],
    },
    {
      name: 'Galaxy S25',
      models: ['Galaxy S25', 'Galaxy S25+', 'Galaxy S25 Ultra'],
    },
    // Linha Galaxy A
    {
      name: 'Galaxy A15',
      models: ['Galaxy A15', 'Galaxy A15 5G'],
    },
    {
      name: 'Galaxy A25',
      models: ['Galaxy A25', 'Galaxy A25 5G'],
    },
    {
      name: 'Galaxy A35',
      models: ['Galaxy A35', 'Galaxy A35 5G'],
    },
    {
      name: 'Galaxy A55',
      models: ['Galaxy A55', 'Galaxy A55 5G'],
    },
    {
      name: 'Galaxy A05',
      models: ['Galaxy A05', 'Galaxy A05s'],
    },
    // Linha Galaxy M
    {
      name: 'Galaxy M54',
      models: ['Galaxy M54', 'Galaxy M34'],
    },
    {
      name: 'Galaxy M15',
      models: ['Galaxy M15', 'Galaxy M15 5G'],
    },
    // Linha Galaxy Z (Dobráveis)
    {
      name: 'Galaxy Z Fold',
      models: [
        'Galaxy Z Fold 3',
        'Galaxy Z Fold 4',
        'Galaxy Z Fold 5',
        'Galaxy Z Fold 6',
      ],
    },
    {
      name: 'Galaxy Z Flip',
      models: [
        'Galaxy Z Flip 3',
        'Galaxy Z Flip 4',
        'Galaxy Z Flip 5',
        'Galaxy Z Flip 6',
      ],
    },
    // Linha Galaxy Note (anteriores)
    {
      name: 'Galaxy Note',
      models: ['Galaxy Note 20', 'Galaxy Note 20 Ultra'],
    },
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
      const model = await prisma.deviceModel.upsert({
        where: { lineId_slug: { lineId: line.id, slug: slug(modelName) } },
        update: {},
        create: { name: modelName, slug: slug(modelName), lineId: line.id },
      });

      // Seed services for all Samsung models
      await seedSamsungServices(model.id, modelName);
    }
  }

  // ─── Motorola ────────────────────────────────────────────
  const motorola = await prisma.brand.upsert({
    where: { slug: 'motorola' },
    update: {},
    create: { name: 'Motorola', slug: 'motorola', order: 3 },
  });

  const motorolaLines = [
    // Linha Moto G
    {
      name: 'Moto G',
      models: [
        'Moto G04',
        'Moto G14',
        'Moto G24',
        'Moto G34',
        'Moto G54',
        'Moto G64',
        'Moto G73',
        'Moto G84',
        'Moto G Power',
        'Moto G Play',
      ],
    },
    {
      name: 'Moto G Stylus',
      models: ['Moto G Stylus (2024)', 'Moto G Stylus 5G (2024)'],
    },
    // Linha Edge
    {
      name: 'Edge',
      models: [
        'Edge 30',
        'Edge 30 Pro',
        'Edge 30 Fusion',
        'Edge 30 Ultra',
        'Edge 40',
        'Edge 40 Pro',
        'Edge 40 Neo',
        'Edge 40 Fusion',
        'Edge 50',
        'Edge 50 Pro',
        'Edge 50 Fusion',
        'Edge 50 Ultra',
        'Edge 50 Neo',
      ],
    },
    // Linha Razr (Dobráveis)
    {
      name: 'Razr',
      models: ['Razr 40', 'Razr 40 Ultra', 'Razr 50', 'Razr 50 Ultra'],
    },
    // Linha Moto E (Entrada)
    {
      name: 'Moto E',
      models: ['Moto E13', 'Moto E14', 'Moto E22', 'Moto E32'],
    },
    // Linha ThinkPhone
    {
      name: 'ThinkPhone',
      models: ['ThinkPhone', 'ThinkPhone 25'],
    },
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
      const model = await prisma.deviceModel.upsert({
        where: { lineId_slug: { lineId: line.id, slug: slug(modelName) } },
        update: {},
        create: { name: modelName, slug: slug(modelName), lineId: line.id },
      });

      // Seed services for all Motorola models
      await seedMotorolaServices(model.id, modelName);
    }
  }

  // ─── Xiaomi ──────────────────────────────────────────────
  const xiaomi = await prisma.brand.upsert({
    where: { slug: 'xiaomi' },
    update: {},
    create: { name: 'Xiaomi', slug: 'xiaomi', order: 4 },
  });

  const xiaomiLines = [
    // Linha Redmi Note
    {
      name: 'Redmi Note',
      models: [
        'Redmi Note 11',
        'Redmi Note 11 Pro',
        'Redmi Note 11S',
        'Redmi Note 12',
        'Redmi Note 12 Pro',
        'Redmi Note 12 Pro+',
        'Redmi Note 13',
        'Redmi Note 13 Pro',
        'Redmi Note 13 Pro+',
        'Redmi Note 13R Pro',
      ],
    },
    // Linha Redmi
    {
      name: 'Redmi',
      models: [
        'Redmi 12',
        'Redmi 12C',
        'Redmi 13',
        'Redmi 13C',
        'Redmi A1',
        'Redmi A2',
        'Redmi A3',
      ],
    },
    // Linha POCO
    {
      name: 'POCO',
      models: [
        'POCO X5',
        'POCO X5 Pro',
        'POCO X6',
        'POCO X6 Pro',
        'POCO M5',
        'POCO M6',
        'POCO M6 Pro',
        'POCO M6 Plus',
        'POCO F5',
        'POCO F5 Pro',
        'POCO F6',
        'POCO F6 Pro',
        'POCO C40',
        'POCO C51',
        'POCO C55',
        'POCO C61',
        'POCO C65',
      ],
    },
    // Linha Xiaomi (Flagship)
    {
      name: 'Xiaomi 13',
      models: [
        'Xiaomi 13',
        'Xiaomi 13 Pro',
        'Xiaomi 13 Ultra',
        'Xiaomi 13 Lite',
      ],
    },
    {
      name: 'Xiaomi 14',
      models: [
        'Xiaomi 14',
        'Xiaomi 14 Pro',
        'Xiaomi 14 Ultra',
        'Xiaomi 14T',
        'Xiaomi 14T Pro',
      ],
    },
    // Linha Xiaomi T
    {
      name: 'Xiaomi 12T',
      models: ['Xiaomi 12T', 'Xiaomi 12T Pro'],
    },
    // Linha Mi (anteriores)
    {
      name: 'Mi',
      models: ['Mi 11', 'Mi 11 Ultra', 'Mi 11 Lite'],
    },
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
      const model = await prisma.deviceModel.upsert({
        where: { lineId_slug: { lineId: line.id, slug: slug(modelName) } },
        update: {},
        create: { name: modelName, slug: slug(modelName), lineId: line.id },
      });

      // Seed services for all Xiaomi models
      await seedXiaomiServices(model.id, modelName);
    }
  }

  // ─── Asus ────────────────────────────────────────────────
  const asus = await prisma.brand.upsert({
    where: { slug: 'asus' },
    update: {},
    create: { name: 'Asus', slug: 'asus', order: 5 },
  });

  const asusLines = [
    {
      name: 'Zenfone',
      models: ['Zenfone 8', 'Zenfone 9', 'Zenfone 10', 'Zenfone 11 Ultra'],
    },
    {
      name: 'ROG Phone',
      models: [
        'ROG Phone 6',
        'ROG Phone 6 Pro',
        'ROG Phone 7',
        'ROG Phone 8',
        'ROG Phone 8 Pro',
      ],
    },
  ];

  for (const lineData of asusLines) {
    const line = await prisma.deviceLine.upsert({
      where: { brandId_slug: { brandId: asus.id, slug: slug(lineData.name) } },
      update: {},
      create: {
        name: lineData.name,
        slug: slug(lineData.name),
        brandId: asus.id,
      },
    });
    for (const modelName of lineData.models) {
      const model = await prisma.deviceModel.upsert({
        where: { lineId_slug: { lineId: line.id, slug: slug(modelName) } },
        update: {},
        create: { name: modelName, slug: slug(modelName), lineId: line.id },
      });
      await seedAsusServices(model.id, modelName);
    }
  }

  // ─── OnePlus ─────────────────────────────────────────────
  const oneplus = await prisma.brand.upsert({
    where: { slug: 'oneplus' },
    update: {},
    create: { name: 'OnePlus', slug: 'oneplus', order: 6 },
  });

  const oneplusLines = [
    {
      name: 'OnePlus 12',
      models: ['OnePlus 12', 'OnePlus 12R'],
    },
    {
      name: 'OnePlus 11',
      models: ['OnePlus 11', 'OnePlus 11R'],
    },
    {
      name: 'OnePlus Nord',
      models: [
        'OnePlus Nord 3',
        'OnePlus Nord 4',
        'OnePlus Nord CE4',
        'OnePlus Nord N30',
      ],
    },
    {
      name: 'OnePlus Open',
      models: ['OnePlus Open'],
    },
  ];

  for (const lineData of oneplusLines) {
    const line = await prisma.deviceLine.upsert({
      where: {
        brandId_slug: { brandId: oneplus.id, slug: slug(lineData.name) },
      },
      update: {},
      create: {
        name: lineData.name,
        slug: slug(lineData.name),
        brandId: oneplus.id,
      },
    });
    for (const modelName of lineData.models) {
      const model = await prisma.deviceModel.upsert({
        where: { lineId_slug: { lineId: line.id, slug: slug(modelName) } },
        update: {},
        create: { name: modelName, slug: slug(modelName), lineId: line.id },
      });
      await seedOnePlusServices(model.id, modelName);
    }
  }

  // ─── Google Pixel ────────────────────────────────────────
  const google = await prisma.brand.upsert({
    where: { slug: 'google' },
    update: {},
    create: { name: 'Google', slug: 'google', order: 7 },
  });

  const googleLines = [
    {
      name: 'Pixel 8',
      models: ['Pixel 8', 'Pixel 8 Pro', 'Pixel 8a'],
    },
    {
      name: 'Pixel 9',
      models: ['Pixel 9', 'Pixel 9 Pro', 'Pixel 9 Pro XL', 'Pixel 9 Pro Fold'],
    },
    {
      name: 'Pixel 7',
      models: ['Pixel 7', 'Pixel 7 Pro', 'Pixel 7a'],
    },
    {
      name: 'Pixel 6',
      models: ['Pixel 6', 'Pixel 6 Pro', 'Pixel 6a'],
    },
    {
      name: 'Pixel Fold',
      models: ['Pixel Fold'],
    },
  ];

  for (const lineData of googleLines) {
    const line = await prisma.deviceLine.upsert({
      where: {
        brandId_slug: { brandId: google.id, slug: slug(lineData.name) },
      },
      update: {},
      create: {
        name: lineData.name,
        slug: slug(lineData.name),
        brandId: google.id,
      },
    });
    for (const modelName of lineData.models) {
      const model = await prisma.deviceModel.upsert({
        where: { lineId_slug: { lineId: line.id, slug: slug(modelName) } },
        update: {},
        create: { name: modelName, slug: slug(modelName), lineId: line.id },
      });
      await seedGooglePixelServices(model.id, modelName);
    }
  }

  // ─── Huawei ──────────────────────────────────────────────
  const huawei = await prisma.brand.upsert({
    where: { slug: 'huawei' },
    update: {},
    create: { name: 'Huawei', slug: 'huawei', order: 8 },
  });

  const huaweiLines = [
    {
      name: 'Pura 70',
      models: ['Pura 70', 'Pura 70 Pro', 'Pura 70 Ultra'],
    },
    {
      name: 'P60',
      models: ['P60', 'P60 Pro', 'P60 Art'],
    },
    {
      name: 'Mate 60',
      models: ['Mate 60', 'Mate 60 Pro', 'Mate 60 Pro+', 'Mate 60 RS'],
    },
    {
      name: 'Nova',
      models: [
        'Nova 12',
        'Nova 12 Pro',
        'Nova 12 Ultra',
        'Nova 12i',
        'Nova Y72',
      ],
    },
    {
      name: 'Mate X',
      models: ['Mate X5', 'Mate X3'],
    },
  ];

  for (const lineData of huaweiLines) {
    const line = await prisma.deviceLine.upsert({
      where: {
        brandId_slug: { brandId: huawei.id, slug: slug(lineData.name) },
      },
      update: {},
      create: {
        name: lineData.name,
        slug: slug(lineData.name),
        brandId: huawei.id,
      },
    });
    for (const modelName of lineData.models) {
      const model = await prisma.deviceModel.upsert({
        where: { lineId_slug: { lineId: line.id, slug: slug(modelName) } },
        update: {},
        create: { name: modelName, slug: slug(modelName), lineId: line.id },
      });
      await seedHuaweiServices(model.id, modelName);
    }
  }

  // ─── Oppo ────────────────────────────────────────────────
  const oppo = await prisma.brand.upsert({
    where: { slug: 'oppo' },
    update: {},
    create: { name: 'Oppo', slug: 'oppo', order: 9 },
  });

  const oppoLines = [
    {
      name: 'Find X',
      models: [
        'Find X5',
        'Find X5 Pro',
        'Find X6',
        'Find X6 Pro',
        'Find X7',
        'Find X7 Ultra',
      ],
    },
    {
      name: 'Reno',
      models: ['Reno 10', 'Reno 10 Pro', 'Reno 11', 'Reno 11 Pro', 'Reno 12'],
    },
    {
      name: 'A Series',
      models: ['A78', 'A79', 'A98', 'A38', 'A58', 'A18'],
    },
    {
      name: 'Find N',
      models: ['Find N3', 'Find N3 Flip'],
    },
  ];

  for (const lineData of oppoLines) {
    const line = await prisma.deviceLine.upsert({
      where: { brandId_slug: { brandId: oppo.id, slug: slug(lineData.name) } },
      update: {},
      create: {
        name: lineData.name,
        slug: slug(lineData.name),
        brandId: oppo.id,
      },
    });
    for (const modelName of lineData.models) {
      const model = await prisma.deviceModel.upsert({
        where: { lineId_slug: { lineId: line.id, slug: slug(modelName) } },
        update: {},
        create: { name: modelName, slug: slug(modelName), lineId: line.id },
      });
      await seedOppoGenericServices(model.id, modelName);
    }
  }

  // ─── Realme ──────────────────────────────────────────────
  const realme = await prisma.brand.upsert({
    where: { slug: 'realme' },
    update: {},
    create: { name: 'Realme', slug: 'realme', order: 10 },
  });

  const realmeLines = [
    {
      name: 'GT',
      models: ['GT 5', 'GT 5 Pro', 'GT 6', 'GT 6T', 'GT Neo 5', 'GT Neo 6'],
    },
    {
      name: 'Number Series',
      models: ['12', '12 Pro', '12 Pro+', '12x', '11', '11 Pro', '11 Pro+'],
    },
    {
      name: 'C Series',
      models: ['C55', 'C53', 'C67', 'C65', 'C51'],
    },
    {
      name: 'Narzo',
      models: ['Narzo 70', 'Narzo 70 Pro', 'Narzo 60', 'Narzo 60 Pro'],
    },
  ];

  for (const lineData of realmeLines) {
    const line = await prisma.deviceLine.upsert({
      where: {
        brandId_slug: { brandId: realme.id, slug: slug(lineData.name) },
      },
      update: {},
      create: {
        name: lineData.name,
        slug: slug(lineData.name),
        brandId: realme.id,
      },
    });
    for (const modelName of lineData.models) {
      const model = await prisma.deviceModel.upsert({
        where: { lineId_slug: { lineId: line.id, slug: slug(modelName) } },
        update: {},
        create: { name: modelName, slug: slug(modelName), lineId: line.id },
      });
      await seedRealmeGenericServices(model.id, modelName);
    }
  }

  // ─── ZTE (Nubia) ─────────────────────────────────────────
  const zte = await prisma.brand.upsert({
    where: { slug: 'zte' },
    update: {},
    create: { name: 'ZTE', slug: 'zte', order: 11 },
  });

  const zteLines = [
    {
      name: 'Nubia Red Magic',
      models: ['Red Magic 9', 'Red Magic 9 Pro', 'Red Magic 9S Pro'],
    },
    {
      name: 'Nubia Z',
      models: ['Z60 Ultra', 'Z50 Ultra', 'Z50S Pro'],
    },
    {
      name: 'Blade',
      models: ['Blade V60', 'Blade V50', 'Blade A73'],
    },
  ];

  for (const lineData of zteLines) {
    const line = await prisma.deviceLine.upsert({
      where: { brandId_slug: { brandId: zte.id, slug: slug(lineData.name) } },
      update: {},
      create: {
        name: lineData.name,
        slug: slug(lineData.name),
        brandId: zte.id,
      },
    });
    for (const modelName of lineData.models) {
      const model = await prisma.deviceModel.upsert({
        where: { lineId_slug: { lineId: line.id, slug: slug(modelName) } },
        update: {},
        create: { name: modelName, slug: slug(modelName), lineId: line.id },
      });
      await seedZTEGenericServices(model.id, modelName);
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
        device: 'Motorola Edge 50 Pro',
      },
      {
        name: 'Marina Silva',
        rating: 5,
        content:
          'Troca de tela do Xiaomi ficou perfeita, nem parece que quebrou. Atendimento rápido e preço justo!',
        device: 'Xiaomi Redmi Note 13 Pro',
      },
      {
        name: 'João Pedro Santos',
        rating: 4,
        content:
          'Fiz a troca de bateria do meu Galaxy S23 Ultra. Demorou um pouco mais que o previsto, mas o resultado ficou ótimo.',
        device: 'Samsung Galaxy S23 Ultra',
      },
      {
        name: 'Fernanda Costa',
        rating: 5,
        content:
          'Atendimento a domicílio perfeito! Trocaram a tela do meu Motorola no conforto de casa. Super recomendo.',
        device: 'Motorola Moto G84',
      },
      {
        name: 'Lucas Oliveira',
        rating: 5,
        content:
          'Preço imbatível para troca de tampa traseira do iPhone. Ficou como novo e ainda ganhei desconto no segundo serviço.',
        device: 'iPhone 14 Pro',
      },
      {
        name: 'Beatriz Almeida',
        rating: 5,
        content:
          'Meu Pixel 8 estava com problema no carregador, diagnosticaram rapidinho e arrumaram no mesmo dia. Nota 10!',
        device: 'Google Pixel 8',
      },
      {
        name: 'Roberto Nunes',
        rating: 4,
        content:
          'Bom serviço e preço competitivo. A troca de tela do Zenfone ficou muito boa, apenas achei que poderia ser mais rápido.',
        device: 'Asus Zenfone 10',
      },
      {
        name: 'Patrícia Lima',
        rating: 5,
        content:
          'Salvaram meu OnePlus! Caiu na água e fizeram limpeza química, voltou a funcionar perfeitamente. Equipe muito profissional.',
        device: 'OnePlus 12',
      },
    ],
  });

  console.log('✅ Seed completo!');
}

// ============================================================================
// FUNÇÕES DE SERVIÇOS POR MARCA
// ============================================================================

async function seedIphoneServices(modelId: string, modelName: string) {
  // Determinar se é modelo Pro/Premium para ajustar preços
  const isPro = modelName.includes('Pro') || modelName.includes('Ultra');
  const isPlus = modelName.includes('Plus');
  const isNewer = modelName.includes('16') || modelName.includes('17');
  const isOlder =
    modelName.includes('11') ||
    modelName.includes('XR') ||
    modelName.includes('XS') ||
    modelName.includes('SE');

  const basePriceTela = isOlder ? 800 : isPro ? 2100 : isPlus ? 1800 : 1500;
  const basePriceVidro = isOlder ? 600 : isPro ? 1650 : 1300;
  const basePriceBateria = isOlder ? 350 : 600;
  const basePriceTampa = isOlder ? 400 : isPro ? 800 : 600;
  const basePriceCamera = isOlder ? 600 : isPro ? 1200 : 900;

  const services = [
    {
      name: 'Troca de Vidro',
      slug: 'troca-de-vidro',
      type: ServiceType.TROCA_VIDRO,
      description:
        'Reparo avançado que mantém o display original, substituindo apenas o vidro frontal danificado. Processo delicado realizado com equipamentos de precisão.',
      price: basePriceVidro,
      originalPrice: basePriceVidro * 1.7,
      installTime: '1 dia',
      atendimento: AtendimentoType.LOJA,
      isAttempt: true,
      promotionBadge: isPro ? '-41%' : '-35%',
    },
    {
      name: 'Troca de Tela',
      slug: 'troca-de-tela',
      type: ServiceType.TROCA_TELA,
      description:
        'Substituição completa do conjunto de tela. Display com a mesma qualidade de cores e brilho do original.',
      price: basePriceTela,
      installTime: '30 min',
      atendimento: AtendimentoType.LOJA_E_LOCAL,
      variants: [
        { name: 'Premium', price: basePriceTela },
        { name: 'Original Apple', price: basePriceTela * 1.5 },
      ],
    },
    {
      name: 'Bateria',
      slug: 'bateria',
      type: ServiceType.BATERIA,
      description:
        'Troca da bateria por componente de alta capacidade com certificação. Restauração da vida útil do aparelho.',
      price: basePriceBateria,
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
        { name: 'Sensor de proximidade', price: 400 },
        { name: 'Vibracall', price: 300 },
      ],
    },
    {
      name: 'Face ID',
      slug: 'face-id',
      type: ServiceType.OUTRO,
      description:
        'Restauração e reparo do sistema de reconhecimento facial. Requer peça original Apple.',
      price: isOlder ? 1200 : 1950,
      installTime: '1 a 2 dias',
      atendimento: AtendimentoType.LOJA,
    },
    {
      name: 'Câmera Traseira',
      slug: 'camera-traseira',
      type: ServiceType.CAMERA,
      description:
        'Troca do conjunto de câmeras traseiras. Resolução e qualidade preservadas.',
      price: basePriceCamera,
      installTime: '1 hora',
      atendimento: AtendimentoType.LOJA_E_LOCAL,
    },
    {
      name: 'Câmera Frontal',
      slug: 'camera-frontal',
      type: ServiceType.CAMERA,
      description:
        'Substituição da câmera frontal. Selfies com a qualidade original do aparelho.',
      price: isPro ? 650 : 450,
      installTime: '45 min',
      atendimento: AtendimentoType.LOJA_E_LOCAL,
    },
    {
      name: 'Tampa Traseira',
      slug: 'tampa-traseira',
      type: ServiceType.TAMPA,
      description:
        'Substituição do painel traseiro de vidro. Aparelho volta ao visual de fábrica.',
      price: basePriceTampa,
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
    {
      name: 'Lente de Câmera',
      slug: 'lente-camera',
      type: ServiceType.LENTE,
      description:
        'Troca da lente de proteção da câmera traseira. Vidro sapphire de alta resistência.',
      price: 250,
      installTime: '1 hora',
      atendimento: AtendimentoType.LOJA_E_LOCAL,
    },
  ];

  for (const s of services) {
    const { variants, components, ...serviceData } = s as any;

    const service = await prisma.service
      .upsert({
        where: { modelId_slug: { modelId, slug: s.slug } },
        update: {},
        create: { ...serviceData, modelId },
      })
      .catch(() => null);

    if (!service) continue;

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

async function seedSamsungServices(modelId: string, modelName: string) {
  const isUltra = modelName.includes('Ultra');
  const isFold = modelName.includes('Fold') || modelName.includes('Z Fold');
  const isFlip = modelName.includes('Flip') || modelName.includes('Z Flip');
  const isPremium =
    isUltra ||
    isFold ||
    isFlip ||
    modelName.includes('S24') ||
    modelName.includes('S25') ||
    modelName.includes('Note');
  const isMidRange =
    modelName.includes('A5') ||
    modelName.includes('A35') ||
    modelName.includes('M54');
  const isEntry =
    modelName.includes('A0') ||
    modelName.includes('A1') ||
    modelName.includes('M1');

  const basePriceTela = isEntry
    ? 400
    : isMidRange
      ? 700
      : isFold
        ? 3500
        : isFlip
          ? 2200
          : isUltra
            ? 1800
            : 1200;
  const basePriceBateria = isEntry
    ? 200
    : isMidRange
      ? 350
      : isFold
        ? 800
        : 500;
  const basePriceTampa = isEntry ? 200 : isMidRange ? 350 : isFold ? 900 : 600;
  const basePriceCamera = isEntry ? 250 : isUltra ? 1000 : 600;

  const services = [
    {
      name: 'Troca de Tela',
      slug: 'troca-de-tela',
      type: ServiceType.TROCA_TELA,
      description:
        'Substituição completa do display com tecnologia Super AMOLED/Dynamic AMOLED.',
      price: basePriceTela,
      installTime: isFold ? '2 horas' : '40 min',
      atendimento: AtendimentoType.LOJA_E_LOCAL,
      variants: [
        { name: 'Premium', price: basePriceTela },
        { name: 'Original Samsung', price: basePriceTela * 1.6 },
      ],
    },
    {
      name: 'Troca de Vidro',
      slug: 'troca-de-vidro',
      type: ServiceType.TROCA_VIDRO,
      description:
        'Reparo do vidro frontal mantendo o display original. Ideal para trincas superficiais.',
      price: Math.round(basePriceTela * 0.75),
      originalPrice: Math.round(basePriceTela * 1.3),
      installTime: '1 dia',
      atendimento: AtendimentoType.LOJA,
      isAttempt: true,
      promotionBadge: '-35%',
    },
    {
      name: 'Bateria',
      slug: 'bateria',
      type: ServiceType.BATERIA,
      description:
        'Troca da bateria por componente de alta capacidade. Recupere a autonomia do seu Galaxy.',
      price: basePriceBateria,
      installTime: '40 min',
      atendimento: AtendimentoType.LOJA_E_LOCAL,
    },
    {
      name: 'Componentes',
      slug: 'componentes',
      type: ServiceType.COMPONENTE,
      description: 'Reparo e substituição de componentes internos.',
      price: 250,
      installTime: '30 min',
      atendimento: AtendimentoType.LOJA_E_LOCAL,
      components: [
        { name: 'Conector de carga', price: 350 },
        { name: 'Microfone', price: 280 },
        { name: 'Alto-falante', price: 320 },
        { name: 'Botão volume', price: 250 },
        { name: 'Botão power', price: 280 },
        { name: 'Sensor biométrico', price: 400 },
        { name: 'Vibracall', price: 250 },
      ],
    },
    {
      name: 'Câmera Traseira',
      slug: 'camera-traseira',
      type: ServiceType.CAMERA,
      description:
        'Troca do módulo de câmeras traseiras. Qualidade de imagem restaurada.',
      price: basePriceCamera,
      installTime: '1 hora',
      atendimento: AtendimentoType.LOJA_E_LOCAL,
    },
    {
      name: 'Câmera Frontal',
      slug: 'camera-frontal',
      type: ServiceType.CAMERA,
      description: 'Substituição da câmera frontal para selfies perfeitas.',
      price: isPremium ? 500 : 350,
      installTime: '45 min',
      atendimento: AtendimentoType.LOJA_E_LOCAL,
    },
    {
      name: 'Tampa Traseira',
      slug: 'tampa-traseira',
      type: ServiceType.TAMPA,
      description:
        'Substituição da tampa traseira. Visual renovado para seu Galaxy.',
      price: basePriceTampa,
      installTime: '2 horas',
      atendimento: AtendimentoType.LOJA,
    },
    {
      name: 'Limpeza Química',
      slug: 'limpeza-quimica',
      type: ServiceType.LIMPEZA,
      description:
        'Limpeza ultrassônica completa para aparelhos com danos por líquido.',
      price: isFold ? 250 : 180,
      installTime: '2 horas',
      atendimento: AtendimentoType.LOJA,
    },
    {
      name: 'Lente de Câmera',
      slug: 'lente-camera',
      type: ServiceType.LENTE,
      description: 'Troca do vidro protetor das lentes traseiras.',
      price: 200,
      installTime: '1 hora',
      atendimento: AtendimentoType.LOJA_E_LOCAL,
    },
    {
      name: 'Dobradiça (Fold/Flip)',
      slug: 'dobradica',
      type: ServiceType.OUTRO,
      description:
        'Reparo ou substituição do mecanismo de dobradiça. Exclusivo para Galaxy Z series.',
      price: isFold ? 1800 : 1200,
      installTime: '2 a 3 dias',
      atendimento: AtendimentoType.LOJA,
    },
  ];

  // Filtrar serviço de dobradiça apenas para dobráveis
  const filteredServices =
    isFold || isFlip
      ? services
      : services.filter((s) => s.slug !== 'dobradica');

  await createServices(modelId, filteredServices);
}

async function seedMotorolaServices(modelId: string, modelName: string) {
  const isRazr = modelName.includes('Razr');
  const isEdge = modelName.includes('Edge');
  const isPremium =
    isRazr ||
    (isEdge && (modelName.includes('Ultra') || modelName.includes('Pro')));
  const isEntry =
    modelName.includes('Moto E') ||
    modelName.includes('G04') ||
    modelName.includes('G14');

  const basePriceTela = isEntry ? 300 : isRazr ? 2000 : isPremium ? 900 : 550;
  const basePriceBateria = isEntry ? 180 : isPremium ? 400 : 280;
  const basePriceTampa = isEntry ? 150 : isRazr ? 700 : 350;
  const basePriceCamera = isEntry ? 200 : isPremium ? 700 : 400;

  const services = [
    {
      name: 'Troca de Tela',
      slug: 'troca-de-tela',
      type: ServiceType.TROCA_TELA,
      description:
        'Substituição completa do display com tecnologia OLED/pOLED.',
      price: basePriceTela,
      installTime: '40 min',
      atendimento: AtendimentoType.LOJA_E_LOCAL,
      variants: [
        { name: 'Premium', price: basePriceTela },
        { name: 'Original Motorola', price: basePriceTela * 1.5 },
      ],
    },
    {
      name: 'Troca de Vidro',
      slug: 'troca-de-vidro',
      type: ServiceType.TROCA_VIDRO,
      description: 'Reparo do vidro frontal preservando o display original.',
      price: Math.round(basePriceTela * 0.7),
      originalPrice: Math.round(basePriceTela * 1.2),
      installTime: '1 dia',
      atendimento: AtendimentoType.LOJA,
      isAttempt: true,
      promotionBadge: '-35%',
    },
    {
      name: 'Bateria',
      slug: 'bateria',
      type: ServiceType.BATERIA,
      description: 'Troca da bateria por componente de alta capacidade.',
      price: basePriceBateria,
      installTime: '30 min',
      atendimento: AtendimentoType.LOJA_E_LOCAL,
    },
    {
      name: 'Componentes',
      slug: 'componentes',
      type: ServiceType.COMPONENTE,
      description: 'Reparo e substituição de componentes internos.',
      price: 200,
      installTime: '30 min',
      atendimento: AtendimentoType.LOJA_E_LOCAL,
      components: [
        { name: 'Conector de carga', price: 280 },
        { name: 'Microfone', price: 220 },
        { name: 'Alto-falante', price: 250 },
        { name: 'Botão volume', price: 200 },
        { name: 'Botão power', price: 220 },
        { name: 'Sensor de digital', price: 350 },
        { name: 'Vibracall', price: 200 },
      ],
    },
    {
      name: 'Câmera Traseira',
      slug: 'camera-traseira',
      type: ServiceType.CAMERA,
      description: 'Troca do módulo de câmeras traseiras.',
      price: basePriceCamera,
      installTime: '1 hora',
      atendimento: AtendimentoType.LOJA_E_LOCAL,
    },
    {
      name: 'Câmera Frontal',
      slug: 'camera-frontal',
      type: ServiceType.CAMERA,
      description: 'Substituição da câmera frontal.',
      price: isPremium ? 400 : 280,
      installTime: '45 min',
      atendimento: AtendimentoType.LOJA_E_LOCAL,
    },
    {
      name: 'Tampa Traseira',
      slug: 'tampa-traseira',
      type: ServiceType.TAMPA,
      description: 'Substituição da tampa traseira do aparelho.',
      price: basePriceTampa,
      installTime: '1 a 2 horas',
      atendimento: AtendimentoType.LOJA,
    },
    {
      name: 'Limpeza Química',
      slug: 'limpeza-quimica',
      type: ServiceType.LIMPEZA,
      description: 'Limpeza ultrassônica para aparelhos com danos por líquido.',
      price: 150,
      installTime: '2 horas',
      atendimento: AtendimentoType.LOJA,
    },
    {
      name: 'Lente de Câmera',
      slug: 'lente-camera',
      type: ServiceType.LENTE,
      description: 'Troca do vidro protetor das lentes traseiras.',
      price: 180,
      installTime: '1 hora',
      atendimento: AtendimentoType.LOJA_E_LOCAL,
    },
  ];

  await createServices(modelId, services);
}

async function seedXiaomiServices(modelId: string, modelName: string) {
  const isPremium =
    modelName.includes('Ultra') ||
    modelName.includes('Pro') ||
    modelName.includes('Xiaomi 14') ||
    modelName.includes('Xiaomi 13');
  const isPOCO = modelName.includes('POCO');
  const isEntry =
    modelName.includes('Redmi A') ||
    modelName.includes('Redmi 12C') ||
    modelName.includes('POCO C');

  const basePriceTela = isEntry ? 300 : isPremium ? 1100 : 500;
  const basePriceBateria = isEntry ? 180 : isPremium ? 400 : 250;
  const basePriceTampa = isEntry ? 150 : isPremium ? 500 : 300;
  const basePriceCamera = isEntry ? 200 : isPremium ? 800 : 400;

  const services = [
    {
      name: 'Troca de Tela',
      slug: 'troca-de-tela',
      type: ServiceType.TROCA_TELA,
      description: 'Substituição completa do display AMOLED/IPS.',
      price: basePriceTela,
      installTime: '40 min',
      atendimento: AtendimentoType.LOJA_E_LOCAL,
      variants: [
        { name: 'Premium', price: basePriceTela },
        { name: 'Original Xiaomi', price: basePriceTela * 1.5 },
      ],
    },
    {
      name: 'Troca de Vidro',
      slug: 'troca-de-vidro',
      type: ServiceType.TROCA_VIDRO,
      description: 'Reparo do vidro frontal preservando o display.',
      price: Math.round(basePriceTela * 0.7),
      originalPrice: Math.round(basePriceTela * 1.2),
      installTime: '1 dia',
      atendimento: AtendimentoType.LOJA,
      isAttempt: true,
      promotionBadge: '-35%',
    },
    {
      name: 'Bateria',
      slug: 'bateria',
      type: ServiceType.BATERIA,
      description: 'Troca da bateria com grande capacidade de carga.',
      price: basePriceBateria,
      installTime: '30 min',
      atendimento: AtendimentoType.LOJA_E_LOCAL,
    },
    {
      name: 'Componentes',
      slug: 'componentes',
      type: ServiceType.COMPONENTE,
      description: 'Reparo e substituição de componentes internos.',
      price: 180,
      installTime: '30 min',
      atendimento: AtendimentoType.LOJA_E_LOCAL,
      components: [
        { name: 'Conector de carga', price: 250 },
        { name: 'Microfone', price: 200 },
        { name: 'Alto-falante', price: 220 },
        { name: 'Botão volume', price: 180 },
        { name: 'Botão power', price: 200 },
        { name: 'Sensor de digital', price: 300 },
        { name: 'Vibracall', price: 180 },
      ],
    },
    {
      name: 'Câmera Traseira',
      slug: 'camera-traseira',
      type: ServiceType.CAMERA,
      description: 'Troca do módulo de câmeras traseiras.',
      price: basePriceCamera,
      installTime: '1 hora',
      atendimento: AtendimentoType.LOJA_E_LOCAL,
    },
    {
      name: 'Câmera Frontal',
      slug: 'camera-frontal',
      type: ServiceType.CAMERA,
      description: 'Substituição da câmera frontal.',
      price: isPremium ? 400 : 250,
      installTime: '45 min',
      atendimento: AtendimentoType.LOJA_E_LOCAL,
    },
    {
      name: 'Tampa Traseira',
      slug: 'tampa-traseira',
      type: ServiceType.TAMPA,
      description: 'Substituição da tampa traseira.',
      price: basePriceTampa,
      installTime: '1 a 2 horas',
      atendimento: AtendimentoType.LOJA,
    },
    {
      name: 'Limpeza Química',
      slug: 'limpeza-quimica',
      type: ServiceType.LIMPEZA,
      description: 'Limpeza ultrassônica completa.',
      price: 150,
      installTime: '2 horas',
      atendimento: AtendimentoType.LOJA,
    },
    {
      name: 'Lente de Câmera',
      slug: 'lente-camera',
      type: ServiceType.LENTE,
      description: 'Troca do vidro protetor das lentes.',
      price: 180,
      installTime: '1 hora',
      atendimento: AtendimentoType.LOJA_E_LOCAL,
    },
  ];

  await createServices(modelId, services);
}

async function seedAsusServices(modelId: string, modelName: string) {
  const isROG = modelName.includes('ROG');
  const isPremium = modelName.includes('Ultra') || isROG;

  const basePriceTela = isPremium ? 1400 : 800;
  const basePriceBateria = isPremium ? 500 : 350;
  const basePriceTampa = isPremium ? 600 : 400;

  const services = [
    {
      name: 'Troca de Tela',
      slug: 'troca-de-tela',
      type: ServiceType.TROCA_TELA,
      description: 'Substituição completa do display AMOLED.',
      price: basePriceTela,
      installTime: '1 hora',
      atendimento: AtendimentoType.LOJA_E_LOCAL,
      variants: [
        { name: 'Premium', price: basePriceTela },
        { name: 'Original Asus', price: basePriceTela * 1.6 },
      ],
    },
    {
      name: 'Troca de Vidro',
      slug: 'troca-de-vidro',
      type: ServiceType.TROCA_VIDRO,
      description: 'Reparo do vidro frontal mantendo display.',
      price: Math.round(basePriceTela * 0.75),
      originalPrice: Math.round(basePriceTela * 1.3),
      installTime: '1 dia',
      atendimento: AtendimentoType.LOJA,
      isAttempt: true,
      promotionBadge: '-35%',
    },
    {
      name: 'Bateria',
      slug: 'bateria',
      type: ServiceType.BATERIA,
      description: 'Troca da bateria de alta capacidade.',
      price: basePriceBateria,
      installTime: '40 min',
      atendimento: AtendimentoType.LOJA_E_LOCAL,
    },
    {
      name: 'Componentes',
      slug: 'componentes',
      type: ServiceType.COMPONENTE,
      description: 'Reparo de componentes internos.',
      price: 300,
      installTime: '30 min',
      atendimento: AtendimentoType.LOJA_E_LOCAL,
      components: [
        { name: 'Conector de carga', price: 350 },
        { name: 'Microfone', price: 280 },
        { name: 'Alto-falante', price: 320 },
        { name: 'Botão volume', price: 250 },
        { name: 'Botão power', price: 280 },
        { name: 'Sensor de digital', price: 400 },
      ],
    },
    {
      name: 'Câmera Traseira',
      slug: 'camera-traseira',
      type: ServiceType.CAMERA,
      description: 'Troca do módulo de câmeras.',
      price: isPremium ? 900 : 600,
      installTime: '1 hora',
      atendimento: AtendimentoType.LOJA_E_LOCAL,
    },
    {
      name: 'Câmera Frontal',
      slug: 'camera-frontal',
      type: ServiceType.CAMERA,
      description: 'Substituição da câmera frontal.',
      price: 400,
      installTime: '45 min',
      atendimento: AtendimentoType.LOJA_E_LOCAL,
    },
    {
      name: 'Tampa Traseira',
      slug: 'tampa-traseira',
      type: ServiceType.TAMPA,
      description: 'Substituição da tampa traseira.',
      price: basePriceTampa,
      installTime: '2 horas',
      atendimento: AtendimentoType.LOJA,
    },
    {
      name: 'Limpeza Química',
      slug: 'limpeza-quimica',
      type: ServiceType.LIMPEZA,
      description: 'Limpeza ultrassônica completa.',
      price: 200,
      installTime: '2 horas',
      atendimento: AtendimentoType.LOJA,
    },
    {
      name: 'Lente de Câmera',
      slug: 'lente-camera',
      type: ServiceType.LENTE,
      description: 'Troca do vidro protetor das lentes.',
      price: 220,
      installTime: '1 hora',
      atendimento: AtendimentoType.LOJA_E_LOCAL,
    },
  ];

  await createServices(modelId, services);
}

async function seedOnePlusServices(modelId: string, modelName: string) {
  const isPremium =
    modelName.includes('Pro') ||
    modelName.includes('Ultra') ||
    modelName.includes('12') ||
    modelName.includes('Open');
  const isFold = modelName.includes('Open');

  const basePriceTela = isFold ? 3000 : isPremium ? 1400 : 800;
  const basePriceBateria = isFold ? 700 : isPremium ? 450 : 300;
  const basePriceTampa = isFold ? 800 : isPremium ? 500 : 350;

  const services = [
    {
      name: 'Troca de Tela',
      slug: 'troca-de-tela',
      type: ServiceType.TROCA_TELA,
      description: 'Substituição completa do display Fluid AMOLED.',
      price: basePriceTela,
      installTime: isFold ? '2 horas' : '40 min',
      atendimento: AtendimentoType.LOJA_E_LOCAL,
      variants: [
        { name: 'Premium', price: basePriceTela },
        { name: 'Original OnePlus', price: basePriceTela * 1.6 },
      ],
    },
    {
      name: 'Troca de Vidro',
      slug: 'troca-de-vidro',
      type: ServiceType.TROCA_VIDRO,
      description: 'Reparo do vidro frontal preservando display.',
      price: Math.round(basePriceTela * 0.75),
      originalPrice: Math.round(basePriceTela * 1.3),
      installTime: '1 dia',
      atendimento: AtendimentoType.LOJA,
      isAttempt: true,
      promotionBadge: '-35%',
    },
    {
      name: 'Bateria',
      slug: 'bateria',
      type: ServiceType.BATERIA,
      description: 'Troca da bateria com carregamento rápido.',
      price: basePriceBateria,
      installTime: '30 min',
      atendimento: AtendimentoType.LOJA_E_LOCAL,
    },
    {
      name: 'Componentes',
      slug: 'componentes',
      type: ServiceType.COMPONENTE,
      description: 'Reparo de componentes internos.',
      price: 280,
      installTime: '30 min',
      atendimento: AtendimentoType.LOJA_E_LOCAL,
      components: [
        { name: 'Conector de carga', price: 300 },
        { name: 'Microfone', price: 250 },
        { name: 'Alto-falante', price: 280 },
        { name: 'Botão volume', price: 220 },
        { name: 'Botão power', price: 250 },
        { name: 'Sensor de digital', price: 350 },
      ],
    },
    {
      name: 'Câmera Traseira',
      slug: 'camera-traseira',
      type: ServiceType.CAMERA,
      description: 'Troca do módulo de câmeras Hasselblad.',
      price: isPremium ? 1000 : 700,
      installTime: '1 hora',
      atendimento: AtendimentoType.LOJA_E_LOCAL,
    },
    {
      name: 'Câmera Frontal',
      slug: 'camera-frontal',
      type: ServiceType.CAMERA,
      description: 'Substituição da câmera frontal.',
      price: isPremium ? 450 : 350,
      installTime: '45 min',
      atendimento: AtendimentoType.LOJA_E_LOCAL,
    },
    {
      name: 'Tampa Traseira',
      slug: 'tampa-traseira',
      type: ServiceType.TAMPA,
      description: 'Substituição da tampa traseira.',
      price: basePriceTampa,
      installTime: '2 horas',
      atendimento: AtendimentoType.LOJA,
    },
    {
      name: 'Limpeza Química',
      slug: 'limpeza-quimica',
      type: ServiceType.LIMPEZA,
      description: 'Limpeza ultrassônica completa.',
      price: 180,
      installTime: '2 horas',
      atendimento: AtendimentoType.LOJA,
    },
    {
      name: 'Lente de Câmera',
      slug: 'lente-camera',
      type: ServiceType.LENTE,
      description: 'Troca do vidro protetor das lentes.',
      price: 200,
      installTime: '1 hora',
      atendimento: AtendimentoType.LOJA_E_LOCAL,
    },
  ];

  await createServices(modelId, services);
}

async function seedGooglePixelServices(modelId: string, modelName: string) {
  const isPro = modelName.includes('Pro');
  const isFold = modelName.includes('Fold');
  const isNewer = modelName.includes('9');

  const basePriceTela = isFold ? 3200 : isPro ? 1600 : isNewer ? 1200 : 900;
  const basePriceBateria = isFold ? 750 : isPro ? 500 : 400;
  const basePriceTampa = isFold ? 850 : isPro ? 600 : 400;

  const services = [
    {
      name: 'Troca de Tela',
      slug: 'troca-de-tela',
      type: ServiceType.TROCA_TELA,
      description: 'Substituição completa do display OLED com taxa de 120Hz.',
      price: basePriceTela,
      installTime: isFold ? '2 horas' : '45 min',
      atendimento: AtendimentoType.LOJA_E_LOCAL,
      variants: [
        { name: 'Premium', price: basePriceTela },
        { name: 'Original Google', price: basePriceTela * 1.7 },
      ],
    },
    {
      name: 'Troca de Vidro',
      slug: 'troca-de-vidro',
      type: ServiceType.TROCA_VIDRO,
      description: 'Reparo do vidro Gorilla Glass Victus.',
      price: Math.round(basePriceTela * 0.75),
      originalPrice: Math.round(basePriceTela * 1.3),
      installTime: '1 dia',
      atendimento: AtendimentoType.LOJA,
      isAttempt: true,
      promotionBadge: '-35%',
    },
    {
      name: 'Bateria',
      slug: 'bateria',
      type: ServiceType.BATERIA,
      description: 'Troca da bateria Adaptive Battery.',
      price: basePriceBateria,
      installTime: '40 min',
      atendimento: AtendimentoType.LOJA_E_LOCAL,
    },
    {
      name: 'Componentes',
      slug: 'componentes',
      type: ServiceType.COMPONENTE,
      description: 'Reparo de componentes internos.',
      price: 300,
      installTime: '30 min',
      atendimento: AtendimentoType.LOJA_E_LOCAL,
      components: [
        { name: 'Conector de carga USB-C', price: 350 },
        { name: 'Microfone', price: 280 },
        { name: 'Alto-falante estéreo', price: 350 },
        { name: 'Botão volume', price: 250 },
        { name: 'Botão power', price: 280 },
        { name: 'Sensor de digital', price: 450 },
        { name: 'Vibracall', price: 250 },
      ],
    },
    {
      name: 'Câmera Traseira',
      slug: 'camera-traseira',
      type: ServiceType.CAMERA,
      description: 'Troca do módulo de câmeras com tecnologia Pixel.',
      price: isPro ? 1100 : 800,
      installTime: '1 hora',
      atendimento: AtendimentoType.LOJA_E_LOCAL,
    },
    {
      name: 'Câmera Frontal',
      slug: 'camera-frontal',
      type: ServiceType.CAMERA,
      description: 'Substituição da câmera frontal.',
      price: isPro ? 500 : 400,
      installTime: '45 min',
      atendimento: AtendimentoType.LOJA_E_LOCAL,
    },
    {
      name: 'Tampa Traseira',
      slug: 'tampa-traseira',
      type: ServiceType.TAMPA,
      description: 'Substituição da tampa traseira.',
      price: basePriceTampa,
      installTime: '2 horas',
      atendimento: AtendimentoType.LOJA,
    },
    {
      name: 'Limpeza Química',
      slug: 'limpeza-quimica',
      type: ServiceType.LIMPEZA,
      description: 'Limpeza ultrassônica completa.',
      price: 200,
      installTime: '2 horas',
      atendimento: AtendimentoType.LOJA,
    },
    {
      name: 'Lente de Câmera',
      slug: 'lente-camera',
      type: ServiceType.LENTE,
      description: 'Troca do vidro protetor das lentes.',
      price: 220,
      installTime: '1 hora',
      atendimento: AtendimentoType.LOJA_E_LOCAL,
    },
  ];

  await createServices(modelId, services);
}

async function seedHuaweiServices(modelId: string, modelName: string) {
  const isPremium =
    modelName.includes('Pro') ||
    modelName.includes('Ultra') ||
    modelName.includes('RS') ||
    modelName.includes('Art');
  const isFold = modelName.includes('Mate X');

  const basePriceTela = isFold ? 2800 : isPremium ? 1500 : 900;
  const basePriceBateria = isFold ? 700 : isPremium ? 450 : 300;

  const services = [
    {
      name: 'Troca de Tela',
      slug: 'troca-de-tela',
      type: ServiceType.TROCA_TELA,
      description: 'Substituição completa do display OLED.',
      price: basePriceTela,
      installTime: isFold ? '2 horas' : '45 min',
      atendimento: AtendimentoType.LOJA_E_LOCAL,
      variants: [
        { name: 'Premium', price: basePriceTela },
        { name: 'Original Huawei', price: basePriceTela * 1.6 },
      ],
    },
    {
      name: 'Troca de Vidro',
      slug: 'troca-de-vidro',
      type: ServiceType.TROCA_VIDRO,
      description: 'Reparo do vidro frontal mantendo display.',
      price: Math.round(basePriceTela * 0.7),
      originalPrice: Math.round(basePriceTela * 1.2),
      installTime: '1 dia',
      atendimento: AtendimentoType.LOJA,
      isAttempt: true,
      promotionBadge: '-35%',
    },
    {
      name: 'Bateria',
      slug: 'bateria',
      type: ServiceType.BATERIA,
      description: 'Troca da bateria de alta capacidade.',
      price: basePriceBateria,
      installTime: '40 min',
      atendimento: AtendimentoType.LOJA_E_LOCAL,
    },
    {
      name: 'Componentes',
      slug: 'componentes',
      type: ServiceType.COMPONENTE,
      description: 'Reparo de componentes internos.',
      price: 250,
      installTime: '30 min',
      atendimento: AtendimentoType.LOJA_E_LOCAL,
      components: [
        { name: 'Conector de carga', price: 300 },
        { name: 'Microfone', price: 250 },
        { name: 'Alto-falante', price: 300 },
        { name: 'Botão volume', price: 220 },
        { name: 'Botão power', price: 250 },
        { name: 'Sensor de digital', price: 400 },
      ],
    },
    {
      name: 'Câmera Traseira',
      slug: 'camera-traseira',
      type: ServiceType.CAMERA,
      description: 'Troca do módulo de câmeras Leica/XMAGE.',
      price: isPremium ? 1000 : 700,
      installTime: '1 hora',
      atendimento: AtendimentoType.LOJA_E_LOCAL,
    },
    {
      name: 'Câmera Frontal',
      slug: 'camera-frontal',
      type: ServiceType.CAMERA,
      description: 'Substituição da câmera frontal.',
      price: 400,
      installTime: '45 min',
      atendimento: AtendimentoType.LOJA_E_LOCAL,
    },
    {
      name: 'Tampa Traseira',
      slug: 'tampa-traseira',
      type: ServiceType.TAMPA,
      description: 'Substituição da tampa traseira.',
      price: isPremium ? 600 : 400,
      installTime: '2 horas',
      atendimento: AtendimentoType.LOJA,
    },
    {
      name: 'Limpeza Química',
      slug: 'limpeza-quimica',
      type: ServiceType.LIMPEZA,
      description: 'Limpeza ultrassônica completa.',
      price: 180,
      installTime: '2 horas',
      atendimento: AtendimentoType.LOJA,
    },
    {
      name: 'Lente de Câmera',
      slug: 'lente-camera',
      type: ServiceType.LENTE,
      description: 'Troca do vidro protetor das lentes.',
      price: 200,
      installTime: '1 hora',
      atendimento: AtendimentoType.LOJA_E_LOCAL,
    },
  ];

  await createServices(modelId, services);
}

async function seedOppoGenericServices(modelId: string, modelName: string) {
  const isPremium =
    modelName.includes('Pro') ||
    modelName.includes('Ultra') ||
    modelName.includes('Find X');
  const isFold = modelName.includes('Find N');

  const basePriceTela = isFold ? 2800 : isPremium ? 1300 : 700;
  const basePriceBateria = isFold ? 650 : isPremium ? 400 : 280;

  const services = [
    {
      name: 'Troca de Tela',
      slug: 'troca-de-tela',
      type: ServiceType.TROCA_TELA,
      description: 'Substituição completa do display AMOLED.',
      price: basePriceTela,
      installTime: isFold ? '2 horas' : '40 min',
      atendimento: AtendimentoType.LOJA_E_LOCAL,
      variants: [
        { name: 'Premium', price: basePriceTela },
        { name: 'Original Oppo', price: basePriceTela * 1.5 },
      ],
    },
    {
      name: 'Troca de Vidro',
      slug: 'troca-de-vidro',
      type: ServiceType.TROCA_VIDRO,
      description: 'Reparo do vidro frontal.',
      price: Math.round(basePriceTela * 0.7),
      originalPrice: Math.round(basePriceTela * 1.2),
      installTime: '1 dia',
      atendimento: AtendimentoType.LOJA,
      isAttempt: true,
      promotionBadge: '-35%',
    },
    {
      name: 'Bateria',
      slug: 'bateria',
      type: ServiceType.BATERIA,
      description: 'Troca da bateria.',
      price: basePriceBateria,
      installTime: '30 min',
      atendimento: AtendimentoType.LOJA_E_LOCAL,
    },
    {
      name: 'Componentes',
      slug: 'componentes',
      type: ServiceType.COMPONENTE,
      description: 'Reparo de componentes internos.',
      price: 220,
      installTime: '30 min',
      atendimento: AtendimentoType.LOJA_E_LOCAL,
      components: [
        { name: 'Conector de carga', price: 280 },
        { name: 'Microfone', price: 220 },
        { name: 'Alto-falante', price: 250 },
        { name: 'Botão volume', price: 200 },
        { name: 'Botão power', price: 220 },
        { name: 'Sensor de digital', price: 350 },
      ],
    },
    {
      name: 'Câmera Traseira',
      slug: 'camera-traseira',
      type: ServiceType.CAMERA,
      description: 'Troca do módulo de câmeras.',
      price: isPremium ? 800 : 500,
      installTime: '1 hora',
      atendimento: AtendimentoType.LOJA_E_LOCAL,
    },
    {
      name: 'Câmera Frontal',
      slug: 'camera-frontal',
      type: ServiceType.CAMERA,
      description: 'Substituição da câmera frontal.',
      price: 350,
      installTime: '45 min',
      atendimento: AtendimentoType.LOJA_E_LOCAL,
    },
    {
      name: 'Tampa Traseira',
      slug: 'tampa-traseira',
      type: ServiceType.TAMPA,
      description: 'Substituição da tampa traseira.',
      price: isPremium ? 500 : 300,
      installTime: '2 horas',
      atendimento: AtendimentoType.LOJA,
    },
    {
      name: 'Limpeza Química',
      slug: 'limpeza-quimica',
      type: ServiceType.LIMPEZA,
      description: 'Limpeza ultrassônica completa.',
      price: 160,
      installTime: '2 horas',
      atendimento: AtendimentoType.LOJA,
    },
    {
      name: 'Lente de Câmera',
      slug: 'lente-camera',
      type: ServiceType.LENTE,
      description: 'Troca do vidro protetor das lentes.',
      price: 180,
      installTime: '1 hora',
      atendimento: AtendimentoType.LOJA_E_LOCAL,
    },
  ];

  await createServices(modelId, services);
}

async function seedRealmeGenericServices(modelId: string, modelName: string) {
  const isPremium = modelName.includes('Pro') || modelName.includes('GT');

  const basePriceTela = isPremium ? 900 : 450;
  const basePriceBateria = isPremium ? 350 : 220;

  const services = [
    {
      name: 'Troca de Tela',
      slug: 'troca-de-tela',
      type: ServiceType.TROCA_TELA,
      description: 'Substituição completa do display.',
      price: basePriceTela,
      installTime: '40 min',
      atendimento: AtendimentoType.LOJA_E_LOCAL,
      variants: [
        { name: 'Premium', price: basePriceTela },
        { name: 'Original Realme', price: basePriceTela * 1.5 },
      ],
    },
    {
      name: 'Troca de Vidro',
      slug: 'troca-de-vidro',
      type: ServiceType.TROCA_VIDRO,
      description: 'Reparo do vidro frontal.',
      price: Math.round(basePriceTela * 0.7),
      originalPrice: Math.round(basePriceTela * 1.2),
      installTime: '1 dia',
      atendimento: AtendimentoType.LOJA,
      isAttempt: true,
      promotionBadge: '-35%',
    },
    {
      name: 'Bateria',
      slug: 'bateria',
      type: ServiceType.BATERIA,
      description: 'Troca da bateria.',
      price: basePriceBateria,
      installTime: '30 min',
      atendimento: AtendimentoType.LOJA_E_LOCAL,
    },
    {
      name: 'Componentes',
      slug: 'componentes',
      type: ServiceType.COMPONENTE,
      description: 'Reparo de componentes internos.',
      price: 180,
      installTime: '30 min',
      atendimento: AtendimentoType.LOJA_E_LOCAL,
      components: [
        { name: 'Conector de carga', price: 250 },
        { name: 'Microfone', price: 200 },
        { name: 'Alto-falante', price: 220 },
        { name: 'Botão volume', price: 180 },
        { name: 'Botão power', price: 200 },
        { name: 'Sensor de digital', price: 300 },
      ],
    },
    {
      name: 'Câmera Traseira',
      slug: 'camera-traseira',
      type: ServiceType.CAMERA,
      description: 'Troca do módulo de câmeras.',
      price: isPremium ? 650 : 400,
      installTime: '1 hora',
      atendimento: AtendimentoType.LOJA_E_LOCAL,
    },
    {
      name: 'Câmera Frontal',
      slug: 'camera-frontal',
      type: ServiceType.CAMERA,
      description: 'Substituição da câmera frontal.',
      price: 300,
      installTime: '45 min',
      atendimento: AtendimentoType.LOJA_E_LOCAL,
    },
    {
      name: 'Tampa Traseira',
      slug: 'tampa-traseira',
      type: ServiceType.TAMPA,
      description: 'Substituição da tampa traseira.',
      price: isPremium ? 400 : 250,
      installTime: '2 horas',
      atendimento: AtendimentoType.LOJA,
    },
    {
      name: 'Limpeza Química',
      slug: 'limpeza-quimica',
      type: ServiceType.LIMPEZA,
      description: 'Limpeza ultrassônica completa.',
      price: 140,
      installTime: '2 horas',
      atendimento: AtendimentoType.LOJA,
    },
    {
      name: 'Lente de Câmera',
      slug: 'lente-camera',
      type: ServiceType.LENTE,
      description: 'Troca do vidro protetor das lentes.',
      price: 160,
      installTime: '1 hora',
      atendimento: AtendimentoType.LOJA_E_LOCAL,
    },
  ];

  await createServices(modelId, services);
}

async function seedZTEGenericServices(modelId: string, modelName: string) {
  const isPremium =
    modelName.includes('Ultra') ||
    modelName.includes('Pro') ||
    modelName.includes('Red Magic');
  const basePriceTela = isPremium ? 1100 : 500;
  const basePriceBateria = isPremium ? 400 : 250;

  const services = [
    {
      name: 'Troca de Tela',
      slug: 'troca-de-tela',
      type: ServiceType.TROCA_TELA,
      description: 'Substituição completa do display.',
      price: basePriceTela,
      installTime: '45 min',
      atendimento: AtendimentoType.LOJA_E_LOCAL,
      variants: [
        { name: 'Premium', price: basePriceTela },
        { name: 'Original ZTE', price: basePriceTela * 1.5 },
      ],
    },
    {
      name: 'Troca de Vidro',
      slug: 'troca-de-vidro',
      type: ServiceType.TROCA_VIDRO,
      description: 'Reparo do vidro frontal.',
      price: Math.round(basePriceTela * 0.7),
      originalPrice: Math.round(basePriceTela * 1.2),
      installTime: '1 dia',
      atendimento: AtendimentoType.LOJA,
      isAttempt: true,
      promotionBadge: '-35%',
    },
    {
      name: 'Bateria',
      slug: 'bateria',
      type: ServiceType.BATERIA,
      description: 'Troca da bateria.',
      price: basePriceBateria,
      installTime: '30 min',
      atendimento: AtendimentoType.LOJA_E_LOCAL,
    },
    {
      name: 'Componentes',
      slug: 'componentes',
      type: ServiceType.COMPONENTE,
      description: 'Reparo de componentes internos.',
      price: 200,
      installTime: '30 min',
      atendimento: AtendimentoType.LOJA_E_LOCAL,
      components: [
        { name: 'Conector de carga', price: 280 },
        { name: 'Microfone', price: 220 },
        { name: 'Alto-falante', price: 250 },
        { name: 'Botão volume', price: 200 },
        { name: 'Botão power', price: 220 },
        { name: 'Sensor de digital', price: 320 },
      ],
    },
    {
      name: 'Câmera Traseira',
      slug: 'camera-traseira',
      type: ServiceType.CAMERA,
      description: 'Troca do módulo de câmeras.',
      price: isPremium ? 750 : 450,
      installTime: '1 hora',
      atendimento: AtendimentoType.LOJA_E_LOCAL,
    },
    {
      name: 'Câmera Frontal',
      slug: 'camera-frontal',
      type: ServiceType.CAMERA,
      description: 'Substituição da câmera frontal.',
      price: 350,
      installTime: '45 min',
      atendimento: AtendimentoType.LOJA_E_LOCAL,
    },
    {
      name: 'Tampa Traseira',
      slug: 'tampa-traseira',
      type: ServiceType.TAMPA,
      description: 'Substituição da tampa traseira.',
      price: isPremium ? 500 : 300,
      installTime: '2 horas',
      atendimento: AtendimentoType.LOJA,
    },
    {
      name: 'Limpeza Química',
      slug: 'limpeza-quimica',
      type: ServiceType.LIMPEZA,
      description: 'Limpeza ultrassônica completa.',
      price: 160,
      installTime: '2 horas',
      atendimento: AtendimentoType.LOJA,
    },
    {
      name: 'Lente de Câmera',
      slug: 'lente-camera',
      type: ServiceType.LENTE,
      description: 'Troca do vidro protetor das lentes.',
      price: 180,
      installTime: '1 hora',
      atendimento: AtendimentoType.LOJA_E_LOCAL,
    },
  ];

  await createServices(modelId, services);
}

// Helper function to create services
async function createServices(modelId: string, services: any[]) {
  for (const s of services) {
    const { variants, components, ...serviceData } = s;

    const service = await prisma.service
      .upsert({
        where: { modelId_slug: { modelId, slug: s.slug } },
        update: {},
        create: { ...serviceData, modelId },
      })
      .catch(() => null);

    if (!service) continue;

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
