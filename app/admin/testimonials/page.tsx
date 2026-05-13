// app/admin/testimonials/page.tsx - Depoimentos
import { prisma } from '@/app/lib/prisma';
import { TestimonialForm } from './testimonial-form';
import { TestimonialList } from './testimonial-list';

async function getTestimonials() {
  return prisma.testimonial.findMany({
    orderBy: { createdAt: 'desc' },
  });
}

export default async function AdminTestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl text-gray-500 font-bold">Depoimentos</h1>
          <p className="text-sm text-gray-400">
            {testimonials.length} depoimentos
          </p>
        </div>
      </div>

      <TestimonialForm />
      <TestimonialList testimonials={testimonials} />
    </div>
  );
}
