import React, { useEffect, useState, useCallback } from "react";
import { Image, FlatList, Text, TouchableOpacity, View } from "react-native";
import Toolbar from "../components/Toolbar";
import { setFileLuuDuLieu, getFileDuLieuString } from "../common/FileStoragr";
import { Constants } from "../common/Contanst";
import { useFocusEffect } from '@react-navigation/native';


const WishList = (props) => {

    const [listVideo, setList] = useState([])

    useFocusEffect(
        useCallback(() => {
            getList()
        }, [])
    )

    const getList = async () => {
        let listWish = await getFileDuLieuString(Constants.LIST_WISH, true)
        if (listWish) {
            listWish = JSON.parse(listWish)
            console.log('getList', listWish);
            setList(listWish)
        }
    }


    const removeListWish = async (item) => {
        let newlistWish = []
        let listWish = await getFileDuLieuString(Constants.LIST_WISH, true)
        if (listWish) {
            listWish = JSON.parse(listWish)
            newlistWish = listWish.filter(elm => elm.id != item.id)
            setList(newlistWish)
        }
        setFileLuuDuLieu(Constants.LIST_WISH, JSON.stringify(newlistWish))
    }

    const renderVideo = (item, index) => {
        return (
            <View style={{ flex: 1 }}>
                <TouchableOpacity
                    style={{ flex: 1, margin: 10 }} key={item.id}
                    onPress={() => onClickItem(item)}
                >
                    <Image style={{ height: 200, marginBottom: 10 }} source={{ uri: item.snippet.thumbnails.high.url }} />
                    <Text style={{ fontWeight: "bold" }} numberOfLines={2}>{item.snippet.title}</Text>
                    <Text>{item.snippet.channelTitle}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ position: 'absolute', top: 10, right: 13 }}
                    onPress={() => removeListWish(item)}
                >
                    <Text style={{ color: 'white', fontWeight: 'bold', backgroundColor: "red", borderRadius: 5 }}>Remove to WishList</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={{ flex: 1, }}>
            <Toolbar {...props} />
            <View style={{ flex: 1 }}>
                <FlatList
                    data={listVideo}
                    renderItem={({ item, index }) => renderVideo(item, index)}
                    keyExtractor={(item, index) => '' + index}
                />
            </View>
        </View>
    )
}

export default WishList;