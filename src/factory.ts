import { Injector, StaticProvider, Type } from '@angular/core';
import { resolveProviders } from './resolver';

export interface ClassProvider {
    provide: any;
    useClass: Type<any>;
    multi?: boolean;
}

export type TypeProvider = Type<any>;

export type Provider = TypeProvider | ClassProvider | StaticProvider;

export class InjectorFactory {
    static create({ providers, ...options } : { providers: Provider[], parent?: Injector, name?: string }) : Injector {
        const staticProviders = resolveProviders(providers);
        
        return Injector.create({
            ...options,
            providers: staticProviders
        });
    }
}
