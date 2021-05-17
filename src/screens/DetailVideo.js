import React, { useEffect, useState } from "react";
import { Image, ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { WebView } from 'react-native-webview';
import { API_PATH } from "../services/ApiPath";

const DetailVideo = (props) => {

    const [videoItem, setVideoItem] = useState({})

    useEffect(() => {
        setVideoItem(props.route.params)
    }, [])

    return (
        <View style={{ flex: 1, }}>
            <WebView source={{ uri: API_PATH.WATCH_YOUTUBE.replace('{id}', videoItem.id) }} />
        </View>
    )
}

export default DetailVideo;