import RNFS from 'react-native-fs';


export const getFileDuLieuString = async (key, isKeyEncry = true, pathOther = false, filePath = false) => {
    var path = RNFS.DocumentDirectoryPath + '/' + key;
    if (pathOther) {
        path = RNFS.DocumentDirectoryPath + '/logshistory' + '/' + key;
    }
    if (!filePath) {
        path = path + '.txt'
    }
    try {
        const value = await RNFS.readFile(path, 'utf8')
        if (value) {
            let giaima = value

            return giaima
        }
    } catch (error) {

    }
    return undefined
}

export const setFileLuuDuLieu = (key, data, isKeyEncry = true, pathOther = false, filePath = false) => {
    var path = RNFS.DocumentDirectoryPath + '/' + key;
    if (pathOther) {
        path = RNFS.DocumentDirectoryPath + '/logshistory' + '/' + key;
    }
    if (!filePath) {
        path = path + '.txt'
    }
    let datamahoa = data;
  
    RNFS.writeFile(path, datamahoa.toString(), 'utf8')
        .then((success) => {
        })
        .catch((err) => {
        });
}







