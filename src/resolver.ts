import 'reflect-metadata';
import { ClassProvider, Provider } from './factory';
import {
    Host,
    Inject, Optional,
    resolveForwardRef,
    Self,
    SkipSelf,
    StaticProvider,
    Type,
    ɵReflectionCapabilities as ReflectionCapabilities
} from '@angular/core';

export const REFLECTOR = new ReflectionCapabilities();

export function isClassProvider(provider : any) : provider is ClassProvider {
    return !!(provider && provider.provide && provider.useClass && !provider.deps)
}

export function resolveProviders(providers : Provider[]) : StaticProvider[] {
    return providers.map(provider => {
        if(Array.isArray(provider)) {
            return resolveProviders(provider);
        }
        
        return resolveProvider(provider);
    });
}

export function resolveProvider(provider : Provider) : StaticProvider {
    if(typeof provider === 'function') {
        return {
            provide: provider,
            useClass: provider,
            deps: resolveDeps(provider)
        };
    }
    
    if(isClassProvider(provider)) {
        return {
            ...provider,
            deps: resolveDeps(provider.useClass)
        };
    }
    
    return provider;
}

export function resolveDeps(klass : Type<any>) : any[] {
    const params = REFLECTOR.parameters(klass);
    
    if(!params.length) {
        return [];
    }
    
    if(params.some((p : any) => p == null)) {
        throw noAnnotationError(klass, params);
    }
    
    return params.map((p : any) => resolveDep(klass, p, params));
}

function resolveDep(klass : Type<any>, metadata : any[], params : any[][]) : any {
    let dep : any = null;
    const decorator : any[] = [];
    
    for(let i = 0; i < metadata.length; ++i) {
        const paramMetadata = metadata[i];
        
        if(paramMetadata instanceof Type) {
            dep = paramMetadata;
        }
        
        if(paramMetadata instanceof Inject) {
            dep = paramMetadata.token;
        }
        
        if (paramMetadata instanceof Optional || paramMetadata instanceof SkipSelf
            || paramMetadata instanceof Self || paramMetadata instanceof Host) {
            decorator.push(paramMetadata);
        }
    }
    
    dep = resolveForwardRef(dep);
    
    if(dep == null) {
        throw noAnnotationError(klass, params);
    }
    
    if(decorator.length) {
        return [ ...decorator, dep ];
    }
    
    return dep;
}

function noAnnotationError(klass : Type<any>, params : any[][]) {
    return new Error(`Cannot resolve all params for class ${klass.name}, params: ${params.map(String).join(', ')}`)
}
