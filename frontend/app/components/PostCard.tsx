interface PostCardProps {
    post: {
      id: number;
      title: string;
      content: string;
    };
    onDelete: (id: number) => void;
  }
  
  import Link from 'next/link';
  
  export default function PostCard({ post, onDelete }: PostCardProps) {
    return (
      <div className="border rounded p-4 mb-4">
        <h2 className="text-xl font-bold">{post.title}</h2>
        <p className="text-gray-700 mt-2">{post.content}</p>
        <div className="mt-4 flex justify-end space-x-2">
          <Link href={`/edit-post/${post.id}`} className="text-blue-500 hover:underline">
            Editar
          </Link>
          <button
            onClick={() => onDelete(post.id)}
            className="text-red-500 hover:underline"
          >
            Eliminar
          </button>
        </div>
      </div>
    );
  }