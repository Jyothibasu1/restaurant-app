import './PopularCuisines.css';

export const PopularCuisines = ({ image, title }) => {
  return (
    <div className="PC-Con">
      <img
        className="PC-Img"
        src={image}
        alt={title}
      />
       <span className="PC-title">
        {title.length>6?title.substring(0,5)+"...":title}</span>
    </div>
  );
};