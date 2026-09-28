function UserInfo({creator}) {
  return (
    <div className="flex items-center gap-3 mt-4">
      <img
        src={creator.avatar}
        alt={creator.username}
        className="w-12 h-12 rounded-full"
      />

      <div>
        <h3 className="font-semibold">{creator.username}</h3>
      </div>
    </div>
  );
}

export default UserInfo;
