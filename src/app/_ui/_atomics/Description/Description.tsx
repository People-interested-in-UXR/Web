const Description = ({ title = "", description = "", position = "" }) => (
  <div
    className={`flex flex-col gap-4 max-sm:w-full ${position === "center" && "items-center"}`}
  >
    <h2 className="sm:h1-700-32 h1-700-20 text-title">{title}</h2>
    <p
      className={`sm:b1-500-20 b1-500-12 text-sub whitespace-pre-line ${position === "center" && "text-center"}`}
    >
      {description}
    </p>
  </div>
);

export default Description;
