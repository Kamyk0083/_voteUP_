export default function Admin() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 bg-gray-800">
        <p className="text-2xl font-bold mb-4 ">Admin</p>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Zakończ głosowanie i pokaż wyniki
        </button>
      </div>
    );
}
