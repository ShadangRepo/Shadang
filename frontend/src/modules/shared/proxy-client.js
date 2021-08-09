import { getToken } from './tokenConfig';
import { ProxyClient, createAxiosHook } from './proxy-client-factory';

const proxyClient = new ProxyClient({ getToken });
const useAxiosGet = createAxiosHook({ proxyClient });

export { proxyClient, useAxiosGet };