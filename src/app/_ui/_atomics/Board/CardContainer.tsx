import { DetailedHTMLProps, Fragment, HTMLAttributes, ReactNode } from "react";

interface ICardContainer
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const CardContainer = ({ children }: ICardContainer) => {
  return (
    <div className="grid 2xl:grid-cols-3 gap-y-16 gap-x-6 lg:grid-cols-2  md:grid-cols-1 justify-center max-lg:gap-4">
      {children}
    </div>
  );
};

export default CardContainer;
