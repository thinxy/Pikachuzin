export function onCrash(...errors: Array<any>){
    console.error(("[Anti Crash] ").green, (errors.join("\n").red));
}