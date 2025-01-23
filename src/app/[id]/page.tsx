import { db } from '@/db/client';
import { tasks } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import DeleteTask from './delete-task';

export default async function TaskDetail({ params: { id } }: { params: { id: string } }) {
  const task = await db.query.tasks.findFirst({
    where: eq(tasks.id, parseInt(id)),
  });

  if (!task) {
    notFound();
  }

  return (
    <main className="container mx-auto p-4">
      <div className="mx-auto max-w-2xl rounded-lg bg-white p-6 shadow">
        <div className="mb-6 flex items-start justify-between">
          <h1 className="text-2xl font-bold">{task.title}</h1>
          <div className="flex gap-2">
            <Link href={`/${id}/edit`}>
              <Button variant="outline">Edit</Button>
            </Link>
            <DeleteTask id={task.id} />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h2 className="text-sm font-semibold text-gray-500">Due Date</h2>
            <p>{format(new Date(task.dueDate), 'PP')}</p>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-gray-500">Description</h2>
            <p className="whitespace-pre-wrap">{task.description}</p>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-gray-500">Created</h2>
            <p>{format(new Date(task.createdAt!), 'PP')}</p>
          </div>
        </div>

        <div className="mt-8">
          <Link href="/">
            <Button variant="outline">Back to Tasks</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
