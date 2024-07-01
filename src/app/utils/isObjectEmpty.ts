const isObjectEmpty = <T>(objectName: T) => {
  return (
    objectName &&
    Object.keys(objectName).length === 0 &&
    objectName.constructor === Object
  );
};

export default isObjectEmpty;
