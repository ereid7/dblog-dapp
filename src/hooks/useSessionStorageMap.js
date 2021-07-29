export const useSessionStorageMap = (mapId, clearOnRefresh) => {
  const sessionStorage = window.sessionStorage;

  const setMapItem = (key, value) => {
    var mapData = sessionStorage.getItem(mapId)

    if (mapData !== null) {
      mapData = JSON.parse(mapData)
    }
    else {
      mapData = {}
    }

    mapData[key] = value
    sessionStorage.setItem(mapId, JSON.stringify(mapData))
  }

  const removeMapItem = (key) => {
    var mapData = sessionStorage.getItem(mapId)

    if (mapData !== null) {
      mapData = JSON.parse(mapData)
      delete mapData[key]
    }

    sessionStorage.setItem(mapId, JSON.stringify(mapData))
  }

  const getMapItem = (key) => {
    var mapData = sessionStorage.getItem(mapId)

    if (mapData !== null) {
      mapData = JSON.parse(mapData)
      return mapData[key]
    }

    return null
  }

  const containsMapItem = (key) => {
    var mapData = sessionStorage.getItem(mapId)

    if (mapData !== null) {
      mapData = JSON.parse(mapData)

      return mapData[key] !== null && mapData[key] !== undefined;
    }

    return false
  }

  const clearMap = () => {
    sessionStorage.removeItem(mapId)
  }

  return [setMapItem, removeMapItem, getMapItem, clearMap, containsMapItem]
}