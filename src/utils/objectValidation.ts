// check values of keys in object is valid or not
export function objectValueValidator<T>(object: T) {
    let newObject: Partial<T> = {};
    const invalidData = [null, undefined, "", 0]
    Object.keys(object).map(key => {
        // validate string and number
        if(typeof object[key] === "string" || typeof object[key] === "number")
        if(!invalidData.includes(key)) 
        if(!invalidData.includes(object[key]))
            newObject[key] = object[key]
        // validate object
        if(typeof object[key] === "object") newObject[key] = objectValueValidator(object[key]);
        // validate array
        if(Array.isArray(object[key])) {
            newObject[key] = []
            object[key].map((value: any) => {
                // validate string and number
                if(typeof value === "string" || typeof value === "number")
                if(!invalidData.includes(value)) 
                    newObject[key].push(value)
                // validate object
                if(typeof value === "object") newObject[key].push(objectValueValidator(value));
            })
        }
    })
    return newObject;
}