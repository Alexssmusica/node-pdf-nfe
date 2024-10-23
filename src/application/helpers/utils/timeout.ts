export async function timeout(ms: number): Promise<number> {
    return new Promise(resolve => setTimeout(() => resolve, ms));
}
