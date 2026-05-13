This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Jc & Santana Celulares — Sistema Web

Sistema de orçamentos e pedidos de assistência técnica de celulares.

## Tecnologias

- **Next.js 15** (App Router)
- **TypeScript**
- **Prisma ORM** + PostgreSQL
- **Tailwind CSS** + **shadcn/ui**
- **React Context** (carrinho)
- **Sonner** (toasts)

## Estrutura de Pastas

```
app/
├── layout.tsx            # Layout raiz com CartProvider
├── page.tsx              # Home — Hero + Benefícios
├── globals.css
├── checkout/
│   └── page.tsx          # Formulário + integração WhatsApp
├── servicos/
│   ├── page.tsx          # Passo 1: Marcas
│   └── [brand]/
│       ├── page.tsx      # Passo 2: Linhas e modelos
│       └── [line]/
│           └── [model]/
│               └── page.tsx  # Passo 3: Serviços
└── admin/
    ├── layout.tsx        # Sidebar admin
    ├── page.tsx          # Dashboard
    ├── orders/page.tsx   # Pedidos
    ├── brands/page.tsx   # CRUD marcas
    ├── services/page.tsx # CRUD serviços
    └── settings/page.tsx # Configurações

components/
├── layout/
│   ├── Header.tsx
│   └── Footer.tsx
├── cart/
│   └── CartDrawer.tsx
├── device/
│   └── BrandCard.tsx
├── services/
│   └── ServiceSelector.tsx
├── SectionTitle.tsx
├── Breadcrumb.tsx
└── WhatsAppButton.tsx

actions/
└── index.ts              # Server Actions (getBrands, getOrders, etc.)

hooks/
└── use-cart.tsx           # CartProvider + useCart

lib/
├── prisma.ts             # PrismaClient singleton
└── whatsapp.ts           # Formatação da mensagem WhatsApp

types/
└── index.ts              # Tipagem completa

prisma/
├── schema.prisma         # Schema completo
└── seed.ts               # Dados iniciais
```

## Setup

```bash
# 1. Instalar dependências
npm install

# 2. Copiar variáveis de ambiente
cp .env.example .env
# Editar DATABASE_URL no .env

# 3. Rodar migrations
npx prisma migrate dev --name init

# 4. Popular banco com dados iniciais
npx prisma db seed

# 5. Iniciar servidor
npm run dev
```

## .env.example

```env
DATABASE_URL="postgresql://user:password@localhost:5432/jc_santana"
NEXTAUTH_SECRET="sua-secret-key"
```

## package.json (scripts adicionais)

```json
{
  "prisma": {
    "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
  }
}
```

## Regras de negócio

| Regra                  | Valor                        |
| ---------------------- | ---------------------------- |
| Desconto multi-serviço | 5% (≥ 2 serviços)            |
| Taxa de deslocamento   | +7% (atendimento No Local)   |
| Número WhatsApp        | 5547997513609                |
| Endereço               | Adhemar Garcia, Joinville/SC |

## Fluxo do cliente

```
Home → Marcas → Linha/Modelos → Serviços → Carrinho → Checkout → WhatsApp
```

## Componentes shadcn/ui necessários

```bash
npx shadcn@latest add button card select dialog sheet sonner
```
