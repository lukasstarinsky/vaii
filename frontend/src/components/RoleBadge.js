export default function RoleBadge({ role }) {
  return (
    <>
    { role == 0 ?
      <div className="bg-gray-900 px-4 py-1 rounded text-white font-semibold mt-2 text-center">
        <span className="text-sm">User</span>
      </div> 
    : role == 1 ? 
      <div className="bg-blue-500 px-4 py-1 rounded text-white font-semibold mt-2 text-center">
        <span className="text-sm">Moderator</span>
      </div>
    : role == 2 ?
      <div className="bg-red-500 px-4 py-1 rounded text-white font-semibold mt-2 text-center">
        <span className="text-sm">Administrator</span>
      </div>
    :<></>}
    </>
  )
}