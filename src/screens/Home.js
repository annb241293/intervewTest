import React, { useEffect, useState } from "react";
import { Image, ImageBackground, Text, TouchableOpacity, View } from "react-native";
import Toolbar from '../components/Toolbar';
import { FlatList } from "react-native-gesture-handler";
import { getListVideo, HTTPService } from '../services/httpService';
import { Constants } from "../common/Contanst";
import { API_PATH } from "../services/ApiPath";
import { setFileLuuDuLieu, getFileDuLieuString } from "../common/FileStoragr";
import { useSelector } from "react-redux";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const Home = (props) => {

    const [listVideo, setListVideo] = useState([])
    const [nextPageToken, setNextPageToken] = useState('')

    const { isLogin } = useSelector(state => {
        console.log('stateuseSelector', state);
        return state.CommonReducer
    });

    useEffect(() => {
        const getListVideo = async () => {
            let params = {
                part: 'snippet,contentDetails,statistics',
                chart: 'mostPopular',
                regionCode: 'VN',
                key: Constants.API_KEY
            }
            new HTTPService().setAPI(API_PATH.LIST).GET(params)
                .then(res => {
                    if (res && res.items) {
                        console.log('res', res);
                        setListVideo(res.items)
                    }
                    if (res && res.nextPageToken) {
                        setNextPageToken(res.nextPageToken)
                    }
                })
                .catch(err => console.log('err'))
            let listWish = await getFileDuLieuString(Constants.LIST_WISH, true)
            // listWish = JSON.parse(listWish)
            console.log('listWish', listWish);
        }
        getListVideo()
    }, [])

    const onClickItem = (item) => {
        props.navigation.navigate('DetailVideo', item)
    }

    const addListWish = async (item) => {
        let listWish = await getFileDuLieuString(Constants.LIST_WISH, true)
        if (listWish) {
            listWish = JSON.parse(listWish)
            if (listWish.some(elm => elm.id == item.id)) {
                return
            } else {
                listWish.push(item)
            }
        } else {
            listWish = [{ ...item }]
        }
        setFileLuuDuLieu(Constants.LIST_WISH, JSON.stringify(listWish))
    }


    const onPressNext = (info) => {
        let params = {
            part: 'snippet,contentDetails,statistics',
            chart: 'mostPopular',
            regionCode: 'VN',
            key: Constants.API_KEY,
            pageToken: nextPageToken
        }
        new HTTPService().setAPI(API_PATH.LIST).GET(params)
            .then(res => {
                if (res && res.items) {
                    console.log('res', res);
                    setListVideo([...listVideo, ...res.items])
                }
                if (res && res.nextPageToken) {
                    setNextPageToken(res.nextPageToken)
                }
            })
            .catch(err => console.log('err'))
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
                {
                    isLogin ?
                        <TouchableOpacity
                            style={{ position: 'absolute', top: 10, right: 13 }}
                            onPress={() => addListWish(item)}
                        >
                            <Text style={{ color: 'white', fontWeight: 'bold', backgroundColor: "red", borderRadius: 5 }}>Add to WishList</Text>
                        </TouchableOpacity>
                        :
                        null
                }
            </View>
        )
    }


    return (
        <View style={{ flex: 1 }}>
            <Toolbar {...props} />
            <View style={{ flex: 1 }}>
                <FlatList
                    data={listVideo}
                    renderItem={({ item, index }) => renderVideo(item, index)}
                    keyExtractor={(item, index) => '' + index}
                    onEndReached={(info) => { onPressNext(info) }}
                />
            </View>
            {/* <TouchableOpacity onPress={onPressNext}>
                <Text>next</Text>
            </TouchableOpacity> */}
        </View>
    )
}

export default Home;