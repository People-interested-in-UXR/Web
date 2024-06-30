import { Fragment, ReactNode } from "react";

interface IProperty {
  propKey: Array<ReactNode>;
  propValue?: Array<ReactNode> | string;
}
const Property = ({ propKey, propValue }: IProperty) => {
  return (
    <div className="grid sm:gap-16 gap-2 grid-cols-2 items-center max-sm:grid-cols-1 max-sm:grid-rows-2">
      <div className="flex gap-2 px-4 py-2 b1-500-20 text-muted">
        {propKey.map((key, index) => (
          <Fragment key={index}>{key}</Fragment>
        ))}
      </div>
      <div className="flex gap-4">
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
