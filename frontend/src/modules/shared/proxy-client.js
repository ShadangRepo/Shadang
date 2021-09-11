import { getToken, getRefreshToken } from './tokenConfig';
import { ProxyClient, createAxiosHook } from './proxy-client-factory';

const proxyClient = new ProxyClient({ getToken, getRefreshToken });
const useAxiosGet = createAxiosHook({ proxyClient });

export { proxyClient, useAxiosGet };