type ClassNames = undefined | string | { [key: string]: boolean | undefined };

export default function cn(...classNames: ClassNames[]) {
  return classNames
    .reduce((classes: string[], className) => {
      if (!className) {
        return classes;
      }

      if (typeof className === 'string') {
        return className === '' ? [...classes] : [...classes, className];
      }

      const classNameItems = Object.entries(className).reduce(
        (objectClasses: string[], [objectClassname, isUsed]) => !isUsed
          ? [...objectClasses]
          : [...objectClasses, objectClassname],
        [],
      );

      return [...classes, ...classNameItems];
    }, [])
    .join(' ')
    .trim();
}