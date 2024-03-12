export interface  WebProxy {
    host: string;
    port: string;
    isHttps: boolean;
    auth?: {
        username: string;
        password: string;
    };
}
