import { db } from '@/db/client';
import { tasks } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { notFound, redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { CancelButton } from '@/components/CancelButton';

async function updateTask(id: number, formData: FormData) {
  'use server';

  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const dueDate = formData.get('dueDate') as string;

  if (!title || !dueDate) {
    throw new Error('Title and due date are required');
  }

  await db
    .update(tasks)
    .set({
      title,
      description,
      dueDate,
      updatedAt: new Date().toISOString(),
    })
    .where(eq(tasks.id, id));

  redirect(`/${id}`);
}

export default async function EditTask({
  params: { id },
}: {
  params: { id: string };
}) {
  const task = await db.query.tasks.findFirst({
    where: eq(tasks.id, parseInt(id)),
  });

  if (!task) {
    notFound();
  }

  return (
    <main className="container mx-auto p-4">
      <h1 className="mb-6 text-2xl font-bold">Edit Task</h1>

      <form action={updateTask.bind(null, task.id)} className="space-y-4">
        <div>
          <label htmlFor="title" className="mb-1 block text-sm font-medium">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            defaultValue={task.title}
            required
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label htmlFor="description" className="mb-1 block text-sm font-medium">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            defaultValue={task.description ?? ''}
            rows={3}
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label htmlFor="dueDate" className="mb-1 block text-sm font-medium">
            Due Date
          </label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            defaultValue={task.dueDate}
            required
            className="w-full rounded border p-2"
          />
        </div>

        <div className="flex gap-4">
          <Button type="submit">Update Task</Button>
          <CancelButton />
        </div>
      </form>
    </main>
  );
}