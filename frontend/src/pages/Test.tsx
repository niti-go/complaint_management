export default function Test() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4">CSS Test</h1>
        
        <div className="mb-4">
          <h2 className="text-2xl mb-2">Tailwind Classes:</h2>
          <div className="bg-red-500 text-white p-4 rounded mb-2">Red background (Tailwind)</div>
          <div className="bg-blue-500 text-white p-4 rounded mb-2">Blue background (Tailwind)</div>
          <div className="bg-green-500 text-white p-4 rounded">Green background (Tailwind)</div>
        </div>
        
        <div className="mb-4">
          <h2 className="text-2xl mb-2">Regular CSS Classes:</h2>
          <div className="test-red text-white p-4 rounded mb-2">Red background (Regular CSS)</div>
          <div className="test-blue text-white p-4 rounded">Blue background (Regular CSS)</div>
        </div>
        
        <div className="mb-4">
          <h2 className="text-2xl mb-2">Inline Styles:</h2>
          <div style={{backgroundColor: 'purple', color: 'white', padding: '1rem', borderRadius: '0.5rem'}}>
            Purple background (Inline)
          </div>
        </div>
      </div>
    </div>
  );
} 