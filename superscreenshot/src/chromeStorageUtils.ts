export function getStorageData (key: string) {
    return new Promise((resolve, reject) =>
        chrome.storage.sync.get(key, result =>
            chrome.runtime.lastError
            ? reject(Error(chrome.runtime.lastError.message))
            : resolve(result)
        )
    )
}

export function setStorageData (data: any) {
    return new Promise((resolve, reject) =>
        chrome.storage.sync.set(data, () =>
            chrome.runtime.lastError
            ? reject(Error(chrome.runtime.lastError.message))
            : resolve()
        )
    )
}
