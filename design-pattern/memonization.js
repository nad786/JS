class A {
    fn() {
        console.log("from A")
        console.log(this);
    }
}
class B extends A {
    fn() {
        console.log("from B");
        super.fn();
    }
}
class C extends B {
    key = "Value";
    fn() {
        console.log("from C");
        super.fn();
    }
}

c = new C();
c.fn();