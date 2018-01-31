import 'mocha';
import { expect } from 'chai';
import { Injector } from '@angular/core';
import { InjectorFactory } from './factory';
import { ClassA, ClassF } from './fixtures';

describe('@neoskop/injector -> factory.ts', () => {
    describe('InjectorFactory', () => {
        let injector : Injector;
        
        beforeEach(() => {
            injector = InjectorFactory.create({ providers: [
                [ ClassA ],
                ClassF
            ] });
        });
        
        it('should resolve simple dependecy', () => {
            expect(injector.get(ClassA)).to.be.instanceOf(ClassA);
        });
        
        it('should resolve with optional dependency', () => {
            const f = injector.get(ClassF);
            
            expect(f).to.be.instanceOf(ClassF);
            expect(f.a).to.be.null;
        })
    });
    
});
