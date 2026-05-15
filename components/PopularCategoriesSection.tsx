import Link from "next/link";

export default function PopularCategoriesSection() {
  const categories = [
    { label: "All", letter: "A" },
    { label: "Electronics", letter: "E" },
    { label: "Fashion", letter: "F" },
    { label: "Home", letter: "H" },
    { label: "Books", letter: "B" },
    { label: "Sports", letter: "S" },
  ];

  return (
    <section className="container mx-auto p-4 md:p-8">
      <h2 className="text-2xl md:text-3xl font-bold uppercase text-center mb-8 text-dark-gray">
        Popular Categories
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
        {categories.map((category, index) => (
          <Link
            href={`/categories/${category.label.toLowerCase()}`}
            key={index}
            className="flex flex-col items-center justify-center p-4 bg-white rounded-4xl shadow-soft hover:shadow-lg transition-shadow duration-200 group"
          >
            <div className="flex items-center justify-center w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-blue-100 mb-4 group-hover:bg-blue-200 transition-colors duration-200">
              <span className="text-5xl sm:text-6xl font-bold text-blue-800">
                {category.letter}
              </span>
            </div>
            <p className="text-sm font-semibold text-dark-gray group-hover:text-primary transition-colors duration-200">
              {category.label}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
