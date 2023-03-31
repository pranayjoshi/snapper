
interface Props {
    image: string;
    size?: string;
}

const UserImage = ({image, size = "60px"}:Props ) => {
  return (
    <div>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={`http://localhost:3001/assets/${image}`}
      />
    </div>
  );
};

export default UserImage;