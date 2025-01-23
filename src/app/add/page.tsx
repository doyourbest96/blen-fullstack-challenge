import { db } from '@/db/client';
import { tasks } from '@/db/schema';
import { redirect } from 'next/navigation';
import { TaskFormButtons } from '@/components/TaskFormButtons';

async function createTask(formData: FormData) {
  'use server';

  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const dueDate = formData.get('dueDate') as string;

  if (!title || !dueDate) {
    throw new Error('Title and due date are required');
  }

  await db.insert(tasks).values({
    title,
    description,
    dueDate,
  });

  redirect('/');
}

export default function AddTask() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="mb-6 text-2xl font-bold">Add New Task</h1>

      <form action={createTask} className="space-y-4">
        <div>
          <label htmlFor="title" className="mb-1 block text-sm font-medium">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
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
            required
            className="w-full rounded border p-2"
          />
        </div>

        <TaskFormButtons />
      </form>
    </main>
  );
}
