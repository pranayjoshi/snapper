
interface Props {
    image: string;
}

const UserImage = ({image}:Props ) => {
  return (
    <div>
      <img
      className="rounded-full w-14 h-14 border p-1"
        alt="user"
        src={`http://localhost:3001/assets/${image}`}
      />
    </div>
  );
};

export default UserImage;