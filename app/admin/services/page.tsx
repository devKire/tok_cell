// app/admin/services/page.tsx - Serviços
import { adminGetServices, adminGetModels } from '@/app/actions/admin';
import { ServiceForm } from './service-form';
import { ServiceList } from './service-list';

export default async function AdminServicesPage() {
  const services = await adminGetServices();
  const models = await adminGetModels();

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl text-gray-500 font-bold">Serviços</h1>
          <p className="text-sm text-gray-400">
            {services.length} serviços cadastrados
          </p>
        </div>
      </div>

      <ServiceForm models={models} />
      <ServiceList services={services} />
    </div>
  );
}
