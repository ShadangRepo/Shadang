import axios from 'axios';
import { useState, useEffect, useContext, useRef, useCallback } from 'react';
import { AppContext } from '../common/AppContext';
import { Config } from './constants';

const getHeader = ({ headerName, headers }) => {
    const header = Object.keys(headers).find(key => key.toLowerCase() === headerName.toLowerCase());
    if (header) return headers[header];
    return undefined;
};

class ProxyClient {
    getToken = null;
    callsCount = 0;
    endCallTimer = null;
    apiUrl = "/";

    constructor({ getToken }) {
        this.getToken = getToken;
    }

    configure = ({ startCallback, endCallback }) => {
        this.startCallback = startCallback;
        this.endCallback = endCallback;
    };
    startCall = () => {
        if (!this.startCallback) return;
        if (this.callsCount === 0) {
            this.startCallback();
        }
        this.callsCount++;
    };

    endCall = () => {
        if (!this.endCallback) return;
        this.callsCount--;
        if (this.callsCount <= 0) {
            this.callsCount = 0;
            this.endCallback();
            clearTimeout(this.endCallTimer);
            this.clearTimeout = setTimeout(this.endCallback, 2500);
        }
    };

    get(uri, query, cfg) {
        uri = this._addParamsToUri(uri, query);
        return this._call('GET', uri, null, cfg);
    }

    post(uri, body, cfg) {
        return this._call('POST', uri, body, cfg);
    }

    put(uri, body) {
        return this._call('PUT', uri, body);
    }

    patch(uri, body) {
        return this._call('PATCH', uri, body);
    }

    delete(uri, query) {
        uri = this._addParamsToUri(uri, query);
        return this._call('DELETE', uri, null);
    }

    _addParamsToUri(uri, params) {
        if (typeof params === 'undefined' || params === null) return uri;
        const append = [];
        for (const key of Object.keys(params)) if (params[key] !== undefined && params[key] !== null) append.push(key + '=' + params[key]);
        return append.length === 0 ? uri : uri + '?' + append.join('&');
    }

    _cleanStrings(body) {
        if (body && typeof body === 'object') {
            Object.keys(body).forEach(key => {
                if (typeof body[key] === 'string') {
                    body[key] = body[key].trim();
                    body[key] = body[key] === '' ? null : body[key];
                } else if (body[key] && typeof body[key] === 'object' && typeof body[key].$$typeof === 'undefined') this._cleanStrings(body[key]);
            });
        }
    }

    async _call(method, uri, body, { blob, formData, noAuth, directCall } = {}) {
        this._cleanStrings(body);
        this.startCall();
        const source = await axios.CancelToken.source();

        const response = await (async () => {
            const token = noAuth ? null : await this.getToken();

            const headers = {
                pragma: 'no-cache',
                'cache-control': 'no-cache',
                cache: 'no-store',
                'x-time-offset': -new Date().getTimezoneOffset() / 60,
            };
            if (token) headers['Authorization'] = `Bearer ${token}`;
            if (formData) headers['Content-Type'] = 'multipart/form-data';
            else if (body) headers['Content-Type'] = 'application/json';
            if (blob) headers['Accept'] = '*/*';

            const url = directCall && this.apiUrl ? `${this.apiUrl}${uri.substring(1)}` : `${Config.BASE_URL}/api${uri}`;

            return await axios({
                url,
                method,
                data: formData || body,
                headers,
                cancelToken: source.token,
                responseType: blob ? 'arraybuffer' : 'json',
            })
                .then(({ data, headers }) => {
                    console.log("res data, headers", data, headers)
                    if (blob) {
                        let filename = 'file';
                        const contentDisposition = getHeader({ headerName: 'Content-Disposition', headers });
                        if (contentDisposition) {
                            var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                            var matches = filenameRegex.exec(contentDisposition);
                            if (matches != null && matches[1]) {
                                filename = matches[1].replace(/['"]/g, '');
                            }
                        } else {
                            console.warn('Content-Disposition header is missing!');
                        }
                        const blobData = new Blob([data]);
                        const link = document.createElement('a');
                        if (window.navigator.msSaveOrOpenBlob) {
                            link.addEventListener('click', function (event) {
                                event && event.preventDefault();
                                window.navigator.msSaveOrOpenBlob(blobData, filename);
                            });
                        } else {
                            const url = window.URL.createObjectURL(blobData);
                            link.href = url;
                            link.setAttribute('download', filename);
                        }
                        document.body.appendChild(link);
                        link.click();
                    } else {
                        return data;
                    }
                })
                .catch(err => {
                    console.log(err)
                    let error = new Error();
                    error.message = `${err}`
                    throw error
                })
                .finally(() => this.endCall());
        })();

        return { response, source };
    }
}

const createAxiosHook = ({ proxyClient, handleError }) => ({ url, defaultValue = null, formatter = data => data, callback, noAuth }) => {
    const [state, setState] = useState(defaultValue);
    const [lookups, setLookups] = useState({});
    const [isLoading, setLoadingStatus] = useState(false);
    const [isLoaded, setLoaded] = useState(false);
    const { queueNotification } = useContext(AppContext) ?? {};
    const isMounted = useRef(true);
    const controller = useRef(null);

    useEffect(() => {
        isMounted.current = true;
        handleQuery();
        return () => {
            isMounted.current = false;
            controller.current && controller.current.cancel();
        };
    }, [url]);

    const handleQuery = useCallback(async () => {
        if (!url) return;
        setLoadingStatus(true);
        try {
            const request = proxyClient.get(url, null, { noAuth });
            controller.current = request.source;
            const response = (await request.response) || {};
            let { data, lookups: newLookups } = response;
            data = data || defaultValue;
            if (isMounted.current) {
                callback && callback(data, newLookups);
                setState(formatter(data, newLookups));
                setLookups(newLookups);
                setLoaded(true);
            }
        } catch (err) {
            if (queueNotification) queueNotification(err);
            else if (handleError) handleError(err);
            else console.log(err);
        } finally {
            setLoadingStatus(false);
        }
    }, [url]);

    const setStateWithFormatter = newData => {
        if (typeof newData === 'function') setState(newData);
        else setState(formatter(newData, lookups));
    };
    return { state: [state, setStateWithFormatter], lookups, isLoading, isLoaded, reload: handleQuery };
};

export { ProxyClient, createAxiosHook };
