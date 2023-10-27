import api from "./axios";

const deviceId = '4022d88e30e8';
const apiKey = 'MWNiMjY5dWlk404459961993DCA83AE44BC6E3A6F58906952E7BECA0A5B69DC375C964915ACBC0EA536A0639CB73';

export const retrieveDevice = async () => {
   return await api.get(`/device/status?id=${deviceId}&auth_key=${apiKey}`)
       .then(resp => resp.data.data);
}

export const setPowerState = async (id, state) => {
    const form = new FormData();
    form.append('channel', id);
    form.append('turn', state);
    form.append('id', deviceId);
    form.append('auth_key', apiKey);

    return await api.post(`/device/relay/control`, form);
}