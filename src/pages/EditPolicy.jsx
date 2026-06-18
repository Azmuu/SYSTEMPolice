
import { useParams } from 'react-router-dom';

function EditPolicy() {
  const { id } = useParams();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Edit Policy #{id}</h2>
      <form className="space-y-4 max-w-xl">
        <input type="text" placeholder="Title" className="w-full p-2 border rounded" defaultValue="Existing Title" />
        <textarea placeholder="Description" className="w-full p-2 border rounded">Existing description here...</textarea>
        <input type="file" className="w-full" />
        <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">Update</button>
      </form>
    </div>
  );
}

export default EditPolicy;