import { User } from "@/state/api";
import Image from "next/image";

type Props = {
  user: User;
};

const UserCard = ({ user }: Props) => {
  return (
    <div className="flex flex-col items-center rounded-lg border border-gray-200 bg-white p-6 shadow-md transition-all duration-300 ease-in-out hover:shadow-lg dark:border-gray-700 dark:bg-gray-800">
      <div className="relative mb-4 h-24 w-24 overflow-hidden rounded-full border-4 border-blue-500 shadow-inner">
        {user.profilePictureUrl ? (
          <Image
            src={`/p1.jpeg`}
            alt={`${user.username}'s profile picture`}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 ease-in-out hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-300 text-3xl font-bold text-gray-600 dark:bg-gray-600 dark:text-gray-300">
            {user.username.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-white">
        {user.username}
      </h3>
    </div>
  );
};

export default UserCard;
