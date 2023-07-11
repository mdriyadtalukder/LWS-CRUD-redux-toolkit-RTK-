const fetches = async (dispatch) => {
    const response = await fetch('http://localhost:9000/data');
    const data = await response.json();
    dispatch(fetch(data))
}
export default fetches;
const adds = (text) => {
    return async (dispatch) => {
        const response = await fetche('http://localhost:9000/data', {
            method: "POST",
            body: JSON.stringify({
                w: text,
                status: false
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        const data = await response.json();
        dispatch(add(data.w))
    }
}
export default adds;
const updt = (id, status) => {
    return async (dispatch) => {
        const response = await fetch(`http://localhost:9000/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                status: !status
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        const data = await response.json();
        dispatch(up(data.id, data.status))
    }
}
export default updt;
const del = (id) => {
    return async (dispatch) => {
        const response = await fetch(`http://localhost:9000/${id}`, {
            method: "DELETE"
        })
        dispatch(dels(id))
    }
}
export default del;

const mxid = (st) => {
    const mid = st.reduce((mid, st) => Math.max(st.id, mid), -1);
    return mid + 1;
}