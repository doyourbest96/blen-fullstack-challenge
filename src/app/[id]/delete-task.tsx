'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

async function deleteTask(id: number) {
  await fetch(`/api/tasks/${id}`, {
    method: 'DELETE',
  });
}

export default function DeleteTask({ id }: { id: number }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this task?')) {
      await deleteTask(id);
      router.push('/');
      router.refresh();
    }
  };

  return (
    <Button variant="destructive" onClick={handleDelete}>
      Delete
    </Button>
  );
}
