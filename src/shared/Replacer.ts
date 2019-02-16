
// This is needed to prevent the following error in the replacer function
// Element implicitly has an 'any' type because type '{}' has no index signature
export interface IIndexerType extends Object{
    [key: string]: any;
}

export function replacer<T extends IIndexerType>(variables: T, key: string, val: any){
    const regex: RegExp = /%[\w\d]+%/g

    if(typeof(val) === "string"){
        let newVal: string = val;
        const matches: string[] | null = newVal.match(regex);

        if(matches){
            matches.forEach((match) => {
                const variable: any = variables[match.replace(/%/g, '')];
                newVal = newVal.replace(match, variable);
            });
            return newVal;
        }
        else{
            return val;
        }
    }
    
    return val;
}