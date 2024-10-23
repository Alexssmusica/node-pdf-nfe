export function log(msg: string, processo?: string): void {
    console.log(`[node-dfe][${processo ?? 'log'}]->${msg}`);
}
