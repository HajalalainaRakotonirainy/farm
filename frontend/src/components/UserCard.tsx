import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UserCard = ({
  count,
  type,
  icon,
}: {
  count: string;
  type: String;
  icon: IconProp;
}) => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;

  const formattedDate = `${year}/${month}`;
  return (
    <div className="rounded-2xl odd:bg-sky-300 even:bg-lamaYellow p-4 flex-1 min-w-[130px]">
      <div className="flex justify-between items-center">
        <span className="text-[10px] bg-white px-2 py-1 rounded-full text-green-600">
          {formattedDate}
        </span>
        <FontAwesomeIcon icon={icon} color="blue" width={20} height={20} />
      </div>
      <h1 className="text-2xl font-semibold my-4">{count}</h1>
      <h2 className="capitalize text-sm font-medium">{type}</h2>
    </div>
  );
};

export default UserCard;
