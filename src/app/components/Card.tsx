import Link from "next/link";

interface CardProps {
  title: string;
  description: string;
  tags: string[];
  link: string;
}

const Card: React.FC<CardProps> = ({ title, description, tags, link }) => {
  return (
    <Link
      href={link}
      className="bg-gray-800 w-full max-w-sm h-[340px] flex flex-col justify-between text-white p-6 rounded-lg shadow-lg hover:bg-gray-900 duration-300 overflow-hidden"
    >
      <div>
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="mt-2 text-sm line-clamp-4">
          {description}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2 max-h-[80px] overflow-y-auto pr-1">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="bg-gray-600 text-white text-xs px-2 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
};

export default Card;
