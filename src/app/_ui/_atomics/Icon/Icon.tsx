import Image from "next/image";

interface IImage {
  src: string;
  alt: string;
  height: number;
  width: number;
  loading?: "eager" | "lazy" | undefined;
  // ref?
  // srcSet
}

export default function Icon(args: IImage) {
  // eslint-disable-next-line jsx-a11y/alt-text
  return <Image {...args}></Image>;
}
