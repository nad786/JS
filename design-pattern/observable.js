class Subject {
    fn = [];
    next(...value) {
        if(this.fn) {
            this.fn.forEach(fn => {
                fn(...value);
            });
        }
    }

    subscribe(fn) {
        this.fn.push(fn);
    }
}

const sub1 = new Subject();
const sub2 = new Subject();

sub1.subscribe((x, y) => {
    console.log("1st time ", x, y);
})

sub1.subscribe((x, y) => {
    console.log("2nd time, ", x, y);
})

sub2.subscribe((x, y) => {
    console.log("new object ", x, y);
});

sub1.next("Test", 10);
sub1.next("Testing", 20);
sub2.next("Testing 123", 20);