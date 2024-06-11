import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

/**
 * @export
 * @param cacheFactory
 * @return {*}
 */
export function cachedRequest(
  cacheFactory: (this: any) => {
    [key: string]:
      | {
          observableSubscribe: Observable<any>;
          time: number;
        }
      | undefined;
  }
) {
  return (
    target: any,
    method: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor => {
    const origin = descriptor.value;
    const prefix = `${target.constructor.name}.${method}`;

    descriptor.value = function (...args: any[]): Observable<any> {
      const storage = cacheFactory.call(this);
      const key = `${prefix}+${JSON.stringify(args)}`;

      let observable = storage[key];

      if (!!observable && observable?.time >= new Date().getTime())
        return observable.observableSubscribe;

      observable = {
        observableSubscribe: origin.apply(this, args).pipe(shareReplay(1)),
        time: new Date(Date.now() + 3 * 60000).getTime(),
      };

      storage[key] = observable;
      return observable?.observableSubscribe as Observable<any>;
    };

    return descriptor;
  };
}
