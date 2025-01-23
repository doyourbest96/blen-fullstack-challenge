import { db } from '@/db/client';
import { tasks } from '@/db/schema';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';

export default async function TaskList() {
  const taskList = await db.select().from(tasks).all();

  return (
    <main className="container mx-auto p-4">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Tasks</h1>
        <Link href="/add">
          <Button>Add New Task</Button>
        </Link>
      </div>

      <div className="grid gap-4">
        {taskList.map((task) => (
          <Link
            key={task.id}
            href={`/${task.id}`}
            className="block rounded-lg bg-white p-4 shadow transition-shadow hover:shadow-md">
            <div className="flex items-start justify-between">
              <h2 className="text-lg font-semibold">{task.title}</h2>
              <span className="text-sm text-gray-500">
                Due: {format(new Date(task.dueDate), 'PP')}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
