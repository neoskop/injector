export * from './factory';
export {
    isClassProvider as ɵisClassProvider,
    REFLECTOR as ɵREFLECTOR,
    resolveDeps as ɵresolveDeps,
    resolveProvider as ɵresolveProvider,
    resolveProviders as ɵresolveProviders
} from './resolver';

export { Injector, StaticProvider, Inject, Optional, Host, Self, SkipSelf } from '@angular/core';
