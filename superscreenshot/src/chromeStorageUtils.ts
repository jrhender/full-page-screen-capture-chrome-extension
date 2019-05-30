// export function getStorageData (key: string) {
//     return new Promise((resolve, reject) =>
//         chrome.storage.sync.get(key, result =>
//             chrome.runtime.lastError
//             ? reject(Error(chrome.runtime.lastError.message))
//             : resolve(result)
//         )
//     )
// }

// export function setStorageData (data: any) {
//     return new Promise((resolve, reject) =>
//         chrome.storage.sync.set(data, () =>
//             chrome.runtime.lastError
//             ? reject(Error(chrome.runtime.lastError.message))
//             : resolve()
//         )
//     )
// }

export function getStorageData (key: string) {
    return new Promise<string>((resolve, reject) => {
        var result = localStorage.getItem(key);
        result ? resolve(result) : reject(key + " was null in localStorage");
    })
}

export function setStorageData (key: string, value: any) {
    return new Promise<string>((resolve, reject) => {
        localStorage.SetItem(key, value);
        resolve();
    })
}
