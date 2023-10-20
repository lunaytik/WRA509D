import api from "./axios";

const deviceId = '80646F827174';
const apiKey = 'MWRmYzM2dWlkE62C6C4C76F817CE0A3D2902F5B5D4C115E49B28CF8539114D9246505DE5D368D560D06020A92480';

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