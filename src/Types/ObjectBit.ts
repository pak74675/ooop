import ObjectBoolean from './ObjectBoolean';
import ObjectNull from './ObjectNull';
import ObjectUndefined from './ObjectUndefined';
import TypeBase from './TypeBase';

export default class ObjectBit extends TypeBase<number> {
  public cast<T extends TypeBase<unknown>>(type: T): ObjectBit {
    if (type.nullable() && type.value() === null) {
      return new ObjectBit(0);
    }

    if (type.equalsTo(ObjectNull) || type.equalsTo(ObjectUndefined)) {
      return new ObjectBit(0);
    }

    const returningValue = parseInt(type.value() as any);

    if (isNaN(returningValue)) {
      return new ObjectBit(0);
    }

    return new ObjectBit(returningValue > 0 ? 1 : 0);
  }

  public name(): string {
    return '[object Bit]';
  }

  public nullable(): boolean {
    return false;
  }

  public toBoolean(): ObjectBoolean {
    return new ObjectBoolean(this.value() === 1);
  }
}