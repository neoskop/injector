import 'mocha';
import { expect } from 'chai';
import { isClassProvider, resolveDeps, resolveProvider } from './resolver';
import { Optional } from '@angular/core';
import { ClassA, ClassB, ClassC, ClassD, ClassE, ClassF, ClassG, ClassH, ClassI, ClassX, EmptyClass } from './fixtures';

describe('@neoskop/injector -> resolve.ts', () => {
    describe('isClassProvider', () => {
        it('should check for class provider without deps', () => {
            expect(isClassProvider({ provide: EmptyClass, useClass: EmptyClass })).to.be.true;
            expect(isClassProvider({ provide: EmptyClass, useClass: EmptyClass, deps: [] })).to.be.false;
            expect(isClassProvider({ useClass: EmptyClass, deps: [] })).to.be.false;
            expect(isClassProvider(null)).to.be.false;
            expect(isClassProvider(true)).to.be.false;
        });
    });
    
    describe('resolveDeps', () => {
        it('should resolve deps for empty class', () => {
            expect(resolveDeps(EmptyClass)).to.be.eql([]);
        });
        
        it('should resolve deps for simple dependency', () => {
            expect(resolveDeps(ClassC)).to.be.eql([ ClassA, ClassB ]);
        });
        
        it('should resolve with @Inject', () => {
            expect(resolveDeps(ClassD)).to.be.eql([ ClassA, ClassC ]);
        });
        
        it('should resolve with @Optional', () => {
            expect(resolveDeps(ClassE)).to.be.eql([ [ new Optional(), ClassA ] ]);
        });
        
        it('should resolve with @Inject and @Optional', () => {
            expect(resolveDeps(ClassF)).to.be.eql([ [ new Optional(), ClassB ] ]);
        });
        
        it('should resolve parent dependencies', () => {
            expect(resolveDeps(ClassG)).to.be.eql([ ClassA, ClassB ]);
        });
        
        it('should resolve forwardRef', () => {
            expect(resolveDeps(ClassH)).to.be.eql([ ClassC ]);
        });
        
        it('should throw when dependencies cannot be resolved', () => {
            expect(() => {
                resolveDeps(ClassI)
            }).to.throw();
        });
    
        it('should throw when dependencies cannot be resolved yet', () => {
            expect(() => {
                resolveDeps(ClassX)
            }).to.throw();
        });
    });
    
    describe('resolveProvider', () => {
        it('should resolve simple class', () => {
            expect(resolveProvider(EmptyClass)).to.be.eql({ provide: EmptyClass, useClass: EmptyClass, deps: [] })
        });
        
        it('should resolve legacy class provider', () => {
            const provider = { provide: EmptyClass, useClass: EmptyClass };
            const resolvedProvider = resolveProvider(provider);
            
            expect(resolvedProvider).not.to.be.equal(provider);
            expect(resolvedProvider).to.be.eql({ provide: EmptyClass, useClass: EmptyClass, deps: [] });
        });
        
        it('should resolve class provider', () => {
            const provider = { provide: EmptyClass, useClass: EmptyClass, deps: [] };
            const resolvedProvider = resolveProvider(provider);
            
            expect(resolvedProvider).to.be.equal(provider);
        });
    })
});
