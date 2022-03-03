export const throttle = (func: () => void, ms: number) => {
    let isThrottled = false;
    let savedArgs: any;
    let  savedThis: any;
    function wrapper(this: any) {

        if (isThrottled) { // (2)
            savedArgs = arguments;
            savedThis = this;
            return;
        }

        // @ts-ignore
        func.apply(this, arguments); // (1)

        isThrottled = true;

        setTimeout(function() {
            isThrottled = false; // (3)
            if (savedArgs) {
                wrapper.apply(savedThis, savedArgs);
                savedArgs = savedThis = null;
            }
        }, ms);
    }
    return wrapper;
};