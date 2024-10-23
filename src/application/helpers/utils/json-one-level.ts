export function jsonOneLevel(obj: any): string {
    const result = {};
    
    for (const k of Object.keys(obj)) {
        let logStr = obj[k]?.toString() ?? 'null'; 
        
        if (logStr.length > 500) {
            logStr = logStr.substring(0, 499);
        }
        
        result[k] = logStr;
    }
    
    return JSON.stringify(result);
}
