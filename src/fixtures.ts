import { forwardRef, Inject, Injectable, Optional } from '@angular/core';

@Injectable()
export class EmptyClass {}

@Injectable()
export class ClassA {}

@Injectable()
export class ClassB {}

@Injectable()
export class ClassC {
    constructor(public a : ClassA, public b : ClassB) {}
}

@Injectable()
export class ClassD {
    constructor(@Inject(ClassA) public b : ClassB, public c : ClassC) {}
}

@Injectable()
export class ClassE {
    constructor(@Optional() public a : ClassA) {}
}

@Injectable()
export class ClassF {
    constructor(@Optional() @Inject(ClassB) public a : ClassA) {}
}

@Injectable()
export class ClassG extends ClassC {}

@Injectable()
export class ClassH {
    constructor(@Inject(forwardRef(() => ClassC)) public c : any) {}
}

export class ClassI {
    constructor(public a : ClassA) {}
}

@Injectable()
export class ClassX {
    constructor(@Inject(ClassY) public y : ClassY) {}
}

@Injectable()
export class ClassY {}
