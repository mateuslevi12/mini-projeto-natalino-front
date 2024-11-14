
export async function fetchData<T>(method: () => Promise<T>, setData: (data: T) => void) {
    try {
        const data = await method();
        setData(data);
        console.log(JSON.stringify(data, null, 2));
    } catch (err) {
        console.log(err);
    }
}

export async function postData<T, AddBody>(method: (body: AddBody) => Promise<T>, body: AddBody) {
    try {
        const data = await method(body);
        console.log(body)
        console.log(JSON.stringify(data, null, 2));
        return data;
    } catch (err) {
        console.log(err);
    }
}

export async function deleteData<T>(method: (id?: number) => Promise<T>, id?: number) {
    try {
        const data = await method(id);
        console.log(id)
        console.log(JSON.stringify(data, null, 2));
        return data;
    } catch (err) {
        console.log(err);
    }
}

export async function editData<T, EditData> (method: (id?: number, body?: EditData) => Promise<T>, id?: number, body?: EditData) {
    try {
        const data = await method(id, body)
        console.log(id)
        console.log(JSON.stringify(data, null, 2));
        return data;
    } catch (err) {
        console.log(err);
    }
}