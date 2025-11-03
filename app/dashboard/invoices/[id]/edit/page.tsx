import Form from '@/app/ui/invoices/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomers } from '@/app/lib/data';
// import { invoices } from '@/app/lib/placeholder-data';
export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoice', href: '/dashboard/invoices' },
          {
            label: 'Edit Invoices',
            href: `/dashboard/invoices/${id}/edit`,
            active: true
          }
        ]}
      ></Breadcrumbs>
      <Form invoice={invoice} customers={customers}></Form>
    </main>
  );
}
