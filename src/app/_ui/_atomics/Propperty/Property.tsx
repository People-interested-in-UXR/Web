import { Fragment, ReactNode } from "react";

interface IProperty {
  propKey: Array<ReactNode>;
  propValue?: Array<ReactNode> | string;
}
const Property = ({ propKey, propValue }: IProperty) => {
  return (
    <div className="flex flex-wrap">
      <div className="flex gap-2 px-4 py-2 b1-500-20 text-muted w-[150px] flex-wrap">
        {propKey.map((key, index) => (
          <div className="flex flex-wrap" key={index}>
            {key}
          </div>
        ))}
      </div>
      <div className="flex gap-4 col-span-2 flex-wrap xl:pl-16 pl-4">
        {typeof propValue === "string" ? (
          <div className="text-muted">{propValue}</div>
        ) : (
          propValue &&
          propValue.map((value, index) => (
            <Fragment key={index}>{value}</Fragment>
          ))
        )}
      </div>
    </div>
  );
};

export default Property;
