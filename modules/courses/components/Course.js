export const CourseDisplay = ({ title, description, onClick, className, ...props }) => (
  <button className={`btn card rounded w-100 ${className}`} onClick={onClick} {...props}>
    <div className="card-body w-100">
      <h5 className="card-title">{title}</h5>
      <p className="card-text">
        {description}
      </p>
    </div>
  </button>
);
